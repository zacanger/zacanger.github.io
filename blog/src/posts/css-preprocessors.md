---
title: CSS Preprocessors
created: 2016-01-14
tags:
  - css
  - preprocessors
  - stylus
  - sass
  - scss
  - less
  - styl
  - nib
---

Less is kind of just the same as CSS, plus mixins and variables. Yay.... It's in
Javascript. Really not a much better way to write CSS.

Sass (which is officially _not_ in all caps!) is okay. Whitespace significant
nesting, no semicolons or braces in the `.sass` format (the `.scss` is a
strict superset of CSS, and does need all the usual punctuation), it takes
variables, mixins, and partials (basically variables in a separate file), and
can do basic math in-line. It's written in Ruby, and was one of the first (if
not _the_ first) CSS preprocessors.

Stylus is really nice. It's in JS, doesn't need much punctuation, nesting is
(like Sass) based on whitespace, and it can take regular CSS. Doesn't need
braces, colons, commas, semicolons, can use in-language functions, and it's
all really optional, so you can mix and match, even in the same file. You do
need to use commas when you have selectors that look like properties (so `foo
bar baz, p span code`). The `&` refers to the parent selector(s).
Interpolation works by using `{}` around the expression, eg `-webkit-{'border'
+ '-radius'}`.

Nib is a library for Stylus, which gives you a bunch of really convenient
mixins, including browser prefixing. This has to be installed locally (no
CLI).

Styl is based on Rework (a plugin system for CSS). It's not quite as
featureful as Stylus, but it's quite a bit faster than Stylus, includes all of
Rework's features and plugins, has an executable, automatically throws vendor
prefixing on regular CSS, and can use Sass/Stylus-style whitespace (for
nesting and references to parent selectors).
