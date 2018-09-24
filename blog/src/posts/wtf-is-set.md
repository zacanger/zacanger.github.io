---
title: WTF is Set?
created: 2017-04-25
tags:
  - js
  - es2015
  - set
---

# WTF is Set?

Please excuse the funky syntax highlighting in this post. Apparently
the thing my blog uses for that doesn't know what to do about template strings.

So, someone asked in a Slack channel how they might clean up the following code:

```JavaScript
getNames (contacts) {
  let contacts_set = []

  contacts.forEach((contact) => {
    let firstName = get(contact, 'contactInfo.firstName')
    let lastName  = get(contact, 'contactInfo.lastName')
    let fullName = `${firstName} ${lastName}`

    if (contacts_set.includes(fullName)) {
      return
    } else {
      contacts_set.push(fullName)
    }

    set(this, 'contactsSet', contactsSet)
  })
}
```

Note that the `get` and `set` going on here seemed to be Ember-specific. I don't
know Ember so don't ask me.

And I said, how about this?

```JavaScript
getNames: (contacts) =>
  [...new Set(
    contacts.map(({ contactInfo: { firstName, lastName }}) =>
      `${firstName} ${lastName}`))]
```

I like this version because it's very concise and still readable (to me).
It also doesn't do mutation-y stuff, which is a good thing.

And then someone else asked:

> Can some one eli5 what `Set` is that's referenced above?

Which made me realise that a lot of folks still aren't using a lot of the nice
new things from ES2015, so I explained a bit. Here's how I understand it.

Set is a new (in ES2015) iterable builtin (like Array, String, TypedArray). Map
is also new in 2015. Set is to Array as Map is to Object, kinda.

For practical usage Set is basically Array but unique, and with different
methods. `add`, `has`, `delete`, `size`, and some others. There's a lot more
info [on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

You can pass `Set` an iterable, which is why the thing I have above works
(because thing inside `new Set()` results in an array).

In that case `Set` isn't being used for too much besides just the fact that it's
`Set` (so it only holds unique values). Someone else pointed out in the same
channel that maybe it's not the best idea if you have a lot of values, because
then you're creating another thing, which is totally true.

There's a bit more background
[here](https://en.wikipedia.org/wiki/Set_(mathematics)) on what JS's `Set` is
suppose to be kind of like.

And underneath it sorta looks vaguely like this:

```JavaScript
class Set {
  constructor () {
    this.storage = []
  }
  add (a) {
    if (!this.storage.includes(a)) {
      this.storage.push(a)
    }
  }
  has (a) {
    return this.storage.includes(a)
  }
  remove (a) {
    this.storage.splice(this.storage.indexOf(a), 1)
  }
}
```

That's a lot of stuff, but mostly you can think of `Set` as a thing that's like
`Array` but it only holds unique things.

There's also a `WeakSet` which can only hold objects. I haven't really found a
valid use case for `WeakSet` and `WeakMap` yet, personally.

`Set` turns out to be pretty useful. I've used it a few times [at
work](https://jane.com) (with appropriate polyfills) without any problems, and I
use it in a few places in [zeelib](https://github.com/zacanger/zeelib), my
sort-of-sometimes-popular utility library. Definitely play around with it!
