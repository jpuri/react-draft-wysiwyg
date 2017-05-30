'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isWindows = require('is-windows');

var _isWindows2 = _interopRequireDefault(_isWindows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = commandConvert;


var envUseUnixRegex = /\$(\w+)/; // $my_var
var envUseWinRegex = /%(.*?)%/; // %my_var%

/**
 * Converts an environment variable usage to be appropriate for the current OS
 * @param {String} command Command to convert
 * @returns {String} Converted command
 */
function commandConvert(command) {
  var isWin = (0, _isWindows2.default)();
  var envExtract = isWin ? envUseUnixRegex : envUseWinRegex;
  var match = envExtract.exec(command);
  if (match) {
    command = isWin ? `%${match[1]}%` : `$${match[1]}`;
  }
  return command;
}