var postcss = require('postcss')
var expect = require('chai').expect
var atroot = require('../')

var test = function (input, output, opts) {
  var result = postcss(atroot(opts)).process(input)
  expect(result.css).to.eql(output)
  expect(result.warnings()).to.be.empty
}

/*eslint no-undef: 0*/
describe('postcss-atroot', function () {

  it('places nodes before parent rule', function () {
    test('.test {@at-root {.root {color: black}}}',
      '.root {\n    color: black\n}\n.test {}')
  })

  it('saves nodes order', function () {
    test('.test {@at-root {color: white;color: black;color: green}}',
      'color: white;\ncolor: black;\ncolor: green;\n.test {}')
  })

})
