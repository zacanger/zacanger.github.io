---
title: Principles and Tips
created: 2016-08-19
tags:
  - process
  - development
  - principles
  - tips
---

I'm not very experienced, and sometimes I'm pretty sure I'm not very good at
programming, but I have some principles I try to stick to that help, I think.
They're not complicated. Also some tips. These are all in no particular order.
And kind of stream-of-consciousness.

Have a changelog. This doesn't have to be something complicated. It can actually
be _really_ simple. Here's a script that'll do this for you.

```shell
#!/usr/bin/env bash
range="${1:-origin..}"
shift 1
git log \
  --no-merges \
   --format='%C(auto,green)* %s%C(auto,reset)%n%w(0,2,2)%+b' \
   --reverse "$range" "$@"
```

Write tests. Even if they're not complex, thorough tests, write them. It's a
start.

If you change things and tests break, fix the tests. Try not to break the tests.
But if you do, and it's a necessary change, fix the tests to line up with how
things work now.

Don't decrease code coverage. This goes back to 'if you write a thing, write a
test for it.'

Don't bring in new libraries/frameworks/whatever unless without good reason.

Keep all dependencies up to date. If there's a breaking change, take a day to
update your code. If there are breaking changes all the time and no easy way to
update (like codemods), get rid of that dependency.

Delete code. As much as possible. Don't keep it around 'just in case' or
something. Get rid of it.

Don't write very specific functions. And name your functions appropriately.  No
`getThisSpecificPieceOfData()`; instead, `getData(specificPiece)`. And then, if
you're going to be calling it with that specific piece of data, maybe write a
second function. But have that first one, first. `const getThisThing =
getThings(thisThing)`.

Don't stress about not knowing something. Either someone else knows it, or
literally no one around you knows it so you can be the first to figure it out,
which is cool. (I suck at this not-stressing bit, but I'm trying.)

No language or framework or library sucks. I mean, okay, some do, but most
really don't, they're just probably not what you're looking for. Even Angular
doesn't _suck_, it's just not a good fit for many many webapps. And by the same
token, not all good things are always good. React is great, but if you're doing
a little static site, screw it, just use jQuery. It's okay. No one will judge
you too harshly. And if they do, screw them, too.

Some paradigms are better than others, but no one will ever agree on which ones
are better, so it's best to just pretend that OO is great when talking to C#
people, and that FP is great when talking to Haskell people, or whatever.
Believe whatever you want to believe, and if you do decide to stick hardcore to
one way of writing code, make sure you know it _really_ well.

Use the simplest tool possible. This isn't my principle, this is a law. But
people break it all the time, **especially** in the front-end world. If you can
do it with ten lines of Bash, do it with ten lines of Bash, don't install five
dependencies to be able to do it in 40 lines of JS. (If you're on a computer
that doesn't have Bash, change or update your OS. Even Windows has Bash, now.)

Premature abstractions are just as bad as premature optimizations. Avoid, avoid,
avoid.

Being good at using a computer comes first. If you can't use the basic tools you
need to do your job, you need to learn that first. That means your hardware,
your OS, your terminal, your shell, your editor, your browser, whatever. You
don't need to go read the source and learn every hotkey and all that, but being
good with your tools means being faster and more productive, which gives you a
lot more time for thinking, reading docs, and all the other things that you
actually do most of the time when writing code.

Also, type. If you can't type well, practice. I'm a fast typist&mdash;114 wpm,
which is pretty fast&mdash;and while it hasn't made me a _better_ developer,
being able to type things quickly means I have more time to do all the things
that aren't just typing. Like thinking and reading docs.

Figure out what doesn't work, and what you don't like. That's actually pretty
easy to do. Just play with a lot of things and learn what sucks, to you.

No job is worth screwing up your personal life over. If you can't take a few
days off for important events without much warning, find a different job. You're
a developer. You're in control, in the current job market.

Don't just code. It's bad for you. Have something else. Music, woodworking,
fancy-wine-drinking, whatever. You need to get your eyes away from the screen
for a while, and get your wrists out of that position. You'll end up blind with
carpal tunnel if all you do is code all day long.

If a tool you're using isn't working out (that could be a language, framework,
package manager, OS, cloud provider, whatever), find a way to get rid of it.
That might take a while (ages, maybe), but it'll be worth it. Good tools are
worth using. Don't get yourself stuck with shitty ones. You can almost always
find a way to gradually switch over, so it's not a big immediate change for your
team or your project or whatever. If you use an editor you don't like, but
you're not sure you'd like anything else better, just try a different editor.
Maybe try a different one every two weeks, 'til you've picked one.

Laptop screens aren't great. Get a decent monitor for at home. Just do it. It's
worth it. Also a decent mouse, if you use a mouse. If you have a laptop with a
crappy keyboard, treat yourself to a nice keyboard. All these things make a
difference.

No language is great.  No one has ever written a language that's just perfect.
Anyone who claims their language is provably superior in all ways to your language
is either an idiot or trying to sell you something. No one will ever write a
language that's great for everything in all ways, either. So just find one that
works kind of okay in a way you feel like you can live with, and go with that.
Doesn't matter if that's Smalltalk, ML, Jelly, or Brainfuck. If you can be
productive in it and it works for the thing you're making (and for your team),
do that, and screw the haters.

Don't live on energy drinks, pizza, and IPAs on Friday nights.

I'm a little off-topic now I guess, so, that's all.
