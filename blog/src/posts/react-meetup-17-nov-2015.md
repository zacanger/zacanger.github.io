---
title: 'React Meetup, 17 Nov, 2015'
created: 2015-11-17
tags:
  - react
  - meetup
  - php
  - xml
  - js
  - devmtn
  - meteor
---

React:
  - Good at managing state.
  - which is to say, dynamism
  - Components, just like... everything else these days, so that's totally irrelevant.
  - virtual dom, which is not exactly facebook's anyway.
  - unidirectional data flow, which is a mouthful.
  - that is, the loop.
  - more boilerplate to run that... less boilerplate-replacer built into react?

--------

Random-ass notes and stuff.

Erm. Thus far, it's web architecture 101. Components are a thing. People don't like to refresh whole pages. Etc.

render() == render: function(){}

this.setState = important, should always use

React is a view. But, does server-side rendering. Which is much more up my
alley, because it's not making life miserable for users. We can check that out
when we check out all those other frameworks, for fun.

React is compiled.

Redux is a state container. Which actually makes sense now. Because everything
is state, in React, it seems. So, it abstracts state and manages it
independently from the front-end, which is how React _can_ do it's thing on
the server.

My god, though, React people are worse than Lisp people. Everything has to be
about how they do things better, even when they very clearly just do things at
a totally okay level.

[OH. It turns out that React looks like PHP to be because it was influenced by
XHP](https://www.quora.com/React-JS-Library/How-was-the-idea-to-develop-React-conceived-and-how-many-people-worked-on-developing-it-and-implementing-it-at-Facebook).
Which is PHP, influenced by E4X (ECMAScript with random XML all up in it). So
React is Javascript based on PHP based on Javascript based on XML. So it's
totally okay to think that it's hideous. That's good.

--------

This note, and some random (a halfway finished tiny little example app) are up
[on Github](https://github.com/zacanger/devmountain/tree/master/6/react-meetup).
I've also got an [example to-do list built on Meteor, in
React](https://github.com/zacanger/devmountain/tree/master/6/meteor-react-todos),
done just as it is in the Meteor docs.
