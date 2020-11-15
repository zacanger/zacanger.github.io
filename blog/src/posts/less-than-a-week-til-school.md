---
title: "Less than a week 'til school..."
created: 2015-10-02
tags:
  - js
  - devmtn
  - work
  - blogging
  - meta
  - projects
---

It's pretty crazy. I'm 99% sure I'm totally not ready, not even a little bit. As
I keep saying when people ask, I know I know computers well enough, and I know I
can pick things up well enough... I'm just really unfamiliar with Javascript and
for some reason it doesn't stick well in my head. That's probably because I
don't use it much for fun. It's not the language I'd reach for for most tasks,
because (in stark contrast to most of the JS fanpersons on teh Github) I really
don't believe it should be the default for a lot of things. Javascript has
certainly outgrown the cheesy-animations-in-websites days, but why not use a
shell script to do things that a shell script would be best for, and C to do
things that should probably be done in C, and leave Javascript for doing things
best handled in Javascript? Running a big, clunky, really not all that great
engine just to handle using a language almost entirely based around working with
the web... for doing stuff in the console? It's cool and all, yeah. I think it's
really neat that I could replace most software I use with stuff installed
straight from NPM--including the window manager, even. But why would I want to?
Cool in theory, I guess, but if I'm using a tiling window manager the most
hipster I'll get is Xmonad, and if I need an audio player chances are I'll go
with (at most) MOC, not a JS clone of Mplayer.

---------

So my point here is that I don't reach for Javascript often, for fun. Even
this blog is build with Bash. I tried alot of static blog engines based on
Javascript (and Coffeescript, and Python, and even C; basically everything
except Ruby, I've probably tried--because TBH the Ruby community provides more
than enough reason to stay away from Ruby). Some of them worked, some of them
very well. All of them had one sort of major problem, though... they overdid
things. Even the 'extremely simple,' 'minimalist,' whatever types, they overdo
things. I neither want nor need 17 types of pages I can render; partials are
great but really, header and fooder are enough; I'm sorry, what EXACTLY is
Mustache doing here, and why can't they spell it with an O?; come on, do we
really need to preprocess CSS when the CSS could fit on two hand-written
pages, and is the same for every page?; etc., etc., etc. And that seems to be
the trademark of the do-everything-in-Javascript types: make **everything**
happen in JS, and default to using 'frameworks' (ahem, a tiny bit of
templating code !== a framework) rather than writing simpler things, even if
it means using twice the code and doing things half as quick.

Ergh. Anyway, I'm sick, and in quite a lot of pain. There's a website (note
the use of the suffix _site_ here) that finally has some (sort of) content, so
I'll be finishing that up today. And then, my mentor (with whom I had a video
chat yesterday--nice fellow, seems very knowledgable and friendly) recommended
working on a personal project in Javascript before arriving at
[DevMountain](http://devmounta.in), to really reinforce the concepts--and
given all of the above, I think that's probably exactly what I need. So...
maybe I'll work up a blog compiler that, y'know, is actually as simple as most
of them advertise. Markdown (does **any** implementation of Markdown default
to a line break with a newline, or do they all need two spaces?) +
header/footer partials, to HTML; automatically updated index/archive pages;
CSS doing its own thing quietly in the corner... and, I think, not a single
'<script>' anywhere in the site.
