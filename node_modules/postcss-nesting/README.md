# CSS Nesting

<a href="https://github.com/postcss/postcss"><img src="http://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="80" height="80" align="right"></a>

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[CSS Nesting] allows you to nest one style rule inside another, following the [CSS Nesting Module Level 3] specification.

```css
/* direct nesting */

a, b {
	color: red;

	& c, & d {
		color: white;
	}

	& & {
		color: blue;
	}

	&:hover {
		color: black;
	}

	@media (min-width: 30em) {
		color: yellow;

		@media (min-device-pixel-ratio: 1.5) {
			color: green;
		}
	}
}

/* or at-rule nesting */

a, b {
	color: red;

	@nest & c, & d {
		color: white;
	}

	@nest & & {
		color: blue;
	}

	@nest &:hover {
		color: black;
	}

	@media (min-width: 30em) {
		color: yellow;
	}
}

/* after */

a, b {
    color: red;
}

a c, a d, b c, b d {
    color: white;
}

a a, b b {
    color: blue;
}

a:hover, b:hover {
    color: black;
}

@media (min-width: 30em) {
    a, b {
        color: yellow;
    }
}

@media (min-width: 30em) and (min-device-pixel-ratio: 1.5) {
	color: green;
}
```

## Usage

Add [CSS Nesting] to your build tool:

```bash
npm install postcss-nesting --save-dev
```

#### Node

```js
require('postcss-nesting').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [CSS Nesting] as a PostCSS plugin:

```js
postcss([
	require('postcss-nesting')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [CSS Nesting] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
	return gulp.src('./src/*.css').pipe(
		postcss([
			require('postcss-nesting')({ /* options */ })
		])
	).pipe(
		gulp.dest('.')
	);
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [CSS Nesting] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			use: [
				require('postcss-nesting')({ /* options */ })
			]
		},
		dist: {
			src: '*.css'
		}
	}
});
```

## Options

#### `bubble`

Type: `Array`  
Default: `['document', 'media', 'supports']`

Specifies additional at-rules whose contents should be transpiled so that the at-rule comes first. By default, `@media`, `@supports` and `@document` will do this.

#### `prefix`

Type: `String`  
Default: `null`

Specifies a prefix to be surrounded by dashes before the `@nest` at-rule (e.g. `@-x-nest`).

[ci]:      https://travis-ci.org/jonathantneal/postcss-nesting
[ci-img]:  https://img.shields.io/travis/jonathantneal/postcss-nesting.svg
[npm]:     https://www.npmjs.com/package/postcss-nesting
[npm-img]: https://img.shields.io/npm/v/postcss-nesting.svg

[Gulp PostCSS]:  https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]:       https://github.com/postcss/postcss

[CSS Nesting Module Level 3]: http://tabatkins.github.io/specs/css-nesting/

[CSS Nesting]: https://github.com/jonathantneal/postcss-nesting
