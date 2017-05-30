# PostCSS Simple Variables [![Build Status][ci-img]][ci]

<img align="right" width="95" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo.svg">

[PostCSS] plugin for Sass-like variables.

You can use variables inside values, selectors and at-rule’s parameters.

```css
$dir:    top;
$blue:   #056ef0;
$column: 200px;

.menu_link {
    background: $blue;
    width: $column;
}
.menu {
    width: calc(4 * $column);
    margin-$(dir): 10px;
}
```

```css
.menu_link {
    background: #056ef0;
    width: 200px;
}
.menu {
    width: calc(4 * 200px);
    margin-top: 10px;
}
```

If you want be closer to W3C spec,
you should use [postcss-custom-properties] plugin.

Also you should look at [postcss-map] for big complicated configs.

[postcss-custom-properties]: https://github.com/postcss/postcss-custom-properties
[postcss-map]:               https://github.com/pascalduez/postcss-map
[PostCSS]:                   https://github.com/postcss/postcss
[ci-img]:                    https://travis-ci.org/postcss/postcss-simple-vars.svg
[ci]:                        https://travis-ci.org/postcss/postcss-simple-vars

## Interpolation

There is special syntax if you want to use variable inside CSS words:

```css
$prefix: my-company-widget

$prefix { }
$(prefix)_button { }
```

## Usage

```js
postcss([ require('postcss-simple-vars') ])
```

See [PostCSS] docs for examples for your environment.

## Options

Call plugin function to set options:

```js
.pipe(postcss([ require('postcss-simple-vars')({ silent: true }) ]))
```

### `variables`

Set default variables. It is useful to store colors or other constants
in common file:

```js
// config/colors.js

module.exports = {
    blue: '#056ef0'
}

// gulpfile.js

var colors = require('./config/colors');
var vars   = require('postcss-simple-vars')

gulp.task('css', function () {
     return gulp.src('./src/*.css')
        .pipe(postcss([ vars({ variables: colors }) ]))
        .pipe(gulp.dest('./dest'));
});
```

You can set a function returning object, if you want to update default
variables in webpack hot reload:

```js
postcss([
    vars({
        variables: function () {
            return require('./config/colors');
        }
    })
]
```

### `onVariables`

Callback invoked once all variables in css are known. The callback receives
an object representing the known variables, including those explicitly-declared
by the [`variables`](#variables) option.

```js
postcss([
    vars({
        onVariables: function (variables) {
            console.log('CSS Variables');
            console.log(JSON.stringify(variables, null, 2));
        }
    })
]
```

### `unknown`

Callback on unknown variable name. It receives node instanc, variable name
and PostCSS’ Result object.

```js
postcss([
    vars({
        unknown: function (node, name, result) {
            node.warn(result, 'Unknown variable ' + name);
        }
    })
]
```

### `silent`

Left unknown variables in CSS and do not throw a error. Default is `false`.

### `only`

Set value only for variables from this object.
Other variables will not be changed. It is useful for PostCSS plugin developers.
