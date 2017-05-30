# 3.0.0 - 2015-08-25

- Removed: compatibility with postcss v4.x
- Added: compatibility with postcss v5.x

# 2.3.0 - 2015-07-14

* Fixed: Nested/mixed selectors now works correctly
([#19](https://github.com/postcss/postcss-custom-selectors/issues/19))
* Added: `transformMatches` option to limit transformation to :matches()
replacements.

# 2.2.0 - 2015-06-30

* Fixed: No more useless warnings for undefined non custom selectors
([#22](https://github.com/postcss/postcss-custom-selectors/issues/22))
* Changed: warnings now use PostCSS message API

# 2.1.1 - 2015-06-30

* Fixed: the lineBreak option keeping the selectors indent
([#18](https://github.com/postcss/postcss-custom-selectors/issues/18))
* Fixed: the tip of an undefined selector
([#20](https://github.com/postcss/postcss-custom-selectors/issues/20))

# 2.1.0 - 2015-06-04

* Changed: use PostCSS 4.1 plugin API
([#13](https://github.com/postcss/postcss-custom-selectors/issues/13))

# 2.0.1 - 2015-06-03

* Fixed: `(foo, bar)` conversion error exists in the selector
(See also [:matches() test](test/fixtures/matches/input.css))

# 2.0.0 - 2015-05-29

* Removed: no longer support `::` or `--` to defined a custom selectors,
you must use the syntax `:--` to define it.
([#6](https://github.com/postcss/postcss-custom-selectors/issues/6))
* Fixed: two or more consecutive hyphens in selector don't output `undefined`
([#14](https://github.com/postcss/postcss-custom-selectors/issues/14))


# 1.1.1 - 2015-04-06

* Fixed: add support for multilines definition

# 1.1.0 - 2014-12-06

* Added: "lineBreak" option

# 1.0.0 - 2014-12-06

* First release
