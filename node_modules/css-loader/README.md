[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]

<div align="center">
  <img width="200" height="200"
    src="https://cdn.worldvectorlogo.com/logos/css-3.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>CSS Loader</h1>
</div>

<h2 align="center">Install</h2>

```bash
npm install --save-dev css-loader
```

<h2 align="center">Usage</h2>

The `css-loader` interprets `@import` and `url()` like `requires`.

Use the loader either via your webpack config, CLI or inline.

### Via webpack config (recommended)

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
```

**In your application**
```js
import css from 'file.css';
```

### CLI

```bash
webpack --module-bind 'css=style-loader!css-loader'
```

**In your application**
```js
import css from 'file.css';
```

### Inline

**In your application**
```js
import css from 'style-loader!css-loader!./file.css';
```

<h2 align="center">Options</h2>

`@import` and `url()` are interpreted like `import` and will be resolved by the css-loader.
Good loaders for requiring your assets are the [file-loader](https://github.com/webpack/file-loader)
and the [url-loader](https://github.com/webpack/url-loader) which you should specify in your config (see below).

To be compatible with existing css files (if not in CSS Module mode):

* `url(image.png)` => `require('./image.png')`
* `url(~module/image.png)` => `require('module/image.png')`

<h2 align="center">Options</h2>

|Name|Default|Description|
|:--:|:-----:|:----------|
|**`root`**|`/`|Path to resolve URLs, URLs starting with `/` will not be translated|
|**`modules`**|`false`|Enable/Disable CSS Modules|
|**`import`** |`true`| Enable/Disable @import handling|
|**`url`**|`true`| Enable/Disable `url()` handling|
|**`minimize`**|`false`|Enable/Disable minification|
|**`sourceMap`**|`false`|Enable/Disable Sourcemaps|
|**`camelCase`**|`false`|Export Classnames in CamelCase|
|**`importLoaders`**|`0`|Number of loaders applied before CSS loader|

The following webpack config can load CSS files, embed small PNG/JPG/GIF/SVG images as well as fonts as [Data URLs](https://tools.ietf.org/html/rfc2397) and copy larger files to the output directory.

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  }
};
```

### Root

For URLs that start with a `/`, the default behavior is to not translate them:

* `url(/image.png)` => `url(/image.png)`

If a `root` query parameter is set, however, it will be prepended to the URL
and then translated:

**webpack.config.js**
```js
rules: [
  {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: { root: '.' }
      }
    ]
  }
]
```

* `url(/image.png)` => `require('./image.png')`

Using 'Root-relative' urls is not recommended. You should only use it for legacy CSS files.

### CSS Scope

By default CSS exports all class names into a global selector scope. Styles can be locally scoped to avoid globally scoping styles.

The syntax `:local(.className)` can be used to declare `className` in the local scope. The local identifiers are exported by the module.

With `:local` (without brackets) local mode can be switched on for this selector. `:global(.className)` can be used to declare an explicit global selector. With `:global` (without brackets) global mode can be switched on for this selector.

The loader replaces local selectors with unique identifiers. The choosen unique identifiers are exported by the module.

**app.css**
```css
:local(.className) { background: red; }
:local .className { color: green; }
:local(.className .subClass) { color: green; }
:local .className .subClass :global(.global-class-name) { color: blue; }
```

**app.bundle.css**
``` css
._23_aKvs-b8bW2Vg3fwHozO { background: red; }
._23_aKvs-b8bW2Vg3fwHozO { color: green; }
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 { color: green; }
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 .global-class-name { color: blue; }
```

> Note: Identifiers are exported

``` js
exports.locals = {
  className: '_23_aKvs-b8bW2Vg3fwHozO',
  subClass: '_13LGdX8RMStbBE9w-t0gZ1'
}
```

CamelCase is recommended for local selectors. They are easier to use in the within the imported JS module.

`url()` URLs in block scoped (`:local .abc`) rules behave like requests in modules:

* `./file.png` instead of `file.png`
* `module/file.png` instead of `~module/file.png`

You can use `:local(#someId)`, but this is not recommended. Use classes instead of ids.

You can configure the generated ident with the `localIdentName` query parameter (default `[hash:base64]`).

 **webpack.config.js**
 ```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
      }
    }
  ]
}
```

