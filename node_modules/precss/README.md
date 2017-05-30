# PreCSS [![Build Status][ci-img]][ci]

<img align="right" width="150" height="150" src="https://i.imgur.com/zxxN3OX.png" alt="">

[PreCSS] is a tool that allows you to use Sass-like markup in your CSS files.

Enjoy a familiar syntax with variables, mixins, conditionals, and other goodies.

### Variables

```css
/* before */

$blue: #056ef0;
$column: 200px;

.menu {
	width: calc(4 * $column);
}

.menu_link {
	background: $blue;
	width: $column;
}

/* after */

.menu {
	width: calc(4 * 200px);
}

.menu_link {
	background: #056ef0;
	width: 200px;
}
```

### Conditionals

```css
/* before */

.notice--clear {
	@if 3 < 5 {
		background: green;
	}
	@else {
		background: blue;
	}
}

/* after */

.notice--clear {
	background: green;
}
```

### Loops

```css
/* before */

@for $i from 1 to 3 {
	.b-$i { width: $(i)px; }
}

/* after */

.b-1 {
	width: 1px
}
.b-2 {
	width: 2px
}
.b-3 {
	width: 3px
}
```

```css
/* before */

@each $icon in (foo, bar, baz) {
	.icon-$(icon) {
		background: url('icons/$(icon).png');
	}
}

/* after */

.icon-foo {
	background: url('icons/foo.png');
}

.icon-bar {
	background: url('icons/bar.png');
}

.icon-baz {
	background: url('icons/baz.png');
}
```

### Mixins

```css
/* before */

@define-mixin icon $name {
	padding-left: 16px;

	&::after {
		content: "";
		background-url: url(/icons/$(name).png);
	}
}

.search {
	@mixin icon search;
}

/* after */

.search {
	padding-left: 16px;
}

.search::after {
	content: "";
	background-url: url(/icons/search.png);
}
```

### Extends

```css
/* before */

@define-extend bg-green {
	background: green;
}

.notice--clear {
	@extend bg-green;
}

/* after */

.notice--clear {
	background: green;
}
```

### Imports

```css
/* Before */

@import "partials/base"; /* Contents of partials/_base.css: `body { background: black; }` */


/* After */

body { background: black; }
```

### Property Lookup

```css
/* Before */

.heading {
	margin: 20px;
	padding: @margin;
}

/* After */

.heading {
	margin: 20px;
	padding: 20px;
}
```

### Root

```css
/* Before */

.parent {
	background: white;

	@at-root{
		.child {
			background: black;
		}
	}
}

/* After */

.child {
	background: black;
}

.parent {
	background: white;
}
```

## Usage

Follow these simple steps to use [PreCSS].

Add [PreCSS] to your build tool:

```bash
npm install precss --save-dev
```

Add the [PostCSS SCSS] parser to your build tool:

```bash
npm install postcss-scss --save-dev
```

#### Node

```js
require('precss')({ /* options */ }).process(YOUR_CSS, { parser: require('postcss-scss') });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [PreCSS] as a PostCSS plugin:

```js
postcss([
    require('precss')({ /* options */ })
]).process(YOUR_CSS, { parser: require('postcss-scss') }).then(function (result) {
	// do something with result.css
});
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [PreCSS] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('precss')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
    );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```sh
npm install precss --save-dev
```

Enable [PreCSS] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			parser: require('postcss-scss'),
			processors: [
				require('precss')({ /* options */ })
			]
		},
		dist: {
			src: 'css/*.css'
		}
	}
});
```

### Plugins

PreCSS blends Sass-like strength with W3C future-syntax superpower, powered by the following plugins (in this order):

- [postcss-partial-import]: W3C and Sass-like imports
- [postcss-mixins]: Sass-like mixins
- [postcss-advanced-variables]: Sass-like variables and methods
- [postcss-custom-selectors]: W3C custom selectors
- [postcss-custom-media]: W3C custom media queries
- [postcss-custom-properties]: W3C custom variables
- [postcss-media-minmax]: W3C `<` `<=` `>=` `>` media queries
- [postcss-color-function]: W3C color methods
- [postcss-nesting]: W3C nested selectors
- [postcss-nested]: Sass-like nested selectors
- [postcss-atroot]: place rules back up to the root
- [postcss-property-lookup]: reference other property values
- [postcss-extend]: W3C and Sass-like extend methods
- [postcss-selector-matches]: W3C multiple matches pseudo-classes
- [postcss-selector-not]: W3C multiple not pseudo-classes

[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[Gulp PostCSS]:  https://github.com/postcss/gulp-postcss
[PostCSS SCSS]:  https://github.com/postcss/postcss-scss
[PostCSS]:       https://github.com/postcss/postcss
[PreCSS]:        https://github.com/jonathantneal/precss
[ci-img]:        https://travis-ci.org/jonathantneal/precss.svg
[ci]:            https://travis-ci.org/jonathantneal/precss

[postcss-advanced-variables]: https://github.com/jonathantneal/postcss-advanced-variables
[postcss-custom-properties]:  https://github.com/postcss/postcss-custom-properties
[postcss-custom-selectors]:   https://github.com/postcss/postcss-custom-selectors
[postcss-selector-matches]:   https://github.com/postcss/postcss-selector-matches
[postcss-property-lookup]:    https://github.com/simonsmith/postcss-property-lookup
[postcss-color-function]:     https://github.com/postcss/postcss-color-function
[postcss-partial-import]:     https://github.com/jonathantneal/postcss-partial-import
[postcss-custom-media]:       https://github.com/postcss/postcss-custom-media
[postcss-media-minmax]:       https://github.com/postcss/postcss-media-minmax
[postcss-selector-not]:       https://github.com/postcss/postcss-selector-not
[postcss-nesting]:            https://github.com/jonathantneal/postcss-nesting
[postcss-atroot]:             https://github.com/OEvgeny/postcss-atroot
[postcss-extend]:             https://github.com/travco/postcss-extend
[postcss-mixins]:             https://github.com/postcss/postcss-mixins
[postcss-nested]:             https://github.com/postcss/postcss-nested
