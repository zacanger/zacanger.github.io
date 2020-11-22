---
title: Thoughts On Learning Functional Programming
created: 2016-10-16
tags:
  - fp
  - js
---

Functional programming is the new hotness these days. It's also the old hotness.
It's just pretty hot, really. Everyone wants to have a more functional codebase,
and that's a good thing. Less side-effecty, easier to hold in your head, etc.;
the benefits of FP have been thoroughly espoused elsewhere. I just have a couple
of things to add about learning functional programming, especially if you're
coming from another paradigm or a mixed-paradigm language (like JS).

## You (Probably) Don't Need To Learn Another Language

Languages like Haskell are really neat. They'll change the way you think about
writing code. But you don't need to learn a classically functional language to
learn functional programming.

```haskell
module Main where
import System.Environment

main :: IO ()
main = do
  args <- getArgs
  putStrLn ("Hello " ++ args !! 0)
```

If a block of code like that looks pretty foreign, that's okay. _You can program
functionally in whatever language is most familiar to you_. Probably. If you're
a C# dev or Rubyist or something, maybe you should look into something a little
less strictly OO, but if you already write JS (for example), you don't need to
go learn about abstract algebra and what stuff like `Foo :: [Bar] -> Baz Quux`
means. Which leads into thought number two:

## A Better Type System Doesn't Make A Language Functional

Yeah, languages like Idris and Haskell and other super mathy things are great
for functional programming, but you don't _need_ super complex type systems to
program functionally. They're just, y'know, pretty nice. Look at
[Racket](https://racket-lang.org/), for example. You can have static typing
(with `#lang typed/racket`) but you don't _have_ to. Similarly, you can program
functionally just fine in plain old JS, and you can write super imperative code
in TypeScript. My point is, type systems don't make a language more functional,
they make a language have a different type system.

## Lots Of Languages Have A REPL

LISP people like to talk about their REPL a lot. Same with Haskell folks,
they'll tell you to go experient in GHCI. That's great, it really is. The REPL,
for any given language, should be one of the primary tools you use to figure
things out. But most languages have one. If you do Python, you're probably
familiar with it. Same with Ruby (irb or pry). Node's REPL, while a little
limited compared to GHCI, is still pretty fantastic. Racket's is very basic, but
if you `(require xrepl)` it ends up being very pleasant. Having a decent REPL
isn't a functional language feature, it's just a language ecosystem feature.

## Scheme Is Really Nice

I'm not a LISPer. I've just started learning Racket, which I chose because it's
very compact compared to, say, ClojureScript (which also looks fantastic, by the
way). But coming primarily from JavaScript, Scheme (Racket is a Scheme) is a
really good way to get into FP in another language. Haskell, ML, Idris, etc.,
are all awesome languages, but Scheme might be a better way to break into
functional languages for a lot of folks. Give it a shot sometime.

## If You're Brand New To FP

Check out these links.

* [FunFunFunction](https://www.youtube.com/channel/UCO1cgjhGzsSYb1rsB4bFe4Q) is
  a great YouTube channel with videos that cover the basics of FP in JS.
* [Charles Scalfani](https://medium.com/@cscalfani) has a series of posts on
  Medium that talk about a lot of the same things.
* [Brian Lonsdorf](https://www.youtube.com/channel/UCKjVLbSDoM-8-eEM7A30igA) has
  a bunch of videos and talks that will convince you that FP is the Right Way.
