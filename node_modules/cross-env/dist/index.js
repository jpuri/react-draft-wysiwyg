'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _crossSpawn = require('cross-spawn');

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = crossEnv;


var envSetterRegex = /(\w+)=('(.+)'|"(.+)"|(.+))/;

function crossEnv(args) {
  var _getCommandArgsAndEnv = getCommandArgsAndEnvVars(args),
      _getCommandArgsAndEnv2 = _slicedToArray(_getCommandArgsAndEnv, 3),
      command = _getCommandArgsAndEnv2[0],
      commandArgs = _getCommandArgsAndEnv2[1],
      env = _getCommandArgsAndEnv2[2];

  if (command) {
    var proc = (0, _crossSpawn.spawn)(command, commandArgs, { stdio: 'inherit', env });
    process.on('SIGTERM', function () {
      return proc.kill('SIGTERM');
    });
    process.on('SIGINT', function () {
      return proc.kill('SIGINT');
    });
    process.on('SIGBREAK', function () {
      return proc.kill('SIGBREAK');
    });
    process.on('SIGHUP', function () {
      return proc.kill('SIGHUP');
    });
    proc.on('exit', process.exit);
    return proc;
  }
  return null;
}

function getCommandArgsAndEnvVars(args) {
  var envVars = getEnvVars();
  var commandArgs = args.map(_command2.default);
  var command = getCommand(commandArgs, envVars);
  return [command, commandArgs, envVars];
}

function getCommand(commandArgs, envVars) {
  while (commandArgs.length) {
    var shifted = commandArgs.shift();
    var match = envSetterRegex.exec(shifted);
    if (match) {
      envVars[match[1]] = match[3] || match[4] || match[5];
    } else {
      return shifted;
    }
  }
  return null;
}

function getEnvVars() {
  var envVars = Object.assign({}, process.env);
  if (process.env.APPDATA) {
    envVars.APPDATA = process.env.APPDATA;
  }
  return envVars;
}