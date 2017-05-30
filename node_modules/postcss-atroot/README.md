# PostCSS at-root [![Circle CI](https://circleci.com/gh/OEvgeny/postcss-atroot.svg?style=svg)](https://circleci.com/gh/OEvgeny/postcss-atroot)
PostCSS plugin to place rules directly at the root node.

The ``@at-root`` causes one or more rules to be emitted at the root of the document, rather than being nested beneath their parent selectors:
```css
.parent {
  ...
  @at-root{
    .child {...}
  }
}
```
Which would produce:
```css
.child { ... }
.parent { ... }
```

It will play well with postcss ``@include`` plugins.  
foo.css:
```css
@at-root {
  @viewport { width: device-width; }
}
.foo {
  color: blue;
}
```

bar.css:
```css
.bar {
  @import "foo.css";
}

```
Will produce:
```css
@viewport { width: device-width; }

.bar .foo {
  color: blue; 
}
```

## Usage

```js
postcss([ require('postcss-atroot')() ])
```

See [PostCSS] docs for examples for your environment.

[PostCSS]: https://github.com/postcss/postcss
