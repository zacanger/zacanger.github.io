---
title: cs notes
created: 2016-05-12
tags:
  - cs
  - algorithms
  - datastructures
  - sort
---

notes on a bunch of stuff

## Big O:

* analyzing the efficiency of algorithms (or code).
* One could figure how much time fn will take given n input(s).
* But really more interested in orders of magnitude than precise differences
  (eg 100ms vs 10000ms, not 100ms vs 110ms).

```javascript
// this is `O(n)`. we go through the input(s) once, in a loop.
const crossAdd = input => {
  let answer = []
  for (let i = 0; i < input.length; i++) {
    let
      up = input[i]
    , dn = input[input.length - 1 - i]
    answer.push(up + dn)
  }
  return answer
}

// also `O(n)`.
// we assume the worst, here. and the worst is that
// the last element of `haystack` would match `needle`.
const find = (needle, haystack) => {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      return true
    }
  }
}

// this is `O(n2)` (imagine that `2` is superscript, please).
// we have to basically go through an extra loop every time we need
// to go through one loop.. this is bad.
const makeTuples = input => {
  let answer = []
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; i < input.length; j++) {
      answer.push([input[i], input[j]])
    }
  }
  return answer
}

const foo = 'stuff' // this would be called `O(1)`, meaning 'constant time'

// `O(log n)` is a good. recursion, for example, can be helpful here.
// this is tough to understand without having any real background in math
// i think what this mens is, so, `log n` means something like, what you'd need
// to raise 2 by (exponentially) to get to `n`. so if `n = 1024`, `O(n)` is like
// saying `fn(1024)`, and `O(log n)` would be like saying `fn(32)`... or something
// ... sort of? whatever, not gonna stress about it too much right this minute.
```
## Sorts

* A bubble sort is `O(n2)`, because there are two loops:
    * One to check if the indices of two elements ought to be swapped, and
    * An outer loop to see if the swap took place
* An insertion sort is slightly better.
    * It'd be useful if you're reasonably confident that what you're sorting is already
      somewhat close to being sorted.
    * This could be anywhere from `O(n2)` to `O(n)`.
* Merge sort is recursive.
    * The way this works is to take your list, split it, and then call itself (the sort)
      on each half.
    * Then that repeats for each smaller bit. Once the list gets down to one, that's returned.
    * Then I guess you'd have another merge going on that's going over each pair (or set?) of
      lists and merging that, and then on back up, until it's done.
    * `Array.sort()` is usually a merge sort.
    * A merge sort will also keep equivalent elements at their original indicies.
        * Apparenty we call that being _stable_.
    * `O(n log n)`. Wat.
