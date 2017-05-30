## 2.3.1 (2016-03-16)

- Updated: Allow any direct nesting that follows the syntactic constraints
- Updated: PostCSS 5.0.6
- Updated: Tests
- Updated: Dependencies
- Updated: Project configuration

## 2.3.0 (2016-02-20)

- Updated: JavaScript formatting, linting, tests, and documentation
- Updated: Properly concatenate at-rules with or expressions
- Updated: Update internal plugin name to postcss-nesting

## 2.2.0 (2016-01-30)

- Added: Nesting of all at-rules
- Updated: Direct nesting order maintains order
- Updated: Tests and documentation

## 2.1.1 (2016-01-03)

- Updated: Project conventions

## 2.1.0 (2016-01-03)

- Added: Support for valid direct nesting

## 2.0.6 (2015-10-15)

- Fixed: Issue with new PostCSS rules

## 2.0.5 (2015-10-12)

- Updated: Nested rules source map to the parent rule
- Updated: PostCSS 5.0.9
- Updated: Tests and documentation
- Updated: Project configuration

## 2.0.4 (2015-09-23)

- Updated: Map source raws

## 2.0.3 (2015-09-22)

- Updated: Refactored plugin
- Updated: Tests
- Updated: PostCSS 5.0.6

## 2.0.2 (2015-09-16)

- Fixed: Issue where the new rule’s children were not mapped to the parent internally

## 2.0.1 (2015-09-16)

- Fixed: Issue where  a `@nest` rule followed by another bubbling at-rule would not bubble
- Added: CONTRIBUTING.md

## 2.0.0 (2015-09-16)

- Added: Requirement of `&` per the specification
- Added: New prefix option
- Added: `@document` and `@supports` as bubbles
- Updated: Documentation

## 1.0.0 (2015-09-15)

- Added: New `@nest` at-rule syntax
- Updated: PostCSS 5
- Removed: Old inner bracket syntax

## 0.1.0 (2015-06-17)

- Added: Initial release
