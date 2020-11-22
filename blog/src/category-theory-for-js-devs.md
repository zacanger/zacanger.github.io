---
title: Category Theory Notes
created: 2016-11-26
tags:
  - fp
---

# Category Theory for JS Devs

Notes taken while watching [this
series](https://www.youtube.com/playlist?list=PLwuUlC2HlHGe7vmItFmrdBLn6p0AS8ALX).

## Contracts

Basics of type checking.

```javascript
const str = a => {
  if (typeof a !== 'string') throw new TypeError('Expected a string')
  else return a
}
```

## Guarded Functions and Categories

Functions that have contracts on input or output are called _guarded_
functions.

An _any_ function might just look like an identity function (`const any = a =>
a`).

Maps between categories are functors.

The _objects_ of categories are the _contracts_. _Morphisms_ are the (guarded)
functions.

Function that returns a contract:

```javascript
const typeOf = type => a => {
  if (typeof a !== `${type}`) throw new TypeError(`Expected ${type}!`)
  else return a
}
```

And basic usage:

```javascript
const bool = typeOf('boolean')
const num  = typeOf('number')
// etc.
// Obviously, for arrays you'd need to use Array.isArray()
```

Then we could do something like

```javascript
const increment = a => {
  a = num(a)
  return a + 1
}
```

Before I go further I should mention that yes, I have heard of Flow and
TypeScript.

```javascript
const increment = (a: number) => a + 1
```

I assume this video series will get to actual type systems at some point,
though it was made before TypeScript and Flow were written, so it won't be
mentioning those.

## Array Contracts

Not using `isArray` or `instance of`. Using `toString`.

```javascript
const arr = a => {
  if ({}.toString.call(a) !== '[object Array]') throw TypeError('Expected array!')
  else return a
}
```

The same thing could be done for `Date`, `RegExp`, etc.

## Functors

Takes a maps the contract over the things array. Will throw if they're not all
correct. Ensure that your array is, for example, all Strings, or whatever.

```javascript
const arrayOf = contract => things => arr(things).map(c)
```

This acts on the category's _objects_ and _morphisms_ both, and produces new
objects and new morphisms.

## Maybe

The _Maybe_ functor.

`Maybe` is a Monad, but I guess we're only thinking of its Functor-ness for
this video?

Anyway here's some code.

```javascript
const Maybe = () => {}
Maybe.prototype.getOrElse = function (a) {
  if (this instanceof Some) return this.a
  else return a
}
// the above: maybe something getOrElse what to do if none

const None = () => {}
None.prototype = Object.create(Maybe.prototype) // all instances of None are an instance of Maybe
None.prototype.toString = () => 'None'
const none = new None()

const Some = function (a) { this.a = a }
Some.prototype = Object.create(Maybe.prototype)
Some.prototype.toString = function () { return `Some(thisa)` }
const some = a => new Some(a)

const maybe = c => m => {
  if (m instanceof None) return m
  else if (m instance of Some) return some((m.a))
  else throw new TypeError('Expected None or Some a!')
}
```

## Unit and Flatten

```javascript
const arrayOfUnit = contract => (
  a => {
    a = contract(a)
    return arrayOf(contract)([a])
  }
)

const maybeUnit = contract => (
  a => {
    a = contract(a)
    return maybe(contract)(some(a))
  }
)

const arrayOfFlatten = c => (
  a => {
    a = arrayOf(arrayOf(c))(a)
    const r = []
    const l = a.length
    for (let i = 0; i < l; ++i) {
      r = r.concat(a[i]) // ew wtf is this guy doing?
    }
  }
)

const maybeFlatten = c => (
  a => {
    a = maybe(maybe(c))(a)
    if (a instanceof Some) {
      a = a.x
    } else if (a instanceof None) {
      a = a // why? if it's not Some, it _must_ be None.
    }
    return maybe(c)(a)
  }
)

// oh god what is even happening right now
Array.unit = a => [a]
Maybe.unit = some
Array.prototype.flatten = function (c = any) { return arrayOfFlatten(c)(this) }
// he literally has if (c === void 0) c = any
// but this isn't the 90s so

// apply given functor twice to a contract
const twice = f => c => f(f(c)
const once = f => f // what the actual fuck, this is id..
```

Okay, I'm done, I tried. there are like 20 more videos in this series but it's
so badly done and there are so many mistakes and the guy talks so slowly that
I just can't do this anymore.

If anyone knows of a decent intro to category theory for JS devs, please let
me know.
