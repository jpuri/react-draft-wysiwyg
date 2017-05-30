# postcss-color-function [![Build Status](https://travis-ci.org/postcss/postcss-color-function.svg)](https://travis-ci.org/postcss/postcss-color-function)

> [PostCSS](https://github.com/postcss/postcss) plugin to transform [W3C CSS color function][specs] to more compatible CSS.

## Installation

```console
$ npm install postcss-color-function
```

## Usage

```js
// dependencies
var fs = require("fs")
var postcss = require("postcss")
var colorFunction = require("postcss-color-function")

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

// process css
var output = postcss()
  .use(colorFunction())
  .process(css)
  .css
```

Using this `input.css`:

```css
body {
  background: color(red a(90%))
}

```

you will get:

```css
body {
  background: rgba(255, 0, 0, 0.9)
}
```

Checkout [tests](test) for examples.

## Interface (according to CSS specs)

```
color( [ <color> | <hue> ] <color-adjuster>* )
```

### List of `color-adjuster`

- `[red( | green( | blue( | alpha( | a(] ['+' | '-']? [<number> | <percentage>] )`
- `[red( | green( | blue( | alpha( | a(] '*' <percentage> )`
- ~~`rgb( ['+' | '-'] [<number> | <percentage>]{3} )`~~ @todo
- ~~`rgb( ['+' | '-'] <hash-token> )`~~ @todo
- ~~`rgb( '*' <percentage> ) |`~~ @todo
- `[hue( | h(] ['+' | '-' | '*']? <angle> )`
- `[saturation( | s(] ['+' | '-' | '*']? <percentage> )`
- `[lightness( | l(] ['+' | '-' | '*']? <percentage> )`
- `[whiteness( | w(] ['+' | '-' | '*']? <percentage> )`
- `[blackness( | b(] ['+' | '-' | '*']? <percentage> )`
- `tint( <percentage> )`
- `shade( <percentage> )`
- `blend( <color> <percentage> [rgb | hsl | hwb]? )`
- ~~`blenda( <color> <percentage> [rgb | hsl | hwb]? )`~~ @todo
- `contrast( <percentage>? )`

Notes:

- some adjusts have shortcuts,
- can be used on every value on any property,
- some values can use add/subtract/scale modifiers or a direct value.

[Read the specs][specs] for more information.

### Examples

```css
whatever {
  color: color(red a(10%));

  background-color: color(red lightness(50%)); /* == color(red l(50%)); */

  border-color: color(hsla(125, 50%, 50%, .4) saturation(+ 10%) w(- 20%));
}
```

## FAQ

### Can you support `currentcolor` so we can do `color(currentcolor adjuster())`?

No we cannot do that. `currentcolor` depends on the cascade (so the DOM) and we can't handle that in a simple preprocessing step. You need to handle that with polyfills.

### Can we use CSS custom properties so we can do `color(var(--mainColor) adjuster())`?

By using [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) before this plugin, you can do that (sort of).
You have some examples in [cssnext playground](http://cssnext.io/playground/).

---

## [Changelog](CHANGELOG.md)

## [License](LICENSE)

[specs]: http://dev.w3.org/csswg/css-color/#modifying-colors
