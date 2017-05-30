"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssLibList = require("postcss/lib/list");

var _postcssLibList2 = _interopRequireDefault(_postcssLibList);

var _balancedMatch = require("balanced-match");

var _balancedMatch2 = _interopRequireDefault(_balancedMatch);

function explodeSelector(pseudoClass, selector) {
  var position = selector.indexOf(pseudoClass);
  if (selector && position > -1) {
    var pre = selector.slice(0, position);
    var matches = (0, _balancedMatch2["default"])("(", ")", selector.slice(position));
    var bodySelectors = matches.body ? _postcssLibList2["default"].comma(matches.body).map(function (s) {
      return explodeSelector(pseudoClass, s);
    }).join(")" + pseudoClass + "(") : "";
    var postSelectors = matches.post ? explodeSelector(pseudoClass, matches.post) : "";

    return "" + pre + pseudoClass + "(" + bodySelectors + ")" + postSelectors;
  }
  return selector;
}

function explodeSelectors(pseudoClass) {
  return function () {
    return function (css) {
      css.walkRules(function (rule) {
        if (rule.selector && rule.selector.indexOf(pseudoClass) > -1) {
          rule.selector = explodeSelector(pseudoClass, rule.selector);
        }
      });
    };
  };
}

exports["default"] = _postcss2["default"].plugin("postcss-selector-not", explodeSelectors(":not"));
module.exports = exports["default"];