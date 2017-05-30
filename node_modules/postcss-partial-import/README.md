# Partial Import [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Partial Import] is a [PostCSS] plugin that inlines standard and Sass-like `@import` statements.

```css
/* before file.css */

@import "foo/bar";

/* before foo/_bar.css */

html {
    background-color: #fafafa;
}

/* after */

html {
    background-color: #fafafa;
}

```

## Usage

Follow these steps to use [Partial Import].

Add [Partial Import] to your build tool:

```bash
npm install postcss-partial-import --save-dev
```

#### Node

```js
require('postcss-partial-import')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Partial Import] as a PostCSS plugin:

```js
postcss([
    require('postcss-partial-import')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Partial Import] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-partial-import')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
    );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [Partial Import] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-partial-import')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

## Options

#### `encoding`

Type: `String`  
Default: `utf8`

The character encoding of files being imported.

#### `extension`

Type: `String`  
Default: `css`

The file extension appended to partials being imported.

#### `prefix`

Type: `String`  
Default: `_`

The file extension sometimes prepended to partials being imported.

#### `cachedir`

Type: `String`
Default: `null`

The directory to store cached includes in. Can reduce compilation time when there are a lot of `@include`s. Setting this property enables the cache.

[ci]: https://travis-ci.org/jonathantneal/postcss-partial-import
[ci-img]: https://travis-ci.org/jonathantneal/postcss-partial-import.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Partial Import]: https://github.com/jonathantneal/postcss-partial-import
