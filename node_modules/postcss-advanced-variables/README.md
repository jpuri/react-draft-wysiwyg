# Advanced Variables [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Advanced Variables] converts Sass-like variables and conditionals into CSS.

```scss
/* before */

$dir: assets/icons;

@each $icon in (foo, bar, baz) {
	.icon-$icon {
		background: url('$dir/$icon.png');
	}
}

@for $index from 1 to 5 by 2 {
	.col-$index {
		width: $(index)0%;
	}
}

/* after */

.icon-foo {
	background: url('assets/icons/foo.png');
}

.icon-bar {
	background: url('assets/icons/bar.png');
}

.icon-baz {
	background: url('assets/icons/baz.png');
}

.col-1 {
	width: 10%;
}

.col-3 {
	width: 30%;
}

.col-5 {
	width: 50%;
}
```

## Usage

Add [Advanced Variables] to your build tool:

```bash
npm install postcss-advanced-variables --save-dev
```

#### Node

```js
require('postcss-advanced-variables')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Advanced Variables] as a PostCSS plugin:

```js
postcss([
    require('postcss-advanced-variables')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Advanced Variables] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-advanced-variables')({ /* options */ })
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

Enable [Advanced Variables] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-advanced-variables')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

## Options

### `variables`

Type: `Object`  
Default: `{}`

Specifies your own global variables.

```js
require('postcss-advanced-variables')({
	variables: {
		'site-width': '960px'
	}
});
```

```css
/* before */

.hero {
	max-width: $site-width;
}

/* after */

.hero {
	max-width: 960px;
}
```

[ci]: https://travis-ci.org/jonathantneal/postcss-advanced-variables
[ci-img]: https://travis-ci.org/jonathantneal/postcss-advanced-variables.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Advanced Variables]: https://github.com/jonathantneal/postcss-advanced-variables
