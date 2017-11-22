---
title: haskell meetup, 1 sept 2016
published_at: 2016-09-01 21:45:00
author: zacanger
tags: haskell
---

just a few random notes. most of this was way over my head.

https://github.com/pinealservo/mamedb

xml-conduit -- xml parsing

hasql - postgres lib

maybe keep all types etc in own file

cabal files: main-is Main.hs, list other of _our_ modules.

build-depends are dependencies. install with stack.

stack build is like npm i

$$ -- ?
$= -- ?

combinators from conduit

conduit is a streaming library thing

better than lazy io

there's also pipes, another group of streaming abstractions

also iostreams -- uses io

in:
```
parseMame :: MonadThrow m => ConduitM Event Machine m ()
parseMame = void $ tagIgnoreAttrs "mame" $ manyYield parseMachine
```
void is explicitly discarding the value

you can use the -> typeclass to build things, and use them as arrows,
including in type signatures.

in `rId <- insertRom -< rom`,
rom is input to insertrom ; insertrom's output is romid

stack ghci: ghci but for project

:r -- reload loaded module

11 -- oom
