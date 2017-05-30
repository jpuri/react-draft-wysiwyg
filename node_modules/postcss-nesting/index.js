var postcss = require('postcss');
var comma   = postcss.list.comma;

module.exports = postcss.plugin('postcss-nesting', function (opts) {
	var bubble = ['document', 'media', 'supports'];
	var name   = 'nest';

	if (opts && opts.bubble) {
		bubble = bubble.concat(opts.bubble);
	}

	if (opts && opts.prefix) {
		name = '-' + opts.prefix + '-' + name;
	}

	return function (css) {
		css.walk(function (target) {
			var rule = target.parent;
			var root = rule && rule.parent;

			var isAtRule = target.type === 'atrule';
			var isRule   = target.type === 'rule';

			if (root && rule.type === 'rule') {
				var newrule = postcss.rule({
					source: target.source
				});

				if (isRule && target.selectors.every(function (selector) {
					return selector.indexOf('&') === 0;
				})) {
					target.remove();

					newrule.selector = target.selector;

					newrule.append(target.nodes);

					transpileSelectors(rule, newrule);

					root.insertAfter(rule.insertAfterNode || rule, newrule);

					rule.insertAfterNode = newrule;
				} else if (isAtRule && target.name === name && target.params.indexOf('&') !== -1) {
					target.remove();

					newrule.selector = target.params;

					newrule.append(target.nodes);

					transpileSelectors(rule, newrule);

					root.insertAfter(rule.insertAfterNode || rule, newrule);

					rule.insertAfterNode = newrule;
				} else if (isAtRule && bubble.indexOf(target.name) !== -1) {
					var selector = rule.selector;

					if (root.type === 'atrule' && root.name === target.name && root.parent) {
						target.params = comma(root.params).map(function (params1) {
							return comma(target.params).map(function (params2) {
								return params1 + ' and ' + params2;
							}).join(', ');
						}).join(', ');

						rule = root;
						root = root.parent;
					}

					target.remove();

					newrule.selector = selector;

					newrule.append(target.nodes);

					target.removeAll();

					target.append(newrule);

					root.insertAfter(rule.insertAfterNode || rule, target);

					rule.insertAfterNode = target;
				}
			}
		});
	};
});

function transpileSelectors(fromRule, toRule) {
	var selectors = [];

	fromRule.selectors.forEach(function (fromSelector) {
		toRule.selectors.forEach(function (toSelector) {
			selectors.push(toSelector.replace(/&/g, fromSelector));
		});
	});

	toRule.selectors = selectors;
}