You can also specify the absolute path to your custom `getLocalIdent` function to generate classname based on a different schema. Note that this requires `webpack >= v2.x.` since to be able to pass function in. For example:

```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
        getLocalIdent: (context, localIdentName, localName, options) => {
          return 'whatever_random_class_name'
        }
      }
    }
  ]
}
```

Note: For prerendering with extract-text-webpack-plugin you should use `css-loader/locals` instead of `style-loader!css-loader` **in the prerendering bundle**. It doesn't embed CSS but only exports the identifier mappings.

### [CSS Modules](https://github.com/css-modules/css-modules)

The query parameter `modules` enables the **CSS Modules** spec.

This enables local scoped CSS by default. (You can switch it off with `:global(...)` or `:global` for selectors and/or rules.)

### CSS Composing

When declaring a local class name you can compose a local class from another local class name.

``` css
:local(.className) {
  background: red;
  color: yellow;
}

:local(.subClass) {
  composes: className;
  background: blue;
}
```

This doesn't result in any change to the CSS itself but exports multiple class names:

```js
exports.locals = {
  className: '_23_aKvs-b8bW2Vg3fwHozO',
  subClass: '_13LGdX8RMStbBE9w-t0gZ1 _23_aKvs-b8bW2Vg3fwHozO'
}
```

``` css
._23_aKvs-b8bW2Vg3fwHozO {
  background: red;
  color: yellow;
}

._13LGdX8RMStbBE9w-t0gZ1 {
  background: blue;
}
```

### Importing CSS Locals

To import a local class name from another module:

``` css
:local(.continueButton) {
  composes: button from 'library/button.css';
  background: red;
}
```

``` css
:local(.nameEdit) {
  composes: edit highlight from './edit.css';
  background: red;
}
```

To import from multiple modules use multiple `composes:` rules.

``` css
:local(.className) {
  composes: edit hightlight from './edit.css';
  composes: button from 'module/button.css';
  composes: classFromThisModule;
  background: red;
}
```

### SourceMaps

To include Sourcemaps set the `sourceMap` query param.

I. e. the extract-text-webpack-plugin can handle them.

They are not enabled by default because they expose a runtime overhead and increase in bundle size (JS SourceMap do not). In addition to that relative paths are buggy and you need to use an absolute public path which include the server URL.

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    }
  ]
}
```

### toString

You can also use the css-loader results directly as string, such as in Angular's component style. 

**webpack.config.js**

```js
{
   test: /\.css$/,
   use: [
     {
       loaders: ['to-string-loader', 'css-loader']
     }
   ]
}
```

or

```js
const cssText = require('./test.css').toString();

console.log(cssText);
```

If there are SourceMaps, they will also be included in the result string.

### ImportLoaders

The query parameter `importLoaders` allow to configure which loaders should be applied to `@import`ed resources.

`importLoaders`: That many loaders after the css-loader are used to import resources.

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
    'postcss-loader'
  ]
}
```

This may change in the future, when the module system (i. e. webpack) supports loader matching by origin.

### Minification

By default the css-loader minimizes the css if specified by the module system.

In some cases the minification is destructive to the css, so you can provide some options to it. cssnano is used for minification and you find a [list of options here](http://cssnano.co/options/).

You can also disable or enforce minification with the `minimize` query parameter.

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        minimize: true || {/* CSSNano Options */}
      }
    }
  ]
}
```

### CamelCase

By default, the exported JSON keys mirror the class names. If you want to camelize class names (useful in JS), pass the query parameter `camelCase` to css-loader.

#### Possible Options

|Option|Description|
|:----:|:--------|
|**`true`**|Class names will be camelized|
|**`'dashes'`**|Only dashes in class names will be camelized|
|**`'only'`** |Class names will be camelized, the original class name will be removed from the locals|
|**`'dashesOnly'`**|Dashes in class names will be camelized, the original class name will be removed from the locals|

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        camelCase: true
      }
    }
  ]
}
```

```css
.class-name {}
```

```js
import { className } from 'file.css';
```

<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/css-loader.svg
[npm-url]: https://npmjs.com/package/css-loader

[node]: https://img.shields.io/node/v/css-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/css-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/css-loader

[tests]: http://img.shields.io/travis/webpack-contrib/css-loader.svg
[tests-url]: https://travis-ci.org/webpack-contrib/css-loader

[cover]: https://codecov.io/gh/webpack-contrib/css-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/css-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
