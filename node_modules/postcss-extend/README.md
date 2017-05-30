# postcss-extend [![Build Status](https://travis-ci.org/travco/postcss-extend.svg?branch=master)](https://travis-ci.org/travco/postcss-extend)

**A [PostCSS](https://github.com/postcss/postcss) plugin that tries to minimize the number of repeat selectors and rules you write in CSS.**



Use this plugin to:
- Define a "silent" extendable selector — a "placeholder selector" — to which you can (from anywhere in the doc) add concrete selectors from other rule sets.
- Add concrete selectors from one rule (containing the `@extend`) to all rule sets with the selector specified (or a subclass of the one specified).
- Pull in declarations in rulesets (most) anywhere in the doc (by a selector) from within `@media` statements (semi-safely)
- Extend existing media-conscious rulesets, even if some of them are within `@media` statements.


[Installation](https://github.com/travco/postcss-extend#installation) | [Usage](https://github.com/travco/postcss-extend#usage) | [Getting it Working](https://github.com/travco/postcss-extend#getting-it-working-with-postcss) | [Quirks](https://github.com/travco/postcss-extend#quirks)
--- | --- | --- | ---


The logical statement of *this* `@extend` is to "allow my parent rule to use the declarations of what I extend".
The functionality is intended to somewhat mirror Sass's `@extend` with `%` placeholders (a.k.a. "silent classes") and real rules.
Unlike Sass's `@extend`, however, this plugin (among other things) *does not allow you to extend into selector sequences*: i.e. if you want to `@extend a`, it will not go off and try to extend:
```css
#admin .tabbar a {
  font-weight: bold;
}
```
*Nor* will trying to `@extend a:hover` match:
```css
.comment a.user:hover {
  color: red;
}
```

It **will** however, try to extend selector sequences with the base-piece to work with, i.e. trying to `@extend .never` will match:
```css
.never li:first {
  color: red;
}
/*or*/
.never.ever {
color: blue;
}
```

Arguably, these limitations make this plugin both less dangerous than SASS's `@extend`, and enforce more (obviously-)predictable behaviors. However, many of SASS `@extend`'s other behaviors have been kept, or altered in such a way to allow ease of use, but not necessarily the same level of strict logical extension.
In regards to the concerns people have with Sass's `@extend`, and the problems that can arise from its use, many do not apply to this stripped-out version. However, it is by no means foolproof, and Smart Sass users often recommend to only ever `@extend` placeholders (cf. [Harry Robert](http://csswizardry.com/2014/01/extending-silent-classes-in-sass/) and [Hugo Giraudel](http://sass-guidelin.es/#extend)): *with this plugin, that recommendation is not enforced, but syntactically set apart*.

**`postcss-extend` is compatible with PostCSS v5.0+.**

> **A Note on "mixins" & "extends"**: Mixins copy declarations from an abstract definition into a concrete rule set. These `@extend`s (normally) clone a concrete rule set's selector(s) and add them to an abstract placeholder selector, or another existing rule. *This* plugin enables extends. If you would like to use mixins, as well — or instead — have a look at [`postcss-mixins`](https://github.com/postcss/postcss-mixins).

## Installation
```
npm install postcss-extend --save
```


**Public Service Announcement**: Because of [an issue with `postcss-nested`](https://github.com/postcss/postcss-nested/issues/11), if you are trying to use *both* `postcss-nested` and this plugin, you need to *use this plugin first*.


## Usage

- [Defining Placeholders](https://github.com/travco/postcss-extend#defining-placeholders)
  - [The '%' placeholder](https://github.com/travco/postcss-extend#the--silent-placeholder)
- [Extending Rules or Placeholders](https://github.com/travco/postcss-extend#extending-rules-or-placeholders)
  - [Extending Sub Classes and Sub Elements](https://github.com/travco/postcss-extend#extending-sub-classes-and-sub-elements)
  - [Extending with @media](https://github.com/travco/postcss-extend#extending-with-media)
    - [Simple declaration-pulling](https://github.com/travco/postcss-extend#simple-declaration-pulling)
    - [External Sub classes](https://github.com/travco/postcss-extend#external-sub-classes)
    - [Extending something inside @media (on the outside looking in)](https://github.com/travco/postcss-extend#extending-something-inside-media-on-the-outside-looking-in)
    - [Extending something in an @media while inside an @media](https://github.com/travco/postcss-extend#extending-something-in-an-media-while-inside-an-media)
- [Chaining `@extend`s, or Extension-Recursion](https://github.com/travco/postcss-extend#chaining-extends-or-extension-recursion)

### Defining Placeholders

With `@define-placeholder`, you associate a rule set with a placeholder selector, which you will later extend with concrete selectors. It (and its other aliases) can only be extended if it's already been declared in the document, is at the root-level (not inside anything) and *cannot be extended-out-of*.

You can also use its aliases: `@define-extend` or `@extend-define`.

```css
@define-placeholder simple-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
/* or @define-extend simple list {...} */
/* or @extend-define list {...} */
```

`@define-placeholder` at-rules, and the placeholder names (e.g. `simple-list`, above), will be removed entirely from the generated CSS, replaced by the selectors you've added via `@extend` (see example above).

##### The "%" (silent) placeholder

The "%" placeholder acts similarly to `@define-placeholder` and its aliases, with four exceptions. One, that it doesn't need to be declared before it is extended. Two, you can extend out of it (thus extending anything that extends the placeholder, or nothing if the placeholder isn't referenced). Three, it needs to be specifically targeted in the extend, for example: `@extend %simple-list`. Four, it doesn't need to be at the root in order to work - and can be inside of something else (e.g. an `@media`):

```css
%container {
  padding-left: 15px;
}
@media (--md-viewport) {
  %container {
    padding-left: 2em;
  }
}
.extendingClass {
  @extend %container;
}
```

(`@define-placeholder`'s limitations are an originally unintended feature, kept for its possible usefulness as a stricter, more controlled method of extending).

Additionally, all definitions will log a warning if they go unused, and should only contain declarations and comments: no statements (violations will also log warnings).

### Extending Rules or Placeholders

Use the at-rule `@extend` within a rule set to add that rule set's selector(s) to a placeholder (which was defined via `@define-placeholder`).

You can also use its alias `@define-extend'.

```css
.list-i-want-to-be-simple {
  @extend simple-list;
  font-size: 40em;
}
```
Rules and placeholders are extended in much the same fashion; the only real difference is that placeholders can be named most anything, whereas rules need to be extended via the same syntax in the css. For example, to extend a 'foo' class it'd be `@extend .foo`

There is only one overarching `@extend` guideline to obey: `@extend` must **not** occur at the root level, it only can be used inside rule sets.

#### Extending Sub Classes and Sub Elements

Whenever extending a rule or placeholder, you are also automatically trying to extend any subclasses or elements that have *exactly* what you selected (before a space, `.`, `:`, or `#`). For example:
```css
.potato {
  color: white;
}

.potato:first-child,
.potato a::after {
  background: brown;
}

#superfun {
  @extend .potato;
}
```
Resolves to:
```css
.potato, #superfun {
  color: white;
}

.potato:first-child, .potato a::after, #superfun:first-child, #superfun a::after {
  background: brown;
}
```
Make note that `#superfun` deletes itself, because otherwise it would have been empty brackets.

You also can still specifically extend subclasses by-themselves by calling them out explicitly.
If (in the above example) you wanted to only get `background:brown` instead of everything having to do with `.potato`, you could just use `@extend .potato:first-child;`.

#### Extending with `@media`

The bridging behavior of this plugin is by far its most dangerous, despite the steps to keep it relatively sane. Be mindful.
The logical statement of *this* `@extend` is to "allow my parent rule to use the declarations of what I extend." Thus, when within an @media rule, its behavior takes on the contingency of the rule, and instead of tacking on its parent's selectors to rules it extends (thus using their declarations), it directly brings in the declarations.

##### Simple declaration pulling

Trying to extend a rule outside an `@media` from the inside is fairly straightforward. For example:
```css
.potato {
  color: white;
  outline: brown;
  font-family: sans-serif;
}

@media (width > 600px) {
  .potato:first {
    float: center;
  }

  .spud {
    @extend .potato;
    color: red;
    font-size: 4em;
  }
}
```
Resolves to:
```css
.potato {
  color: white;
  outline: brown;
  font-family: sans-serif;
}

@media (width > 600px) {
  .potato:first, .spud:first {
    float: center;
  }

  .spud {
    color: red;
    font-size: 4em;
    outline: brown;
    font-family: sans-serif;
  }
}
```
Notice how `.spud` only takes in declarations from `.potato` that it doesn't already have. Extending will never override declarations already present while copying. Additionally, notice how `.spud` extends `.potato`'s pseudo-class (`:first`) inside the media scope by tacking onto the target rule, just like before. That's because it is scope-conscious (especially while in an `@media`).

##### External Sub classes

So what does it do when subclasses of the extended rule are also outside `@media`?
```css
.potato {
  float: left;
}

.potato:first, .potato ul:first-child {
  float: right;
}

@media (width > 600px) {
  .spud {
    @extend .potato;
    font-weight: bold;
    color: red;
  }

  .spud:first {
    background: purple;
  }
}
```
Resolves to:
```css
.potato {
  float: left;
}

.potato:first, .potato ul:first-child {
  float: right;
}

@media (width > 600px) {
  .spud {
    font-weight: bold;
    color: red;
    float: left;
  }
  .spud ul:first-child {
    float: right;
  }

  .spud:first {
    background: purple;
    float: right;
  }
}
```
First let's notice that the sub class `.spud ul:first-child` (which wasn't within `@media` originally) is created with a copy of `.potato ul:first-child`'s declaration. Meanwhile, `.spud:first` was already within the `@media` rule, and it took on the extra declaration. If there is a rule within the `@media` with exactly the same selectors as what it would create, it will just pull in declarations. Keep in mind, the same ideas apply here while "pulling in" declarations: it copies, but won't replace.

##### Extending something inside `@media` (on the outside looking in)

So what if you want to extend something that's within an `@media` from the root? It's actually fairly straightforward when you think about what that means.
```css
@media (width > 600px) {
  .spud {
    font-weight: bold;
    color: red;
  }
  .spud:first-child {
    background: purple;
  }
}

.sputnik {
  @extend .spud;
  font-weight: normal;
  font-style: italic;
}
```
Resolves to:
```css
@media (width > 600px) {
  .spud, .sputnik {
    font-weight: bold;
    color: red;
  }
  .spud:first-child, .sputnik:first-child {
    background: purple;
  }
}

.sputnik {
  font-weight: normal;
  font-style: italic;
}
```
Extending from the root, just like before, just tacks on selectors onto target rules, even into the `@media`. This stays true to the logic of *this* version of `@extend` because it's maintaining the conditionality of the declarations within `@media`.

##### Extending something in an `@media` while inside an `@media`

**Don't**. It's currently directly-disallowed in code to prevent unexpected things from happening, and will throw an error to warn you. The current expectation is that the only time the majority of users would do this is when making a mistake. That expectation remains unless someone can present a solution and a logical way of handling this (not in the native CSS parser) that is also a realistic common-use case.

#### Chaining `@extend`s, or extension-recursion

Definitely one of the more powerful features of SASS's `@extend` is here too. It does, however, come with a slight caveat that it is order-agnostic, meaning that it doesn't enforce order by only extending that which came above it. It just goes.
```css
.charlie {
  @extend .delta;
  font-weight: bold;
}
.alpha {
  @extend .bravo;
  color: red;
}
.bravo {
  @extend .charlie;
  background: blue;
}
.delta {
  color: green;
  background: gray;
}
```
Resolves to:
```css
.charlie, .bravo, .alpha {
  font-weight: bold;
}
.alpha {
  color: red;
}
.bravo, .alpha {
  background: blue;
}
.delta, .charlie, .bravo, .alpha {
  color: green;
  background: gray;
}
```
Doesn't that take a lot of computation to do though? Well, not really since it's not "true" recursion. Since we're tacking on selectors, every rule is a living record of everything that has extended it, and if we're not tacking on selectors, we're copying everything we need from the other rule. Thus, in well-formed CSS we only need to go through the CSS doc once, top to bottom.

In anti-pattern CSS (extending things yet to be declared), it will handle `@extend` recursively, but only if the extended target has unresolved `@extend` rules in it (thus, slowing down processing, but keeping it working as expected). As a bonus, there is a built-in recursive-stack tracking that both detects infinite loops, and throws warnings (in order of least-tampered css first) for every step of the infinite loop. It also does its best to still process the CSS in the infinite loop (almost always as intended).

## Getting It Working with PostCSS

Plug it in just like any other [PostCSS](https://github.com/postcss/postcss) plugin. There are no frills and no options, so integration should be straightforward. For example (as a node script):

```js
var fs = require('fs');
var postcss = require('postcss');
var simpleExtend = require('postcss-extend');

var inputCss = fs.readFileSync('input.css', 'utf8');

var outputCss = postcss()
  .use(simpleExtend())
  // or .use(simpleExtend)
  .process(inputCss)
  .css;

console.log(outputCss);
```

Or take advantage of [any of the myriad of other ways to consume PostCSS](https://github.com/postcss/postcss#usage), and follow the plugin instructions they provide.

## Quirks
As with any piece of code, it's got a few quirks. Behaviors that are not intended, and not enforced, may disappear (or be forcibly altered) with the next release, so it's useful to be aware of them.

**Order of Processing** : Currently, all of the `@extend`s being processed are run in a sequential manner from the top to the bottom of the doc. This keeps things relatively snappy, but makes it so that we have to do conditional-recursion on not-yet-declared-or-extended rules. This leads to some blatant inefficiencies when processing badly formed CSS (anti-pattern CSS). So if you want to keep processing time down, write good CSS. If you're curious if what you're writing is an anti-pattern, don't worry, it will throw a warning.

**Non-logical means of extension for `@media`** : As anyone who's aware of the complications discussed in the [SASS issue about extending across `@media`](https://github.com/sass/sass/issues/1050) would know. There is no way (known) of extending when `@media` rules are involved that is both 'clean and simple' and 'logically correct with how `@extend` is used elsewhere'. The way this plugin operates, and its logical meaning, is a blatant compromise so that it has both common use cases and easier implementation. While the current implementations will not change (without flags), such things as extending an `@media` from within an `@media` does nothing, this could possibly change in the future.

#### 'TLDR' Contention with the `@extend` [spec](https://tabatkins.github.io/specs/css-extend-rule):

- **Order of Processing/Specificity** In normal cases, the document is processed top-to-bottom; however, as a feature-fallout of the implementation, it is capable of extending in an anti-pattern (extending things yet to be declared). If what you're writing is an anti-pattern, it will throw a warning.
- **Specificity Inheritance** [Unlike example 5 in the spec](http://tabatkins.github.io/specs/css-extend-rule/#issue-bd856557), `@extend` in this plugin *will not* maintain the specificity of the rules extended to. Avoiding anti-patterns in your CSS will allow you to avoid this becoming an issue (pending browser implemenation). Does not log a warning.
- **Media-cross-media Inheritance** Attempting to extend a rule inside a media block from within another media block [is directly disallowed in the code](https://github.com/travco/postcss-extend#extending-something-in-an-media-while-inside-an-media) and will throw a warning.
- **Silent placeholders** Includes both the stricter `@define-placeholder` and its aliases for compatibility with [simple-extend](https://github.com/davidtheclark/postcss-simple-extend), and the `%` placeholder [from the spec](https://tabatkins.github.io/specs/css-extend-rule/#placeholder). As this isn't the native parser, the placeholder will be wiped from the CSS if it goes unused (as well as throw a warning).
- **Subclass inheritance** Currently doesn't log a warning for its use, as it is not stated in the spec for or against its behavior (despite it logically following). All [sub classes of an extended "base" class are extended](https://github.com/travco/postcss-extend#extending-sub-classes-and-sub-elements), creating subclasses for the extending class as a means of mimicking the inheritance of specific sub-class contingencies (like `:active`)
- **"Whiff" extension** trying to extend something that doesn't exist will log an error, and like everything else, remove the `@extend` rule.


##### Originally a fork of davidtheclark's [postcss-simple-extend](https://github.com/davidtheclark/postcss-simple-extend) (extended) by way of the included [MIT License](https://github.com/travco/postcss-extend/blob/master/LICENSE)
