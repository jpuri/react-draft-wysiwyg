var assign   = require('object-assign');
var fs       = require('fs-promise');
var hash     = require('string-hash');
var path     = require('path');
var postcss  = require('postcss');

module.exports = postcss.plugin('postcss-partial-import', function (opts) {
	opts = assign({
		encoding:  'utf8',
		extension: 'css',
		prefix:    '_'
	}, opts);

	if (opts.cachedir) {
		opts.cachefile = path.join(opts.cachedir, 'imports.json');
	}

	var getModified = function (filename) {
		return fs.statSync(filename).mtime.getTime();
	};

	var isCached = function (file, cache) {
		var isDependencyCached = function (filename) {
			if (!filename) return false;

			var importCache = cache[filename];

			if (!importCache) return false;

			if (getModified(filename) !== importCache.mtime) return false;

			return !importCache.dep || !importCache.dep.some(isDependencyCached);
		};

		var importCache = cache[file];

		if (!isDependencyCached(file)) {
			if (importCache && importCache.cache) {
				fs.unlink(importCache.cache, function (error) {
					if (error) throw error;
				});
			}

			return false;
		}

		return !!importCache.cache;
	};

	var readFromCache = function (filename, result, cache) {
		return new Promise(function (resolve, reject) {
			var fileCache = cache[filename].cache;

			fs.readFile(fileCache, { encoding: opts.encoding }).then(function (contents) {
				var processor = postcss();
				var options   = assign({}, result.opts);

				options.from = filename;

				processor.process(contents, options).then(function (results) {
					resolve(results.root);
				}, reject);
			}, reject);
		});
	};

	var getPath = function (file, fromPath) {
		if (!path.extname(file)) file = path.join(path.dirname(file), opts.prefix + path.basename(file) + '.' + opts.extension);

		return path.resolve(path.dirname(fromPath), file);
	};

	var importRule = function (atRule, result, fromPath, cache) {
		return new Promise(function (resolve, reject) {
			var matches = /(?:url\()?['"]?([^'"\)]*)['"]?(?:\))?(?:\s+(.+))?/gi.exec(atRule.params);

			if (!matches) return reject('Could not parse import: ' + atRule.params);

			var file  = matches[1];
			var media = matches[2];

			if (!file) return reject('Empty import detected');

			if (/^(https?:)?\/\//.test(file)) return resolve();

			file = getPath(file, fromPath);

			(opts.generate ? fs.ensureFile(file) : Promise.resolve()).then(function () {
				return fs.readFile(file, { encoding: opts.encoding });
			}).then(function (css) {
				var processor = postcss();
				var options   = assign({}, result.opts);

				options.from = file;

				processor.process(css, options).then(function (results) {
					parseStyles(results.root, results, cache).then(function () {
						if (cache && fromPath) {
							cache[fromPath] = cache[fromPath] || { dep: [] };

							if (cache[fromPath].dep.indexOf(file) === -1) cache[fromPath].dep.push(file);
						}

						if (media) {
							atRule.name = 'media';
							atRule.params = media;
							atRule.raws.between = ' ';
							atRule.append(results.root);
						} else atRule.replaceWith(results.root);

						resolve();
					}, reject);
				}, reject);
			}, reject);
		});
	};

	var parseStyles = function (css, result, cache) {
		return new Promise(function (resolve, reject) {
			var fromPath = result.opts.from || css.source.input.file;

			if (fromPath && cache && isCached(fromPath, cache)) {
				readFromCache(fromPath, result, cache).then(function (styles) {
					styles.nodes.forEach(function (node) {
						node.parent = css;
					});

					css.source = styles.source;
					css.nodes  = styles.nodes;
					css.raws   = styles.raws;

					resolve();
				}, reject);
			} else {
				var imports = [];

				css.walkAtRules('import', function (atRule) {
					imports.push(importRule(atRule, result, fromPath, cache));
				});

				Promise.all(imports).then(function () {
					if (fromPath && cache) {
						cache[fromPath] = cache[fromPath] || {};

						cache[fromPath].mtime = getModified(fromPath);

						if (imports.length) {
							var output        = css.toResult().css;
							var cacheFilename = path.resolve(opts.cachedir, hash(output) + '.css');

							cache[fromPath].cache = cacheFilename;

							fs.writeFileSync(cacheFilename, output);
						}
					}

					resolve();
				}, reject);
			}
		});
	};

	return function (css, result) {
		return new Promise(function (resolve, reject) {
			var cache;

			if (opts.cachedir) {
				fs.mkdirsSync(opts.cachedir);

				try {
					cache = require(opts.cachefile);
				} catch (error) {
					cache = {};
				}
			}

			parseStyles(css, result, cache).then(function () {
				if (cache) fs.writeFileSync(opts.cachefile, JSON.stringify(cache));

				resolve();
			}, reject);
		});
	};
});
