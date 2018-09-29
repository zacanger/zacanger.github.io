---
title: purescript things
created: 2016-08-19
tags:
  - purescript
---

What are `@` and `=>`?

What is fixity? Is this the same as precedence?

```haskell
foo :: [a] -- in haskell would be
foo :: forall a. Array a -- in purescript, i think?
-- there's no [] in annotations, it's always Array a
-- but there is List, but you have to use Data.List instead of just []

Number -- is js number
Int -- is 32 bit -- and it's basically n | 0 (?)

Unit -- ()

main :: IO () -- would be
main :: Eff -- basically, but really more something like
main :: Eff (process :: PROCESS, fs :: FS) Unit -- or something

a <> b -- a ++ b -- concat a b

A <= B -- B implies instance of A
```

something like this is kind of right i think (what builds on what):
i
```text
      monad
  applicative   ??
    apply  bind
      functor
```

No tuples, just records. But there's a lib for tuples.

`<<<`  is `.` for rtl composition, and `>>>` for ltr

Lots of `Data.List` stuff is in `Data.Foldable` and `Data.Traversable` instead.

To export stuff: `module Foo (a, b, c) where`.
That's like `export { a, b, c }` in JS, I think.
`module Foo (..)` exports everything, I think.
