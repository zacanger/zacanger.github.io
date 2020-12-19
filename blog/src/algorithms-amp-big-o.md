---
title: 'Algorithm & Big-O'
created: 2016-01-14
tags:
  - algorithms
  - big-o
  - sort
  - math
  - js
---

## Algorithms and Problem Solving in One Hour or Less.

Why use algorithms? Because they're a structured set of rules to use for
calculations of any type, duh. They let you loop over arrays, etc., in a more
functional and portable manner.

Common uses: sorting, searching, solving.

Implementations: recursive, logical (which is exact opposite of recursive),
prl/distr/etc
* binary starts with a sorted list
* EVERY recursive function should start, straight away, with a CYA
    * eg, if (searchArray.length = 0) return exit status 1
    * because infinite loops are dumb

--------

[recursive binary search:](https://github.com/addyosmani/recursive-binarysearch)

```
function recBin(array, target, left, right){
  if (left > right){
  return -1
  }
  var middle = Math.floor((right + left) / 2)
  if (array[middle] === target){
    return middle
  } else if (array[middle] > key){
    return recBin(array, target, left, middle -1)
  } else {
    return recBin(array, target,  middle + 1, right)
  }
}
// we can make this a node module
// then we can be all like
// var findThat = require('req-bin')
// findThat([7, 15, 98, 234, 4587, 883489384, 34783473443], 4587)
module.exports = function(array, target){
  return recBin(array, target, 0, array.length)
}
```

Finally a valid use for that Wolfram API account. Any big O type of stuff I
don't understand by reading it, Wolfram can just straight-up graph that.

--------

Asymptotic notations: languages that let us analyse the time it will take to
run an algorithm by identifying its behavior, as the size of the algorithm's
input increases.

Let's say algorithm is fn f, input is in, and f(n) is the time it takes to
run. So with that algorithm f, input size n, you get the time f(n), yes? This
means that we can graph this where Y ix the _runtime_, and x is the _input
size_; points on the graph are the amount of _time_ for that _input size_.

Big O in _maths_ and Big O in _computer science_ are a wee bit different. If
you read the Wikipedia article on Big O, that's the _math_ version; check the
Wikipedia article for _Time Complexity_ instead.

Big O n cubed = a Rubik's Cube. That'd be a triply-nested for loop.

Algorithm that takes an array, iterates over every element in array, and every
character of every string _in_ the array: `O(n*m)`

`.sort` in JS is `(n*m)` complexity.

That's linearithmic or (linear logarithmic).

Bucket sorts: we start with an array or whatever, make some buckets. Let's say
our array is `[1, 4, 3, 7, 7, 9, 6, 2]`. Then we make some buckets (let's say
ten of them). Just places to put things. Then we go through those buckets, and
count how many times those things are in each bucket. So we'd sort our array
like this:

```
1  1    1,
2  1    2,
3  1    3,
4  1    4,
5
6  1    6,
7  2    7, 7,
8
9  1    9
10
```

So the output array is `[1, 2, 3, 4, 6, 7, 7, 9]`. That's chill!

Some samples of sorts! (Of sorts.)

```
// bubble sort
var randomArray = function(size){
  var array = []
  for(var i = 0; i < size; i++){
    array.push(parseInt(Math.random() * 100))
  }
  return array
}
var bubbleSort = function(array){
  var swapped = true
  while(swapped){
    swapped = false
    for (var i = 0; i < array.length-1; i++){
      if(array[i] > array[i+1]){
        swap(i, i+1)
        swapped = true
      }
    }
  }
  function swap(a, b){
    var tmp = array[a]
    array[a] = array[b]
    array[b] = tmp
  }
}
// bucket sort
var bucketSort = function(array){
  var buckets = []
  for(var i = 0; i < 100; i++){
    buckets[i] = 0
  }
  for (var i = 0; i < array.length; i++){
    buckets[number]++
  }
  var currentIndex = 0
  for(var number = 0; number < buckets.length; number++){
    var count = buckets[number]
    for (var j = 0; j < count; j ++){
      array[currentIndex] = number
      currentIndex++
    }
  }
  return array
}
// let's see how they perform...
var array = randomArray(5000)
// console.log(array)
console.time('bubbleSort')
// console.log('\n#########################################\n')
bubbleSort(array)
console.timeEnd('bubbleSort')
// console.log('\n#########################################\n')
bucketSort(array)
// console.log(array)
// console.log('\n#########################################\n')
console.time('bucketSort')
console.timeEnd('bucketSort')
```

And some resources for actually kind of understanding any of this stuff
(because I only halfway actually do):

* [Learn X in Y](https://learnxinyminutes.com/docs/asymptotic-notation/)
* [Traveling Salesman](http://mathworld.wolfram.com/TravelingSalesmanProblem.html)
* [Big-O Cheatsheet](http://bigocheatsheet.com/)
* [Plain English Explanation of Big O](http://stackoverflow.com/questions/487258/plain-english-explanation-of-big-o)
* [Time Complexity](https://en.wikipedia.org/wiki/Time_complexity)
* [Another Big-O Cheatsheet](https://www.packtpub.com/sites/default/files/downloads/4874OS_Appendix_Big_O_Cheat_Sheet.pdf)
