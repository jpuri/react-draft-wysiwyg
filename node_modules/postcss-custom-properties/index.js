/**
 * Module dependencies.
 */

var postcss = require("postcss")
var balanced = require("balanced-match")

/**
 * Constants.
 */

var VAR_PROP_IDENTIFIER = "--"
var VAR_FUNC_IDENTIFIER = "var"
// matches `name[, fallback]`, captures "name" and "fallback"
var RE_VAR = /([\w-]+)(?:\s*,\s*)?\s*(.*)?/

/**
 * Resolve CSS variables in a value
 *
 * The second argument to a CSS variable function, if provided, is a fallback
 * value, which is used as the substitution value when the referenced variable
 * is invalid.
 *
 * var(name[, fallback])
 *
 * @param {String} value A property value known to contain CSS variable
 *                       functions
 * @param {Object} variables A map of variable names and values
 * @param {Object} source source object of the declaration containing the rule
 * @return {String} A property value with all CSS variables substituted.
 */

function resolveValue(value, variables, result, decl) {
  var results = []

  var start = value.indexOf(VAR_FUNC_IDENTIFIER + "(")
  if (start === -1) {
    return [value]
  }

  var matches = balanced("(", ")", value.substring(start))

  if (!matches) {
    throw decl.error("missing closing ')' in the value '" + value + "'")
  }

  if (matches.body === "") {
    throw decl.error("var() must contain a non-whitespace string")
  }

  matches.body.replace(RE_VAR, function(_, name, fallback) {
    var variable = variables[name]
    var post
    // undefined and without fallback, just keep original value
    if (!variable && !fallback) {
      result.warn(
        "variable '" + name + "' is undefined and used without a fallback",
        {node: decl}
      )
      post = matches.post
        ? resolveValue(matches.post, variables, result, decl)
        : [""]
      // resolve the end of the expression
      post.forEach(function(afterValue) {
        results.push(
          value.slice(0, start) +
          VAR_FUNC_IDENTIFIER + "(" + name + ")" + afterValue
        )
      })
      return
    }

    // prepend with fallbacks
    if (fallback) {
      // resolve fallback values
      fallback = resolveValue(fallback, variables, result, decl)
      // resolve the end of the expression before the rest
      post = matches.post
        ? resolveValue(matches.post, variables, result, decl)
        : [""]
      fallback.forEach(function(fbValue) {
        post.forEach(function(afterValue) {
          results.push(value.slice(0, start) + fbValue + afterValue)
        })
      })
    }

    if (!variable) {
      return
    }

    // replace with computed custom properties
    if (!variable.resolved) {
      // circular reference encountered
      if (variable.deps.indexOf(name) !== -1) {
        if (!fallback) {
          result.warn("Circular variable reference: " + name, {node: decl})
          variable.value = [variable.value]
          variable.circular = true
        }
        else {
          variable.value = fallback
          return
        }
      }
      else {
        variable.deps.push(name)
        variable.value = resolveValue(variable.value, variables, result, decl)
      }
      variable.resolved = true
    }
    if (variable.circular && fallback) {
      return
    }
    // resolve the end of the expression
    post = matches.post
      ? resolveValue(matches.post, variables, result, decl)
      : [""]
    variable.value.forEach(function(replacementValue) {
      post.forEach(function(afterValue) {
        results.push(value.slice(0, start) + replacementValue + afterValue)
      })
    })
  })

  return results
}

function prefixVariables(variables) {
  var prefixedVariables = {}

  if (!variables) {
    return prefixVariables
  }

  Object.keys(variables).forEach(function(name) {
    var val = variables[name]
    if (name.slice(0, 2) !== "--") {
      name = "--" + name
    }
    prefixedVariables[name] = String(val)
  })

  return prefixedVariables
}

/**
 * Module export.
 */

module.exports = postcss.plugin("postcss-custom-properties", function(options) {
  options = options || {}

  function setVariables(variables) {
    options.variables = prefixVariables(variables)
  }

  function plugin(style, result) {
    var warnings = options.warnings === undefined ? true : options.warnings
    var variables = prefixVariables(options.variables)
    var strict = options.strict === undefined ? true : options.strict
    var appendVariables = options.appendVariables
    var preserve = options.preserve
    var map = {}
    var importantMap = {}

    // define variables
    style.walkRules(function(rule) {
      var toRemove = []

      // only variables declared for `:root` are supported for now
      if (
        rule.selectors.length !== 1 ||
        rule.selectors[0] !== ":root" ||
        rule.parent.type !== "root"
      ) {
        rule.each(function(decl) {
          var prop = decl.prop
          if (
            warnings &&
            prop &&
            prop.indexOf(VAR_PROP_IDENTIFIER) === 0
          ) {
            result.warn(
              "Custom property ignored: not scoped to the top-level :root " +
              "element (" + rule.selectors + " { ... " + prop + ": ... })" +
              (rule.parent.type !== "root" ? ", in " + rule.parent.type : ""),
              {node: decl}
            )
          }
        })
        return
      }

      rule.each(function(decl, index) {
        var prop = decl.prop
        if (prop && prop.indexOf(VAR_PROP_IDENTIFIER) === 0) {
          if (!map[prop] || !importantMap[prop] || decl.important) {
            map[prop] = {
              value: decl.value,
              deps: [],
              circular: false,
              resolved: false,
            }
            importantMap[prop] = decl.important
          }
          toRemove.push(index)
        }
      })

      // optionally remove `--*` properties from the rule
      if (!preserve) {
        for (var i = toRemove.length - 1; i >= 0; i--) {
          rule.nodes.splice(toRemove[i], 1)
        }

        // remove empty :root {}
        if (rule.nodes.length === 0) {
          rule.remove()
        }
      }
    })

    // apply js-defined custom properties
    Object.keys(variables).forEach(function(variable) {
      map[variable] = {
        value: variables[variable],
        deps: [],
        circular: false,
        resolved: false,
      }
    })

    if (preserve) {
      Object.keys(map).forEach(function(name) {
        var variable = map[name]
        if (!variable.resolved) {
          variable.value = resolveValue(variable.value, map, result)
          variable.resolved = true
        }
      })
    }

    // resolve variables
    style.walkDecls(function(decl) {
      var value = decl.value

      // skip values that don’t contain variable functions
      if (!value || value.indexOf(VAR_FUNC_IDENTIFIER + "(") === -1) {
        return
      }

      var resolved = resolveValue(value, map, result, decl)
      if (!strict) {
        resolved = [resolved.pop()]
      }
      resolved.forEach(function(resolvedValue) {
        var clone = decl.cloneBefore()
        clone.value = resolvedValue
      })

      if (!preserve || preserve === "computed") {
        decl.remove()
      }
    })

    if (preserve && appendVariables) {
      var names = Object.keys(map)
      if (names.length) {
        var container = postcss.rule({
          selector: ":root",
          raws: {semicolon: true},
        })
        names.forEach(function(name) {
          var variable = map[name]
          var val = variable.value
          if (variable.resolved) {
            val = val[val.length - 1]
          }
          var decl = postcss.decl({
            prop: name,
            value: val,
          })
          container.append(decl)
        })
        style.append(container)
      }
    }
  }

  plugin.setVariables = setVariables

  return plugin
})
