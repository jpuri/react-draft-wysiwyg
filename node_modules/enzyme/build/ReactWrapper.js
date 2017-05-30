Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _flatten = require('lodash/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _compact = require('lodash/compact');

var _compact2 = _interopRequireDefault(_compact);

var _ComplexSelector = require('./ComplexSelector');

var _ComplexSelector2 = _interopRequireDefault(_ComplexSelector);

var _ReactWrapperComponent = require('./ReactWrapperComponent');

var _ReactWrapperComponent2 = _interopRequireDefault(_ReactWrapperComponent);

var _MountedTraversal = require('./MountedTraversal');

var _reactCompat = require('./react-compat');

var _Utils = require('./Utils');

var _Debug = require('./Debug');

var _version = require('./version');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Finds all nodes in the current wrapper nodes' render trees that match the provided predicate
 * function.
 *
 * @param {ReactWrapper} wrapper
 * @param {Function} predicate
 * @param {Function} filter
 * @returns {ReactWrapper}
 */
function findWhereUnwrapped(wrapper, predicate) {
  var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _MountedTraversal.treeFilter;

  return wrapper.flatMap(function (n) {
    return filter(n.getNode(), predicate);
  });
}

/**
 * Returns a new wrapper instance with only the nodes of the current wrapper instance that match
 * the provided predicate function.
 *
 * @param {ReactWrapper} wrapper
 * @param {Function} predicate
 * @returns {ReactWrapper}
 */
function filterWhereUnwrapped(wrapper, predicate) {
  return wrapper.wrap((0, _compact2['default'])(wrapper.getNodes().filter(predicate)));
}

/**
 * @class ReactWrapper
 */

var ReactWrapper = function () {
  function ReactWrapper(nodes, root) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, ReactWrapper);

    if (!global.window && !global.document) {
      throw new Error('It looks like you called `mount()` without a global document being loaded.');
    }

    if (!root) {
      var ReactWrapperComponent = (0, _ReactWrapperComponent2['default'])(nodes, options);
      this.component = (0, _reactCompat.renderWithOptions)(_react2['default'].createElement(ReactWrapperComponent, {
        Component: nodes.type,
        props: nodes.props,
        context: options.context
      }), options);
      this.root = this;
      this.node = this.component.getWrappedComponent();
      this.nodes = [this.node];
      this.length = 1;
    } else {
      this.component = null;
      this.root = root;
      if (!nodes) {
        this.nodes = [];
      } else if (!Array.isArray(nodes)) {
        this.node = nodes;
        this.nodes = [nodes];
      } else {
        this.node = nodes[0];
        this.nodes = nodes;
      }
      this.length = this.nodes.length;
    }
    this.options = options;
    this.complexSelector = new _ComplexSelector2['default'](_MountedTraversal.buildInstPredicate, findWhereUnwrapped, _MountedTraversal.childrenOfInst);
  }

  /**
   * Returns the wrapped component.
   *
   * @return {ReactComponent}
   */


  _createClass(ReactWrapper, [{
    key: 'getNode',
    value: function () {
      function getNode() {
        if (this.length !== 1) {
          throw new Error('ReactWrapper::getNode() can only be called when wrapping one node');
        }
        return this.nodes[0];
      }

      return getNode;
    }()

    /**
     * Returns the the wrapped components.
     *
     * @return {Array<ReactComponent>}
     */

  }, {
    key: 'getNodes',
    value: function () {
      function getNodes() {
        return this.nodes;
      }

      return getNodes;
    }()

    /**
     * Returns the outer most DOMComponent of the current wrapper.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {DOMComponent}
     */

  }, {
    key: 'getDOMNode',
    value: function () {
      function getDOMNode() {
        return this.single('getDOMNode', _reactCompat.findDOMNode);
      }

      return getDOMNode;
    }()

    /**
     * If the root component contained a ref, you can access it here
     * and get a wrapper around it.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @param {String} refname
     * @returns {ReactWrapper}
     */

  }, {
    key: 'ref',
    value: function () {
      function ref(refname) {
        if (this.root !== this) {
          throw new Error('ReactWrapper::ref(refname) can only be called on the root');
        }
        return this.wrap(this.instance().refs[refname]);
      }

      return ref;
    }()

    /**
     * Gets the instance of the component being rendered as the root node passed into `mount()`.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * Example:
     * ```
     * const wrapper = mount(<MyComponent />);
     * const inst = wrapper.instance();
     * expect(inst).to.be.instanceOf(MyComponent);
     * ```
     * @returns {ReactComponent}
     */

  }, {
    key: 'instance',
    value: function () {
      function instance() {
        if (this.root !== this) {
          throw new Error('ReactWrapper::instance() can only be called on the root');
        }
        return this.component.getInstance();
      }

      return instance;
    }()

    /**
     * Forces a re-render. Useful to run before checking the render output if something external
     * may be updating the state of the component somewhere.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @returns {ReactWrapper}
     */

  }, {
    key: 'update',
    value: function () {
      function update() {
        var _this = this;

        if (this.root !== this) {
          // TODO(lmr): this requirement may not be necessary for the ReactWrapper
          throw new Error('ReactWrapper::update() can only be called on the root');
        }
        this.single('update', function () {
          _this.component.forceUpdate();
        });
        return this;
      }

      return update;
    }()

    /**
     * A method that unmounts the component. This can be used to simulate a component going through
     * and unmount/mount lifecycle.
     *
     * @returns {ReactWrapper}
     */

  }, {
    key: 'unmount',
    value: function () {
      function unmount() {
        var _this2 = this;

        if (this.root !== this) {
          throw new Error('ReactWrapper::unmount() can only be called on the root');
        }
        this.single('unmount', function () {
          _this2.component.setState({ mount: false });
        });
        return this;
      }

      return unmount;
    }()

    /**
     * A method that re-mounts the component. This can be used to simulate a component going through
     * an unmount/mount lifecycle.
     *
     * @returns {ReactWrapper}
     */

  }, {
    key: 'mount',
    value: function () {
      function mount() {
        var _this3 = this;

        if (this.root !== this) {
          throw new Error('ReactWrapper::mount() can only be called on the root');
        }
        this.single('mount', function () {
          _this3.component.setState({ mount: true });
        });
        return this;
      }

      return mount;
    }()

    /**
     * A method that sets the props of the root component, and re-renders. Useful for when you are
     * wanting to test how the component behaves over time with changing props. Calling this, for
     * instance, will call the `componentWillReceiveProps` lifecycle method.
     *
     * Similar to `setState`, this method accepts a props object and will merge it in with the already
     * existing props.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @param {Object} props object
     * @param {Function} cb - callback function
     * @returns {ReactWrapper}
     */

  }, {
    key: 'setProps',
    value: function () {
      function setProps(props) {
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if (this.root !== this) {
          throw new Error('ReactWrapper::setProps() can only be called on the root');
        }
        this.component.setChildProps(props, callback);
        return this;
      }

      return setProps;
    }()

    /**
     * A method to invoke `setState` on the root component instance similar to how you might in the
     * definition of the component, and re-renders.  This method is useful for testing your component
     * in hard to achieve states, however should be used sparingly. If possible, you should utilize
     * your component's external API in order to get it into whatever state you want to test, in order
     * to be as accurate of a test as possible. This is not always practical, however.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @param {Object} state to merge
     * @param {Function} cb - callback function
     * @returns {ReactWrapper}
     */

  }, {
    key: 'setState',
    value: function () {
      function setState(state) {
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if (this.root !== this) {
          throw new Error('ReactWrapper::setState() can only be called on the root');
        }
        this.instance().setState(state, callback);
        return this;
      }

      return setState;
    }()

    /**
     * A method that sets the context of the root component, and re-renders. Useful for when you are
     * wanting to test how the component behaves over time with changing contexts.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @param {Object} context object
     * @returns {ReactWrapper}
     */

  }, {
    key: 'setContext',
    value: function () {
      function setContext(context) {
        if (this.root !== this) {
          throw new Error('ReactWrapper::setContext() can only be called on the root');
        }
        if (!this.options.context) {
          throw new Error('ShallowWrapper::setContext() can only be called on a wrapper that was originally passed ' + 'a context option');
        }
        this.component.setChildContext(context);
        return this;
      }

      return setContext;
    }()

    /**
     * Whether or not a given react element matches the current render tree.
     * It will determine if the wrapper root node "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrapper root node and equals to each other.
     *
     * Example:
     * ```
     * // MyComponent outputs <div class="foo">Hello</div>
     * const wrapper = mount(<MyComponent />);
     * expect(wrapper.matchesElement(<div>Hello</div>)).to.equal(true);
     * ```
     *
     * @param {ReactElement} node
     * @returns {Boolean}
     */

  }, {
    key: 'matchesElement',
    value: function () {
      function matchesElement(node) {
        var _this4 = this;

        return this.single('matchesElement', function () {
          return (0, _MountedTraversal.instMatches)(node, _this4.getNode(), function (a, b) {
            return a <= b;
          });
        });
      }

      return matchesElement;
    }()

    /**
     * Whether or not a given react element exists in the mount render tree.
     *
     * Example:
     * ```
     * const wrapper = mount(<MyComponent />);
     * expect(wrapper.contains(<div className="foo bar" />)).to.equal(true);
     * ```
     *
     * @param {ReactElement|Array<ReactElement>} nodeOrNodes
     * @returns {Boolean}
     */

  }, {
    key: 'contains',
    value: function () {
      function contains(nodeOrNodes) {
        var predicate = Array.isArray(nodeOrNodes) ? function (other) {
          return (0, _Utils.containsChildrenSubArray)(_MountedTraversal.instEqual, other, nodeOrNodes);
        } : function (other) {
          return (0, _MountedTraversal.instEqual)(nodeOrNodes, other);
        };
        return findWhereUnwrapped(this, predicate).length > 0;
      }

      return contains;
    }()

    /**
     * Whether or not a given react element exists in the current render tree.
     * It will determine if one of the wrappers element "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrappers element and equals to each other.
     *
     * Example:
     * ```
     * // MyComponent outputs <div><div class="foo">Hello</div></div>
     * const wrapper = mount(<MyComponent />);
     * expect(wrapper.containsMatchingElement(<div>Hello</div>)).to.equal(true);
     * ```
     *
     * @param {ReactElement} node
     * @returns {Boolean}
     */

  }, {
    key: 'containsMatchingElement',
    value: function () {
      function containsMatchingElement(node) {
        var predicate = function () {
          function predicate(other) {
            return (0, _MountedTraversal.instMatches)(node, other, function (a, b) {
              return a <= b;
            });
          }

          return predicate;
        }();
        return findWhereUnwrapped(this, predicate).length > 0;
      }

      return containsMatchingElement;
    }()

    /**
     * Whether or not all the given react elements exists in the current render tree.
     * It will determine if one of the wrappers element "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrappers element and equals to each other.
     *
     * Example:
     * ```
     * const wrapper = mount(<MyComponent />);
     * expect(wrapper.containsAllMatchingElements([
     *   <div>Hello</div>,
     *   <div>Goodbye</div>,
     * ])).to.equal(true);
     * ```
     *
     * @param {Array<ReactElement>} nodes
     * @returns {Boolean}
     */

  }, {
    key: 'containsAllMatchingElements',
    value: function () {
      function containsAllMatchingElements(nodes) {
        var invertedEquals = function () {
          function invertedEquals(n1, n2) {
            return (0, _MountedTraversal.instMatches)(n2, n1, function (a, b) {
              return a <= b;
            });
          }

          return invertedEquals;
        }();
        var predicate = function () {
          function predicate(other) {
            return (0, _Utils.containsChildrenSubArray)(invertedEquals, other, nodes);
          }

          return predicate;
        }();
        return findWhereUnwrapped(this, predicate).length > 0;
      }

      return containsAllMatchingElements;
    }()

    /**
     * Whether or not one of the given react elements exists in the current render tree.
     * It will determine if one of the wrappers element "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrappers element and equals to each other.
     *
     * Example:
     * ```
     * const wrapper = mount(<MyComponent />);
     * expect(wrapper.containsAnyMatchingElements([
     *   <div>Hello</div>,
     *   <div>Goodbye</div>,
     * ])).to.equal(true);
     * ```
     *
     * @param {Array<ReactElement>} nodes
     * @returns {Boolean}
     */

  }, {
    key: 'containsAnyMatchingElements',
    value: function () {
      function containsAnyMatchingElements(nodes) {
        var _this5 = this;

        return Array.isArray(nodes) && nodes.some(function (node) {
          return _this5.containsMatchingElement(node);
        });
      }

      return containsAnyMatchingElements;
    }()

    /**
     * Finds every node in the render tree of the current wrapper that matches the provided selector.
     *
     * @param {String|Function} selector
     * @returns {ReactWrapper}
     */

  }, {
    key: 'find',
    value: function () {
      function find(selector) {
        return this.complexSelector.find(selector, this);
      }

      return find;
    }()

    /**
     * Returns whether or not current node matches a provided selector.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {String|Function} selector
     * @returns {boolean}
     */

  }, {
    key: 'is',
    value: function () {
      function is(selector) {
        var predicate = (0, _MountedTraversal.buildInstPredicate)(selector);
        return this.single('is', function (n) {
          return predicate(n);
        });
      }

      return is;
    }()

    /**
     * Returns true if the component rendered nothing, i.e., null or false.
     *
     * @returns {boolean}
     */

  }, {
    key: 'isEmptyRender',
    value: function () {
      function isEmptyRender() {
        return this.single('isEmptyRender', function (n) {
          // Stateful components and stateless function components have different internal structures,
          // so we need to find the correct internal instance, and validate the rendered node type
          // equals 2, which is the `ReactNodeTypes.EMPTY` value.
          if (_version.REACT15) {
            return (0, _MountedTraversal.internalInstanceOrComponent)(n)._renderedNodeType === 2;
          }

          return (0, _reactCompat.findDOMNode)(n) === null;
        });
      }

      return isEmptyRender;
    }()

    /**
     * Returns a new wrapper instance with only the nodes of the current wrapper instance that match
     * the provided predicate function.
     *
     * @param {Function} predicate
     * @returns {ReactWrapper}
     */

  }, {
    key: 'filterWhere',
    value: function () {
      function filterWhere(predicate) {
        var _this6 = this;

        return filterWhereUnwrapped(this, function (n) {
          return predicate(_this6.wrap(n));
        });
      }

      return filterWhere;
    }()

    /**
     * Returns a new wrapper instance with only the nodes of the current wrapper instance that match
     * the provided selector.
     *
     * @param {String|Function} selector
     * @returns {ReactWrapper}
     */

  }, {
    key: 'filter',
    value: function () {
      function filter(selector) {
        var predicate = (0, _MountedTraversal.buildInstPredicate)(selector);
        return filterWhereUnwrapped(this, predicate);
      }

      return filter;
    }()

    /**
     * Returns a new wrapper instance with only the nodes of the current wrapper that did not match
     * the provided selector. Essentially the inverse of `filter`.
     *
     * @param {String|Function} selector
     * @returns {ReactWrapper}
     */

  }, {
    key: 'not',
    value: function () {
      function not(selector) {
        var predicate = (0, _MountedTraversal.buildInstPredicate)(selector);
        return filterWhereUnwrapped(this, function (n) {
          return !predicate(n);
        });
      }

      return not;
    }()

    /**
     * Returns a string of the rendered text of the current render tree.  This function should be
     * looked at with skepticism if being used to test what the actual HTML output of the component
     * will be. If that is what you would like to test, use enzyme's `render` function instead.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {String}
     */

  }, {
    key: 'text',
    value: function () {
      function text() {
        return this.single('text', function (n) {
          return (0, _reactCompat.findDOMNode)(n).textContent;
        });
      }

      return text;
    }()

    /**
     * Returns the HTML of the node.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {String}
     */

  }, {
    key: 'html',
    value: function () {
      function html() {
        return this.single('html', function (n) {
          var node = (0, _reactCompat.findDOMNode)(n);
          return node === null ? null : node.outerHTML.replace(/\sdata-(reactid|reactroot)+="([^"]*)+"/g, '');
        });
      }

      return html;
    }()

    /**
     * Returns the current node rendered to HTML and wrapped in a CheerioWrapper.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {CheerioWrapper}
     */

  }, {
    key: 'render',
    value: function () {
      function render() {
        var html = this.html();
        return html === null ? (0, _cheerio2['default'])() : _cheerio2['default'].load(html).root();
      }

      return render;
    }()

    /**
     * Used to simulate events. Pass an eventname and (optionally) event arguments. This method of
     * testing events should be met with some skepticism.
     *
     * @param {String} event
     * @param {Object} mock (optional)
     * @returns {ReactWrapper}
     */

  }, {
    key: 'simulate',
    value: function () {
      function simulate(event) {
        var mock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        this.single('simulate', function (n) {
          var mappedEvent = (0, _Utils.mapNativeEventNames)(event);
          var eventFn = _reactCompat.Simulate[mappedEvent];
          if (!eventFn) {
            throw new TypeError('ReactWrapper::simulate() event \'' + String(event) + '\' does not exist');
          }

          eventFn((0, _reactCompat.findDOMNode)(n), mock);
        });
        return this;
      }

      return simulate;
    }()

    /**
     * Returns the props hash for the root node of the wrapper.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {Object}
     */

  }, {
    key: 'props',
    value: function () {
      function props() {
        return this.single('props', _Utils.propsOfNode);
      }

      return props;
    }()

    /**
     * Returns the state hash for the root node of the wrapper. Optionally pass in a prop name and it
     * will return just that value.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {String} name (optional)
     * @returns {*}
     */

  }, {
    key: 'state',
    value: function () {
      function state(name) {
        var _this7 = this;

        if (this.root !== this) {
          throw new Error('ReactWrapper::state() can only be called on the root');
        }
        var _state = this.single('state', function () {
          return _this7.instance().state;
        });
        if (name !== undefined) {
          return _state[name];
        }
        return _state;
      }

      return state;
    }()

    /**
     * Returns the context hash for the root node of the wrapper.
     * Optionally pass in a prop name and it will return just that value.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {String} name (optional)
     * @returns {*}
     */

  }, {
    key: 'context',
    value: function () {
      function context(name) {
        var _this8 = this;

        if (this.root !== this) {
          throw new Error('ReactWrapper::context() can only be called on the root');
        }
        var _context = this.single('context', function () {
          return _this8.instance().context;
        });
        if (name !== undefined) {
          return _context[name];
        }
        return _context;
      }

      return context;
    }()

    /**
     * Returns a new wrapper with all of the children of the current wrapper.
     *
     * @param {String|Function} [selector]
     * @returns {ReactWrapper}
     */

  }, {
    key: 'children',
    value: function () {
      function children(selector) {
        var allChildren = this.flatMap(function (n) {
          return (0, _MountedTraversal.childrenOfInst)(n.getNode());
        });
        return selector ? allChildren.filter(selector) : allChildren;
      }

      return children;
    }()

    /**
     * Returns a new wrapper with a specific child
     *
     * @param {Number} [index]
     * @returns {ReactWrapper}
     */

  }, {
    key: 'childAt',
    value: function () {
      function childAt(index) {
        var _this9 = this;

        return this.single('childAt', function () {
          return _this9.children().at(index);
        });
      }

      return childAt;
    }()

    /**
     * Returns a wrapper around all of the parents/ancestors of the wrapper. Does not include the node
     * in the current wrapper.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {String|Function} [selector]
     * @returns {ReactWrapper}
     */

  }, {
    key: 'parents',
    value: function () {
      function parents(selector) {
        var _this10 = this;

        var allParents = this.wrap(this.single('parents', function (n) {
          return (0, _MountedTraversal.parentsOfInst)(n, _this10.root.getNode());
        }));
        return selector ? allParents.filter(selector) : allParents;
      }

      return parents;
    }()

    /**
     * Returns a wrapper around the immediate parent of the current node.
     *
     * @returns {ReactWrapper}
     */

  }, {
    key: 'parent',
    value: function () {
      function parent() {
        return this.flatMap(function (n) {
          return [n.parents().get(0)];
        });
      }

      return parent;
    }()

    /**
     *
     * @param {String|Function} selector
     * @returns {ReactWrapper}
     */

  }, {
    key: 'closest',
    value: function () {
      function closest(selector) {
        return this.is(selector) ? this : this.parents().filter(selector).first();
      }

      return closest;
    }()

    /**
     * Returns the value of  prop with the given name of the root node.
     *
     * @param {String} propName
     * @returns {*}
     */

  }, {
    key: 'prop',
    value: function () {
      function prop(propName) {
        return this.props()[propName];
      }

      return prop;
    }()

    /**
     * Returns the key assigned to the current node.
     *
     * @returns {String}
     */

  }, {
    key: 'key',
    value: function () {
      function key() {
        return this.single('key', function (n) {
          return (0, _MountedTraversal.getNode)(n).key;
        });
      }

      return key;
    }()

    /**
     * Returns the type of the root node of this wrapper. If it's a composite component, this will be
     * the component constructor. If it's native DOM node, it will be a string.
     *
     * @returns {String|Function}
     */

  }, {
    key: 'type',
    value: function () {
      function type() {
        return this.single('type', function (n) {
          return (0, _Utils.typeOfNode)((0, _MountedTraversal.getNode)(n));
        });
      }

      return type;
    }()

    /**
     * Returns the name of the root node of this wrapper.
     *
     * In order of precedence => type.displayName -> type.name -> type.
     *
     * @returns {String}
     */

  }, {
    key: 'name',
    value: function () {
      function name() {
        return this.single('name', function (n) {
          return (0, _Utils.displayNameOfNode)((0, _MountedTraversal.getNode)(n));
        });
      }

      return name;
    }()

    /**
     * Returns whether or not the current root node has the given class name or not.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {String} className
     * @returns {Boolean}
     */

  }, {
    key: 'hasClass',
    value: function () {
      function hasClass(className) {
        if (className && className.indexOf('.') !== -1) {
          // eslint-disable-next-line no-console
          console.warn('It looks like you\'re calling `ReactWrapper::hasClass()` with a CSS selector. ' + 'hasClass() expects a class name, not a CSS selector.');
        }
        return this.single('hasClass', function (n) {
          return (0, _MountedTraversal.instHasClassName)(n, className);
        });
      }

      return hasClass;
    }()

    /**
     * Iterates through each node of the current wrapper and executes the provided function with a
     * wrapper around the corresponding node passed in as the first argument.
     *
     * @param {Function} fn
     * @returns {ReactWrapper}
     */

  }, {
    key: 'forEach',
    value: function () {
      function forEach(fn) {
        var _this11 = this;

        this.getNodes().forEach(function (n, i) {
          return fn.call(_this11, _this11.wrap(n), i);
        });
        return this;
      }

      return forEach;
    }()

    /**
     * Maps the current array of nodes to another array. Each node is passed in as a `ReactWrapper`
     * to the map function.
     *
     * @param {Function} fn
     * @returns {Array}
     */

  }, {
    key: 'map',
    value: function () {
      function map(fn) {
        var _this12 = this;

        return this.getNodes().map(function (n, i) {
          return fn.call(_this12, _this12.wrap(n), i);
        });
      }

      return map;
    }()

    /**
     * Reduces the current array of nodes to another array.
     * Each node is passed in as a `ShallowWrapper` to the reducer function.
     *
     * @param {Function} fn - the reducer function
     * @param {*} initialValue - the initial value
     * @returns {*}
     */

  }, {
    key: 'reduce',
    value: function () {
      function reduce(fn, initialValue) {
        var _this13 = this;

        return this.getNodes().reduce(function (accum, n, i) {
          return fn.call(_this13, accum, _this13.wrap(n), i);
        }, initialValue);
      }

      return reduce;
    }()

    /**
     * Reduces the current array of nodes to another array, from right to left. Each node is passed
     * in as a `ShallowWrapper` to the reducer function.
     *
     * @param {Function} fn - the reducer function
     * @param {*} initialValue - the initial value
     * @returns {*}
     */

  }, {
    key: 'reduceRight',
    value: function () {
      function reduceRight(fn, initialValue) {
        var _this14 = this;

        return this.getNodes().reduceRight(function (accum, n, i) {
          return fn.call(_this14, accum, _this14.wrap(n), i);
        }, initialValue);
      }

      return reduceRight;
    }()

    /**
     * Returns a new wrapper with a subset of the nodes of the original wrapper, according to the
     * rules of `Array#slice`.
     *
     * @param {Number} begin
     * @param {Number} end
     * @returns {ShallowWrapper}
     */

  }, {
    key: 'slice',
    value: function () {
      function slice(begin, end) {
        return this.wrap(this.getNodes().slice(begin, end));
      }

      return slice;
    }()

    /**
     * Returns whether or not any of the nodes in the wrapper match the provided selector.
     *
     * @param {Function|String} selector
     * @returns {Boolean}
     */

  }, {
    key: 'some',
    value: function () {
      function some(selector) {
        if (this.root === this) {
          throw new Error('ReactWrapper::some() can not be called on the root');
        }
        var predicate = (0, _MountedTraversal.buildInstPredicate)(selector);
        return this.getNodes().some(predicate);
      }

      return some;
    }()

    /**
     * Returns whether or not any of the nodes in the wrapper pass the provided predicate function.
     *
     * @param {Function} predicate
     * @returns {Boolean}
     */

  }, {
    key: 'someWhere',
    value: function () {
      function someWhere(predicate) {
        var _this15 = this;

        return this.getNodes().some(function (n, i) {
          return predicate.call(_this15, _this15.wrap(n), i);
        });
      }

      return someWhere;
    }()

    /**
     * Returns whether or not all of the nodes in the wrapper match the provided selector.
     *
     * @param {Function|String} selector
     * @returns {Boolean}
     */

  }, {
    key: 'every',
    value: function () {
      function every(selector) {
        var predicate = (0, _MountedTraversal.buildInstPredicate)(selector);
        return this.getNodes().every(predicate);
      }

      return every;
    }()

    /**
     * Returns whether or not any of the nodes in the wrapper pass the provided predicate function.
     *
     * @param {Function} predicate
     * @returns {Boolean}
     */

  }, {
    key: 'everyWhere',
    value: function () {
      function everyWhere(predicate) {
        var _this16 = this;

        return this.getNodes().every(function (n, i) {
          return predicate.call(_this16, _this16.wrap(n), i);
        });
      }

      return everyWhere;
    }()

    /**
     * Utility method used to create new wrappers with a mapping function that returns an array of
     * nodes in response to a single node wrapper. The returned wrapper is a single wrapper around
     * all of the mapped nodes flattened (and de-duplicated).
     *
     * @param {Function} fn
     * @returns {ReactWrapper}
     */

  }, {
    key: 'flatMap',
    value: function () {
      function flatMap(fn) {
        var _this17 = this;

        var nodes = this.getNodes().map(function (n, i) {
          return fn.call(_this17, _this17.wrap(n), i);
        });
        var flattened = (0, _flatten2['default'])(nodes, true);
        var uniques = (0, _uniq2['default'])(flattened);
        var compacted = (0, _compact2['default'])(uniques);
        return this.wrap(compacted);
      }

      return flatMap;
    }()

    /**
     * Finds all nodes in the current wrapper nodes' render trees that match the provided predicate
     * function.
     *
     * @param {Function} predicate
     * @returns {ReactWrapper}
     */

  }, {
    key: 'findWhere',
    value: function () {
      function findWhere(predicate) {
        var _this18 = this;

        return findWhereUnwrapped(this, function (n) {
          return predicate(_this18.wrap(n));
        });
      }

      return findWhere;
    }()

    /**
     * Returns the node at a given index of the current wrapper.
     *
     * @param {Number} index
     * @returns {ReactElement}
     */

  }, {
    key: 'get',
    value: function () {
      function get(index) {
        return this.getNodes()[index];
      }

      return get;
    }()

    /**
     * Returns a wrapper around the node at a given index of the current wrapper.
     *
     * @param {Number} index
     * @returns {ReactWrapper}
     */

  }, {
    key: 'at',
    value: function () {
      function at(index) {
        return this.wrap(this.getNodes()[index]);
      }

      return at;
    }()

    /**
     * Returns a wrapper around the first node of the current wrapper.
     *
     * @returns {ReactWrapper}
     */

  }, {
    key: 'first',
    value: function () {
      function first() {
        return this.at(0);
      }

      return first;
    }()

    /**
     * Returns a wrapper around the last node of the current wrapper.
     *
     * @returns {ReactWrapper}
     */

  }, {
    key: 'last',
    value: function () {
      function last() {
        return this.at(this.length - 1);
      }

      return last;
    }()

    /**
     * Delegates to exists()
     *
     * @returns {boolean}
     */

  }, {
    key: 'isEmpty',
    value: function () {
      function isEmpty() {
        // eslint-disable-next-line no-console
        console.warn('Enzyme::Deprecated method isEmpty() called, use exists() instead.');
        return !this.exists();
      }

      return isEmpty;
    }()

    /**
     * Returns true if the current wrapper has nodes. False otherwise.
     *
     * @returns {boolean}
     */

  }, {
    key: 'exists',
    value: function () {
      function exists() {
        return this.length > 0;
      }

      return exists;
    }()

    /**
     * Utility method that throws an error if the current instance has a length other than one.
     * This is primarily used to enforce that certain methods are only run on a wrapper when it is
     * wrapping a single node.
     *
     * @param {Function} fn
     * @returns {*}
     */

  }, {
    key: 'single',
    value: function () {
      function single(name, fn) {
        var fnName = typeof name === 'string' ? name : 'unknown';
        var callback = typeof fn === 'function' ? fn : name;
        if (this.length !== 1) {
          throw new Error('Method \u201C' + fnName + '\u201D is only meant to be run on a single node. ' + String(this.length) + ' found instead.');
        }
        return callback.call(this, this.getNode());
      }

      return single;
    }()

    /**
     * Helpful utility method to create a new wrapper with the same root as the current wrapper, with
     * any nodes passed in as the first parameter automatically wrapped.
     *
     * @param {ReactWrapper|ReactElement|Array<ReactElement>} node
     * @returns {ReactWrapper}
     */

  }, {
    key: 'wrap',
    value: function () {
      function wrap(node) {
        if (node instanceof ReactWrapper) {
          return node;
        }
        return new ReactWrapper(node, this.root);
      }

      return wrap;
    }()

    /**
     * Returns an HTML-like string of the shallow render for debugging purposes.
     *
     * @returns {String}
     */

  }, {
    key: 'debug',
    value: function () {
      function debug() {
        return (0, _Debug.debugInsts)(this.getNodes());
      }

      return debug;
    }()

    /**
     * Invokes intercepter and returns itself. intercepter is called with itself.
     * This is helpful when debugging nodes in method chains.
     * @param fn
     * @returns {ReactWrapper}
     */

  }, {
    key: 'tap',
    value: function () {
      function tap(intercepter) {
        intercepter(this);
        return this;
      }

      return tap;
    }()

    /**
     * Detaches the react tree from the DOM. Runs `ReactDOM.unmountComponentAtNode()` under the hood.
     *
     * This method will most commonly be used as a "cleanup" method if you decide to use the
     * `attachTo` option in `mount(node, options)`.
     *
     * The method is intentionally not "fluent" (in that it doesn't return `this`) because you should
     * not be doing anything with this wrapper after this method is called.
     */

  }, {
    key: 'detach',
    value: function () {
      function detach() {
        if (this.root !== this) {
          throw new Error('ReactWrapper::detach() can only be called on the root');
        }
        if (!this.options.attachTo) {
          throw new Error('ReactWrapper::detach() can only be called on when the `attachTo` option was passed into ' + '`mount()`.');
        }
        (0, _reactCompat.unmountComponentAtNode)(this.options.attachTo);
      }

      return detach;
    }()
  }]);

  return ReactWrapper;
}();

if (_Utils.ITERATOR_SYMBOL) {
  Object.defineProperty(ReactWrapper.prototype, _Utils.ITERATOR_SYMBOL, {
    configurable: true,
    value: function () {
      function iterator() {
        return this.nodes[_Utils.ITERATOR_SYMBOL]();
      }

      return iterator;
    }()
  });
}

exports['default'] = ReactWrapper;