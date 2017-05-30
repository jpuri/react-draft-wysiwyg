Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getNode = getNode;
exports.instEqual = instEqual;
exports.instMatches = instMatches;
exports.instHasClassName = instHasClassName;
exports.instHasId = instHasId;
exports.instHasType = instHasType;
exports.instHasProperty = instHasProperty;
exports.renderedChildrenOfInst = renderedChildrenOfInst;
exports.childrenOfInstInternal = childrenOfInstInternal;
exports.internalInstanceOrComponent = internalInstanceOrComponent;
exports.childrenOfInst = childrenOfInst;
exports.treeFilter = treeFilter;
exports.pathToNode = pathToNode;
exports.parentsOfInst = parentsOfInst;
exports.instMatchesObjectProps = instMatchesObjectProps;
exports.buildInstPredicate = buildInstPredicate;

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _object = require('object.values');

var _object2 = _interopRequireDefault(_object);

var _isSubset = require('is-subset');

var _isSubset2 = _interopRequireDefault(_isSubset);

var _Utils = require('./Utils');

var _reactCompat = require('./react-compat');

var _version = require('./version');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getNode(inst) {
  if (!inst || inst._store || typeof inst === 'string') {
    return inst;
  }
  if (inst._currentElement) {
    return inst._currentElement;
  }
  if ((0, _Utils.internalInstance)(inst)) {
    return (0, _Utils.internalInstance)(inst)._currentElement;
  }
  if (inst._reactInternalInstance) {
    return inst._reactInternalInstance._currentElement;
  }
  if (inst._reactInternalComponent) {
    return inst._reactInternalComponent._currentElement;
  }
  return inst;
}

function instEqual(a, b, lenComp) {
  return (0, _Utils.nodeEqual)(getNode(a), getNode(b), lenComp);
}

function instMatches(a, b, lenComp) {
  return (0, _Utils.nodeMatches)(getNode(a), getNode(b), lenComp);
}

function instHasClassName(inst, className) {
  var node = (0, _reactCompat.findDOMNode)(inst);
  if (node === null) {
    // inst renders null
    return false;
  }
  if (node.classList) {
    return node.classList.contains(className);
  }
  var classes = node.className || '';
  if ((typeof classes === 'undefined' ? 'undefined' : _typeof(classes)) === 'object') {
    classes = classes.baseVal;
  }
  classes = classes.replace(/\s/g, ' ');
  return (' ' + String(classes) + ' ').indexOf(' ' + String(className) + ' ') > -1;
}

function hasClassName(inst, className) {
  if (!(0, _reactCompat.isDOMComponent)(inst)) {
    return false;
  }
  return instHasClassName(inst, className);
}

function instHasId(inst, id) {
  if (!(0, _reactCompat.isDOMComponent)(inst)) return false;
  var instId = (0, _reactCompat.findDOMNode)(inst).id || '';
  return instId === id;
}

function isFunctionalComponentWithType(inst, func) {
  return (0, _Utils.isFunctionalComponent)(inst) && getNode(inst).type === func;
}

function instHasType(inst, type) {
  switch (typeof type === 'undefined' ? 'undefined' : _typeof(type)) {
    case 'string':
      return (0, _Utils.nodeHasType)(getNode(inst), type);
    case 'function':
      return (0, _reactCompat.isCompositeComponentWithType)(inst, type) || isFunctionalComponentWithType(inst, type);
    default:
      return false;
  }
}

function instHasProperty(inst, propKey, stringifiedPropValue) {
  if (!(0, _reactCompat.isDOMComponent)(inst)) return false;

  var node = getNode(inst);

  return (0, _Utils.nodeHasProperty)(node, propKey, stringifiedPropValue);
}

// called with private inst
function renderedChildrenOfInst(inst) {
  return _version.REACT013 ? inst._renderedComponent._renderedChildren : inst._renderedChildren;
}

// called with a private instance
function childrenOfInstInternal(inst) {
  if (!inst) {
    return [];
  }
  if (!inst.getPublicInstance) {
    var internal = (0, _Utils.internalInstance)(inst);
    return childrenOfInstInternal(internal);
  }

  var publicInst = inst.getPublicInstance();
  var currentElement = inst._currentElement;
  if ((0, _reactCompat.isDOMComponent)(publicInst)) {
    var renderedChildren = renderedChildrenOfInst(inst);
    return (0, _object2['default'])(renderedChildren || {}).filter(function (node) {
      if (_version.REACT013 && !node.getPublicInstance) {
        return false;
      }
      if (typeof node._stringText !== 'undefined') {
        return false;
      }
      return true;
    }).map(function (node) {
      if (!_version.REACT013 && typeof node._currentElement.type === 'function') {
        return node._instance;
      }
      if (typeof node._stringText === 'string') {
        return node;
      }
      return node.getPublicInstance();
    });
  } else if (!_version.REACT013 && (0, _reactCompat.isElement)(currentElement) && typeof currentElement.type === 'function') {
    return childrenOfInstInternal(inst._renderedComponent);
  } else if (_version.REACT013 && (0, _reactCompat.isCompositeComponent)(publicInst)) {
    return childrenOfInstInternal(inst._renderedComponent);
  }
  return [];
}

