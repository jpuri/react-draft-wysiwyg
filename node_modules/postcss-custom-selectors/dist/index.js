"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssSelectorMatchesDistReplaceRuleSelector = require("postcss-selector-matches/dist/replaceRuleSelector");

var _postcssSelectorMatchesDistReplaceRuleSelector2 = _interopRequireDefault(_postcssSelectorMatchesDistReplaceRuleSelector);

var CUSTOM_SELECTOR_RE = /:--[\w-]+/g;

exports["default"] = _postcss2["default"].plugin("postcss-custom-selectors", function (options) {
  var _extends2 = _extends({
    extensions: {},
    lineBreak: true,
    transformMatches: true
  }, options || {});

  var extensions = _extends2.extensions;
  var lineBreak = _extends2.lineBreak;
  var transformMatches = _extends2.transformMatches;

  var transformMatchesOnRule = transformMatches ? function (rule) {
    return (0, _postcssSelectorMatchesDistReplaceRuleSelector2["default"])(rule, {
      lineBreak: lineBreak
    });
  } : function (rule) {
    return rule.selector;
  };

  return function (css, result) {
    var toRemove = [];
    var customSelectors = {};

    // first, read custom selectors
    css.walkAtRules(function (rule) {
      if (rule.name !== "custom-selector") {
        return;
      }

      // @custom-selector = @custom-selector <extension-name> <selector>
      var params = rule.params.split(/\s/);
      var customName = params.shift();
      var customList = rule.params.replace(customName, "").trim();
      customSelectors[customName] = customList;

      toRemove.push(rule);
    });

    // Add JS defined selectors
    Object.keys(extensions).forEach(function (extension) {
      customSelectors[extension] = extensions[extension];
    });

    // Convert those selectors to :matches()
    css.walkRules(function (rule) {
      if (rule.selector.indexOf(":--") > -1) {
        rule.selector = rule.selector.replace(CUSTOM_SELECTOR_RE, function (extensionName, matches, selector) {

          if (!customSelectors[extensionName]) {
            result.warn("The selector '" + rule.selector + "' is undefined", { node: rule });

            return selector;
          }

          return ":matches(" + customSelectors[extensionName] + ")";
        });

        rule.selector = transformMatchesOnRule(rule);
      }
    });

    toRemove.forEach(function (rule) {
      rule.remove();
    });
  };
});
module.exports = exports["default"];