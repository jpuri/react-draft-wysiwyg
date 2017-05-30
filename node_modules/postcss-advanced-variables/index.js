var postcss = require('postcss');

module.exports = postcss.plugin('postcss-advanced-variables', function (opts) {
	opts = opts || {};

	// Matchers
	// --------

	var isVariableDeclaration = /^\$[\w-]+$/;
	var variablesInString = /(^|[^\\])\$(?:\(([A-z][\w-]*)\)|([A-z][\w-]*))/g;
	var wrappingParen = /^\((.*)\)$/g;
	var isDefaultValue = /\s+!default$/;

	// Helpers
	// -------

	// '(hello), (goodbye)' => [[hello], [goodbye]]
	function getArrayedString(string, first) {
		var array = postcss.list.comma(String(string)).map(function (substring) {
			return wrappingParen.test(substring) ? getArrayedString(substring.replace(wrappingParen, '$1')) : substring;
		});

		return first && array.length === 1 ? array[0] : array;
	}

	// $NAME => VALUE
	function getVariable(node, name) {
		var value = node.variables && name in node.variables ? node.variables[name] : node.parent && getVariable(node.parent, name);

		return value;
	}

	// node.variables[NAME] => 'VALUE'
	function setVariable(node, name, value) {
		node.variables = node.variables || {};

		if (isDefaultValue.test(value)) {
			if (getVariable(node, name)) return;
			else value = value.replace(isDefaultValue, '');
		}

		node.variables[name] = getArrayedString(value, true);
	}

	// 'Hello $NAME' => 'Hello VALUE'
	function getVariableTransformedString(node, string) {
		return string.replace(variablesInString, function (match, before, name1, name2) {
			var value = getVariable(node, name1 || name2);

			return value === undefined ? match : before + value;
		});
	}

	// Loopers
	// -------

	// run over every node
	function each(parent) {
		var index = -1;
		var node;

		while (node = parent.nodes[++index]) {
			if (node.type === 'decl')        index = eachDecl(node, parent, index);
			else if (node.type === 'rule')   index = eachRule(node, parent, index);
			else if (node.type === 'atrule') index = eachAtRule(node, parent, index);

			if (node.nodes) each(node);
		}
	}

	// PROPERTY: VALUE
	function eachDecl(node, parent, index) {
		// $NAME: VALUE
		if (isVariableDeclaration.test(node.prop)) {
			node.value = getVariableTransformedString(parent, node.value);

			setVariable(parent, node.prop.slice(1), node.value);

			node.remove();

			--index;
		} else {
			node.prop = getVariableTransformedString(parent, node.prop);

			node.value = getVariableTransformedString(parent, node.value);
		}

		// return index
		return index;
	}

	// SELECTOR {RULE}
	function eachRule(node, parent, index) {
		node.selector = getVariableTransformedString(parent, node.selector);

		return index;
	}

	// @NAME PARAMS
	function eachAtRule(node, parent, index) {
		if (node.name === 'for') index = eachAtForRule(node, parent, index);
		else if (node.name === 'each') index = eachAtEachRule(node, parent, index);
		else if (node.name === 'if') index = eachAtIfRule(node, parent, index);
		else if (node.name === 'media') node.params = getVariableTransformedString(parent, node.params);
		return index;
	}

	// @for NAME from START to END by INCREMENT
	function eachAtForRule(node, parent, index) {
		// set params
		var params = postcss.list.space(node.params);

		var name      = params[0].trim().slice(1);
		var start     = +getVariableTransformedString(node, params[2]);
		var end       = +getVariableTransformedString(node, params[4]);
		var increment = 6 in params && +getVariableTransformedString(node, params[6]) || 1;
		var direction = start <= end ? 1 : -1;

		// each iteration
		while (start * direction <= end * direction) {
			// set iterating variable
			setVariable(node, name, start);

			// clone node
			var clone = node.clone({ parent: parent, variables: node.variables });

			// process clone children
			each(clone);

			// increment index
			index += clone.nodes.length;

			// increment start
			start += increment * direction;

			// insert clone child nodes
			parent.insertBefore(node, clone.nodes);
		}

		// remove node
		node.remove();

		// return index
		return --index;
	}

	// @each NAME in ARRAY
	function eachAtEachRule(node, parent, index) {
		// set params
		var params = node.params.split(' in ');

		var name  = params[0].trim().slice(1);
		var array = getArrayedString(getVariableTransformedString(node, params.slice(1).join(' in ')), true);
		var start = 0;
		var end   = array.length;

		// each iteration
		while (start < end) {
			// set iterating variable
			setVariable(node, name, array[start]);

			// clone node
			var clone = node.clone({ parent: parent, variables: node.variables });

			// process clone children
			each(clone);

			// increment index
			index += clone.nodes.length;

			// increment start
			++start;

			// insert clone child nodes
			parent.insertBefore(node, clone.nodes);
		}

		// remove node
		node.remove();

		// return index
		return --index;
	}

	// @if LEFT OPERATOR RIGHT
	function eachAtIfRule(node, parent, index) {
		// set params
		var params = postcss.list.space(node.params);

		var left     = getVariableTransformedString(node, params[0]);
		var operator = params[1];
		var right    = getVariableTransformedString(node, params[2]);

		// set next node
		var next = node.next();

		// evaluate expression
		if (
			operator === '==' && left === right ||
			operator === '!=' && left !== right ||
			operator === '<'  && left < right ||
			operator === '<=' && left <= right ||
			operator === '>'  && left > right ||
			operator === '>=' && left >= right
		) {
			// process node children
			each(node);

			// increment index
			index += node.nodes.length;

			// insert child nodes
			parent.insertBefore(node, node.nodes);

			// if next node is an else statement
			if (next && next.type === 'atrule' && next.name === 'else') {
				next.remove();
			}
		} else if (next && next.type === 'atrule' && next.name === 'else') {
			// process next children
			each(next);

			// increment index
			index += next.nodes.length;

			// insert child nodes
			parent.insertBefore(node, next.nodes);

			// remove next
			next.remove();
		}

		// remove node
		node.remove();

		// return index
		return --index;
	}

	return function (css) {
		// Initialize each global variable.
		for (var name in opts.variables || {}) {
			setVariable(css, name, opts.variables[name]);
		}
		// Begin processing each css node.
		each(css);
	};
});
