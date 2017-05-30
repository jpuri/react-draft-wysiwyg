# Webpack merge, tag and release process

Webpack standard Automatic versioning and CHANGELOG management, using GitHub's new squash button and
the [recommended workflow](https://github.com/conventional-changelog/conventional-changelog-cli#recommended-workflow) for `conventional-changelog`.

## Pull requests into `master`

1. When you land commits on your `master` branch, select the _Squash and Merge_ option.
2. Add a title and body that follows the [conventional-changelog-standard conventions](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md).
3. Land It!

## Cut a standard release

```sh
# npm run script
npm run release
# or global bin
standard-version
```

_This will increment the package version based on commit history from the last tag, update the changelog accordingly, commits the changes & cuts a **local tag**_

### When satisfied with the local tag, push it up to master.

```sh
# commandline
git push --follow-tags origin master
```

## Cut a pre-release

Use the flag `--prerelease` to generate pre-releases:

_Example: Given the last version of the package is `1.0.0`, and your code to be committed has `semver: patch` level changes..._

```bash
# npm run script ( name === alpha, beta, rc )
npm run release -- --prerelease <name>
```

_this will tag the version `1.0.1-alpha.0`_

## Cut a target release version imperatively like `npm version`

To forgo the automated version bump use `--release-as` with the argument `major`, `minor` or `patch`:

Suppose the last version of your code is `1.0.0`, you've only landed `fix:` commits, but
you would like your next release to be a `minor`. Simply do:

```bash
# npm run script
npm run release -- --release-as minor
```

_you will get version `1.1.0` rather than the auto generated version `1.0.1`._

> **NOTE:** you can combine `--release-as` and `--prerelease` to generate a release. This is useful when publishing experimental feature(s).

## Signing commits and tags

If you have your GPG key set up, add the `--sign` or `-s` flag to your `standard-version` command.
