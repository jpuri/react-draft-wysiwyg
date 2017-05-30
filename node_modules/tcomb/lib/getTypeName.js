var isType = require('./isType');
var getFunctionName = require('./getFunctionName');

module.exports = function getTypeName(constructor) {
  if (isType(constructor)) {
    return constructor.displayName;
  }
  return getFunctionName(constructor);
};