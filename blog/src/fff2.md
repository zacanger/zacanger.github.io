---
title: More More Notes Taken While Watching MPJ's Videos
created: 2016-07-24
tags:
  - js
  - fp
---

lol streams are like the weird lovechild of promises and arrays i love that
analogy

here's a stream-making thingy

```javascript
const foo = {
  each (cb) {
    setTimeout(() => cb(1), 100)
    setTimeout(() => cb(2), 200)
    setTimeout(() => cb(3), 300)
    setTimeout(() => cb(4), 400)
  }
}
foo.each(console.log)
```

prototypes are faster than factory functions but geez they're
kinda gross to think about you know so unless we're doing something
like making ten million objects just use a factory there i guess

streams are functors

functors are just a thing that implements map

monads are functors that also implement _flatMap_

flatMap just flattens, i guess? that's what it sounds like.

so like with Promises for example, `.then` is like `.flatMap`.
same with stuff like bind and chain methods and stuff. it's basically
flattening into its _value_ rather than having the actual (semi-expected)
value (function/promise/stream/whatever).

so if you have a flatMap that would return another monad, i guess,
it'd actually return its value, not that other monad.

if you are a tooling addict, don't do tools. (this actually totally applies to
me, because i've spent more time on [my dotfiles](https://github.com/zacanger/z.git)
than on any other individual project... _but_ i feel like it's worth it, mostly.
being able to just use vim and not go through the work of setting up any other
editor on any computer, being able to just clone that repo and symlink what i need,
that really does make me more productive. as long as i don't forget how to use
computers without my dotfiles, i don't think they're really a waste of time.)
