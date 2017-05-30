'use strict';

var postcss = require('postcss');
var assign = require('object-assign');
var t = require('tcomb');

var plugin = 'postcss-property-lookup';
var lookupPattern = /@\(?([a-z-]+)\)?\b/g;

var LogLevel = t.enums.of(['error', 'warn'], 'LogLevel');
var PluginOptions = t.struct({
  logLevel: LogLevel
}, 'PluginOptions');

var defaultOptions = {
  logLevel: 'warn'
};

module.exports = postcss.plugin(plugin, propertyLookup);

function propertyLookup(options) {
  var _this = this;

  var errorContext = { plugin: plugin };
  options = new PluginOptions(assign({}, defaultOptions, options));

  var log = ({
    warn: function warn(message, rule, result) {
      rule.warn(result, message);
    },
    error: function error(message, rule) {
      throw rule.error(message, errorContext);
    }
  })[options.logLevel];

  if (!log) {
    throw new Error('Invalid logLevel: ' + options.logLevel);
  }

  return function (root, result) {
    root.walkRules(function (rule) {
      eachDecl(rule, function (decl) {
        if (decl.value.indexOf('@') === -1) {
          return;
        }
        decl.value = decl.value.replace(lookupPattern, resolveLookup.bind(_this, rule));
      });
    });

    function resolveLookup(rule, orig, prop) {
      var resolvedValue = closest(rule, prop);

      if (!resolvedValue) {
        log('Unable to find property ' + orig + ' in ' + rule.selector, rule, result);
      }

      return resolvedValue;
    }

    function closest(container, prop) {
      if (!container) {
        return '';
      }
      var resolvedValue = undefined;

      eachDecl(container, function (decl) {
        if (decl.prop === prop) {
          resolvedValue = decl.value;
        }
      });

      if (!resolvedValue) {
        return closest(container.parent, prop);
      }

      if (resolvedValue.indexOf('@') === -1) {
        return resolvedValue;
      }

      return resolvedValue.replace(lookupPattern, resolveLookup.bind(this, container));
    }
  };
}

function eachDecl(container, callback) {
  container.each(function (node) {
    if (node.type === 'decl') {
      callback(node);
    }
    // Recurse through child declarations of a media rule
    if (node.type === 'atrule') {
      eachDecl(node, callback);
    }
  });
}