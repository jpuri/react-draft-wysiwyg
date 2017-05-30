# PostCSS Custom Selectors

[![Build Status](https://travis-ci.org/postcss/postcss-custom-selectors.svg?branch=master)](https://travis-ci.org/postcss/postcss-custom-selectors)
[![NPM Downloads](https://img.shields.io/npm/dm/postcss-custom-selectors.svg?style=flat)](https://www.npmjs.com/package/postcss-custom-selectors)
[![NPM Version](http://img.shields.io/npm/v/postcss-custom-selectors.svg?style=flat)](https://www.npmjs.com/package/postcss-custom-selectors)
[![License](https://img.shields.io/npm/l/postcss-custom-selectors.svg?style=flat)](http://opensource.org/licenses/MIT)

> [PostCSS](https://github.com/postcss/postcss) plugin to transform  [W3C CSS Extensions(Custom Selectors)](http://dev.w3.org/csswg/css-extensions/#custom-selectors)  to more compatible CSS.

[简体中文](README-zh.md)

![GIF Demo](http://gtms01.alicdn.com/tps/i1/TB1ZCe3GVXXXXbzXFXXRi48IXXX-780-610.gif)

## Installation

```console
$ npm install postcss-custom-selectors
```

## Quick Start

```js
// dependencies
var fs = require('fs')
var postcss = require('postcss')
var selector = require('postcss-custom-selectors')

// css to be processed
var css = fs.readFileSync('input.css', 'utf8')

// process css using postcss-custom-selectors
var output = postcss()
  .use(selector())
  .process(css)
  .css

console.log('\n====>Output CSS:\n', output)  
```

Or just:

```js
var output = postcss(selector())
  .process(css)
  .css
```

input:

```css
@custom-selector :--heading h1, h2, h3, h4, h5, h6;

article :--heading + p {
  margin-top: 0;
}
```

You will get:

```css
article h1 + p,
article h2 + p,
article h3 + p,
article h4 + p,
article h5 + p,
article h6 + p {
  margin-top: 0;
}
```

## CSS syntax

```css
@custom-selector = @custom-selector :<extension-name> <selector>;
```

## How to use

The custom selector is a pseudo-class, so you must use `:--` to define it.

For example to simulate [:any-link](http://dev.w3.org/csswg/selectors/#the-any-link-pseudo) selector:

```css
@custom-selector :--any-link :link, :visited;

a:--any-link {
  color: blue;
}
```

output:

```css
a:link,
a:visited {
  color: blue;
}
```

You can even make some smart use like this:

```css
@custom-selector :--button button, .button;
@custom-selector :--enter :hover, :focus;

:--button:--enter {

}
```

output

```css
button:hover,
.button:hover,
button:focus,
.button:focus {

}
```

## Options

### `lineBreak`

_(default: `true`)_

Set whether  multiple selector wrap.The default is turning on to be a newline.

Close the line breaks.

```js
var options = {
  lineBreak: false
}

var output = postcss(selector(options))
  .process(css)
  .css
```

With the first example, the output will be:

```css
article h1 + p, article h2 + p, article h3 + p, article h4 + p, article h5 + p, article h6 + p {
  margin-top: 0;
}
```

### `extensions`

_(default: `{}`)_

This option allows you to customize an object to set the `<extension-name>` (selector alias) and `<selector>`, these definitions will cover the same alias of `@custom-selector` in CSS.

```js
var options = {
  extensions: {
    ':--any' : 'section, article, aside, nav'
  }
}

var output = postcss(selector(options))
  .process(css)
  .css;
```

input.css

```css
@custom-selector :--any .foo, .bar; /* No effect */
:--any h1 {
  margin-top: 16px;
}
```

output:

```css
/* No effect */
section h1,
article h1,
aside h1,
nav h1 {
  margin-top: 16px;
}
```

### `transformMatches`

_(default: `true`)_

Allows you to limit transformation to `:matches()` usage
If set to false:

input

```css
@custom-selector :--foo .bar, .baz;
.foo:--foo {
  margin-top: 16px;
}
```

output

```css
.foo:matches(.bar, .baz) {
  margin-top: 16px;
}
```


## Usage

### Node Watch

Dependence [chokidar](https://github.com/paulmillr/chokidar) module.

```js
var fs = require('fs')
var chokidar = require('chokidar')
var postcss = require('postcss')
var selector = require('postcss-custom-selectors')

var src = 'input.css'

console.info('Watching…\nModify the input.css and save.')

chokidar.watch(src, {
  ignored: /[\/\\]\./,
  persistent: true
}).on('all',
  function(event, path, stats) {
    var css = fs.readFileSync(src, 'utf8')
    var output = postcss(selector())
      .process(css)
      .css
    fs.writeFileSync('output.css', output)
  })
```

### Grunt

```js
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({ browsers: ['> 0%'] }).postcss, //Other plugin
          require('postcss-custom-selectors')(),
        ]
      },
      dist: {
        src: ['src/*.css'],
        dest: 'build/grunt.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default', ['postcss']);
}
```

### Gulp

```js
var gulp = require('gulp');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var selector = require('postcss-custom-selectors')
var autoprefixer = require('autoprefixer-core')

gulp.task('default', function () {
    var processors = [
        autoprefixer({ browsers: ['> 0%'] }), //Other plugin
        selector()
    ];
    gulp.src('src/*.css')
        .pipe(postcss(processors))
        .pipe(rename('gulp.css'))
        .pipe(gulp.dest('build'))
});
gulp.watch('src/*.css', ['default']);
```

## Contributing

* Install the relevant dependent module.
* Respect coding style（Install [EditorConfig](http://editorconfig.org/)）.
* Add test cases in the [test](test) directory.
* Run test.

```console
$ git clone https://github.com/postcss/postcss-custom-selectors.git
$ git checkout -b patch
$ npm install
$ npm test
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