function internalInstanceOrComponent(node) {
  if (_version.REACT013) {
    return node;
  } else if (node._reactInternalComponent) {
    return node._reactInternalComponent;
  } else if (node._reactInternalInstance) {
    return node._reactInternalInstance;
  }
  return node;
}

function childrenOfInst(node) {
  return childrenOfInstInternal(internalInstanceOrComponent(node));
}

// This function should be called with an "internal instance". Nevertheless, if it is
// called with a "public instance" instead, the function will call itself with the
// internal instance and return the proper result.
function findAllInRenderedTreeInternal(inst, test) {
  if (!inst) {
    return [];
  }

  if (!inst.getPublicInstance) {
    var internal = (0, _Utils.internalInstance)(inst);
    return findAllInRenderedTreeInternal(internal, test);
  }
  var publicInst = inst.getPublicInstance() || inst._instance;
  var ret = test(publicInst) ? [publicInst] : [];
  var currentElement = inst._currentElement;
  if ((0, _reactCompat.isDOMComponent)(publicInst)) {
    var renderedChildren = renderedChildrenOfInst(inst);
    (0, _object2['default'])(renderedChildren || {}).filter(function (node) {
      if (_version.REACT013 && !node.getPublicInstance) {
        return false;
      }
      return true;
    }).forEach(function (node) {
      ret = ret.concat(findAllInRenderedTreeInternal(node, test));
    });
  } else if (!_version.REACT013 && (0, _reactCompat.isElement)(currentElement) && typeof currentElement.type === 'function') {
    ret = ret.concat(findAllInRenderedTreeInternal(inst._renderedComponent, test));
  } else if (_version.REACT013 && (0, _reactCompat.isCompositeComponent)(publicInst)) {
    ret = ret.concat(findAllInRenderedTreeInternal(inst._renderedComponent, test));
  }
  return ret;
}

// This function could be called with a number of different things technically, so we need to
// pass the *right* thing to our internal helper.
function treeFilter(node, test) {
  return findAllInRenderedTreeInternal(internalInstanceOrComponent(node), test);
}

function pathFilter(path, fn) {
  return path.filter(function (tree) {
    return treeFilter(tree, fn).length !== 0;
  });
}

function pathToNode(node, root) {
  var queue = [root];
  var path = [];

  var hasNode = function hasNode(testNode) {
    return node === testNode;
  };

  while (queue.length) {
    var current = queue.pop();
    var children = childrenOfInst(current);

    if (current === node) return pathFilter(path, hasNode);

    path.push(current);

    if (children.length === 0) {
      // leaf node. if it isn't the node we are looking for, we pop.
      path.pop();
    }
    queue.push.apply(queue, _toConsumableArray(children));
  }

  return null;
}

function parentsOfInst(inst, root) {
  return pathToNode(inst, root).reverse();
}

function instMatchesObjectProps(inst, props) {
  if (!(0, _reactCompat.isDOMComponent)(inst)) return false;
  var node = getNode(inst);
  return (0, _isSubset2['default'])((0, _Utils.propsOfNode)(node), props);
}

function buildInstPredicate(selector) {
  switch (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) {
    case 'function':
      // selector is a component constructor
      return function (inst) {
        return instHasType(inst, selector);
      };

    case 'string':
      if (_Utils.isCompoundSelector.test(selector)) {
        return (0, _Utils.AND)((0, _Utils.splitSelector)(selector).map(buildInstPredicate));
      }

      switch ((0, _Utils.selectorType)(selector)) {
        case _Utils.SELECTOR.CLASS_TYPE:
          return function (inst) {
            return hasClassName(inst, selector.slice(1));
          };
        case _Utils.SELECTOR.ID_TYPE:
          return function (inst) {
            return instHasId(inst, selector.slice(1));
          };
        case _Utils.SELECTOR.PROP_TYPE:
          {
            var _ret = function () {
              var propKey = selector.split(/\[([a-zA-Z][a-zA-Z_\d\-:]*?)(=|])/)[1];
              var propValue = selector.split(/=(.*?)]/)[1];

              return {
                v: function () {
                  function v(node) {
                    return instHasProperty(node, propKey, propValue);
                  }

                  return v;
                }()
              };
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
          }
        default:
          // selector is a string. match to DOM tag or constructor displayName
          return function (inst) {
            return instHasType(inst, selector);
          };
      }

    case 'object':
      if (!Array.isArray(selector) && selector !== null && !(0, _isEmpty2['default'])(selector)) {
        return function (node) {
          return instMatchesObjectProps(node, selector);
        };
      }
      throw new TypeError('Enzyme::Selector does not support an array, null, or empty object as a selector');

    default:
      throw new TypeError('Enzyme::Selector expects a string, object, or Component Constructor');
  }
}