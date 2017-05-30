Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _split = require('lodash/split');

var _split2 = _interopRequireDefault(_split);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComplexSelector = function () {
  function ComplexSelector(buildPredicate, findWhereUnwrapped, childrenOfNode) {
    _classCallCheck(this, ComplexSelector);

    this.buildPredicate = buildPredicate;
    this.findWhereUnwrapped = findWhereUnwrapped;
    this.childrenOfNode = childrenOfNode;
  }

  _createClass(ComplexSelector, [{
    key: 'getSelectors',
    value: function () {
      function getSelectors(selector) {
        // eslint-disable-line class-methods-use-this
        var selectors = (0, _split2['default'])(selector, / (?=(?:(?:[^"]*"){2})*[^"]*$)/);
        return selectors.reduce(function (list, sel) {
          if (sel === '+' || sel === '~') {
            var temp = list.pop();
            return list.concat(sel, temp);
          }

          return list.concat(sel);
        }, []);
      }

      return getSelectors;
    }()
  }, {
    key: 'handleSelectors',
    value: function () {
      function handleSelectors(selectors, wrapper) {
        var _this = this;

        var recurseSelector = function () {
          function recurseSelector(offset, fn, pre) {
            var predicate = pre || _this.buildPredicate(selectors[offset]);
            var nextWrapper = _this.findWhereUnwrapped(wrapper, predicate, fn);
            var nextSelectors = selectors.slice(offset + 1);
            return _this.handleSelectors(nextSelectors, nextWrapper);
          }

          return recurseSelector;
        }();

        var buildSiblingPredicate = function () {
          function buildSiblingPredicate(first, second) {
            var firstPredicate = _this.buildPredicate(first);
            var secondPredicate = _this.buildPredicate(second);

            return function (child) {
              if (firstPredicate(child)) {
                return function (sibling) {
                  return secondPredicate(sibling);
                };
              }

              return false;
            };
          }

          return buildSiblingPredicate;
        }();

        var predicate = void 0;
        var selectSiblings = void 0;

        if (selectors.length) {
          switch (selectors[0]) {
            case '>':
              return recurseSelector(1, this.treeFilterDirect());
            case '+':
              predicate = buildSiblingPredicate(selectors[1], selectors[2]);
              selectSiblings = function () {
                function selectSiblings(children, pre, results, idx) {
                  var adjacent = children[idx + 1];
                  if (pre(adjacent)) {
                    results.push(adjacent);
                  }
                }

                return selectSiblings;
              }();

              return recurseSelector(2, this.treeFindSiblings(selectSiblings), predicate);
            case '~':
              predicate = buildSiblingPredicate(selectors[1], selectors[2]);
              selectSiblings = function () {
                function selectSiblings(children, pre, results, idx) {
                  return children.slice(idx + 1).map(function (child) {
                    return pre(child) ? results.push(child) : null;
                  });
                }

                return selectSiblings;
              }();

              return recurseSelector(2, this.treeFindSiblings(selectSiblings), predicate);
            default:
              return recurseSelector(0);
          }
        }

        return wrapper;
      }

      return handleSelectors;
    }()
  }, {
    key: 'find',
    value: function () {
      function find(selector, wrapper) {
        if (typeof selector === 'string') {
          var selectors = this.getSelectors(selector);

          return this.handleSelectors(selectors, wrapper);
        }

        var predicate = this.buildPredicate(selector);
        return this.findWhereUnwrapped(wrapper, predicate);
      }

      return find;
    }()
  }, {
    key: 'treeFilterDirect',
    value: function () {
      function treeFilterDirect() {
        var _this2 = this;

        return function (tree, fn) {
          return _this2.childrenOfNode(tree).filter(function (child) {
            return fn(child);
          });
        };
      }

      return treeFilterDirect;
    }()
  }, {
    key: 'treeFindSiblings',
    value: function () {
      function treeFindSiblings(selectSiblings) {
        var _this3 = this;

        return function (tree, fn) {
          var results = [];
          var list = [_this3.childrenOfNode(tree)];

          var traverseChildren = function () {
            function traverseChildren(children) {
              return children.forEach(function (child, i) {
                var secondPredicate = fn(child);

                list.push(_this3.childrenOfNode(child));

                if (secondPredicate) {
                  selectSiblings(children, secondPredicate, results, i);
                }
              });
            }

            return traverseChildren;
          }();

          while (list.length) {
            traverseChildren(list.shift());
          }

          return results;
        };
      }

      return treeFindSiblings;
    }()
  }]);

  return ComplexSelector;
}();

exports['default'] = ComplexSelector;