---
title: 'Switch To Linux (Part One)'
created: 2015-09-27
starred: true
tags:
  - linux
  - windows
  - operating-systems
  - open-source
---

So, I enjoyed [this
post](https://medium.com/@steven_ovadia/opening-linux-even-further-13d2d6289ae0)
from Steven Ovadia, the fellow who maintains [My Linux
Rig](http://www.mylinuxrig.com/) (which, by the way, is a really great blog,
and you should definitely follow it--it's kind of like [The
Setup](https://usesthis.com/), but without all the... ah..
[fruit](https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg).

I have a couple of things I'd like to add (Steven touched on these, but some
specifics here might help win you over, if you're currently a user of a
non-free OS).

>You’re technically-inclined, but might not have a technical job. You like to
> tweak your interfaces, though.

THIS. Is this not a great way to sum up most Windows power users? The sort of
folk who maybe don't *hate* Windows 8 (I know 10's the big thing these days,
but I haven't even looked at a screenshot yet...) but definitely preferred 7
and have fond memories of XP. People who have, at some point, thought about
using [LiteStep](http://www.litestep.net/), or monitored with
[Samurize](http://www.samurize.com/modules/news/) or
[Rainmeter](http://rainmeter.net/), or ever spent some time on
Microsoft-related tags on [Customize.org](http://customize.org), or follow
[blogs full of tech tips](http://www.askvg.com/) mostly related to your
operating system. This is about you, and Linux is where you belong. You know
how much trouble it was to get Visual Styles figured out when they changed
that, and then to disable some Aero bits but retain some theme options, and to
get a regular old start menu back in 8? Isn't it frustrating that you have to
actually [install other
software](http://www.sevenforums.com/tutorials/1911-take-ownership-shortcut.html)
just to be able to delete, modify or even **see** some files on your computer?
Chances are you've spent a good bit of time doing things to improve how
Windows works for you, and that's great. You're definitely not alone;
[DeviantArt is FULL](http://www.deviantart.com/browse/all/?q=windows+7+themes)
of like-minded people who do some really fantastic stuff with Windows--and
that's just graphical stuff! Getting into heavy system modification is a
really scary thing for a lot of Windows users.

The thing is, there's no 'I REALLY shouldn't do this because Microsoft won't
like it' kind of feeling with Linux. No one's going to automatically install
broken hotfixes if you don't want them. No one's going snooping through your
computer to see if the most basic level of software came with a license
code--and no one's going to lock it down or power it off from a remote
location if you didn't pay them $40 for the OS (note: last time I bought
Windows, it was $40 for Windows 8 64-bit Pro; I have no idea what they charge
these days). If you want to change how things look, it's not just okay, it's
*easy*. I mean, seriously. `sudo su` and browse to `/usr/share/icons`; put
some icons in. Boom. Icons. If you're using a DE (desktop environment), it's
picked them up and you'll see it in your settings. If you're using a WM
(window manager), it may depend on your WM or file browser (but this is
getting a bit complicated--we'll assume you're using a DE for the moment). But
either way, once icons are there, you don't have to manually select them per
item every time you want to change something--or every time you make a visual
change to something **else**. That sounds like an absurdly simplified example,
but it serves as a good illustration of just how difficult basic things can be
on some systems.

One other quick thing, which Windows users may find a bit shocking: we
configure things with plain text. Yeah. **Plain. Text.** No funky weird files
you can't open in any editor known to man and have to install software from
shady people you met in an alley somewhere (shady internet people in a shady
internet alley, anyway) just to be able to read. What's even better is that
plain text can be simpler, faster, and better than Notepad. If you're a
[Notepad++](https://notepad-plus-plus.org/) user, props. That's just about the
most useful bit of software I ever installed on Windows 8 (or 7). Take a
gander at all the [crazy stuff you can do](https://github.com/amix/vimrc) with
arguably the most popular editor for Linux, [Vim](http://github.com/vim/vim).
Heck, you could just [install Vim](http://cream.sourceforge.net/download.html)
right now. We won't even get into
[Emacs](http://www.emacswiki.org/emacs/SiteMap)... that's like having an
entire extra operating system in your text editor. But back to configuration:
text files. I have, for example, some [nifty configs of my
own](https://github.com/zacanger/z) that I keep synced between all my
devices--nothing too fancy, not nearly on the level of [some very impressive
collections](https://github.com/paulirish/dotfiles). Our text files can be
edited with just about anything, including fancy IDEs with plugins and
databases and such, and also including simple commands issued in a terminal
(or console); we store them in uniform, sane places like
`/home/yourUserName/.configurationFileForProgram` and, for system files (all
users) `/etc/program.conf` (sometimes that'll be split into multiple files per
program--we just put all those inside a folder and tack a '.d' onto the end of
the name, like `/etc/apt/sources.list.d/`). There's no rule saying you *must*
configure things with text, and [my preferred DE](http://www.xfce.org/) has
[quite a snazzy tool](http://docs.xfce.org/xfce/xfce4-settings/start) to make
things more user-friendly. If you give the plain-text option a try, though,
you may find yourself loving it!

Okay, Mac friends. Don't think I've forgotten you. We'll call this post part
one of two; I've been wanting to get myself set up with a decent (and
self-hosted) static site/blog tool, and I think maybe writing actual
decent-length posts is a good enough reason to just sit down and find one I
like. To be continued.

OH, before I forget, you should maybe [check out the book that Steve's
writing](https://manning.com/books/learn-linux/in-a-month-of-lunches); it's
also linked in [the original
post](https://medium.com/@steven_ovadia/opening-linux-even-further-13d2d6289ae0)
that sparked this bit of blogging.
