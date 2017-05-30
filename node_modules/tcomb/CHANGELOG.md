# Changelog

> **Tags:**
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]

**Note**: Gaps between patch versions are faulty/broken releases.
**Note**: A feature tagged as Experimental is in a high state of flux, you're at risk of it changing without notice.

# v2.7.0

- **New Feature**
  - `lib/fromJSON` module: generic deserialize, fix #169
  - `lib/fromJSON` TypeScript definition file
- **Bug Fix**
  - t.update module: $apply doesn't play well with dates and regexps, fix #172
  - t.update: cannot $merge and $remove at once, fix #170 (thanks @grahamlyus)
  - TypeScript: fix Exported external package typings file '...' is not a module
  - misleading error message in `Struct.extend` functions, fix #177 (thanks @Firfi)

# v2.6.0

- **New Feature**
  - `declare` API: recursive and mutually recursive types (thanks @utaal)
  - typescript definition file, fix #160 (thanks @DanielRosenwasser)
  - `t.struct.extend`, fix #164 (thanks @dzdrazil)
- **Internal**
  - split main file to separate modules, fix #158
  - add "typings" field to package.json (TypeScript)
  - add `predicate` field to irreducibles meta objects
- **Documentation**
  - revamp [docs/API.md](docs/API.md)
  - add ["A little guide to runtime type checking and runtime type introspection"](docs/GUIDE.md) (WIP)

## v2.5.2

- **Bug Fix**
  - remove the assert checking if the type returned by a union dispatch function is correct (was causing issues with unions of unions or unions of intersections)

## v2.5.1

- **Internal**
  - `t.update` should not change the reference when no changes occur, fix #153

# v2.5.0

- **New Feature**
  - check if the type returned by a union dispatch function is correct, fix #136 (thanks @fcracker79)
  - added `refinement` alias to `subtype` (which is deprecated), fix #140
- **Internal**
  - optimisations: for identity types return early in production, fix #135 (thanks @fcracker79)
  - exposed `getDefaultName` on combinator constructors

## v2.4.1

- **New Feature**
  - added struct multiple inheritance, fix #143

# v2.4.0

- **New Feature**
  - unions
    - added `update` function, #127
    - the default `dispatch` implementation now handles unions of unions, #126
    - show the offended union type in error messages

# v2.3.0

- **New Feature**
  - Add support for lazy messages in asserts, fix #124
  - Better error messages for assert failures, fix #120

  The messages now have the following general form:

  ```
  Invalid value <value> supplied to <context>
  ```

  where context is a slash-separated string with the following properties:

  - the first element is the name of the "root"
  - the following elements have the form: `<field name>: <field type>`

  Note: for more readable messages remember to give types a name

  Example:

  ```js
  var Person = t.struct({
    name: t.String
  }, 'Person'); // <- remember to give types a name

  var User = t.struct({
    email: t.String,
    profile: Person
  }, 'User');

  var mynumber = t.Number('a');
  // => Invalid value "a" supplied to Number

  var myuser = User({ email: 1 });
  // => Invalid value 1 supplied to User/email: String

  myuser = User({ email: 'email', profile: { name: 2 } });
  // => Invalid value 2 supplied to User/profile: Person/name: String
  ```


## v2.2.1

- **Experimental**
  - pattern matching #121

# v2.2.0

- **New Feature**
  - added `intersection` combinator fix #111

    **Example**

    ```js
    const Min = t.subtype(t.String, function (s) { return s.length > 2; }, 'Min');
    const Max = t.subtype(t.String, function (s) { return s.length < 5; }, 'Max');
    const MinMax = t.intersection([Min, Max], 'MinMax');

    MinMax.is('abc'); // => true
    MinMax.is('a'); // => false
    MinMax.is('abcde'); // => false
    ```

- **Internal**
  - optimised the generation of default names for types

# v2.1.0

- **New Feature**
  - added aliases for pre-defined irreducible types fix #112
  - added overridable `stringify` function to handle error messages and improve performances in development (replaces the experimental `options.verbose`)

## v2.0.1

- **Experimental**
  - added `options.verbose` (default `true`) to handle messages (set `options.verbose = false` to improve performances in development)

# v2.0.0

- **New Feature**
  - add support to types defined as ES6 classes #99
  - optimized for production code: asserts and freeze only in development mode
  - add `is(x, type)` function
  - add `isType(x)` function
  - add `stringify(x)` function
- **Breaking change**
  - numeric types on enums #93  (thanks @m0x72)
  - remove asserts when process.env.NODE_ENV === 'production' #100
  - do not freeze if process.env.NODE_ENV === 'production' #103
  - func without currying #96 (thanks @tmcw)
  - remove useless exports #104
  - drop bower support #101
  - remove useless exports
    * Type
    * slice
    * shallowCopy
    * getFunctionName
