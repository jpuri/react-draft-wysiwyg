## Any Promise

[![Build Status](https://secure.travis-ci.org/kevinbeaty/any-promise.svg)](http://travis-ci.org/kevinbeaty/any-promise)

Let your library support any ES6 compatible Promise library or polyfill and leave the choice to the end user. The end user can install a polyfill or `npm install` their preference before using this library and the installed library will be automatically detected.

Attempts to load libraries in the following order.  The first successful `require` will be exported.

  - [es6-promise](https://github.com/jakearchibald/es6-promise)
  - [promise](https://github.com/then/promise)
  - [native-promise-only](https://github.com/getify/native-promise-only)
  - [bluebird](https://github.com/petkaantonov/bluebird)
  - [rsvp](https://github.com/tildeio/rsvp.js)
  - [when](https://github.com/cujojs/when)
  - [q](https://github.com/kriskowal/q)

If no library is installed, attempts to export the global `Promise` (native or polyfill). The `browserify` version will always export the the global `Promise`, so polyfill as necessary.

If you have multiple libraries installed (e.g. for testing), and would like to specify one you can use the `PROMISE_IMPL` env variable.

```javascript
var Promise = require('any-promise');

return Promise
  .all([xf, f, init, coll])
  .then(fn);


return new Promise(function(resolve, reject){
  try {
    resolve(item);
  } catch(e){
    reject(e);
  }
});

```