* Quicksort is also recursive.
    * It's the other one some engines use for `Array.prototype.sort`.
    * Take the last el, and call it your pivot.
        * Everything smaller goes to the 'left' of that, everything larger to the right.
        * Then the same sort is called on each half.
        * Each returns, and then the left, pivot, and right are catenated (in that order).
        * When you get to a list of one or zero, it just returns.
    * This is also `O(n log n)`.
        * Uses less memory than a merge sort (doesn't have to create new lists all over the place).
        * Performs like crap on an already-sorted list, since it'd be starting with a pivot of the
          largest element, already.
              * You can get around that by doing stuff like checking the 0, length -1, and in the middle,
              and swapping if need be to get a better pivot.

## Data Structures

### Interfaces

* Interfaces?
    * Meaning, we just want to consume that data structure.
    * We don't need to know how it works, just that it acts some specific, expected way.
* Sets are nice. We have these in ES6 now.
    * Sets will always at least let you:
        * **add** items,
        * check if the set **contains** them,
        * **remove** items,
        * and call **toList** (or similar; JS sets have `.values()` but for an Array you'd want to do
          something like `const arr = Array.from(someSet)` or `const arr = [...someSet]`.
            * This won't come back in any particular order -- sets don't keep track of that.
    * What I can really see useful about them is that they don't allow duplicate values.
        * If you do something like `const s = new Set ; s.add('foo') ; s.add('foo')` it won't yell at you,
          but if you then do `s.values()` you'll just see `SetIterator { 'foo' }`.
* Maps are basically the same sort of concept as a hash/dictionary/JS object, except without all the
  extra bits that JS objects have (methods, inheritance, etc.).
    * Basically just a collection of key-value pairs, except:
        * Really more like a _set_ of keys, with values associated with them, so
        * Again, no duplicates!
        * You could have duplicate _values_ though. Just not duplicate keys.
* Stacks are kinda like what they sound like.
    * Only `push` and `pop` type of things.
    * LIFO
    * So if you have a stack that's like `a b c` and you push `d`, then pop, you'll get `d` returned
      (and removed from the stack).
    * Frequently have a 'peek'-like method for looking at the top of the stack without actualy doing
      anything.
    * Easiest way to visualize this is probably just thinking about the order of execution of something
      trivial, like a function that calls two functions, one of which maybe calls another funciton or two.
* Queues are FIFO.
    * These would have methods like `enqueue` (push) and `dequeue` (pop), and probably a 'peek' type of
      thing too.
    * With priority queues, things that have a higher priority can be sort of rushed through the line,
      basically, and dequeued earlier.

### Implementations

* An ArrayList (it's a Java thing, I guess -- JS has arrays, and we don't really need to think all that
  much about how they actually do their job because we have GC--wait, does Java not? Oh. Huh. Poor them.)
  addresses specific indices like normal, but when you remove items from the array, you have to, like,
  shrink it back down because you have to think about that bit of memory.
    * So I guess, say you do the equivalent of `.splice()` or something, you have to actually say 'okay, get rid of element [2], then move everything from [3] to the end back one, then get rid of the last one, please' or something.
* So, I hear a lot about linked lists. Apparently they're super important because it's one of like three
  things any CS grad knows. Almost definitely in Java.
    * A linked list is just a list where each element is aware of the next element.
    * So basically it's a list where each item has two properties:
        * Its actual value, and
        * A pointer (or reference) to the next node (element)
    * A linked list's `add` and `remove` would be `O(1)`, then, because all you need to do is change the
      pointer on the previous node.
        * Its `get` would be `O(n)` though because you need to loop through up 'til you get to the right node.
        * The ArrayList would be the other way around, it'd have a `delete` and `add` of `O(n)` and a `get` of `O(1)`.
* BST!
    * Each node will have either 0, 1, or 2 subtrees.
        * Every el in the left subtree will be less than the value of the node.
        * Every el in the right will be greater.
    * Just have to change pointers, then, to add.
        * Basically just walk down the tree and find the right spot.
    * Roughly `O(log n)` on `get`, `add`, and `delete`.
        * Can be as bad as `O(n)` if a sorted list is stuck in there.
* Solution to some of the problems of a BST? AVL tree.
    * (It's got some long name, so we'll stick with the abbreviation.)
        * This is a 'self-balancing binary search tree.'
    * BSTs can get out of whack.
    * An AVL tree is always a valid BST (but not always the other way around).
    * Adding works the same, except that you check to see if the node is balanced after adding.
    * It's unbalanced if there's a height difference greater than one on the subtrees.
    * Worst case? `O(log n)`.
    * You could end up in a situation where you need a double rotation.
        * Basically, if the opposite child is heavy during rotation.
        * So before you do the (probably initially intended) rotation, you do one on the root
          node of that rotation, opposite-wise.
* Hash tables have constant-time get, delete, and add (if you're working with a set or a map).
    * So, you've got a key, and you hash that (MD5 or whatever).
        * Now we've got a key that points to some addressable space.
        * This isn't really a thing in JS.
    * This is neat in other languages because you can just work against that space, without
      needing to do the (logic) work of hunting things down, kinda, basically.
    * No concept of order.
    * Uses a fair bit of memory.
    * Needs an idempotent hash (that is, a super-pure function -- exact same output, provided the same
      input, every single time.).
    * Hash also has to be very well distributed.
    * And fast.
    * Almost probably definitely maybe need to use `%` to get your hash down to a manageable number you can
      actually use (smaller than the largest index of your array).

## Some FP Basics

* Purity
    * Don't you dare touch my state!
* HOF
* Vector (or array) programming is especially fp-friendly.
    * It makes sense to expect that you can chain functions together.
    * This ends up being much, _much_ more declarative.
    * Just think about `map`, `reduce`, and `filter`.
