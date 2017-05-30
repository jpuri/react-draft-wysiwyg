# fs-promise

[![Build Status](https://secure.travis-ci.org/kevinbeaty/fs-promise.svg)](http://travis-ci.org/kevinbeaty/fs-promise)

Proxies all async `fs` methods exposing them as Promises/A+ compatible promises (when, Q, etc).
Passes all sync methods through as values.

Also exposes to [graceful-fs][1] and/or [fs-extra][2] methods if they are installed.

Also works with [any-promise][3] library (a pollyfill, es6-promise, promise, native-promise-only, bluebird, rsvp, when, q).

```javascript
var fsp = require('fs-promise');

fsp.writeFile(file('hello1'), 'hello world')
  .then(function(){
    return fsp.readFile(file('hello1'), {encoding:'utf8'});
  })
  .then(function(contents){});
```

[1]: https://github.com/isaacs/node-graceful-fs
[2]: https://www.npmjs.org/package/fs-extra
[3]: https://github.com/kevinbeaty/any-promise
