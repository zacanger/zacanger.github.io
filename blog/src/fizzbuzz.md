---
title: fizzbuzz
created: 2016-05-07
tags:
  - js
  - fizzbuzz
---

# fizzbuzz!

i like to collect fizzbuzz solutions. that's a little weird, i guess. but fun.

fizzbuzz is kind of the stereotypical pointless toy problem/whiteboarding problem.

if you're not familiar, here's the standard definition of the problem:

write a program that prints numbers from 1 to 100, but for multiples of
three print 'fizz,' for multiples of five print 'buzz,' and for multiples
of both three and five print 'fizzbuzz.'

and some good reading on fizzbuzz:

* http://c2.com/cgi/wiki?FizzBuzzTest
* http://blog.codinghorror.com/why-cant-programmers-program/
* https://www.rosettacode.org/wiki/FizzBuzz
* http://www.tomdalling.com/blog/software-design/fizzbuzz-in-too-much-detail/

i keep a bunch of solutions in js [here](https://github.com/zacanger/pineapple-curry/tree/solutions/fizzbuzz).

here are some of them (including some other languages).

[TOC]

## in c

```c
#include <stdio.h>

int main(){
  printf("Fizzbuzz from 1 through 100.\n");
  int hundred;
  for (hundred = 1; hundred <= 100; hundred++){
    printf("%d", hundred);
    if (hundred % 3 == 0) {
      printf("Fizz");
    } if (hundred % 5 == 0) {
      printf("Buzz\n");
    } else {
      printf("\n");
    }
  }
  return 0;
}
```

## coffeescript

```coffeescript
for i in [1..100]
  str = ''
  str += 'Fizz' if i % 3 is 0
  str += 'Buzz' if i % 5 is 0
  console.log (if str.length is 0 then i else str)
```

## php

```php
<?php

function fizzbuzz($num) {
  if ($num % 15 == 0) {
    print("FizzBuzz" . PHP_EOL);
  } else if ($num % 5 == 0) {
    print("Buzz" . PHP_EOL);
  } else if ($num % 3 == 0) {
    print("Fizz" . PHP_EOL);
  } else {
    print($num . PHP_EOL);
  }
}

for ($i = 0; $i <=100; $i++)
{
  fizzbuzz($i);
}

```

## ruby

```ruby
def fizz_buzz(num)
  result = ''
  result += 'Fizz' if num % 3 == 0
  result += "Buzz" if num % 5 == 0
  puts(result.empty? ? num : result)
end

(1..100).each{|x|
  fizz_buzz(x)
}

####

fizz = ["","","Fizz"].lazy.cycle
buzz = ["","","","","Buzz"].lazy.cycle
nums = (1..Float::INFINITY).lazy

fizzbuzz = nums.zip(fizz,buzz).map do |n,f,b|
  (f.empty? && b.empty?) ? n.to_s : f + b
end

puts fizzbuzz.take(100).to_a

####

1.upto(100) do |i|
  fizz = (i % 3 == 0)
  buzz = (i % 5 == 0)
  puts case
    when fizz && buzz then 'FizzBuzz'
    when fizz then 'Fizz'
    when buzz then 'Buzz'
    else i
  end
end

####

1.upto(100) do |i|
  if i % 3 == 0 && i % 5 == 0
    puts 'FizzBuzz'
  elsif i % 3 == 0
    puts 'Fizz'
  elsif i % 5 == 0
    puts 'Buzz'
  else
    puts i
  end
end

```

## python

```python
i=0
while 1:i+=1;print"".join("BzuzzizF"[::2*j]for j in(-1,1)if 1>i%(4+j))or i


print(["FizzBuzz" if x%15 == 0 else "Fizz" if x%3 == 0 else "Buzz" if x % 5 == 0 else x for x in range(1,101)])


def fizz_buzz(num):
    if num % 15 == 0:
        print "FizzBuzz"
    elif num % 5 == 0:
        print "Buzz"
    elif num % 3 == 0:
        print "Fizz"
    else:
        print num

for i in xrange(1, 101):
    fizz_buzz(i)



def fizz_buzz(num):
    if num % 15 == 0:
        print("FizzBuzz")
    elif num % 5 == 0:
        print("Buzz")
    elif num % 3 == 0:
        print("Fizz")
    else:
        print(num)

for i in range(1, 101):
    fizz_buzz(i)

```

## haskell

```haskell
-- i wrote this one
module Main where

main :: IO ()
main = printAll $ map fizzBuzz [1..100]
  where
    printAll [] = return ()
    printAll (x:xs) = putStrLn x >> printAll xs

fizzBuzz :: Integer -> String
fizzBuzz n | n `mod` 15 == 0 = "FizzBuzz"
           | n `mod` 5  == 0 = "Fizz"
           | n `mod` 3  == 0 = "Buzz"
           | otherwise       = show n



-- i did not write these. found around.

[max(show x)(concat[n|(f,n)<-[(3,"Fizz"),(5,"Buzz")],mod x f==0])|x<-[1..100]]

-- gh:ryoia
-- i like this one. it's a lot like how i thought it was supposed to be
-- which means i can read it, except it's cleaner so i can see a simple way
-- to improve on my own super limited hs
module FizzBuzz where

divBy :: Int -> Int -> Bool
divBy d x = x `mod` d == 0

fizzBuzz :: Int -> String
fizzBuzz x
  | divBy 15 x = "FizzBuzz"
  | divBy 5  x = "Buzz"
  | divBy 3  x = "Fizz"
  | otherwise  = show x


-- the below are from haskellquiz

-- a FizzBuzz (and FizzBuzzBaz) solution by Aaron Contorer.
-- This implementation is designed for extensibility,
-- as the list of tags can be easily edited, loaded from a file, etc.
-- Number range is set >100 so as to demonstrate the FizzBuzzBaz case.
fizzBuzz i = if null desc then show i else desc where
  desc = concat [label | (j,label) <- tags, 0 == rem i j]
  tags = [ (3,"Fizz"), (5,"Buzz"), (7,"Baz") ]

main = mapM_ (putStrLn . fizzBuzz) [1..120]


-- don't know if this works, but looks not nice.
module Main where

  main :: IO ()
  main = do
    mapM_ (putStrLn) [fizzBuzz x | x < [0..100]]

    fizz :: Int -> String
    fizz x = if x `mod` 3 == 0 then "fizz" else ""

    buzz :: Int -> String
    buzz x = if x `mod` 5 == 0 then "buzz" else ""

    fizzBuzz :: Int -> String
    fizzBuzz x = if fizz(x) ++ buzz(x) == ""
                    then show x
                    else fizz(x) ++ buzz(x)


{-
Fizz comes before Buzz comes before an integer. Fizz and Buzz stick to each other, but hide integers.
The lists for Fizz and Buzz are infinite, but zipping together with a finite list of integers,
the result is finite.
-}

module Main where

main :: IO ()
main = mapM_ putStrLn $ zipWith3 join (loop 3 "Fizz") (loop 5 "Buzz") [1..100]
  where
    xor s t = if null s then t else s
    loop n s = cycle $ replicate (n-1) [] ++ [s]
    join s t n = xor (s ++ t) (show n)

{-
If one has enabled all warnings as errors, then the integers need an explicit type, as shown below.
The hiding logic can also be implemented by filtering for the first non-null element of a list:
-}

module Main where
  module Main where

  main :: IO ()
  main = sequence_ $ zipWith3 join (loop 3 "Fizz") (loop 5 "Buzz") [1..100 :: Int]
    where
      loop n s = cycle $ replicate (n-1) "" ++ [s]
      join s t n = putStrLn . head $ filter (not . null) [s ++ t, show n]

```

## javascript

```javascript

for(x=0;x++<100;)console.log(x%3||'fizz',x%5||'buzz')

////

var
  words = []
, func = null
, l    = 100

var conditions = {
  1  : {
    true  : null
  , false : function(i) {
      return function() {
        console.log(i)
      }
    }
  }
, 3  : {
    true  : function() {
      return func;
    }
  , false : function() {
      return function() {
        console.log('fizz')
      }
    }
  }
, 5  : {
    true  : function() {
      return func
    }
  , false : function() {
      return function() {
        console.log('buzz')
      }
    }
  }
, 15 : {
    true  : function() {
      return func
    }
  , false : function() {
      return function() {
        console.log('fizzbuzz')
      }
    }
  }
}

for (l = 1; l < 100; l++) {
  for (var thing in conditions) {
    var result = l % thing
    func = conditions[thing][!!result](l)
  }
  func()
}

////

Object.keys(new Int8Array(100))
.map(x      => ((++x % 3  ==  0) ? f = 'fizz' : x))
.map((x, i) => ((++i % 5  ==  0) ? b = 'buzz' : x))
.map((x, i) => ((++i % 15 === 0) ? f + b : x))

////

// this is basically the same as the usual solution, just sorta recursive also
const fizzBuzz = num => {
  if (num % 3 === 0 && num % 5 === 0) {
    console.log('FizzBuzz')
  } else if (num % 3 === 0) {
    console.log('Fizz')
  } else if (num % 5 === 0) {
    console.log('Buzz')
  } else {
    console.log(num)
  }
  if (num < 100) {
    let newNum = num + 1
    fizzBuzz(newNum)
  }
}
fizzBuzz(1)

////

function fizzbuzz(num, fizz, buzz) {
  for (var i = 1; i <= num; i++) {
    if (i % (fizz * buzz) === 0) {
      console.log('FizzBuzz')
    } else if (i % buzz === 0) {
      console.log('Buzz')
    } else if (i % fizz === 0) {
      console.log('Fizz')
    } else {
      console.log(i)
    }
  }
}
fizzbuzz(100, 3, 5)

////

for (let i = 1; i <= 100; i++) {
  let
    mod3   = i % 3 === 0
  , mod5   = i % 5 === 0
  , result = mod3 && mod5 ? 'fizzbuzz' : mod3 ? 'fizz' : mod5 ? 'buzz' : i
  console.log(result)
}

////

let counter = 0

while (counter < 100) {
  counter = counter + 1
  if (counter % 3 === 0 && counter % 5 === 0) {
    console.log('FizzBuzz')
  } else if (counter % 3 === 0) {
    console.log('Fizz')
  } else if (counter % 5 === 0) {
    console.log('Buzz')
  } else {
    console.log(counter)
  }
}

////

let
  div = ((n, s) => i => i % n ? '' : s)
, f = div(3,'fizz')
, b = div(5,'buzz')
, loop = fn => i => i > 0 && loop(fn)(i - 1) || fn(i)
, fizzbuzz = loop(i => console.log(f(i) + b(i) || i))
fizzbuzz(100)

// (or)

let
  div = ((n, s) => i => i % n ? '' : s)
, f = div(3,'fizz')
, b = div(5,'buzz')
, fizzbuzz = i => i > 0 && fizzbuzz((i - 1)) || console.log(f(i) + b(i) || i)
fizzbuzz(100)

////

// this may or may not continue to work in firefox
// it may not ever work anywhere else; list comprehensions were
// removed from es2015 drafts.
console.log(
  [for (i of Array(100).keys())
    (++i % 3 ? '' : 'fizz') + (i % 5 ? '' : 'buzz') || i]
  .join('\n')
)

////


for(i=0;++i<101;)console.log((i%3?'':'Fizz')+(i%5?'':'Buzz')||i)

////

for(i=1;i<101;i++)console.log((x=(i%3?'':'Fizz')+(i%5?'':'Buzz'))?x:i)

////

a=b=!![]+![],a--,c=b+b;while(++a)e=!(a%(c+c+b)),alert(!(a%(c+b))?e?"FizzBuzz":"Fizz":e?"Buzz":a);

////

for (let i = 1; i < 101; i++) {
  console.log([i, 'fizz', 'buzz', 'fizzbuzz'][(i % 3 === 0) + 2 * ( i % 5 === 0)])
}

////

const numGen = i => i ? numGen(i - 1).concat(i) : []

numGen(100).map(n => n % 3 ?
      (n % 5 ? n : 'Buzz') :
      (n % 5 ? 'Fizz' : 'FizzBuzz'))

////

for (let i = 1; i <= 100; i++) {
  let
    fizz = (!(i%3)) ? 'Fizz' : ''
  , buzz = (!(i%5)) ? fizz + 'Buzz' : fizz
  console.log((buzz) ? buzz : i)
}

////

let o, i

for (i = 1; i <= 100; i++) {
  o = ''
  i % 3 === 0 ? o += 'fizz' : o
  i % 5 === 0 ? o += 'buzz' : o
  o === '' ? o = i : o
  console.log(o)
}

////

for (let i = 1; i <= 100; i++) {
  console.log({
    truefalse : 'Fizz'
  , falsetrue : 'Buzz'
  , truetrue  : 'FizzBuzz'
  }[(i % 3 == 0) + '' + ( i % 5 == 0)] || i)
}

////

(function numGen(i){
  return i ? numGen(i - 1).concat(i) : []
})(100).map(function(n){
  return n % 3 ?
    (n % 5 ? n : 'Buzz') :
    (n % 5 ? 'Fizz' : 'FizzBuzz')
}).join(' ')

////

let f, b, fb, n

for (n = 1; n <= 100; n++) {
  f  = !(n % 3)
  b  = !(n % 5)
  fb = f && b
  console.log(
    fb ? 'fizzbuzz' :
   (f  ? 'fizz'     :
    b  ? 'buzz'     :
    n))
}

////

const fizzBuzz = () => {
  let i, output
  for (i = 1; i < 101; i += 1) {
    output = ''
    if (!(i % 3)) {
      output += 'Fizz'
    }
    if (!(i % 5)) {
      output += 'Buzz'
    }
    console.log(output || i)
  }
}

////

const word = x => {
  if (!(x % 15)) {
    return 'fizzbuzz'
  } else if (!(x % 3)) {
    return 'fiz'
  } else if (!(x % 5)) {
    return 'buzz'
  } else {
    return x
  }
}

const fb = max => Array
  .apply(null, {length : max + 1})
  .map(Number.call, Number)
  .splice(1)
  .map(word)

////

function* FizzBuzz() {
  let idx = 0
  while (true) {
    let val = ''
    idx++
    if (idx % 3 === 0) {
      val += 'Fizz'
    }
    if (idx % 5 === 0) {
      val += 'Buzz'
    }
    yield val || idx
  }
}

let fb = FizzBuzz()

for (let i = 0; i < 100; i++) {
  console.log(fb.next().val)
}

////

const range = n => [...Array(n).keys()]

const fbTest = n => {
  let
    by3 = n % 3 === 0
  , by5 = n % 5 === 0

  return by3 && by5 ? 'fizz buzz' :
                by3 ? 'fizz'      :
                by5 ? 'buzz'      :
                n
}

const fizzBuzz = n => range(n).map(x => fbTest(x + 1)).join(', ')

console.log(fizzBuzz(100))

////

// this (or a slight variation on this) is easily the most common solution

function fizz_buzz(num){
  if (num % 15 == 0) {
    console.log('FizzBuzz')
  } else if (num % 5 == 0) {
    console.log('Buzz')
  } else if (num % 3 == 0) {
    console.log('Fizz')
  } else {
    console.log(num)
  }
}

for (let i = 0; i <= 100; i++) {
  fizz_buzz(i)
}

////

#!/usr/bin/env node

const max = process.argv[2]

let FizzBuzz = function* (){
  let num = 1
  while (num <= max){
    let value = num
    num++
    if (value % 15 === 0) {
      value = 'FizzBuzz'
    } else if (value % 3 === 0) {
      value = 'Fizz'
    } else if (value % 5 === 0) {
      value = 'Buzz'
    }
    yield value
  }
}()

for (let n of FizzBuzz){
  console.log(n)
}

////

const fb = n => {
  switch(true) {
    case item % 15 === 0:
      console.log('fizbuzz')
      break
    case item % 3 === 0:
      console.log('fizz')
      break
    case item % 5 === 0:
      console.log('buzz')
      break
    default:
      console.log(n)
      break
  }
}

const nums = Array.apply(null, Array(100)).map(() => Math.round(Math.random() * 100) + 1)

nums.map(fb)

////

const a = {fizz : 3, buzz : 5}

for (let b = 1; b <= 100; b++) {
  let c = ''
  for (let d in a) {
    c += b % a[d] ? '' : d
  }
  console.log(c ? c : b)
}

// this is nice because you can fizz buzz bing boom zing easily
const a = {
  fizz : 3
, buzz : 5
, bing : 7
, boom : 11
, zing : 13
}

for (let b = 1; b <= 1000; b++) {
  let c = ''
  for (let d in a) {
    c += b % a[d] ? '' : d
  }
  console.log(c ? c : b)
}

////

// this is cheating
alert('1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz Fizz 22 23 Fizz Buzz 26 Fizz 28 29 FizzBuzz 31 32 Fizz 34 Buzz Fizz 37 38 Fizz Buzz 41 Fizz 43 44 FizzBuzz 46 47 Fizz 49 Buzz Fizz 52 53 Fizz Buzz 56 Fizz 58 59 FizzBuzz 61 62 Fizz 64 Buzz Fizz 67 68 Fizz Buzz 71 Fizz 73 74 FizzBuzz 76 77 Fizz 79 Buzz Fizz 82 83 Fizz Buzz 86 Fizz 88 89 FizzBuzz 91 92 Fizz 94 Buzz Fizz 97 98 Fizz Buzz')

////

#!/usr/bin/env node

const max = +process.argv[2]

let FizzBuzz = {
  [Symbol.iterator]() {
    let num = 1
    return {
      next() {
        if (num > max) {
          return {
            done : true
          }
        }
        let value = num
        if (value % 15 === 0) {
          value = 'FizzBuzz'
        } else if (value % 3 === 0) {
          value = 'Fizz'
        } else if (value % 5 === 0) {
          value = 'Buzz'
        }
        num++
        return {
          done  : false
        , value : value
        }
      }
    }
  }
}

for (let n of FizzBuzz) {
  console.log(n)
}

////

function fizzbuzz() {
  let
    i      = 1
  , result = []

  ;(function loop() {
    let str = ''
    str += fizz(i)
    str += buzz(i)
    result.push(ifFalsy(str, i))
    if (isLt100(i++)) {
      loop()
    }
  })()
  print(result.join(', '))
}

function fizz(num) {
  return isDivBy3(num) ? 'fizz' : ''
}

function buzz(num) {
  return isDivBy5(num) ? 'buzz' : ''
}

function isDivBy3(num) {
  return num % 3 === 0
}

function isDivBy5(num) {
  return num % 5 === 0
}

function isLt100(num) {
  return num < 100
}

function ifFalsy(value, fallback) {
  return !value ? fallback : value
}

function print(str) {
  console.log(str)
}

fizzbuzz()

////

const NumbersFromOne = {
  *[Symbol.iterator] () {
    for (let i = 1;; ++i) {
      yield i
    }
  }
}

const take = function* (numberToTake, iterable) {
  let remaining = numberToTake

  for (let value of iterable) {
    if (remaining-- <= 0) {
      break
    }
    yield value
  }
}

const replaceEvery = function* (period, replacement, iterable) {
  let count = period

  for (let value of iterable) {
    if (--count === 0) {
      yield replacement
      count = period
    }
    else yield value
  }
}

const
  oneTo100 = take(100, NumbersFromOne)
, fizz     = replaceEvery(3, 'fizz', oneTo100)
, buzz     = replaceEvery(5, 'buzz', fizz)
, fizzbuzz = replaceEvery(15, 'fizzbuzz', buzz)

console.log(...fizzbuzz)

////

// with tests
function fizzbuzz(value) {
  if (value % 15 == 0) {
    return 'fizzbuzz'
  } else if (value % 3 == 0) {
    return 'fizz'
  } else if (value % 5 == 0) {
    return 'buzz'
  }

  return value
}

function assertEquals(expected, actual) {
  if (expected !== actual) {
    console.error('Expected ' + actual + ' to equal ' + expected)
  }
}

;[15, 30, 45, 60].forEach(value => {
  assertEquals('fizzbuzz', fizzbuzz(value))
})

;[3, 6, 9, 12, 18, 21, 24, 27, 33].forEach(value => {
  assertEquals('fizz', fizzbuzz(value))
})

;[5, 10, 20, 25, 35, 40].forEach(value => {
  assertEquals('buzz', fizzbuzz(value))
})

;[1, 2, 4, 7, 8, 11].forEach(value => {
  assertEquals(value, fizzbuzz(value))
})

for (let i = 1; i <= 100; i++) {
  console.log(fizzbuzz(i))
}

////

// this one is CLOSE but not quite there!
_=$=+!![];$__=((_$={})+'')[_+$+_+$+_];__$=((![])+'')[$];_$_=((_$={})+'')
[_+$+_+$+_+$];____=[][$__+((_$={})+'')[$]+(($)/(![])+'')[$]+$__+__$+_$_];$__$=(!![]+"")
[$+$+$]+([][(![]+"")[$+$+$]+(+[]+{})[$+$]+(!![]+"")[$]+(!![]+"")[+[]]]+"")[($+$)+""+
($+$+$)]+(![]+"")[$]+(![]+"")[$+$];$_$_=____()[$-$][$__$]("\"\\"+($)+($+$+$+$+$+$+$)+
($+$)+"\"");_$=(![]+'')[$-$]+([][[]]+[])[$+$+$+$+$]+$_$_+$_$_;$_=(_+{})[$+$+$]+(!![]+'')
[_+$]+$_$_+$_$_;_--,$$=$+$;____()[$-$][$__$]((![]+"")[+[]]+(+[]+{})[$+$]+(!![]+"")[$]+
"(;++_;)$$$=!(_%("+($$+$$+$)+")),____()[+[]][__$+((![])+'')["+($+$)+"]+((!![])+'')["+
($+$+$)+"]+((!![])+'')[+!![]]+_$_](!(_%("+($$+$)+"))?$$$?_$+$_:_$:$$$?$_:_);");

```

## and finally, in html and css

```html
<!doctype html>
<html lang="en">
  <head>
    <title>fizzbuzz</title>
    <style type="text/css">
      ul { list-style-type: none; }
      li:nth-child(3n), li:nth-child(5n) { font-size: 0px; }
      li:nth-child(3n):before { font-size: 16px; content: "Fizz"; }
      li:nth-child(5n):after { font-size: 16px; content: "Buzz"; }
    </style>
  </head>

  <body>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
      <li>32</li>
      <li>33</li>
      <li>34</li>
      <li>35</li>
      <li>36</li>
      <li>37</li>
      <li>38</li>
      <li>39</li>
      <li>40</li>
      <li>41</li>
      <li>42</li>
      <li>43</li>
      <li>44</li>
      <li>45</li>
      <li>46</li>
      <li>47</li>
      <li>48</li>
      <li>49</li>
      <li>50</li>
      <li>51</li>
      <li>52</li>
      <li>53</li>
      <li>54</li>
      <li>55</li>
      <li>56</li>
      <li>57</li>
      <li>58</li>
      <li>59</li>
      <li>60</li>
      <li>61</li>
      <li>62</li>
      <li>63</li>
      <li>64</li>
      <li>65</li>
      <li>66</li>
      <li>67</li>
      <li>68</li>
      <li>69</li>
      <li>70</li>
      <li>71</li>
      <li>72</li>
      <li>73</li>
      <li>74</li>
      <li>75</li>
      <li>76</li>
      <li>77</li>
      <li>78</li>
      <li>79</li>
      <li>80</li>
      <li>81</li>
      <li>82</li>
      <li>83</li>
      <li>84</li>
      <li>85</li>
      <li>86</li>
      <li>87</li>
      <li>88</li>
      <li>89</li>
      <li>90</li>
      <li>91</li>
      <li>92</li>
      <li>93</li>
      <li>94</li>
      <li>95</li>
      <li>96</li>
      <li>97</li>
      <li>98</li>
      <li>99</li>
      <li>100</li>
    </ul>
  </body>
</html>
```

