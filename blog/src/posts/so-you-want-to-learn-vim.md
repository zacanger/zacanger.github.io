---
title: So You Want To Learn vim
created: 2017-07-27
tags:
  - vim
  - learning
  - education
  - editor
---

# So You Want To Learn vim

## Why Read This?

Why am I qualified to talk about this? There are _so many_ Intro To Vim
posts/articles/whatever out there, so why should you read this one?

This isn't going to be a Vim tutorial. It's more of a guide to guides and a
short overview of resources.

I've been using Vim full-time for around two years now, and used a lot of other
editors before Vim. It took me a while to figure out what I wanted in an editor,
and when I did figure it out it turned out Vim was what I needed. I'm not a Vim
expert, but I'm solid enough with it that I can be much more productive in Vim
than in any other editor. I'm writing this post in Vim because it's far more
comfortable for me now than some other thing with buttons and menus and pointing
and clicking and all that. Vim fits really nicely into the environment and
workflow I already had (entirely terminal-based).

## Do You Really Want To Learn Vim?

Are you sure? Why do you want to learn Vim? Is it because someone told you your
editor isn't a _real_ editor and _real_ programmers use Vim (or Emacs)? That's
bullshit. Real programmers use whatever tools help them be productive. If you're
already good with your editor, and it suits your needs, stick with it. You
should learn Vim if you're not happy with what you're using now. It doesn't
matter if you use Atom or Emacs or Eclipse or whatever. If you know your editor
well and can get stuff done in it, don't switch editors just because someone
said you should. Learn Vim if you're tired of how resource-heavy Atom is, or you
spend a lot of time sshed into servers, or you just haven't found something that
felt _right_ yet.

That being said, I love Vim, and if you want to learn it, and have the time to
get moving with it, I think you should. I've used loads of editors in the past
(Nano, Notepad++, Kilo/OpenEmacs, Hipper, Atom, LightTable, WebStorm, Visual
Studio, VS Code, TextAdept, Sublime Text, and probably others). They all have
their good parts and their bad parts. So does Vim, but for me the good far
outweighs the bad with Vim (and most of the bad is Vimscript, which is kind of
really rough).

## Where You Should Start

There are _loads_ of resources for learning Vim out there. A lot of them take
the form of games and such. Ignore all those. They'll only teach you the basics,
usually just of navigation and maybe two modes. They won't help you _understand_
Vim, they'll just teach you enough to be able to open it, enter text, move
around, and quit. If that's all you need in an editor, switch to Notepad or
Nano. Learning how to move and enter text is important, but it's also important
to know why things are the way they are in Vim.

## Vimtutor

Start with `vimtutor`. If you're on Linux, BSD, or Mac, you probably already
have it installed. Just type `vimtutor` in a terminal, and do the whole thing.
You don't have to do it all at once, and you don't have to do it _only_ once. I
think I've gone through it two or three times, and the first time took me three
days, doing just a bit at a time.

If you're on Windows, you'll need to install Vim manually, and then you should
have Vim available under `%ProgramFiles%\vim\vim[version]\vimtutor.bat`.

## Reading

Then read
[this](https://stackoverflow.com/questions/1218390/what-is-your-most-productive-shortcut-with-vim/1220118#1220118).
It explains a lot about how to _think_ about using Vim.

[This bit](http://www.moolenaar.net/habits.html), from the guy who wrote Vim
originally, is also worth a read.

Then go [read this](https://github.com/mhinz/vim-galore). There's a _lot_ of
information there. You don't need to remember it all, but it's a handy
reference.

If you get stuck at any point, use the built-in help (with `:h thing`, like `:h
reg`). The help in Vim is _great_, probably better than any other editor's. You
should get in the habit of checking the help before Googling something, because
the help is probably more accurate, and is also closer at hand.

## Which Vim?

Most OSs will come with some version of Vim already installed (the exception
being Windows). Chances are it's a stripped-down and/or old version, though. I
use and highly recommend [Neovim](https://github.com/neovim/neovim/), but if
that's not available or up to date for your system, make sure you're on Vim 8.
Vim 7.x is pretty old, and missing a lot of the nice things that are in Neovim
and now in Vim 8.

There are graphical versions of Vim &mdash; Gvim, MacVim, GUI wrappers for
Neovim, etc. You can use those if you want, there's nothing wrong with them. I
don't see the point in them personally, because they don't add anything except
some menus and buttons which all do things you can just do in Vim or in the
shell anyway, but some people really like them. Use the thing that makes you
comfortable.

## Other Editors

You can also get started in some other editor. Every good editor has a Vim
plugin, and I actually recommend starting this way if you're not comfortable
switching all at once. I used Vim plugins in LightTable, Atom, and TextAdept for
a few months before actually making the switch, and it made things a bit easier.
You will hit limits with those plugins, though: most of them don't have any `ex`
command support (all the things that start with `:`), and some of them (like VS
Code's) are _really_ basic.

## Configuration

It's really easy to get lost in configuration, for any editor (or any tool, I
guess). Vim is just as bad as the rest. Some people, myself included, spend way
too much time tweaking their configs. I don't recommend starting with someone
else's configs, though. They'll have opinions that don't align with yours, and
their `.vimrc` will be built for how _they_ do things not how _you_ do. I _do_
recommend cruising GitHub and looking at people's dotfiles for ideas, but don't
go with some preconfigured setup that you don't understand.

I use this [very minimal
vimrc](https://github.com/zacanger/z/blob/master/.vimrc) sometimes, when I need
to, and here's my (kinda messy)
[init.vim](https://github.com/zacanger/z/blob/master/.config/nvim/init.vim) for
Neovim.

You will need a plugin manager, eventually. I use NeoBundle, which I think is
Neovim-specific. I hear really good things about Vundle for Vim. Pathogen and
Dein are also out there, but I haven't tried either of them.

## Other Stuff

You might end up on systems that don't have Vim (like in containers). They will
probably have `vi`, though. A lot of the stuff you're used to doing in Vim might
not work in vi, but some of it will. You should read up a little bit on
[vi](http://wiki.c2.com/?ViEditor) just in case. Also read the bit on how to
pronounce it, because people will be confused if you say `veye`.

Read [this post](https://sanctum.geek.nz/arabesque/vim-koans) (and everything
else on that blog). Seriously. Even to an intermediate user, there's a lot of
good stuff to be learned.

Don't get discouraged. It took me a few weeks to get fully comfortable using a
Vim plugin in other editors, and then another few weeks after I switched
full-time to Vim before I felt like I was productive again. It's like learning
any other big new thing (a language, framework, paradigm, whatever): it takes
time. For me (and for all Vim users, I assume), that time investment has
definitely been worth it.

## Continuing Education

I make an effort to learn and practice one new thing a day (not Vim-specific; a
piece of Clojure's stdlib, Bash trick, whatever). Once you're comfortable using
Vim, I recommend doing the same. For example, take a few minutes to check out
what you can do with `c` and try to use `c` more than usual for a few days,
until you reach for it naturally when it makes sense.

There are Vim Golf sites (and a StackExchange thing, I think). These are fun
ways to learn more efficient ways to get stuff done in Vim.

Don't feel pressured to use more advanced features right away. Neat things like
macros, advanced register usage, and fancy regex stuff are all very useful, but
you don't need to know and use everything all at once. When you find yourself
doing something repetitive or annoying, that's a good time to find a better way
to do it.
