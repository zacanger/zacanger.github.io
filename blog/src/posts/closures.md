---
title: Closures
created: 2016-02-02
tags:
  - js
  - closures,
  - notes,
  - closure
---

A closure is a local variable for a function, which sticks around after the
function has been returned.

(Or, a closure is a stack-frame which is _not deallocated_ when the function
returns [as if a 'stack-frame' were malloc'ed instead of being on the stack!].
Whatever that means.)

Here, let's explain in Javascript.

```
function sayHi(name){
  var text = 'hi ' + name // (local var)
    , say  = function(){
    console.log(text)
    return say
  }
}
var sayIt = sayHi('zac')
sayIt() // returns 'hi zac'
```

So here, a function is returned as a variable.

What we're doing here is putting a function inside a function. And we're
getting something accessible outside of that enclosing function, right?

Hence _closure_.

In most descendants of C, after a function returns, its local variables are
_gone_. The stack-frame is gone.

In JS, functions that are inside other functions can still be accessed outside
of (after) that parent function. Try using the above code, and then doing
`sayIt.toString()`, and you'll see that the variable `say` is returned --
which is a function that references `text`, which is a variable local to
`sayHi()`.

```
function oneMore(){
  var i     = 1
    , logIt = function(){
    console.log(i)
  }
  i++
  return logIt
}
var logStuff = logIt()
oneMore() // 2
```

Make sense? Here's a slightly more complex example pulled straight from the
interwebs.

```
var logNumber, increaseNumber, setNumber
function setupGlobals(){
  var i = 4
  logNumber = function(){
    console.log(i)
  }
  increaseNumber = function(){
    i++
  }
  setNumber = function(x){
    i = x
  }
}
setupGlobals()
increaseNumber()
logNumber()     // 5
setNumber(8)
logNumber()     // 8
var oldLog = logNumber
setupGlobals()
logNumber()     // 4
oldLog()        // 8
```

Local variables from a closure will be overwritten if you call that outer
function again. Don't forget this, because you can get some really screwy
stuff going on if you do!

There is a closure for _every function call_, not for every _function
declaration_. This example might help demonstrate this.

```
function newClosure(fooInt, barRef){
  var num     = fooInt
    , quuxArr = [1, 2, 3]
    , ref     = barRef
  return function(x){
    num += x
    quuxArr.push(num)
    console.log('num: ' + num +
      '; quuxArr: ' + quuxArr.toString() +
      '; ref.bazVar: ' + ref.bazVar)
  }
}
obj = {bazVar: 4}
fn1 = newClosure(4, obj)
fn2 = newClosure(8, obj)
fn1(1)     // num:5; quuxArr:1,2,3,4,5; ref.bazVar: 4
fn2(1)     // num:9; quuxArr:1,2,3,8; ref.bazVar: 4
obj.bazVar++ // 4
fn1(2)     // num:7; quuxArr:1,2,3,5,7; ref.bazVar:5
fn2(2)     // num:11; quuxArr:1,2,3,9,11; ref.bazVar:5
```

So... a quick recap?

When a function is _used_ inside another function, you've used a _closure_.
This includes `eval()`. (Note that using a constructor, as in `new
Function()`, does _not_ create a closure.)

Every time you call a function with a closure, it makes a new set of those
local variables.

Closures _can_ definitely be nested.

--------

And, in a cuter way....

Once upon a time, there was a princess: `function princess(){`
Who lived in a world full of adventures. There was stuff with unicorns and
dragons and a whole range of other wild shenanigans.

```
var adventures = []
function princeCharming(){}
var unicorns   = {}
  , dragons    = {}
  , otherStuff = 'howdy'
```

But said princess would eventually always have to `return {` to the real
world, and she'd then talk about all her crazy-awesome princessy adventuring.

```
    story : function(){
      return adventures[adventures.length -1]
    }
  }
}
```

Unfortunately all folks would see is some `var littleKid = princess()` telling
a wild `littleKid.story()`.

Those folks new there were real princesses, but they wouldn't believe in
nonsense they couldn't see, and insisted things like `unicorns` and `dragons`
and `otherStuff` were all in the `littleKid`'s head. As it turns out, though,
the `littleKid` with the `princess` inside...

...is really a `princess` with a `littleKid` inside.
