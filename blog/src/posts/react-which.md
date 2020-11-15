---
title: Creating A React Component
created: 2016-05-05
tags:
  - react
  - es6
---

Okay so basically React changes like every two weeks and it's really tough to
know which way to do which thing.

So. Which way should you create a freaking component? These notes are more for
myself than anyone else.

Use a class if you need `this` or lifecycle methods. (An ES6 class. `class foo
extends React.Component`.)

So, `this` actually refers to that `ReactComponent`.

If you can use a function, _use one_.

This refers to a 'stateless functional component.'

These are, basically, pure functions. Which are basically **always** a good
thing.

Don't use `React.createClass`, basically ever. Use `React.Component` instead.

So basically, use a function if you possibly can. Otherwise use `class bar
extends React.Component`.

That was easy.
