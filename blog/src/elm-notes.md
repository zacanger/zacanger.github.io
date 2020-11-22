---
title: 'Elm (notes)'
created: 2016-01-14
tags:
  - js
  - haskell
  - fp
  - programming
  - javascript
  - elm
  - lang
---

Differences from JS:

* Elm has multiline string support, with _triple_ sets of quotes, eg """multiline string"""
* Elm _cannot_ use single quotes for _strings_. Elm uses single quotes to denote _characters_.
* Booleans are uppercase.
* Objects use `=` instead of `:`, so `{key: value, key2: value2}` in JS would be `{key = value, key2 = value2}` in Elm.
* `point.x = 42` in JS would be `{point | x = 42}` in Elm.
* Functions are greatly simplified. `function(foo, bar){return foo+bar}` in js would be `\foo bar -> foo + bar` in Elm.
* Math is a little simpler: `Math.max(2,4)` is just `max 2 4`. Same with `min`. `Math.pow` is just `^`, eg `Math.min(1, Math.pow(2, 4))` is `min 1 (2^4)`.
* `numbers.map(Math.sqrt)` would be `List.map sqrt numbers`. `points.map(function(p){return p.x})` becomes `List.map .x points`.
* `2 < 4 ? 'WHAT' : 'how?'`, `if 2 < 4 then "WHAT" else "how?"`
* `var foo = 72`; `let foo = 72 in...`
* No return statements; everything is an expression.
* `String.length "asdf"` rather than 'asdf.length'

Mostly it looks pretty neat, but there's virtually nothing out there for actually _learning_ it, so I'm already kind of over it....

Note that the 'EventLog.elm' in this directory doesn't actually need the start-app package anymore; turns out it's really easy to just wire the damn thing up all on your own.

--------

`type` defines and names a new type. `type alias` gives a name to an existing type, like `alias` would in Bash.

Elm doesn't come witih an HTML module by default/in elm-core, so `elm package install evancz/elm-html`.

The repl doesn't support type annotations.

There's an official list of packages at http://package.elm-lang.org/ -- useful, since you have to install everything with the `user/repo` syntax.

Anything wrapped with `Debug.log "anything"` will go out to the Js console.

Seeing as so much stuff hasn't been updated for 0.16, there is actually an environment manager one could use, here: <https://github.com/sonnym/elmenv> .

The `=>` in Elm is not what you think it is. It's a shorthand for `(,)`, which is useful in situations like `["color" => "red", "padding" => "2px"]`, to avoid annoying things like `[("color", "red"), ("padding", "2px")]`.

`()` is an empty tuple, so it's like `null`, basically.

`<|` takes lower priority than functions expressed by adjacency, so it can be used instead of parens. So, `max 2 (sqrt x)` is the same as `max 3 <| sqrt x`.

To run native code that we didn't install with `elm package`, `"native-modules": true` needs to be in the `elm-package.json` file.

--------

Some additional style tips:
* Line length <= 80
* 2 sp indentation (duh)
* no trailing spaces (duh)
* newline (duh)
* do write type annotations
* do write records (etc.) with spaces between special chars
* on compilation, use `elm-make --warn`; get rid of the warnings
* for totally fresh compilation, `rm elm-stuff/build-artifacts`
* for any block > 1 line, drop it down on the first line
    * means more indentation and more lines, but is more readable
    * do the same for accompanying block, even if short
        * same reason as for the above


    type alias Foo =
      { thisWhatever : Float
      , thinyMajiggy : Float
      }

That's good!

    bar = {
      thing = 100
      stuff = 9
    }

That's no good!

Avoid nested declarations. So use type aliases for this. (So we don't get shit like `type alias Bar = { something : { name: String, stuff: Float } }`).

    quux =
      [ "okay"
      , "things"
      , "are"
      , "logical"
      ]

good!

bad:

    baz = ["okay", "nope", "gross"]

    lol = [
      "stuffs",
      "thingses",
    "et ceteras"
    ]


    doStuff this that =
      let
        something =
          mix this that
            ]> andDoThings
        thingsome =
          mix this that
      in
        [ something
        , thingsome
        ]

GOOD!

BAD:

    doWhatever you me =
      let something = andDoThings (mix you me)
          thingsome = mix me you
      in [ something, thingsome ]


