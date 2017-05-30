var assert = require('./assert');
var isFunction = require('./isFunction');
var isNil = require('./isNil');
var getTypeName = require('./getTypeName');
var isObject = require('./isObject');
var isArray = require('./isArray');

function fromJSON(value, type) {
  if (process.env.NODE_ENV !== 'production') {
    assert(isFunction(type), function () {
      return 'Invalid argument type ' + assert.stringify(type) + ' supplied to fromJSON(value, type) (expected a type)';
    });
  }

  if (isFunction(type.fromJSON)) {
    return type.fromJSON(value);
  }

  var kind = type.meta.kind;
  var k;
  var ret;

  switch (kind) {

    case 'maybe' :
      return isNil(value) ? null : fromJSON(value, type.meta.type);

    case 'subtype' : // the kind of a refinement is 'subtype' (for legacy reasons)
      ret = fromJSON(value, type.meta.type);
      if (process.env.NODE_ENV !== 'production') {
        assert(type.meta.predicate(ret), function () {
          return 'Invalid argument value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (expected a valid ' + getTypeName(type) + ')';
        });
      }
      return ret;

    case 'struct' :
      if (process.env.NODE_ENV !== 'production') {
        assert(isObject(value), function () {
          return 'Invalid argument value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (expected an object for type ' + getTypeName(type) + ')';
        });
      }
      var props = type.meta.props;
      ret = {};
      for (k in props) {
        if (props.hasOwnProperty(k)) {
          ret[k] = fromJSON(value[k], props[k]);
        }
      }
      return new type(ret);

    case 'list' :
      if (process.env.NODE_ENV !== 'production') {
        assert(isArray(value), function () {
          return 'Invalid argument value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (expected an array for type ' + getTypeName(type) + ')';
        });
      }
      var elementType = type.meta.type;
      return value.map(function (element) {
        return fromJSON(element, elementType);
      });

    case 'union' :
      var actualType = type.dispatch(value);
      if (process.env.NODE_ENV !== 'production') {
        assert(isFunction(actualType), function () {
          return 'Invalid argument value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (no constructor returned by dispatch of union ' + getTypeName(type) + ')';
        });
      }
      return fromJSON(value, actualType);

    case 'tuple' :
      if (process.env.NODE_ENV !== 'production') {
        assert(isArray(value), function () {
          return 'Invalid argument value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (expected an array for type ' + getTypeName(type) + ')';
        });
      }
      var types = type.meta.types;
      if (process.env.NODE_ENV !== 'production') {
        assert(isArray(value) && value.length === types.length, function () {
          return 'Invalid value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (expected an array of length ' + types.length + ' for type ' + getTypeName(type) + ')';
        });
      }
      return value.map(function (element, i) {
        return fromJSON(element, types[i]);
      });

    case 'dict' :
      if (process.env.NODE_ENV !== 'production') {
        assert(isObject(value), function () {
          return 'Invalid argument value ' + assert.stringify(value) + ' supplied to fromJSON(value, type) (expected an object for type ' + getTypeName(type) + ')';
        });
      }
      var domain = type.meta.domain;
      var codomain = type.meta.codomain;
      ret = {};
      for (k in value) {
        if (value.hasOwnProperty(k)) {
          ret[domain(k)] = fromJSON(value[k], codomain);
        }
      }
      return ret;

    default : // enums, irreducible, intersection
      return type(value);
  }
}

module.exports = fromJSON;
