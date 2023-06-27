---
title: Monads, Monoids, Monoids, and JavaScript
created: 2023-06-26
tags:
  - fp
  - javascript
  - monads
---
[TOC]

### Introduction

[A monad is just a monoid in the category of endofunctors](https://books.google.com/books?id=MXboNPdTv7QC&pg=PA138&printsec=frontcover&dq=%22monoid+in+the+category+of+endofunctors%22+mac+lane&newbks=0&hl=en&ovdme=1&ov2=1&ovso=1#v=onepage&q=%22monoid%20in%20the%20category%20of%20endofunctors%22%20mac%20lane&f=false). What's the problem?

> huh?

Well for starters, that's a misquote. It's close enough for memes, but missing
something important: a monad in some category is a monoid in the category of
endofunctors in that category.

### Definitions

What's a category? Well it's a class (in the regular-English sense), or a
collection of objects (again, not in the OO sense necessarily), or some other
word you could find in a thesaurus, which has elements that are similar in
certain ways, particularly in their morphisms.

And what's a morphism? Because that's a good word to know. It's an arrow. What's
an arrow? Oh, well it's a map, or something similar (like the JS array method).
Why is this a good word to know? Because functional programming people like to
read PhD math papers and talk about this stuff at meetups, because it's more
interesting and makes you sound smarter than complaining about CSS or how your
SREs don't want you to use that new database platform you saw on Hacker News
that only has 3 stars on GitHub but it looks really cool why is the ops team
like this....

Anyway, what does this have to do with monoids? Monoids are a concept from
category theory, which is math, and in math they use terms like this.

Morphisms are composable, like roads. If you take the train north and then
transfer to a bus that goes east, you could've probably driven to the same point
along a different route. You composed two routes to make one.

Morphisms can also bring you back home: you can ride the bus north from my
house, wait for it to turn around, then get off and go back home (or do the same
thing by car in a quarter of the time, but that'll be a waste of fuel). If you
do that, it's called an _endomorphism_ (if you took Latin in 7th grade, like me,
well now you finally have a chance to use it!). The identity function
(`id = a => a`) is exactly that.

You can use functors to get from one shape of thing to another shape of thing
(categories!). And like morphisms, you can map from a category back to itself.
This is called (can you guess?): an endofunctor. (Are there exofunctors? Yes,
but you probably won't see them a whole lot unless you're dealing with
type-level programming, so don't worry about it right now.)

Okay so you know what endofunctors are. What's a monoid? It's got that
endomorphism we talked about (identity), plus an associative property (basically
meaning if you move parenthesis around in a math version of the thing, it
doesn't change stuff). There are some exceptions because math, but it's not that
big of a deal, don't worry about it. In the JS world, some monoids are string
concatenation (it's `id` with an empty string!), basic math (use 0 or 1 to get
the equivalent of `id`), or composition (use the `id` as one or more of the
composed functions to get an `id` for the result of one of the other
functions!).

> Wait, what? Now you're adding in stuff, you didn't talk about things like 0
> and placeholder functions....

Oh yeah sorry, that's the zero value. It's 0, or 1, or an empty string, or id,
or whatever, depending on your type and your operation. In some languages you'll
have to figure it out for yourself. Usually there's a library for it. Go
(surprisingly) actually has pretty good defaults, mostly.

Okay moving on, what exactly is a monad anyway? Well, a monad is a box, but with
some rules. It's a monoid (a thingy with identity and associative properties) in
the category of endofunctors (functors that can arrow from a bit of stuff back
to itself; again, that's basically all the functors you'll ever see IRL). It's a
useful little thing with a lot of confusing talk about it that lets you do a
couple of important tasks: map from one thing to another (JS `.map`) and compose
stuff (with something similar to `.bind` and compose in FP libraries, and the
`id` we defined earlier, also called `unit` in some languages, but not to be
confused with `()` which is also called unit, and is more like a `void` or "this
is gonna perform some side effects and I expect undefined back." Do we need a
UML diagram? I'm bad at UML.).

### Examples

Okay this is confusing. Here's a monoid:

```javascript
const concatButWithExtraSteps = {
  // depends on data type and operation!
  emptyValue: "",
  // or a + b, or a.concat(b), or [...a, ...b], or { ...a, ...b }, and so on
  concat: (a, b) => `${a}${b}`,
}
concatButWithExtraSteps(
  concatButWithExtraSteps.emptyValue,
  "this is complicated"
)
```

And an endofunctor:

```javascript
;[1].map(x => x)
// okay a better example
const endoFunctorsForDicts = (o) => (f) =>
  Object.entries(o).reduce((prev, curr) => {
    const [k, v] = curr
    prev[k] = f(v)
    return prev
  }, {})
endoFunctorsForDicts({ foo: "bar" }, (s) => s + " baz")
```

And here's [a monad](https://kjaer.io/a-monad-is-not-a-burrito/):

```javascript
const finallyAMonadExample = (a) => ({
  // also called flatMap sometimes, not to be confused with mapping and
  // flattening
  // also called chain, or some other names
  bind: (f) => f(a),
  // call a function on your value and then throw it back into this kind of
  // monad. also called fMap, not to be consfused with flatMap. okay now i see
  // how this can get confusing
  map: (f) => finallyAMonadExample(f(a)),
  // ooh here's something you can actually use right away!
  concat: (b) => finallyAMonadExample(`${a}${b}`),
  // this is for unwrapping, getting your value back out of the monad
  // good for debugging. not essential for making a monad
  getTheThing: () => a,
})
```

Sometimes you'll see a `.of` "constructor" to indicate that you're using a
monad. Doesn't matter, not important, just a convention, no one cares because
we're all too busy trying to replicate Figma designs using Bootstrap 3 and
complaining about the DBA not giving us dev creds.

### Justification and other stuff

Is any of this useful? Does it matter? Nah, probably not. Monads like `Just` and
`Maybe` sure can be handy, but only if your whole team actually knows all this
stuff. But it does broaden your mind and help you think about how you write
software in different ways. They're a design pattern ("no they're not, they're a
mathematical concept! Nothing at all like abstract factories or visitors"
they're a design pattern because you're not writing a dissertation, you're
building a React PWA for people to find nearby parks that allow people to walk
their pet iguanas.

And you're already using monads, sometimes, even if you don't think about them
that way. If you've got some class or object or module that satisfies those
constraints, you've got a monad. Promises could've been monads, but
[some people didn't understand them](https://github.com/promises-aplus/promises-spec/issues/94),
and honestly who can blame them? It's not like the Haskell people use real words
that make any sense when they're talking about this stuff.

Also I'm not really using all the technical terms. Left identity and right
identity are like our `id` function, but a little more complicated. Doesn't
matter. Associativity doesn't really mean how you group parens, it's how you
apply or nest bind/chain/flatMap, but again, doesn't really matter, because no
one (probably) is going to be testing you on Haskell/Idris/Scala concepts in
your PR to fix a button submit pending state.

### Free Monads

And what about free monads? Honestly I don't really get it, because I don't
write Haskell except when I'm looking for a reason to take a lot of ibuprofen,
but DrBoolean has some good videos on the topic. Imagine a generic monad that
lets you make a `Monad(something)` without choosing exactly which functors
you're going to toss into it (like adding methods to a class later on). Is this
useful in real-world code? No idea, but smarter people than me really like to
blog about it sometimes, so maybe.

### Am I Wrong?

I wrote this late at night with a blinding dehydration headache after seeing yet
another bad explanation of monads on the internet. And I didn't even test any of
the examples, just wrote them here in Markdown in code blocks. So maybe I messed
something up. Put in a PR or send me a mean email. I'll correct this post and
maybe even give you credit if you're not too mean. 
