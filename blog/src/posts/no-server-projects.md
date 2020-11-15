---
title: No-Server Projects
created: 2015-11-07
tags:
  - angular
  - baas
  - blog
  - devmtn
  - editor
  - firebase
  - javascript
  - markdown
  - people
  - platform
  - school
---

__HELLO__, and welcome to another episode of *Zac's Blogtime with the
Blogginess!*.

This week and into next week, we (the DM7 cohort in the immersive course at
[DevMountain](http://devmounta.in)) are working on our no-server projects.
They are, basically, front-end based projects. Without servers. As you
might've guessed from the name.

----------

For my part, I'm working on a
[Markdown](https://daringfireball.net/projects/markdown/) editor. Initially it
started as a total ripoff of my favourite (and probably the all-around best)
Markdown editor on the web these days, [Dillinger](http://dillinger.io).
Dillinger is simple and beautiful and basically perfect. Two panes, one with
the actual editor component and one with a preview. It has integration with
various cloud storage options (Dropbox and the like), which is nifty, and is
also 100% [open source](https://github.com/joemccann/dillinger), so it was
very easy to dig into it and see how it all works (except for that thing where
there are literally [78 fucking
branches](https://github.com/joemccann/dillinger/branches), which is just
like... wow, people, someone please do some basic maintenance on this repo,
would you?).

What differentiates my editor (or will, when it's done), is the integration of
[jsvi](http://gpl.internetconnection.net/vi/), a really awesome script that
brings vi-like keybindings and commands to the boring old `<textarea>`. As I
get more into this, I plan on rewriting the jsvi component, bringing it down
in size and scope, and making it not-default. Right now it's not even enabled.

I also plan to write my own version of a Markdown parser. Currently I'm using
[Marked](https://github.com/chjj/marked), which is fantastic and used by just
about everything, but I'd like to implement a [JS version of Markdown
Extra](https://github.com/tanakahisateru/js-markdown-extra), but rewritten
from scratch.

All of that is in the future. right now [my
app](https://github.com/zacanger/markvi) does the basics.

I've also been working on a sort of blog platform using
[http://angularjs.org](Angular), with a [https://www.firebase.com/](Firebase)
as a temporary backend. The [project for
that](https://github.com/zacanger/44y) isn't much more than auth and posting
right now, but when combined with the Angular Markdown/vi project, I might
have something kind of fun here.

The final future component of all of this will be a desktop app, built on
[Electron](http://electron.atom.io/), using the
[Photon](http://photonkit.com/) toolkit. Though that's definitely in the
future, since it's all written in HTML, CSS, and Javascript, I think I might
be able to have something functional up by Wednesday (when the no-server
projects are due).

If this works well enough, I'd like to get rid of goddamn Firebase and work on
my own back-end. That could easily become my main 'personal project' here, and
be more than presentable to potential employers, maybe.

Anyway, these are all just thoughts. I feel completely overwhelmed with
knowledge lately, practically drowning in new information. But it's good. I'm
learning so so so much, and I know there are people here who know a hell of a
lot more than I do, but I'm also solidly in the top 10 in my cohort, or maybe
even the top five, so that's encouraging.

Bah, I'll cut this blog post as short as all the rest--it's awfully difficult
to type with one hand while managing a phone with the other and also trying to
fix myself a tuna sandwich.

I'm really really excited to be here, finally. Things are going well, and I
think I'm actually sort of making social contacts, which is extremely
important since I'm kinda tryna get myself employed here. If I can keep my
friends alive and also manage to get out of the job of playing therapist to
everyone for a little bit, I might actually accomplish real things and come
out of this as an actual developer. I think I could be really actually quite
good, if those things can happen.
