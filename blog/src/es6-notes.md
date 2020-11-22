---
title: ES6 Notes
created: 2016-01-18
tags:
  - js
  - javascript
  - ecmascript
  - es6
  - es2015
---

(These are some random notes from a lecture on ES6.)

`let` = `var`, but block scoped, _finally_. this means no leaks. Let can't be
redeclared outside of its block, because it doesn't exist outside of there.

`const` = `var`, but it's a constant, _finally_. this means variables you can't
fuck with, man! for simple things, that is. `const x = 2; x = 3` does _not_
work. however, parts of a `const` are mutable; that is, `const y = [0, 1, 2, 3];
y[0] = 7` _does_ work. Constants can be global or local, that's just up to how
you declare it. Const and let behave the same no matter where you declare them;
the difference is that const can't be _defined_ again, whereas let _can_ be
redefined. _Neither_ of them can be _declared_ again.

--------

Structured assignment and destructuring:

```
let {name, age} =
{ a: 1,
  name: 'zac',
  age: 26,
  b: false }
```

Here, the `let` is a _pattern_, looking for `age` and `name` in the object. It
ignores the keys that don't match what it's looking for. We can build this
pattern like so, for using 'pretty' keys to access 'ugly' keys:

```
let {qzrf: name, kjlpo: age} =
{ a: 1,
  qzrf: 'zac',
  kjlpo: 26,
  b: false
}
```

We can dig down there a little bit, too!

```
let  {asdf: {ghjkl:name}} =
{asdf: {ghjkl:'zac'}}
```

Or even: `let {xxx:{yyy:[z:name]}} = {xxx{yyy: [1, 3, 'zac', false]}}`

```
let [x, y] = [1, 2] // PATTERN = ARRAY

let [,x, y] = [1, 2, 3] // will MAKE X=2, y=3!

[x, y] = [y, x] // this sounds familiar ;)

function foo({asdf:ghjkl}){
  // doing things with ghjkl here!
  // because we can destructure **right in the arguments**
}
```

Default parameters:

```
function bar(x=0){
  // if no argument passed, 0 is the default
}

function quux(y='baz'){
  return y
}
console.log(quux()) // returns 'baz'!
```

Rest parameters:

```
function hi(...stuff){
  return stuff
}
hi(1, false) // returns 1, false
hi('me', 'you', 'things', 4, true) // returns 'me', 'you', 'things', 4, true
// the ...stuff returns a real, manipulable array, so you can map and whatnot on it

function bye(q, ...r){
  // here, we can manipulate q, and _everything else that's passed in_ will be part of '...r'
}

function what(s, ...t, u){}
// this will _not_ work, because anything passed after 's' will just go straight to '...t';
// 'u' will get _nothing_.
```

Spread parameters:

```
let a = [1,2,3]
function foo(a,b,c){return a+b+c}
foo(...a)
```

So what we're doing is _un_-packaging that array, and spreading it out to fill
all the space.

```
console.log([1, 2, 3, ...a])
// returns [1, 2, 3, 1, 2, 3]
```

Template strings. Backticks instead of double-quotes. Dollar sign instead of a
hash. That's about all.

Tag functions can manipulate both variables and template strings inside of
them. Wicked cool.

```
function template(strings, ...keys){
  return (function(...values){
    var dict   = values[values.length - 1] || {}
    var result = [strings[0]]
    keys.forEach(function(key, i){
      var value = Number.isInteger(key) ? values[key] : dict[key]
      result.push(value, strings[i + 1])
    })
    return result.join('')
  })
}
template`${0} ${'foo'}!`('Hello', {foo: 'world...'|)} // Hello world....
```

Classes: sugar for the Java/Rb/Py kids.

The `super()` means 'inherit this thingy from what we're extending.' And the
classical inheritance syntax goes `class Bar extends Foo { constructor(stuff,
things){} }`.

`this` does not have lexical scope, so inside of a method on a class, `this`
will _not_ have the expected behavior. The `this` doesn't come to be until its
calling function is ovoked.

For something with no parameters, we can leave out the `()` in arrow
functions. Like `foo => bar => bar(asdf){return asdf}`. Lets inner function
close over the `this` of the outer fn.

Iterators:

```
let a  = [1, 2, 3]
let it = a.values()
console.log(it.next()) // returns {"value":1,"done":false}
console.log(it.next()) // 2, false
console.log(it.next()) // 3, false
console.log(it.next()) // finally, just returns {"done":true}
```

...iterators are sexy. Imagine one that returns pi, gradually. ES6 gives you
strings, arrays, maps, and sets, by default. The `.values()` and the `.next()`
are ES6 specific. The `.values()` is what gives you the next value when
called. Oh my god, this is nice.

forOf:

```
let a = ['a', 'b', 'c']
for (let i of a){
  console.log(i)
}
```

This only works with structures that give you iterators by default (so the
aforementioned strings, arrays, maps, and sets).

Map:

```
let myMap = new Map()
let a = {}
let b = null
let c = 4
myMap.set(a, 'hi')
myMap.set(b, [1, 2, 3])
console.log(myMap.get(c)) // 4
```

So, we're just pairing this thing with that thing, without actually storing
those things there for realsies. There are methods for removing, clearing out,
etc., as well.

Sets: these are like arrays, but with no duplication allowed. Great for
finding out if something's already in an array.

```
let mySet = new Set()
mySet.add('hi')
console.log(mySet.has('hi')) // true
mySet.add('foo')
console.log(mySet.size) // 2
mySet.add('hi')
console.log(mySet.size) // still 2!
```

There are a bunch of methods like clearing, removing, providing an iterator,
etc., like in maps.

Modules are a thing.

And there are a bunch of new methods on stuff we already know (strings,
arrays, etc.).
