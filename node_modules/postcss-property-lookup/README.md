# postcss-property-lookup [![Build Status][ci-img]][ci]

[PostCSS] plugin that allows referencing property values without a variable, [similar to Stylus](https://learnboost.github.io/stylus/docs/variables.html#property-lookup).

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://api.travis-ci.org/simonsmith/postcss-property-lookup.svg?branch=master
[ci]:      https://travis-ci.org/simonsmith/postcss-property-lookup


```css
.Test {
  margin-left: 20px;
  margin-right: @margin-left;
  color: red;
  background: @color url('test.png');
  line-height: 1.5;
  font-size: @(line-height)em;
}
```

```css
.Test {
  margin-left: 20px;
  margin-right: 20px;
  color: red;
  background: red url('test.png');
  line-height: 1.5;
  font-size: 1.5em;
}
```

Check the [test fixtures](test/fixtures/in) for more examples.

## Usage

```js
postcss([ require('postcss-property-lookup') ])
```

See [PostCSS] docs for examples for your environment.

## Installation

```
$ npm install postcss-property-lookup
```

For users on the (older) PostCSS 4.x path:

```
$ npm install postcss-property-lookup@postcss-4.x
```

## Usage

### JavaScript

```js
postcss([
  require('postcss-property-lookup')(/* options */),
  // more plugins...
])
```

### TypeScript

```ts
///<reference path="node_modules/postcss-property-lookup/.d.ts" />
import postcssPropertyLookup from 'postcss-property-lookup';

postcss([
  postcssPropertyLookup(/* options */),
  // more plugins...
])
```

## Options

### logLevel

Type: `string: <error|warn>`<br>
Required: `false`<br>
Default: `warn`

When a lookup cannot be resolved, this specifies whether to throw an error or log a warning. In the case of a warning, the invalid lookup value will be replaced with an empty string.
