'use strict';

var supportsDescriptors = require('define-properties').supportsDescriptors;
var functionsHaveNames = function foo() {}.name === 'foo';
var getPolyfill = require('./polyfill');
var defineProperty = Object.defineProperty;
var TypeErr = TypeError;
var bind = require('function-bind');
var fnCall = bind.call(Function.call);

module.exports = function shimName() {
	var polyfill = getPolyfill();
	if (functionsHaveNames) {
		return polyfill;
	}
	if (!supportsDescriptors) {
		throw new TypeErr('Shimming Function.prototype.name support requires ES5 property descriptor support.');
	}
	if (function foo() {}.name !== 'foo') {
		defineProperty(Function.prototype, 'name', {
			configurable: true,
			enumerable: false,
			get: function () {
				var name = fnCall(polyfill, this);
				defineProperty(this, 'name', {
					configurable: true,
					enumerable: false,
					value: name,
					writable: false
				});
				return name;
			}
		});
	}
	return polyfill;
};
