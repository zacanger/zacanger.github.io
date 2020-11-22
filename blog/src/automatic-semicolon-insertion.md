---
title: Automatic Semicolon Insertion
created: 2015-12-13
starred: true
tags:
  - js
  - asi
  - semicolons
  - rant
---

This is a simplified version of the [section from the spec that deals with
ASI](http://www.ecma-international.org/ecma-262/5.1/#sec-7.9), because I'm
really tired of all the idiocy and debate about this. It's not a big deal
whether you use semicolons everywhere or don't, but the vitriol from those who
use them everywhere really needs to end, and from what I can tell it's almost
entirely based on this idea that ASI is complicated. ASI is _really simple_, and
its rules are a lot easier to remember than stupidity like `++foo` vs `foo++`,
or the rules for `this`. The actual spec's ASI section is less than two pages,
but it can be simplified further, into probably less than a page.

--------

## Automatic Semicolon Insertion

ECMAScript statements are really really basic, and if you don't know what a
statement is, you probably shouldn't be programming. A lot of statements in
JavaScript (the popular implementation of the ECMAScript standard) are
terminated by semicolons. These are:

* empty statement
* variable statement
* expression statement
* do-while statement
* continue statement
* break statement
* throw statement
* return statement

Semicolons don't need to be included in the source while writing these,
though. Why not? Because when they're parsed, semicolons are automatically
inserted. Why is this okay? Because new lines (what the spec calls a
'LineTerminator') also end statements, except in a few cases:

1. The next line starts with one of the following characters: `[ ( + * / - , .`
1. The next line starts by incrementing or decrementing a token
1. You're in a `for()`, `while()`, `do`, `if()`, or `else`, and there's no `}`
1. The statement has an unclosed paren or ends in some other invalid way (like a `.` or `,`)

Let's talk about that for a second.

Exception number four is pretty obvious, and no one has a problem with that.

Exception number three is also pretty obvious, because you're talking about
being in a block. Not rocket science.

Exception number three: If you're writing something like this, you need some
mental help:

```
i
++
j
```

ASI would turn that into:

```
i;
++j;

```

But guess what? No rational human being would write code like that, so it's
not a problem. Right? Right.

It's the first thing that people worry about, really. Which is why we like to
do semicolons at the beginning of those lines. It turns out it's a lot quicker
and easier to remember than people think. Don't write your code like a jackass
(it's not concrete poetry, dummy), and put a semicolon at the beginning of a
line if it starts with `[` or `(`. And it turns out it's a lot easier to read,
too (comma-first is another entire discussion, but what it comes down to is
that comma-first is much, much easier to read and write, so it doesn't really
make much sense not to do it).

There's also that other thing where ASI could totally break your code, and
that goes back to the "Don't write code like a jackass (it's not concrete
poetry)" bit. Imagine you're a tool, so you write:

```
function foo(bar){
  return
    bar
}
```

Well, for starters, you're weird. And ASI will do this: `function foo(bar){
return; bar; };`. It turns out there's a really super easy way around that
problem, and it's something all people do anyway because they're not horrible
human beings: don't put random newlines in your code. `return` is _always_
terminated by a newline (as mentioned above), so everyone's already aware of
this. That was easy. Same goes for `break`, `continue`, and `throw`.

The idea that putting semicolons everywhere is somehow more readable or safe
makes very little sense. I could put semicolons all over the place, and it
makes no difference.

```
function foo(){;;;;;;;;;;;
;;var bar = 'semicolons';;
;;console.log(bar);;;;;;;;
};;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;foo();;
```

Try running that in your browser console, or Node. Try running this one:

```
function foo(){
  var bar = 'no semicolons'
  console.log(bar)
}
foo()
```

See any difference?

ASI's not a new thing (it's older than a lot of people writing JavaScript
these days, actually). It's not scary, it's not unreliable, and it definitely
doesn't cause [subtle, hard to debug
problems](https://google.github.io/styleguide/javascriptguide.xml?showone=Semicolons#Semicolons),
as long as you don't write code like a jackass.

I'm basically done here. I still definitely recommend [actually reading
this](http://www.ecma-international.org/ecma-262/5.1/#sec-7.9), both because
it's a bit more verbose and because it's extraordinarily comprehensible. But
if technical literature's not your style, then maybe check [one
of](http://inimino.org/~inimino/blog/javascript_semicolons) [the
big](http://mislav.net/2010/05/semicolons/) [blog
posts](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding)
from smarter people than myself on the topic.

## TL;DR

The TL;DR here is that no one actually gives a shit how you write code in the
privacy of your cubicle, as long as it conforms to the styleguide of the
project you're working on. But the nastiness directed towards people who don't
use semicolons really has to end. The rules are stupid-simple, nearly
impossible to fuck up, and taking five minutes to get in the habit of writing
code this way actually does make things more readable. If you love your
semicolons, good for you. But don't ever tell someone their style is 'wrong'
or 'dangerous' or prone to breakage just because they spent an extra five
minutes to read two pages of the language specification. And don't be afraid
of learning the rules yourself. It's really actually incredibly simple.
