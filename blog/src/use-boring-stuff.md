---
title: Use Boring Stuff (It's Okay!)
created: 2019-02-10
tags:
  - linux
---

(copy-pasted from a mastodon thread.)

i've seen this meme going around a bit that compares unix-y systems/linux
distros and categorizes them in terms of something like "actual sysadmin" to
"windows user" and i just wanna say, don't take it seriously.

i've been using 95%-ish free software for about 10 years now, including linux
on the desktop. my job is mostly working with linux stuff, including all the
hip, modern ops stuff (like containers and kubernetes and shit).

on my own computers, i've run debian, arch, ubuntu, elementary, freebsd (very
briefly), opensuse (also briefly), fedora, and lots of other debian and arch
derivatives. i am, like, sort of a professional at this stuff, since i get
paid lots of money to do it, as a living.

right now, i have five laptops. one is a mac, one runs windows 10, one has
debian sid, one has manjaro, and one has peppermint (i am not joking,
peppermint is slick). i do linux and servers and shit _for a job_ and i run
the distros that the meme says is for babies.

there's nothing wrong with using shit that just works. i use windows on one
laptop because audio software (vsts, the DAW i like) just works. i have a mac
because it Just Works with Meraki and AD and whatnot. i use boring, "babby"
distros on my personal laptops because i spend a lot less time memorizing tar
flags and compiling openssl when pacman shits itself.

as a certified professional person who does computers for a living, i'm
telling you, you don't need to use netbsd or gentoo to be good at computers.
and tbh i'd argue that if you're using gentoo at work, you're wasting your
time and your employers money, and you should just use something that works.
(nothing against gentoo, i've never actually run gentoo, i'm sure it's swell.)

i've been thinking a lot lately about Not Invented Here syndrome and too much
abstraction and always doing the cool thing rather than the thing that makes
sense, so this stuff is on my mind. i should not be spending time debugging an
in-house hacky feature flag system when we could just use a thing that's
already well-supported. and no one should run their own kubernetes, you should
just use the thing your cloud provider already has (or rancher).

and you should not be hunting down your own drivers and trying to figure out
how to get a working version of glibc on your super hip unix software
distribution.

unless that's something you're really into! if you are, that's cool, and you
should totally do that!

but if that's not why you're using linux or bsd, then fuck that, find
something stable and usable! i like watching kdramas on viki! i don't like
trying to figure out how to use curl without a libc!

anyway, there's a sunday rant for you. TLDR: use shit that works if you have
better things to do. if you have good reasons to use shit that needs help to
get it working (including just for fun!), then do that. but don't feel like a
noob if you use shit that just works. i use shit that just works. people will
pay you money if you know how to use shit that just works.

i'm also definitely not saying we should all use the same boring, stable stuff
all the time. if you're a person who hacks on really fun, low level stuff,
that's awesome! people working on wayland, for example: that's awesome! the
rest of us need you!

but if you're a person trying to just use linux on the desktop, or trying to
maintain a whole bunch of servers, or whatever, just use the boring thing! use
the boring thing until the hipster thing is the boring thing! that's okay!

it's easy to argue that the exciting new stuff won't become stable and boring
unless we all adopt it and contribute back, and i guess there's some validity
to that, but at the same time, i need to watch my korean soap operas, and i
definitely DON'T need to try to explain to the CTO that i put some hipster
distro in production because i thought we should be supporting experimental
stuff and that's why we lost a million dollars yesterday.

it's OKAY to use boring stuff, because boring stuff works.
