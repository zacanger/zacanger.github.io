---
title: My Problem With React
created: 2015-12-28
tags:
  - react
  - frameworks
  - libraries
  - riot
  - vue
  - js
  - angular
  - jsx
  - mithril
  - design
---

There's this
[post](https://medium.com/bread-crumbs/i-officially-endorse-react-for-president-9c103e4568d4)
kinda making the rounds lately. It's a nice post. Everything in there, I agree
with, for sure. Especially as someone who feels a lot more comfortable with Node
than with, say, Angular's mostly ungrokable
[API](https://docs.angularjs.org/api). I _get_ why people like React. _I get
React_. It's not exactly hard to pick up, anyway. It's very logical and
intuitive. And I really do like the concepts behind React. But I still have
problems with it.

* * *

Part of the problem is that React is Facebook. It doesn't matter how much
React is actually community-lead; we've seen before that when a company
owns/controls a library/framework/language, things can get hairy, sometimes,
and cause [issues](https://iojs.org/en/). Besides which, Facebook is kind of
absolute pure evil. I mean, maybe not _quite_ Google-level evil, but at least
Google provides a lot of useful tools for people. (Google also screws over
developers using their frameworks with [huge breaking changes and no upgrade
paths](https://angular.io/), but that doesn't make their suite of online tools
any less useful.) Facebook's entire business model, the way they actually
manage to stay afloat as a company, is one of exploiting their users, dumbing
them down, and selling their secrets (okay, yeah, if it's on Facebook it's not
a secret anymore, but you get what I mean). That's kinda, like, pretty shady,
man.

But, look, I get it. It's just a library. And it really is mostly
community-lead. That's pretty great. What's not so great is how some things
are implemented. I do like the _theory_ behind React. I like that it can be
used (and usually is used) just as a view. MVCs are all well and good, but
what about all the times we don't need a whole MVC framework? That's nice. I
like the data flow. I like that it's much more _naturally_ modular (or
componentized, I guess). But that doesn't mean it manages separation of
concerns. That means it manages separation of elements. Yeah, it's a paragon
of [atomic design](http://atomicdesign.bradfrost.com/), and that's really
really super nice, but the way it _does_ this isn't really really super nice.

I'm not going to go deep in and bring up examples from the hordes of
React-alikes out there, because chances are half of them will be deprecated
(or 'Enterprise', in front-ender speak) by next week. But there are a lot of
similar libraries, and some of them do React better than React does. The
biggest thing that makes them better is keeping markup, logic, and styling
_apart_. There are a lot of ways to do that and still get use a component
structure and workflow, and still work against a virtual DOM (or the real one,
that's a thing too), and still base everything on state, and still have a
fully one-way data flow. It can be done. I won't go and write up a bunch of
examples, but I will mention a few alternatives you might check out.

* [Mithril](http://mithril.js.org/) is _very_ intuitive, and has a
  super-small API. It's very easy to get up and running, and it's also very
  easy to think your way through problems, because there's so little you
  have to deal with on Mithril's end. It's an MVC framework, though, so it's
  more of an alternative for the likes of Angular than React. May be worth
  keeping an eye on, especially since Angular 2 is likely to see very little
  interest (at least for now... too many changes, and no path to
  upgrade...). Mithril is really clean, and a lot of fun. Its design seems
  very much inspired by Angular's problems, which means it mostly doesn't
  have any of those. Its syntax is still clunky and awkward, but not nearly
  as hideous and jarring as JSX.
* [Aurelia](http://aurelia.io/) is another framework--really more a collection
  of modular libraries, though. Aurelia can be used as an MV-whatever, but
  it's also easy to just use bits and pieces of Aurelia in your apps. It has
  Angular-ish two-way data-binding, but it does this more flexibly than
  Angular, and provides more options for observation. It's completely written
  in ES2016, which means you get modules, classes, decorators, etc., straight
  up. Like React, it's all about writing Javascript in Javascript; what that
  means for me, personally, is that I can write Javascript however the hell I
  want to write it: ES7, Coffeescript, or even (no, I wouldn't do this, but
  just for the sake of argument) Typescript (there are even TS starter kits).
* [Riot](http://riotjs.com/) is very much like React, and their site will tell
  you as much. They stick by Facebook's assertion that "Templates separate
  technologies, not concerns." What this means for us is that we're sticking
  with React's concepts (which are great), just not implementing them how
  React does it. This really basically solves the number one problem most
  people have with React, which is that it's absolutely hideous. They keep
  their markup and logic separate, but still in the same component, rather
  than doing things the old-fashioned way (project structures that keep all
  your controllers here, templates there, etc.). It's a lot simpler and
  smaller than React, which is kind of its point, but it does have its own
  router and event emitter. Oh, and it's not unbearably painful to write, so
  there's that. This all sounds really great, but Riot's still relatively
  young, and it hasn't attracted a significant community.
* [Web Components](http://w3c.github.io/webcomponents/explainer/) - Sure? I
  mean, yes, they are, or will be, eventually, a thing that someone at some
  point will care about again. Kinda like writing CSS in CSS, maybe. (In case
  you're not sure, that's supposed to be a joke.) Web Components will make a
  lot of the things a lot of libraries and frameworks do pretty much obsolete.
  With this option you're looking at two-way binding again, which is great if
  you want it, not so much if you don't (hey, there's no law that says that
  Javascript, a completely multi-paradigm language, can only be used
  functionally--I just happen to roll that way, personally). Web Components
  won't be performant, because you'll be dealing with the regular old DOM
  rather than a fake DOM written in JS--and there's way too much going on in
  the native DOM, all the time, for it to really be zippy. So, you could get
  templating, two-way binding, and easier custom elements, but it'll probably
  be slower than React by a good bit. Also, no one really cares.
* Angu--hahahaha, fooled you.
* [Vue](http://vuejs.org) is... so great. I really like Vue. A lot. It's just
  so... goddamn... good. It supports two-way binding, but defaults to a
  unidirectional flow. Vue updates against the _actual_ DOM, which is neat.
  React's rendering checks its virtual DOM (a representation of the DOM in
  memory), fully re-renders _that_ on state change, and then patches the real
  DOM based on the difference. That's pretty cool, but it means a lot more
  logic in your `render()` (which is acceptable, since this _is_ programming,
  after all), and if you ever want to directly control the DOM, you have to
  fight React to do it. And anyway, you'd still have to be writing your markup
  and styling in your scripts, which is gross. Vue, like Riot, is a lot
  simpler than React. Unlike Riot, it doesn't want to be React. It also
  doesn't want to be Angular, or Ember, or Polymer. It _does_ take inspiration
  from all of them, and it shows it some design decisions (Vue components and
  Polymer elements are somewhat similar, for example). It's _fast_, too. And a
  pleasure to write. Vue's single-file-component style is better at a true
  separation of concerns than React manages, since it's still fully modular
  and pluggable, but doesn't require mixing up two or three languages all in
  the same mess just to get anything done. Vue (if you couldn't tell from the
  name) is just a view layer, like React. Vue's reactive data-binding is
  simple and sensible; make changes to the data, things happen on the view, so
  there's no need to be messing around directly in the DOM. Because of how you
  separate your styles, logic, and markup in a Vue file, it's very easy to
  write each in whatever compiled/transpiled language you like. ES7064,
  YAMAHAMJADEL, StyLASS? Go for it. If there's a plugin for your build tool,
  you can do it. You will need to take a few minutes to get comfortable with
  Browserify and/or Webpack to get everything you can out of Vue, but if
  you're using React, you're probably already using Webpack, so that shouldn't
  be an issue.

I won't go on _too_ much about Vue. Maybe I'll save that for some other blog
post. It really is just downright _fun_ to write, and it makes a lot of sense.
Given the rate of growth in Vue's community (and the big names on some
projects that have used Vue so far), I think keeping an eye on Vue and taking
an hour or two to get familiar with it might be a pretty good idea.

Okay, that's only a very few technologies that do things in different, often better, and always much less hideous ways than React. That doesn't even touch on all the great libraries for reactive programming in Javascript--that's also a post for another day.

So, really I just wanna say... I don't hate React. I hate JSX, because it's
disgusting, and writing React without JSX is significantly more work than just
using an alternative. None of these has all of React's features, I think, but
some of them have some additions that are _very_ welcome, and React itself
(and the common community additions/components/libraries for React) is
actually not exactly small, at all (no, really, [React
core](https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react.min.js) 133kb,
minified, and you still need to figure out routing, state containers, and all
the other bits!), so almost all of these React-ish alternatives will load
faster in the browser. Riot, Vue, and Mithril, in particular, are a definite
improvement in most ways, though Mithril's ugly 'HTML' (and the fact that it's
a full-on framework) put it a little bit lower than the other two in my mind.

On that note... I've successfully procrastinated the entire day away, writing
this and another post on front-end performance (which is not nearly as
rambling, I promise). Yay, procrastination. Boo, I still need to read the docs
for Socket.
