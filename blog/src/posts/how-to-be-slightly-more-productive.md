---
title: how to be slightly more productive
created: 2016-05-31
tags:
  - sh
  - npm
  - shell
  - bash
---

one of my pet peeves is seeing people who make software for a living doing
things in incredibly slow/unproductive ways. i know everyone has their own
ways of being awesome, and most of those ways are much more awesome ways than
the ways in which i am okay at things, but still, there are better ways, and
most developers i've seen just have _no_ idea how much time they waste.

so here are just some tiny little tips. none of these are big news, none
are esoteric, none are risky, all require a little bit of work but make things
a lot faster in a very short period of time.

## bash things
you can use zsh, and that's a thing, and it doesn't suck, okay, but it pays
to be good at bash. bash is everywhere. it's the default shell on just about
every system. zsh gives you nice things, but you can get all the same nice
things in bash with just a tiny bit of work.

the number one most useful thing to do with bash is aliases, i think.
it's generally recommended that you use functions if you can, but there's
really no harm in using aliases. try these out, for example:

```
alias ns='npm start'
alias nt='npm test'
alias nis='npm i -S'
alias nid='npm i -D'
alias bn='babel-node'
```

throw these at the bottom of your `~/.bashrc` (or `~/.bash_profile` on a mac).

## npm
for that matter, there's the aliases up there... npm has a bunch built-in.
for example, you never need to type out `npm install --save-dev`
-- just do `npm i -S`.

npm gives you a million things. just read the docs sometime. or the help screens.

## the terminal
use readline stuff. ctrl-w, ctrl-a, ctrl-e, even just those, just use them. ctrl-arrow
(or option-arrow on mac) to get around between words. use these things.

set your prompt up to tell you nice stuff. i _highly_ recommend using liquidprompt
(`apt-get install -y liquidprompt` or `brew install liquidprompt`), but you can
also do all these things manually (check
[my dotfiles](https://github.com/zacanger/z/blob/master/.bashrc#L127) for examples).

pick a bookmarking system and stick with it. [there](https://github.com/wting/autojump)
[are](https://github.com/rupa/z) a [bunch](https://github.com/shyiko/commacd) of them
out there (many many more, just search). or export aliases to move to places. or you
[can](https://github.com/zacanger/z/blob/master/.bash_functions/g.sh)
[use](https://github.com/zacanger/z/blob/master/.bash_functions/ga.sh)
[mine](https://github.com/zacanger/z/blob/master/.bash_functions/gt.sh) if you'd like.

## markdown
if you don't use it, use it. if you still click around in microsoft word or google docs,
goddamn, take two minutes to learn the easiest and most popular plain-to-rich-text
lightweight-markup authoring format out there. it's the only way to write, really.

## your editor
i don't care what your editor is. i really don't. i know just enough about lisp
to not even hate emacs users. i do dislike VS Code, but mostly because of the
idiotic and transparent licensing scheme. and also because it's not a very
good editor. but the built-in debugger isn't bad (you can get all the same things
from other tools, but it is better than the ones that you can get for most other
editors for node).

whatever your editor is, take a week to learn it really well. in my case, finally
just spending some time getting _fluid_ with vim has made a huge difference.
i no longer have any other editors installed (and i tried a lot of them! i loved
[LightTable](http://lighttable.com/) and [Textadept](http://foicica.com/textadept/)
especially, and also really liked atom (but it's _slow_); brackets was a waste of
my time, sublime was okay but nonfree and there's textadept so whatever, see above
for notes on VS code; actual IDEs i tent to avoid because they're just overwhelmingly
large and in the way all the time, to me). that doesn't mean vim's the _best_ editor
(though it totally is), it just means it's the one i decided i wanted use, and it's
the absolute best tool that i have now because i'm pretty quick with it.

even if you use vs code or brackets (i'd advise you not to do so, but it's up to
you...), just take the time to learn your editor well. learn its plugin/extension/
whatever system, find or write a theme that makes things really easy on you, check
out [semantic highlighting](https://medium.com/@evnbr/coding-in-color-3a6db2743a1e#.5rffb0gto)
and give that a shot for a week, find a way to open a terminal in your editor
(because you DO need that) if it's a graphical editor, learn keybinds, learn
configs, and make it work for you. that sounds like a lot of work put into something
that's not directly **work**, but it's work invested in yourself being better
at using your tools.

laurie voss, the cto of npm, said in a [talk](https://www.youtube.com/watch?v=NWo-RIHiEJ4)
that one of the most important things you can do is be good at your editor.
he's obviously right. he's laurie voss.

## use git
this should be obvious. but, i mean, really use it. use it enough that you
learn how to use a gitconfig, templates, etc., and try out lots of different
extensions and wrappers for git (like hub, legit, ghcli, etc.). do stuff with
git. get really comfortable with git. it's important. other version control also
matters sometimes in some businesses but really really really spend some time
learning git.

## configs
([like these](https://github.com/zacanger/z))

organize yours. store them somewhere, like in a repo. because when your current
computer dies (and it will), it'll take you weeks to get things feeling decent
if you have to recreate everything manually. granted, most people don't have
dotfiles nearly as extensive as those, but you don't need to -- i'm a little bit
of a hoarder. disk space is cheap. whatever.

## stop reading blogs
k.

