---
title: Two Things That Might Be Fun
created: 2016-11-03
tags:
  - cljs
  - clj
  - scheme
  - types
  - hs
  - jsx
  - js
  - react
---

Two things that I think might be fun to play around with, at some point.

First: a less intrusive type annotation thing for JS. It'd be similar to ML or
Haskell style annotations, but maybe use Flow as a sort of backend to actually
do the type checking? It could look something like this:

```js
//:: Int -> Int -> [Int]
const putIntsInList = (a, b) => [ a,  b ]

//::Str -> Str -> Str // or
//::[Char] -> [Char] -> [Char]
const doThingsWithStrings = (a, b) => `${a} ${b}`
```

It could use some sort of regexy thing to basically just detect anywhere there's
`//::`, see what the next thing is, and see if they go together. I don't know
much about ASTs or type systems, though. I just think that'd be a lot less
in-the-way than how TypeScript and Flow currently work. Also, my syntax
highlighting doesn't know what template strings are, so. That's gross.

Another thing:

```js
import React, { PropTypes } from 'react'
import AnotherComponent from './AnotherComponent'

const Something = ({ a, b, c }) => {
  if (!a) return null

  return (
    (div
      (another-component (whatever 'a))
        (not (null? b)
          (span (b))
        (not (null? c)
          (map (p (c)))))))
  // which would be like
  return (
    <div>
      <AnotherComponent whatever={a} />
      {b && <span>{b}</span>}
      {c && c.length &&
        c.map((a, i) => <p key={i}>{a}</p>)
      }
    </div>
  )
}

export default Something
```

This a totally made-up syntax for a thing that doesn't exactly exist, and I
don't know how useful this would actually be, since there are already great
React libraries for ClojureScript out there. Just think it'd be neat to be able
to to JSX in Scheme. I dunno, just a thought.
