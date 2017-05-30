
# css-color-function
  
  A parser and converter for [Tab Atkins](https://github.com/tabatkins)'s [proposed color function](http://dev.w3.org/csswg/css-color/#modifying-colors) in CSS.

## Installation

    $ npm install css-color-function

## Example

```js
var color = require('css-color-function');

color.convert('color(red tint(50%))');
// "rgb(255, 128, 128)"

color.parse('color(red blue(+ 30))');
// {
//   type: 'function',
//   name: 'color',
//   arguments: [
//     {
//       type: 'color',
//       value: 'red'
//     },
//     {
//       type: 'function',
//       name: 'blue',
//       arguments: [
//         {
//           type: 'modifier',
//           value: '+'
//         },
//         {
//           type: 'number',
//           value: '30'
//         }
//       ]
//     }
//   ]
// }
```

## API

### color.convert(string)

  Convert a color function CSS `string` into an RGB color string.

### color.parse(string)

  Parse a color function CSS `string` and return an AST.

## License

  The MIT License (MIT)

  Copyright (c) 2013 Ian Storm Taylor &lt;ian@segment.io&gt;

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