use newlines for 'then' and 'else'

use newlines for the bits of a case

import modules in the following order:

1. non-exposing imports
2. explicitly exposing imports
3. imports exposing evertything

... and by 'order' i mean preference order. like:

    import Woot
    import Aw exposing (We, Tried)
    import OhDear exposing (..)


In declarations, use a newline after `=`, and use `|>`, on newlines.

All of `elm-html`'s elements are functions, with two lists as parameters. We can concat the child list with `++` (for flexibility), but when rendering we ought to map over it.


    consChildren : Modal -> Html
    consChildren model =
      div
      [
      ]
      <| [ Header.render model.title ]
      ++ renderMaybe model.subTitle
      ++ [ Footer.render model.footerThings ]

    mapChildren : List Thing -> Html
    mapChildren : things =
      div
      [
      ]
      <| List.map renderThing Things


That's quite a bit more annyoing than

    [ Header.render model.title
    , renderSubTitle model.subTitle
    , Footer.render model.footerThings
    ]

... but I hear it's worth it, since with great concat comes great flexibility.

--------

#### I GUESS AN ACTUAL SYNTAX REFERENCE MIGHT BE USEFUL, SO HERE'S A REALLY SHORT RUN-DOWN ON ELM. OKAY.


    -- comment

    {-
    multiline comment
      {-
        with another multiline comment
        inside of it
      -}
    -}

    {--} -- by removing that '}', we can toggle between commented and uncommented
    add x y = x + y
    --}

    -- bool
    True  : Bool
    False : Bool

    4     : number -- Int OR Float, depending on usage
    1.6   : Float
    'z'   : Char
    'zac' : String

    """
    This is a multiline string.
    It's handy for things that need their own quotation marks.
    One could see how "JSON" might "need" it.
    """

    "zac" ++ " anger" -- string concatenation

    -- lists: all these things are equivalent:
    [1..4]
    [1,2,3,4]
    1 :: [2,3,4]
    1 :: 2 :: 3 :: 4 :: []

    if foo > 4 then "HI!" else "bye..."

    -- records are kind of like objects in js, but without all the stupid bits
    point = { x = 2, y = 2 }
    point.x -- access it
    { point | x = 4 } -- update it

    -- functions
    square n =
      n^2
    hypotenuse a b =
      sqrt (sqare a + square b)
    distance (a,b) (x,y) =
      hypotenuse (a-x) (b-y)

    -- and anonymous functions
    square =
      \n -> n^2
    squares =
      Listmap (\n -> n^2 [1..100])

    let
      foo = 8
      y   = 8 -- this is indent-significant!
    in
      foo + bar

    isPositive : Int -> Bool -- type annotation: takes Int, returns Bool

    isPositive number = number > 0 -- function definition

    someFunc : Int -> Int -> Int -- takes two Ints, returns Int

    somefunc a b =
      let sum    = a + b -- define intermediate values let
          square = sum * sum
      in  square         -- and use them in (in)

    transformTuple : (Int, Int) -> (Float, Float) -- tuples

    transformTuple(a, b) =
      (toFloat a, toFloat b)

    (,,,) 1 2 3 -- shorthand for creating tuples

    -- chained functions, infix operators, so
    filled red (square 40) -- is identical to
    square 40
      |> filled red

    rotate (degrees 60) ((move (100, 100) (filled red (square 40)))) -- looks a little lispy, neh?
    square 40 -- here's a much less... ah... _parenthetical_ way of doing ^that^
      |> filled red
      |> move (100, 100)
      |> rotate (Degrees 60)


In every Elm file, there are default imports, things I'd basically _have_ to bring in no matter what -- elm-core stuff, I suppose, like the core-est of the core.

    import Basics exposing (..)
    import List   exposing ( List, (..) )
    import Maybe  exposing ( Maybe( Just, Nothing ) )
    import Result exposing ( Result(Ok, Err) )
    import Signal exposing ( Signal )

That's the basic shtuff, right there.

[Elm's little online editor thing](http://elm-lang.org/try) is pretty nifty.

Elm has some built-in handlers for ports:

* `title` sets page title, ignores empty strings
* `log` puts to (js) console
* `redirect` also ignores empty strings
* `favicon`
* `stdout` to node stdout, devtools console
* `stderr` as well
