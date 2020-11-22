---
title: 'Finally almost done with Angular...'
created: 2015-11-11
tags:
  - javascript
  - devmtn
  - markdown
  - angular
  - node
---

Look. I don't have anything against Angular on, like, a philosophical level. Or
metaphysical. Or personal. I'm just not impressed. An MVC framework that makes
templating easier and makes a lot of other things much more complicated?
Client-side rendering? Bogging down browsers doing the heavy lifting so servers
can respond a little faster? Very cool features. Very innovative. The year is
2008 and Javascript is starting to come into its own. Open source front-end
libraries and frameworks are starting to pop up. Github was just founded.
Angular is epic, right?

----------

Come **ON**, people! None of this is impressive. It's almost 2016. Obviously
we need to learn things that are still in use, because that's the shit we'll
be maintaining. But let's not lie. Angular, today, is what Wordpress was three
years ago, and Java three years before that--old, outdated, heavy, and not a
lot of fun. We can stop worshipping the Angular golden calf. We can stop
pretending it's more important to learn Firebase than it is to learn
backends-as-a-service in general. We can stop spending time rewriting
Underscore and get a crash course in Lodash instead. Not that all of that is
useless--it's all valuable knowledge, to be sure--but the _attitude_ about it
isn't incredibly valuable. Technology, and especially web technology, and
**especially** front-end technology, and _**especially**_ _Javascript_...
change fast. I'm a Linux user. As much of a Suckless-minded nixer as a Debian
user could possibly be, I expect. I like old. I like stable. But I also like
convenient, fast, simple, small, and better. Is that okay?

Anyway, we're almost done with Angular.
[Markvi](https://github.com/zacanger/markvi) still lacks vi functionality, but
I've already been using it regardless--turns out I found the perfect use-case,
too: fixing the readmes for school projects. I may see about adding
synchronized scrolling to help with that... it'd be hella nice. And I still
intend to wrap the whole thing in Electron... just not until after the
no-server project presentations. Turns out getting Angular to work without
being served is a bitch and a half, and getting UI-Router to work at ALL is
just totally pointless. Seriously, ditch that shit and go back to ngRoute.
Save yourself the headache and just go back. UI-Router is buggy, weird,
unstable, and pre-alpha (both in number and in quality). Its internals will be
mostly rewritten before it reaches 1.0. Chances are its API will be the same
(or similar), but why not stick with something that's fully functional  well
supported, has better compatibility, won't be breaking itself, and doesn't eat
errors (seriously, try checking your console when routing seems to fail with
UI-Router... you'll get **nothing**) while waiting for UI-Router to be ready
for actual production use?

This school is really great. I'm learning so much that I quite literally
cannot remember a lot of it. My head is overflowing. A solid half of that is
because of the insane good luck I had in ending up with [my
mentor](http://ryanwalsh.io), probably the most (or at least second-most)
knowledgable and just flat-out _good_ developer here... and ending up with my
housemates, who happen to include not only that mentor but also [another very
capable programmer](http://bryanschauerte.com). Nothing against the school,
though. They're doing a great job, and I think it's worth the money (scratch
that, it's definitely worth the money), but they've recently(?) switched head
instructors, so there's a lot of disconnect right now between lectures and
projects, and more disconnect between projects and what's actually current
and/or correct. I've been trying to help Ryan (the mentor) tidy things up a
little bit, and maybe now that we're starting Node I'll be able to help a bit
more... but either way, the school is trying to work with a student body
that's too diverse, I think (experience-wise, that is--we could certainly use,
like, even a single minority member, and more than three women in the class
wouldn't hurt...). They can't cater to people who come in already knowing
Angular (we have one of those), people who are genuinely interested in
Javascript and are working very hard at it and do all the required work and
then some (that's a good amount of us, myself includied), AND the folks who
copy-and-paste Bootstrap stuff and can't figure out how to navigate their own
code, or people who feel like they can't get anything out of a lecture so they
simply don't come. Everybody paid the same amount to be here (I assume);
everybody's ostensibly here to get a rapid run-down on Javascript and
hopefully come out the other end a full-stack (in terms of Js, anyway)
developer. The website and student handbook and such talked quite a bit about
not waiting for people who fall behind. Why can't we actually do that? I'm not
ahead right now, but I feel like I COULD be if it wasn't for a lot of little
things inhibiting that.

Anyway. Speaking of programming... I ought to go do that. I suppose I should
build a directive and stick an 'about me' page in there or something. I'm
hoping I can take some time today to play with Webpack, Grunt, Browserify,
JSPM, SPM, Gulp, Duo, and Meteor just a tiny bit--trying to figure out some
differences between build systems/task runners/bundlers/project-level package
managers/what-have-yous/whoosey-whatsits... and maybe some thingamabobs as
well.
