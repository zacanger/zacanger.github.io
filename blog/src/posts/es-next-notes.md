---
title: ES-Next Notes
created: 2016-02-05
tags:
  - es7
  - es8
  - ecmascript
  - js
---

That is, es-next-next notes. Like, es7-or-whatever-we're-calling-it-today, and
es-the-number-after-that notes.

What ~~will~~ might we get?

```javascript
Array.prototype.includes // so, for example, instead of:
if(someArr.indexOf(val) > -1) // we can do:
if(someArr.includes(val))

// you know how we have destructuring with arrays in es6? what about objects?
let {x,y,...z} = {x:1,y:2,a:3,b:4}
x // 1
y // 2
z // {a:3, b:4}
// and...
let q = {x,y,...z}
q // {x:1,y:2,a:3,b:4}

// decorators (for modifying/annotating classes on creation)
function foo(target, name, descriptor){
  descriptor.something = whatever
  return descriptor
}
class Bar {
  @foo
  quux() {return `this thing is ${this.baz} asdf lkadjfklal`}
}
// so, quux is gonna conform to whatever we said in foo()

// we get exponents!
Math.pow(x,y) // no more! now just
x ** y

// simd! (limited to 128 bits though--256 and maybe 512 in the future?)
let foo = SIMD.float64x2.load(oneArr, 0)
let bar = SIMD.float64x2.load(twoArr, 0)
let res = SIMD.float64x3.add(x,y)
SIMD.float64x2.store(treArr, 0, res)
// this will make calc with typed arrs & typed objs sooo much faster

// es-next-next (es8?) may have type annotations!
// oh, and macros?! howlly craaeep.

// async functions and generators, with possible syntax like:
async function* whatever(){
  yield 1
  yield 2
  yield 3
}
async function things(){
  for(var asdf on whatever()){
    console.log(asdf)
  }
}
// Object.values, Object.entries, Object.getOwnPropertyDescriptors
// Typed Objects, so like
var Asdf = new StructType({
    x : int32
, y : int32
})
var Ghjkl = new Asdf({
  x : 99
, y : 120
})
// trailing commas... which is kinda dumb, actually, in a few ways.
// .toJSON (Set.prototype)
// String.prototype.at
// String.prototype.padLeft, .padRight, .trimLeft, .trimRight
// Regexp.escape ?!
::forEach(x => return(x)) // BINDING/METHOD EXTRACTION!
```
