# 5.0.1 - 2016-02-03

- Fixed: circular dependencies are properly detected
([#17](https://github.com/postcss/postcss-custom-media/pull/17))

# 5.0.0 - 2015-08-25

- Removed: compatibility with postcss v4.x
- Added: compatibility with postcss v5.x

# 4.1.0 - 2015-06-30

- Added: Allow custom media to reference each other
([#10](https://github.com/postcss/postcss-custom-media/pull/10))

# 4.0.0 - 2015-05-17

- Changed: warning messages are now sent via postcss messages api (^4.1.0)
- Added: automatic custom media `--` prefixing
([#11](https://github.com/postcss/postcss-custom-media/issues/11))
- Added: `preserve` allows you to preserve custom media query defintions
- Added: `appendExtensions` allows you (when `preserve` is truthy) to append your extensions as media queries

# 3.0.0 - 2015-01-29

- Added: compatibility with postcss v4.x
- Removed: compatibility with postcss v3.x

# 2.0.0 [Yanked]

_You never saw this version (this is a bad release that points to 1.0.0)._

# 1.3.0 - 2014-11-25

- Changed: better gnu message

# 1.2.1 - 2014-10-09

- Fixed: npm description

# 1.2.0 - 2014-10-01

- Added: support for multiples media in query list (ref [#rework-custom-media/5](https://github.com/reworkcss/rework-custom-media/pull/5))

# 1.1.0 - 2014-09-30

- Added: support for js-defined media queries (fix [#3](https://github.com/postcss/postcss-custom-media/issues/3))

# 1.0.1 - 2014-09-16

- Added: Allow whitespace around custom media name (fix [#2](https://github.com/postcss/postcss-custom-media/issues/2))

# 1.0.0 - 2014-08-12

✨ First release based on [rework-custom-media](https://github.com/reworkcss/rework-custom-media) v0.1.1
