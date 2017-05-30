# enhanced-resolve

Offers a async require.resolve function. It's highly configurable.

## Features

* plugin system
* provide a custom filesystem
* sync and async node.js filesystems included


## Tests

``` javascript
npm test
```

[![Build Status](https://secure.travis-ci.org/webpack/enhanced-resolve.png?branch=master)](http://travis-ci.org/webpack/enhanced-resolve)


## Contributing

Take a look at `lib/ResolveFactory.js` to understand how everything fits together. It provides a `createResolver(options)` function and these are the possible options:

| Field                    | Default                     | Description                                                                        |
| ------------------------ | --------------------------- | ---------------------------------------------------------------------------------- |
| modules                  | ["node_modules"]            | A list of directories to resolve modules from, can be absolute path or folder name |
| descriptionFiles         | ["package.json"]            | A list of description files to read from |
| plugins                  | []                          | A list of additional resolve plugins which should be applied |
| mainFields               | ["main"]                    | A list of main fields in description files |
| aliasFields              | []                          | A list of alias fields in description files |
| mainFiles                | ["index"]                   | A list of main files in directories |
| extensions               | [".js", ".json", ".node"]   | A list of extensions which should be tried for files |
| enforceExtension         | false                       | Enforce that a extension from extensions must be used |
| moduleExtensions         | []                          | A list of module extsions which should be tried for modules |
| enforceModuleExtension   | false                       | Enforce that a extension from moduleExtensions must be used |
| alias                    | []                          | A list of module alias configurations or an object which maps key to value |
| resolveToContext         | false                       | Resolve to a context instead of a file |
| unsafeCache              | false                       | Use this cache object to unsafely cache the successful requests |
| cachePredicate           | function() { return true }; | A function which decides wheter a request should be cached or not. An object is passed to the function with `path` and `request` properties. |
| fileSystem               |                             | The file system which should be used |
| resolver                 | undefined                   | A prepared Resolver to which the plugins are attached |

The options are passed from the `resolve` key of your webpack configuration e.g.:

```
resolve: {
  extensions: ['', '.js', '.jsx'],
  modules: ['src', 'node_modules'],
  plugins: [new DirectoryNamedWebpackPlugin()]
  ...
},
```

## License

Copyright (c) 2012-2016 Tobias Koppers

MIT (http://www.opensource.org/licenses/mit-license.php)
