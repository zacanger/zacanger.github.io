---
title: currying and partial application
created: 2016-05-05
tags:
  - currying
  - fp
  - partial-application
  - functional-programming
  - js
---

```javascript
// Prototype's version?
Function.prototype.curry = function(){
  var fn   = this
    , args = Array.prototype.slice.call(arguments)
  return function(){
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)))
  }
}

// Functional's version?
Function.prototype.partial = function(){
  var fn   = this
    , args = Array.prototype.slice.call(arguments)
  return function(){
    var arg = 0
    for (var i = 0; i < args.length && arg < arguments.length; i++) {
      if (args[i] === undefined) {
        args [i] = arguments[arg++]
      }
      return fn.apply(this, args)
    }
  }
}

// from angus croll's blog
// note, the toArray is because the `arguments` array is actually and object
function toArray(enumm){
  return Array.prototype.slice.call(enumm)
}
// toArray is superfluous now, though, because we can just do
let args = Array.from(arguments)
//
Function.prototype.curry = function(){
  if (arguments.length < 1) {
    return this
  }
  var __ method = this
    , args      = toArray(arguments)
  return function(){
    return __method.apply(this, args.concat(toArray(arguments)))
  }
}
// and an example from his blog, using the above
const
  converter = (ratio, symbol, input) => [(input * ratio).toFixed(1), symbol].join(' ')
, kgToLb    = converter.curry(2.2, 'lbs')
, liToPi    = converter.curry(1.98, 'pints')
, miToKm    = converter.curry(1.62, 'km')


// note that these are all examples of partial application,
// not true currying as one would have in a purely functional language
// see:
const foo = (a, b) => a + b
foo.partiallyApply(2) // b => 2 + b
foo.curry() // a => b => a + b
foo.curry()(2) // foo.partiallyApply(2)

Function.prototype.curry = function(){
  var
    method = this
  , i      = 0
  , len    = this.length
  , args   = []

  function f() {
    args.push(arguments[0])
    if (++i < len) {
      return f
    } else {
      method.apply(this, args)
    }
  }
  return f
}

// here's a super simplistic adding thingy
const adder = (a, b) => typeof(b) !== 'undefined' ? a + b : c => a + c
// i think the es6 is right for this? in es5 also:
function adder(a, b) {
  if (typeof b !== 'undefined') {
    return a + b
  } else {
    return function(c){
      return a + c
    }
  }
}

// the real difference between partial application and currying:
// a curried function will accept ONLY one argument at a time.
// it will continue accepting one argument each time it's called right
// up until it's got enough, then will finally be executed for realz.

// so: a function that can take a function as input, and an int for
// the max args. should be able to call like so:
curry(fn, n, ...args) // ... that is,
curry(fn, n, 1, 2, 3) // or
curry(fn, n)(1)(2)(3) // or
curry(fn, n)(1, 2, 3) // and we should get the same results each way.
// so
curry(fn, n, 1, 2)(3, 4) == curry(fn, n, 1, 2, 3, 4)

// notes on the below:
// fn.apply(a, [1, 2, 3]) is kinda the same as doing
// fn.call(a, 1, 2, 3), where `a` is `this`
const argsArr = args => Array.from(args)

const curry = (fn, n) => {
  const args = argsArr(arguments)
  if (n === args.length -2) {
    return fn.apply(undefined, args.slice(2))
  } else {
    return () => {
      return curry.apply(undefined, args.concat(arguments))
    }
  }
}
// so try:
const addFour = (a, b, c, d) => a + b + c + d
curry(addFour, 4, 8, 16)(1, 2)

// modified to use Function.length
const newCurry = (fn, n) => {
  let args = argsArr(arguments)
  if (typeof(n) == 'undefined') {
    args[1] = fn.length
  }
  if (n === args.length - 2) {
    return fn.apply(undefined, args.slice(2))
  }
  return function(){
    return newCurry.apply(undefined, args.concat(argsArr(arguments)))
  }
}


// okay, so, from some other blog
const objs = [{id : 1}, {id : 2}, {id : 3}, {id : 4}]
objs.map(o => o.id)
// this is actualy a lot cleaner than his example, because he's doing it like
var objs = [{id : 1}, {id : 2}, {id : 3}, {id : 4}]
objs.map(function(o){return o.id})
// but we'll see where this goes, anyway
const curry = require('curry') // npm i -S curry
const get = curry(function(property, object){return object[property]})
objs.map(get('id'))
// meh.
const getIDs = function(objects){
  return objects.map(get('id'))
}
getIDs(objs)
// double meh.
const map    = curry((fn, val) => val.map(fn))
    , getIDs = map(get('id'))

// still not sure this is actually cleaner xD
// let's keep going with his examples (translated to ES2015, though)
// some sample data (we'll pretend this is JSON we're getting from somewhere):
const sampleData = {
  "user"  : "z"
  , "posts" : [
    {"title" : "title!"     , "contents" : "asdf"  }
  , {"title" : "something!" , "contents" : "ghjkl;"}
  ]
}
require('http').get('something.whatever/that/data.json')
.then(JSON.parse)
.then(data => data.posts)
.then(posts => posts.map(post => post.title))
// or, using the curry stuff
require('http').get('something.whatever/that/data.json')
.then(JSON.parse)
.then(get('posts'))
.then(map(get('title')))
// uh
// okay
// i don't see that this is any better, here.
// oh wait, he wrote a follow-up!

// shit. i think some of this might be wrong.
// there's no `arguments`! i knew about `this`, but not `arguments`.
// (talking about when using `=>`, i mean.)
// not really a big deal, just in the above, we need to use `...args` instead.
// for example,
let sum = (...nums) => nums.reduce((a, b) => a + b)



// examples:
// in es5:
function formatter(tag, text){
  return '<' + tag + '>' + text + '</' + tag + '>'
}
var p = formatter.bind(undefined, 'p')
p('some content!')
// in es6:
const formatter = (tag, text) => `<${tag}>${text}</${tag}>`
const p = text => formatter('p', text)
// accepting addtional arguments (more text):
const fmt = (tag, text, moar) => `<${tag}>${text}${moar}</${tag}>`
const span = ...args => fmt('span', ...args)

// okay, that's cute because it just lets you specify however many you want, but...
const cur = (fn, ...argsOne) => (...argsTwo) => fn(...argsOne, ...argsTwo)
// or, allowing placeholders, as in underscore:
const curMore = (fn, ...argsOne) => {
  let i = argsOne.indexOf(_)
  let argsOne = (i === -1) ? [] : argsOne.splice(i).slice(1)
  return (...argsTwo) => fn(...argsOne, ...argsTwo, ...argsThree)
}
// which can then be used like:
const lessTen = curMore(subtract, _, 10) // assuming we've defined a `subtract` somewhere



// from brian lonsdorf's blog/medium, a better `curry` (better in that
// it should be easier to debug).
// note: very definitely es5. and redifines toString().
function curry(fx){
  var arity = fx.length
  function f1(){
    var args = Array.prototype.slice.call(arguments, 0)
    if (args.length >= arity) {
      return fx.apply(null, args)
    }
    function f2(){
      return f1.apply(null, args.concat(Array.prototype.slice.call(arguments, 0)))
    }
    f2.toString = function(){
      return fToString(fx) + '(' + args.join(', ') + ')'
    }
    return f2
  }
  f1.toString = function(){
    return fToString(fx)
  }
  return f1
}
// and a compose from the same:
function compose(){
  var fns = arguments
  function f(result){
    for (var i = fns.length - 1; i > -1; i--) {
      try {
        result = fns[i].call(this, result)
      } catch(e) {
        e.message = f.toString() + ' failed at ' fns[i].toString()
        throw(e)
      }
    }
    f.toString = function(){
      return 'compose('+[].slice.call(fns).map(function(f){ return f.toString() }).join(', ')+')';
    }
    return result
  }
  return f
}



// from reginald braithwaite's blog
// * arity: number of arguments a function accepts
//     * nullary function takes no arguments
//     * unary function accepts one
//     * polyadic function accepts more than one
//     * binary accepts two
//     * ternary function accepts three
//     * variadic function accepts a variable number of arguments

// a map fn
const __ map = [].map
const square = n => n * n
function map(list, unary){
  return __map.call(list, unaryFn)
}
map([1, 2, 3, 4], square)

// this is fine as long as map gets both arguments (is fully applied)
function mapWrap(unaryFn){
  return function(list){
    return map(list, unaryFn)
  }
}
mapWrap(square)([1, 2, 3, 4])

const squareAll = mapWrap(square)
squareAll([1, 2, 3, 4])

// woot! that's fine, but annoying to write. so, a function to wrap functions:
// const wrapper = unaryFn => list => map(list, unaryFn) // can become:
// const wrapper = second => first => binaryFn(first, second) // can become:
const rightCurry = binaryFn => secondArgument => firstArgument => binaryFn(firstArgument, secondArgument)
// which can be used like
const rightCurryMap = rightCurry(map)
const squareAll     = rightCurryMap(square)
squareAll([1, 2, 3, 4])
// calling this rightCurry because it takes any binary function and curries into a chain
// of unary functions, starting with the second argument. a curry that starts on the left
// is more common, and it's usually what people mean.
const curry = binaryFn => firstArg => secondArg => binaryFn(firstArg, secondArg)
const cMap  = curry(map)
const twice         = n => n + n // why did i write this down?
// whether one goes with a leftmost or rightmost curry could depend on which things
// you might need to name and/or reuse

// okay so apparently a pattern like this:
const squareAll = rightCurry(map)(square)
const doubleAll = rightCurry(map)(twice)
// is called a:
// rightmost unary partial application of the map function
// which means it starts from the right, takes one arg, applies not all of the args, and works on the map fn

// the wrong way to build a first-class function to do this would be:
const rightUnPartApp = (binaryFn, secondArg) => rightCurr(binaryFn)(secondArg)
// and a better way might be
const lastApplication = (binaryFn, secondArg) => firstArg => binaryFn(firstArg, secondArg)
// which means we could do
const squareAll = lastApplication(map, square)
const doubleAll = lastApplication(map, twice)
// and so, we could do
const firstApp = (binaryFn, firstArg) => secondArg => binaryFn(firstArg, secondArg)

// SO. wat.
// Currying : decomposition of a polyadic function into a chain of nested unary functions. Thus,
// decomposed, you can partially apply one or more arguments, although the curry operation itself
// does not apply any arguments to the function.
// Partial application : conversion of a polyadic function into a function taking fewer arguments
// by providing one or more arguments in advance.




// this is approximately the same as wu.js's .autoCurry() (which has been removed??)
// (es5, obvs. todo: simplify, basically just by making it es6.)
var autoCurry = (function(){

  var
    toArray = function toArray(arr, from){
    return Array.prototype.slice.call(arr, from || 0)
  }

, curry = function curry(fn) {
    var args = toArray(arguments, 1)
    return function curried(){
      return fn.apply(this, args.concat(toArray(arguments)))
    }
  }

  return function autoCurry(fn, numArgs){
    numArgs = numArgs || fn.length
    return function autoCurried(){
      if (arguments.length < numArgs) {
        return numArgs - arguments.length > 0 ?
        autoCurry(curry.apply(this, [fn].concat(toArray(arguments)))
      , numArgs - arguments.length)           :
        curry.apply(this, [fn].concat(toArray(arguments)))
      } else {
        return fn.apply(this, arguments)
      }
    }
  }

}())


// one more
const curry = fn => {
  const length = fn.length
  const acc = (...args) => {
    if (args.length === length) return fn(...args)
    return (...args) => acc(...args.concat(args))
  }
  return acc
}
```
