
var balanced = require('balanced-match');
var Color = require('color');
var parse = require('./parse');
var adjusters = require('./adjusters');

/**
 * Expose `convert`.
 */

module.exports = convert;

/**
 * Convert a color function CSS `string` into an RGB color string.
 *
 * @param {String} string
 * @return {String}
 */

function convert (string) {
  var index = string.indexOf('color(');
  if (index == -1) return string;

  string = string.slice(index);
  string = balanced('(', ')', string);
  if (!string) throw new SyntaxError('Missing closing parenthese for \'' + string + '\'');
  var ast = parse('color(' + string.body + ')');
  return toRGB(ast) + convert(string.post);
}

/**
 * Given a color `ast` return an RGB color string.
 *
 * @param {Object} ast
 * @return {String}
 */

function toRGB (ast) {
  var color = new Color(ast.arguments[0].type == "function" ? toRGB(ast.arguments[0]) : ast.arguments[0].value)
  var fns = ast.arguments.slice(1);

  fns.forEach(function (adjuster) {
    var name = adjuster.name;
    if (!adjusters[name]) throw new Error('Unknown <color-adjuster> \'' + name + '\'');

    // convert nested color functions
    adjuster.arguments.forEach(function (arg) {
      if (arg.type == 'function' && arg.name == 'color') {
        arg.value = toRGB(arg);
        arg.type = 'color';
        delete arg.name;
      }
    });

    // apply adjuster transformations
    adjusters[name](color, adjuster.arguments);
  });

  return color.rgbString();
}
