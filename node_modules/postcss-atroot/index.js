var postcss = require('postcss')

module.exports = postcss.plugin('postcss-atroot', function (opts) {
  opts = opts || {}
  return function (root, opts) {
    root.walkAtRules('at-root', function (rule) {
      var p = rule
      // Find first node from root to move child nodes after it
      while (p && p.parent !== root) p = p.parent
      root.insertBefore(p, rule.nodes)
      rule.remove()
    })
  }
})
