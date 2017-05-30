var postcss = require('postcss');

var definition = function (variables, node) {
    var name = node.prop.slice(1);
    variables[name] = node.value;
    node.remove();
};

var variable = function (variables, node, str, name, opts, result) {
    if ( opts.only ) {
        if ( typeof opts.only[name] !== 'undefined' ) {
            return opts.only[name];
        } else {
            return str;
        }

    } if ( typeof variables[name] !== 'undefined' ) {
        return variables[name];

    } else if ( opts.silent ) {
        return str;

    } else {
        var fix = opts.unknown(node, name, result);
        if ( fix ) {
            return fix;
        } else {
            return str;
        }
    }
};

var simpleSyntax = function (variables, node, str, opts, result) {
    return str.replace(/(^|[^\w])\$([\w\d-_]+)/g, function (_, bef, name) {
        return bef + variable(variables, node, '$' + name, name, opts, result);
    });
};

var inStringSyntax = function (variables, node, str, opts, result) {
    return str.replace(/\$\(\s*([\w\d-_]+)\s*\)/g, function (all, name) {
        return variable(variables, node, all, name, opts, result);
    });
};

var bothSyntaxes = function (variables, node, str, opts, result) {
    str = simpleSyntax(variables, node, str, opts, result);
    str = inStringSyntax(variables, node, str, opts, result);
    return str;
};

var declValue = function (variables, node, opts, result) {
    node.value = bothSyntaxes(variables, node, node.value, opts, result);
};

var declProp = function (variables, node, opts, result) {
    node.prop = inStringSyntax(variables, node, node.prop, opts, result);
};

var ruleSelector = function (variables, node, opts, result) {
    node.selector = bothSyntaxes(variables, node, node.selector, opts, result);
};

var atruleParams = function (variables, node, opts, result) {
    node.params = bothSyntaxes(variables, node, node.params, opts, result);
};

module.exports = postcss.plugin('postcss-simple-vars', function (opts) {
    if ( typeof opts === 'undefined' ) opts = { };

    if ( !opts.unknown ) {
        opts.unknown = function (node, name) {
            throw node.error('Undefined variable $' + name);
        };
    }

    return function (css, result) {
        var variables = { };
        if ( typeof opts.variables === 'function' ) {
            variables = opts.variables();
        } else if ( typeof opts.variables === 'object' ) {
            for ( var i in opts.variables ) variables[i] = opts.variables[i];
        }

        for ( var name in variables ) {
            if ( name[0] === '$' ) {
                var fixed = name.slice(1);
                variables[fixed] = variables[name];
                delete variables[name];
            }
        }

        css.walk(function (node) {

            if ( node.type === 'decl' ) {
                if ( node.value.toString().indexOf('$') !== -1 ) {
                    declValue(variables, node, opts, result);
                }
                if ( node.prop.indexOf('$(') !== -1 ) {
                    declProp(variables, node, opts, result);
                } else if ( node.prop[0] === '$' ) {
                    if ( !opts.only ) definition(variables, node);
                }

            } else if ( node.type === 'rule' ) {
                if ( node.selector.indexOf('$') !== -1 ) {
                    ruleSelector(variables, node, opts, result);
                }

            } else if ( node.type === 'atrule' ) {
                if ( node.params && node.params.indexOf('$') !== -1 ) {
                    atruleParams(variables, node, opts, result);
                }
            }

        });

        if ( opts.onVariables ) {
            opts.onVariables(variables);
        }
    };
});
