---
title: purescript things
published_at: 2016-08-19 21:32:00
author: zacanger
tags: purescript
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

## what
```
z ± psci
PSCi requires the purescript-psci-support package to be installed.
You can install it using Bower as follows:

  bower i purescript-psci-support --save-dev

For help getting started, visit http://wiki.purescript.org/PSCi

z ± a bower_components/ | ag psci
purescript-psci-support/

z ± jq .devDependencies < bower.json
{
  "purescript-spec": "^0.8.0",
  "purescript-psci-support": "^1.0.0"
}

z ±

z ± pulp psci
PSCi, version 0.9.3
Type :? for help

> :l Main
Unrecognized directive. Type :? for help.
> import Main
> :t Main
Error found:
in module $PSCI
at  line 1, column 1 - line 1, column 2

  Unknown data constructor Main


See https://github.com/purescript/purescript/wiki/Error-Code-UnknownName for more information,
or to contribute content related to this error.


> :i Main
Unrecognized directive. Type :? for help.
> :t Module.Thing.functionThatIKnowIsThere
Error found:
in module $PSCI
at  line 1, column 1 - line 1, column 15

  Unknown module Module.Thing


See https://github.com/purescript/purescript/wiki/Error-Code-UnknownName for more information,
or to contribute content related to this error.


> :q
See ya!
```

kbai
