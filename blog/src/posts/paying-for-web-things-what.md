---
title: Paying For Web Things? What?
created: 2015-09-29
tags:
  - meta
  - bookmarking
  - pinboard
---

Another not-new post; from when I signed up for Pinboard, about a month ago.

### I Don't Know What I'm Doing

I've never actually paid for online services. I don't really see the need to; if
there's something that looks nifty, I'll usually figure out a way to do that
thing myself. I'm really hoping Pinboard is going to be worth it. Not that the
money is actually a big deal, or even, like, a little deal. $25 is nothing,
especially spread over a year, and especially taking into account how much more
productive I'll hopefully be without spending hours every week just trying to
access bookmarks (some of which I actually do need).

So this'll be the first test. What implementation of Markdown are we using,
here? Let's find out.

---------

(You didn't need to see all that. I just checked with the full syntax
references from a few different kinds of md. Looks like we're using [the
original](http://daringfireball.net/projects/markdown/syntax.text), here.
Which is fine, of course, though I wouldn't've said no to some nice table
support.)

I didn't even know this had notes, though. So that's just a bonus. I'll have
to check the API docs in a minute and see if there's an easy way to grab them;
eventually I'd like to move to syndicating everything *out* rather than *in*,
but for the moment having a way to post on one service and it be automatically
cross-posted to equivalents is pretty basic, and essential in any public (or
optionally-public) (micro)blogging thingamajig.

That's really not super important, though. The real question is, how's the
full-text search? That's why I'm here. Because I have just about 80,000
bookmarks. I'm fairly certain only about 20,000 of them are **real**
bookmarks, and Chromium's totally screwed-up way of syncing left me with an
absurd amount of duplicates. There's no way I can delete them all, though.
Using an actual in-browser bookmark manager isn't an option,
obviously--browsers aren't database tools, they just have to deal with
databases sometimes--and some really great addons/extensions that've come in
handy in the past are basically worthless once your numbers reach around 5k.
Doing it manually would be totally fine except it's not, apparently. Have you
ever tried to open a really really really large text file and work with it? If
you're a Microsoft user, you don't even need to think about that--of course
not! Notepad can only handle a few megs or something, right? I've managed to
export my bookmarks a few times over the past couple of weeks and get them up
in one editor or another to try to fix things. This new laptop was promising
(no, I didn't get it just to work with my bookmarks). Four times the RAM and
twice the processing power? Hells yes, thought I! But hells no, thought my
computer. I'm not any good with sed, awk, or regular expressions; I'm chained
to screen editors. I'm sure there's [some ridiculous keyboard
sequence](http://xkcd.com/378) out there that could help me. I'm sure I could
learn a language that seems to be mostly based on parentheses, masochism, and
egos just to be able to do anything. But I already have an operating system,
so I don't really need a new text editor, thanks. I know the Vimfolks probably
have a plugin for that... but generally speaking I like my editors to be
smaller than full-featured Webkit web browsers (Vim: ~7=840k SLOC,
Qutebrowser: ~32k, [source](http://openhub.net) ). Oh, and I don't know any
query languages, because no thanks. SO...

LightTable ended up being my best option, actually. Better than any simpler
graphical text editor (that still supported search-and-replace) using a
variety of widget toolkits (by the way, I don't know how anyone manages to use
Atom productively--running a text editor that wants to be an IDE on JavaScript
means having a text editor with built-in git that's even slower than Chrome,
apparently); and forgoing Vi(m) and whatever-macs means getting into some
really DOS-ish terminal/console editors... or some really basic ones. Though I
gotta say, DAV is a pretty great break from dealing with major problems
like... line numbers... or colour... or features. Seriously, it's perfect for
Markdown.

This little test of a note actually took a really long time to write because:
- I had to look some things up
- I got distracted
- Managing dotfiles so I can just handle them in git for all machines
- People who use Emacs apparently don't understand how sane people use the web
- Exporting bookmarks
And with that in mind, I'mma (manually) cross-post this to Tumblr, and then
hopefully upload about an 80MB HTML file to Pinboard for processing. Oh geez.
