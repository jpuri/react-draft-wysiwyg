Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports['default'] = render;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _reactCompat = require('./react-compat');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Renders a react component into static HTML and provides a cheerio wrapper around it. This is
 * somewhat asymmetric with `mount` and `shallow`, which don't use any external libraries, but
 * Cheerio's API is pretty close to what we actually want and has a significant amount of utility
 * that would be recreating the wheel if we didn't use it.
 *
 * I think there are a lot of good use cases to use `render` instead of `shallow` or `mount`, and
 * thus I'd like to keep this API in here even though it's not really "ours".
 *
 * @param node
 * @param options
 * @returns {Cheerio}
 */

function createContextWrapperForNode(node, context, childContextTypes) {
  var ContextWrapper = function (_React$Component) {
    _inherits(ContextWrapper, _React$Component);

    function ContextWrapper() {
      _classCallCheck(this, ContextWrapper);

      return _possibleConstructorReturn(this, (ContextWrapper.__proto__ || Object.getPrototypeOf(ContextWrapper)).apply(this, arguments));
    }

    _createClass(ContextWrapper, [{
      key: 'getChildContext',
      value: function () {
        function getChildContext() {
          return context;
        }

        return getChildContext;
      }()
    }, {
      key: 'render',
      value: function () {
        function render() {
          return node;
        }

        return render;
      }()
    }]);

    return ContextWrapper;
  }(_react2['default'].Component);

  ContextWrapper.childContextTypes = childContextTypes;
  return ContextWrapper;
}

function render(node) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (options.context && (node.type.contextTypes || options.childContextTypes)) {
    var childContextTypes = (0, _object2['default'])({}, node.type.contextTypes || {}, options.childContextTypes);
    var ContextWrapper = createContextWrapperForNode(node, options.context, childContextTypes);
    var _html = (0, _reactCompat.renderToStaticMarkup)(_react2['default'].createElement(ContextWrapper, null));
    return _cheerio2['default'].load(_html).root();
  }
  var html = (0, _reactCompat.renderToStaticMarkup)(node);
  return _cheerio2['default'].load(html).root();
}