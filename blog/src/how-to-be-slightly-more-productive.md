---
title: How To Be Slightly More Productive
created: 2016-05-31
tags:
  - sh
  - npm
  - shell
  - bash
---

One of my pet peeves is seeing people who make software for a living doing
things in incredibly slow/unproductive ways. I know everyone has their own
ways of being awesome, and most of those ways are much more awesome ways than
the ways in which I am okay at things, but still, there are better ways, and
most developers I've seen just have _no_ idea how much time they waste.

So here are just some tiny little tips. None of these are big news, none
are esoteric, none are risky, all require a little bit of work but make things
a lot faster in a very short period of time.

## Bash things

you can use zsh, and that's a thing, and it doesn't suck, okay, but it pays
to be good at Bash. Bash is everywhere. It's the default shell on just about
every system. Zsh gives you nice things, but you can get all the same nice
things in Bash with just a tiny bit of work.

The number one most useful thing to do with Bash is aliases, I think.
It's generally recommended that you use functions if you can, but there's
really no harm in using aliases. Try these out, for example:

```
alias ns='npm start'
alias nt='npm test'
alias nis='npm i -S'
alias nid='npm i -D'
```

Throw these at the bottom of your `~/.bashrc` (or `~/.bash_profile` on a Mac).

## npm

For that matter, there's the aliases up there... npm has a bunch built-in.
For example, you never need to type out `npm install --save-dev`
-- just do `npm i -S`.

npm gives you a million things. Just read the docs sometime. or the help screens.

## The Terminal

Use readline stuff. ctrl-w, ctrl-a, ctrl-e, even just those, just use them. ctrl-arrow
(or option-arrow on Mac) to get around between words. Use these things. Or check
out vi-mode.

Set your prompt up to tell you nice stuff. I recommend using liquidprompt
(`apt-get install -y liquidprompt` or `brew install liquidprompt`), but you can
also do all these things manually (check
[my dotfiles](https://github.com/zacanger/z/blob/master/.bash/prompt.sh) for
examples).

Pick a bookmarking system and stick with it. [There](https://github.com/wting/autojump)
[are](https://github.com/rupa/z) a [bunch](https://github.com/shyiko/commacd) of them
out there (many many more, just search). or export aliases to move to places. Or you
can use [mine](https://github.com/zacanger/z/blob/master/.bash/functions/g.sh)
if you'd like.

## Markdown

If you don't use it, use it. If you still click around in Microsoft Word or Google Docs,
goddamn, take two minutes to learn the easiest and most popular plain-to-rich-text
lightweight-markup authoring format out there.

## Your Editor

I don't care what your editor is. I really don't. I know just enough about lisp
to not even hate Emacs users. I do dislike VS Code, but mostly because of the
idiotic and transparent licensing scheme. But the built-in debugger isn't bad
(you can get all the same things from other tools, but it is better than the
ones that you can get for most other editors for Node).

Whatever your editor is, take a week to learn it really well. In my case, finally
just spending some time getting _fluid_ with Vim has made a huge difference.
I no longer have any other editors installed (and I tried a lot of them! I loved
[LightTable](http://lighttable.com/) and [Textadept](http://foicica.com/textadept/)
especially, and also really liked Atom (but it's _slow_); Brackets was a waste of
my time, Sublime was okay but nonfree and there's Textadept so whatever, see above
for notes on VS code; actual IDEs I tend to avoid because they're just overwhelmingly
large and in the way all the time, to me). That doesn't mean vim's the _best_ editor
(though it totally is), it just means it's the one I decided I wanted use, and it's
the absolute best tool that I have now because I'm pretty quick with it.

Even if you use VS code or Brackets, just take the time to learn your editor
well. learn its plugin/extension/ whatever system, find or write a theme that
makes things really easy on you, check out [semantic
highlighting](https://medium.com/@evnbr/coding-in-color-3a6db2743a1e#.5rffb0gto)
and give that a shot for a week, find a way to open a terminal in your editor
(because you DO need that) if it's a graphical editor, learn keybinds, learn
configs, and make it work for you. That sounds like a lot of work put into
something that's not directly **work**, but it's work invested in yourself being
better at using your tools.

Laurie Voss, the COO of npm, said in a [talk](https://www.youtube.com/watch?v=NWo-RIHiEJ4)
that one of the most important things you can do is be good at your editor. He's
right.

## Use Git

This should be obvious. but, I mean, really use it. Use it enough that you
learn how to use a gitconfig, templates, etc., and try out lots of different
extensions and wrappers for git (like hub, legit, ghcli, etc.). Do stuff with
Git. Get really comfortable with Git. It's important. Other version control also
matters sometimes in some businesses but really really really spend some time
learning Git.

## Configs

([like these](https://github.com/zacanger/dotfiles))

Organize yours. Store them somewhere, like in a repo. Because when your current
computer dies (and it will), it'll take you weeks to get things feeling decent
if you have to recreate everything manually.
