---
title: Projects, projects, projects.
created: 2015-12-15
tags:
  - devmtn
  - markvi
  - projects
  - editor
  - electron
---

I haven't really mentioned what I'm actually doing here, yet, a whole lot. Well,
it should be pretty obvious, but it's mostly cramming as much Javascript into my
head as I can possibly handle. THen forgetting some, then relearning it. Lots of
that, over and over again, until eventually a good bit starts to stick. For a
really large list of the stuff I've been working on, I have some public repos on
[my Github](https://github.com/zacanger). The pertinent ones would be the actual
[DevMountain assignments and small
projects](https://github.com/zacanger/devmtn.git), and the [repo full of
extras](https://github.com/zacanger/excerpts-and-excersises.git), things I
wanted to learn or messed around with or whatever, since I've been here.

The bigger things are the no-server and personal projects--and in my case, my
personal project is (at least conceptually) based on the no-server project
(which was, as it sounds, just client-side Angular app.)

![Markvi](http://zacanger.com/blog/assets/img/markvi-1.jpg)

--------

This was my no-server project. It's a markdown editor with realtime preview,
based on [Codemirror](https://codemirror.net/), and very unoriginal. The most
interesting thing about it is its vi-like keybindings (which weren't even
working at the time of no-server projects). The editor is available [on
Github](https://github.com/zacanger/markvi) and installable [straight from
NPM](https://www.npmjs.com/package/markvi) (`npm i markvi && cd
node_modules/markvi && npm start`). I kind of like it, how it is, just storing
your docs in localstorage, but having decided to scratch the
Tinder-for-the-unemployed idea (only partially because [it's already been
done](http://www.jobrapp.com/)), I figured since I've got no other ideas and
don't like the idea of just building an Amazon clone (if someone really needs
that before making a hire, it wouldn't take an absurd amount of time, anyway),
I'd go further with Markvi, and maybe actually finish the damn thing.

![Another view of Markvi](http://zacanger.com/blog/assets/img/markvi-2.jpg)

As it stands, it's not broken, and now it saves to my (live and hosted!)
~~database~~ document store. I still can't get behind calling Mongo a
database, since it lacks all of the things that make databases useful (and, to
be fair, all of the things that make them horrible). Anyhow, it meets the
requirements for the personal project (MEAN stack, two collections, one ref,
preferably not totally broken), but my cohort seems to be full of very
ambitious people. I knew that we, as a group, would be significantly more
impressive than the previous cohort, but I didn't quite expect to get to a
point where I'd feel... slow.

![as yet unnamed blog app](http://zacanger.com/blog/assets/img/ayuba.png)

So, this is where I'm headed. A native(ish) desktop app, built on either
[Electron](http://electron.atom.io) (formerly Atom-Shell) or
[NW.js](http://nwjs.io/) (formerly Node-Webkit). That end of things currently
is halfway okay--posts post, the database stores them, but for whatever reason
(the reason is Angular. I blame Angular. Or at least UI-Router, which is still
a gigantic fuckwad of uselessness when it comes to stability or debugging.)
some things just don't render, or render very poorly. It's progress, though!
There's a searchable index of all saved posts for a user (who, right now, is
only authenticated the old-school way, though it should be as quick as
uncommenting a few lines to get Twitter, Github, Google, and Facebook auth
working), though the live filtering of tags isn't working as planned, so I've
temporarily re-removed that from the app. I'm leaning towards Electron, not
exactly out of preference, because I'm neutral to both of them, but just
because its popularity (and the popularity of things based on it, like certain
editors on the market) means it's a lot easier to find good examples,
generators, packagers, and projects I can tear apart and study. I'm also on
the fence about which editing component to use... the stable/production
version of Markvi is using Codemirror, but the more I play with them, the more
I really enjoy the Ace editor. It's heavier, but it feels more solid and
dependable (and I'm biased, since I really like my [C9](https://c9.io/)
editor/dev box). Seems like a better API and larger community support, too.
Codemirror's great, it really is, and obviously [the guy who wrote
it](http://marijnhaverbeke.nl/) is absolutely brilliant, but Ace just feels
more natural, or something. I don't actually have a great reason for that.

That whole project is also available [on
Github](https://github.com/zacanger/ayuba.git), under the temporary name of
_"As Yet Unnamed Blog App"_. As always, anything that's mine is totally under
whatever license you feel like at the moment (the WTFPL and DBAD are personal
favourites, and they boil down to the same thing, legally: do whatever the
fuck you want, but don't be a dick about it), and if anyone happens to see
this and spot some problems in my code (or solutions to getting things to look
right in Electron?), I'm definitely open to PRs.

Oh, and yeah, I have heard of Ghost. Hush. Ghost doesn't come in a
fully-offline cross-platform binary. Neither does mine, yet, but after the
project presentation (Monday! Eeeeeek...), I'd like to switch to a
filesystem-based store, instead of Mongo (which takes a minimum of 300 megs
for its journal file, unless otherwise specified at the command line), or
maybe a [MiniMongo](https://www.meteor.com/mini-databases) or MiniRedis type
of thing (which would be a good excuse to actually use
[Meteor](https://www.meteor.com/), which I like almost as much as I love
[Vue](http://vuejs.org/))... so if I could cut it down to less than a hundred
megs or so total, once wrapped, it could be something... different. I might
even use it, who knows. Whether Ace or Codemirror-based, it'd have a lot of
room for expansion to other languages (another area where I think Ace would do
better than Codemirror, because of Cloud9's support and plugin community).

OKAY. That's all, that's my update. Again, [here's my
editor](http://devpost.com/software/markvi) as it currently stands, totally
useable, just click through or `npm i markvi && cd node_modules/markvi && npm
start` and... basically, wish me luck. (As usual, this is said knowing exactly
how many people read this blog--I don't even read the thing, so that's exactly
zero). It's really more of a journal so I have some idea of what the hell I
was doing when I messed up X or how I managed to do Y, than anything else.
Whatever.
