var postcss = require('postcss');
var vars    = require('postcss-simple-vars');
var path    = require('path');
var globby  = require('globby');
var fs      = require('fs');

var stringToAtRule = function (str, obj) {
    obj.name   = str.match(/^@([^\s]*)/)[1];
    obj.params = str.replace(/^@[^\s]*\s+/, '');
    return obj;
};

var objectToNodes = function (node, obj, source) {
    var name, value, decl, rule;
    for ( name in obj ) {
        value = obj[name];
        if ( typeof value === 'object' ) {
            if ( name[0] === '@' ) {
                rule = postcss.atRule(stringToAtRule(name, { source: source }));
            } else {
                rule = postcss.rule({ selector: name, source: source });
            }
            node.append(rule);
            if ( typeof value === 'object' ) objectToNodes(rule, value, source);
        } else {
            decl = postcss.decl({
                prop:   name,
                value:  value.toString(),
                source: source
            });
            node.append(decl);
        }
    }
    return node;
};

var insertObject = function (rule, obj) {
    var root = objectToNodes(postcss.root(), obj, rule.source);
    rule.parent.insertBefore(rule, root);
};

var insertMixin = function (result, mixins, rule, opts) {
    var name   = rule.params.split(/\s/, 1)[0];
    var params = rule.params.slice(name.length).trim();
    if ( params.indexOf(',') === -1 ) {
        params = postcss.list.space(params);
        if ( params.length > 1 ) {
            result.warn('Space argument separation is depreacted and ' +
                        'will be removed in next version. Use comma.',
                        { node: rule });
        }
    } else {
        params = postcss.list.comma(params);
    }

    var meta   = mixins[name];
    var mixin  = meta && meta.mixin;

    if ( !meta ) {
        if ( !opts.silent ) {
            throw rule.error('Undefined mixin ' + name);
        }

    } else if ( mixin.name === 'define-mixin' ) {
        var i;
        var values = { };
        for ( i = 0; i < meta.args.length; i++ ) {
            values[meta.args[i][0]] = params[i] || meta.args[i][1];
        }

        var clones = [];
        for ( i = 0; i < mixin.nodes.length; i++ ) {
            clones.push( mixin.nodes[i].clone() );
        }

        var proxy = postcss.rule({ nodes: clones });
        if ( meta.args.length ) {
            vars({ only: values })(proxy);
        }
        if ( meta.content ) {
            proxy.walkAtRules('mixin-content', function (place) {
                place.replaceWith(rule.nodes);
            });
        }

        rule.parent.insertBefore(rule, clones);

    } else if ( typeof mixin === 'object' ) {
        insertObject(rule, mixin, rule.source);

    } else if ( typeof mixin === 'function' ) {
        var args  = [rule].concat(params);
        var nodes = mixin.apply(this, args);
        if ( typeof nodes === 'object' ) {
            insertObject(rule, nodes, rule.source);
        }
    }

    if ( rule.parent ) rule.remove();
};

var defineMixin = function (result, mixins, rule) {
    var name  = rule.params.split(/\s/, 1)[0];
    var other = rule.params.slice(name.length).trim();

    var args = [];
    if ( other.length ) {
        if ( other.indexOf(',') === -1 && other.indexOf(':') === -1 ) {
            args = other.split(/\s/).map(function (str) {
                return [str.slice(1), ''];
            });
            if ( args.length > 1 ) {
                result.warn('Space argument separation is depreacted and ' +
                            'will be removed in next version. Use comma.',
                            { node: rule });
            }

        } else {
            args = postcss.list.comma(other).map(function (str) {
                var arg      = str.split(':', 1)[0];
                var defaults = str.slice(arg.length + 1);
                return [arg.slice(1).trim(), defaults.trim()];
            });
        }
    }

    var content = false;
    rule.walkAtRules('mixin-content', function () {
        content = true;
        return false;
    });

    mixins[name] = { mixin: rule, args: args, content: content };
    rule.remove();
};

module.exports = postcss.plugin('postcss-mixins', function (opts) {
    if ( typeof opts === 'undefined' ) opts = { };

    var i;
    var cwd    = process.cwd();
    var globs  = [];
    var mixins = { };

    if ( opts.mixinsDir ) {
        if ( !Array.isArray(opts.mixinsDir) ) {
            opts.mixinsDir = [opts.mixinsDir];
        }
        globs = opts.mixinsDir.map(function (dir) {
            return path.join(dir, '*.{js,json,css}');
        });
    }

    if ( opts.mixinsFiles ) globs = globs.concat(opts.mixinsFiles);

    return function (css, result) {
        var discoverMixins = function (atrule) {
            if ( atrule.name === 'mixin' ) {
                insertMixin(result, mixins, atrule, opts);
            } else if ( atrule.name === 'define-mixin' ) {
                defineMixin(result, mixins, atrule);
            }
        };
        return globby(globs).then(function (files) {
            return Promise.all(files.map(function (file) {
                var ext = path.extname(file);
                var name = path.basename(file, ext);
                file = path.join(cwd, path.relative(cwd, file));
                return new Promise(function (resolve, reject) {
                    if (ext === '.css') {
                        fs.readFile(file, function (err, contents) {
                            if ( err ) return reject(err);
                            postcss.parse(contents).walkAtRules(discoverMixins);
                            resolve();
                        });
                        return;
                    }
                    mixins[name] = { mixin: require(file) };
                    resolve();
                });
            }));
        }).then(function () {
            if ( typeof opts.mixins === 'object' ) {
                for ( i in opts.mixins ) {
                    mixins[i] = { mixin: opts.mixins[i] };
                }
            }

            css.walkAtRules(discoverMixins);
        });
    };
});
