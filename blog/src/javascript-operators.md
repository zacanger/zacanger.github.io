---
title: Javascript Operators
created: 2016-02-06
tags:
  - js
  - operators
  - cheatsheet
  - reference
  - ecmascript
---

(Just a little cheatsheet/list for my own easy reference--and anyone else's,
too, of course. This is like maybe 83 percent just copied from MDN.)

# JAVASCRIPT OPERATORS

There are a whole whole bunch! Here's most of 'em, kinda hopefully split up
and sorted in some sort of order that makes sense. It's always worth just
taking a peek at the spec or MDN or whatever, especially it looks like actual
standards are going to be getting actual changes within actual human lifespans
now.

--------

### BITWISE:

* `&` -- AND
* `|` -- OR
* `^` -- XOR
* `~` -- NOT
* `<<` -- left shift
* `>>` -- sign-propagating right shift
* `>>>` -- zero-fill right shift

### LOGICAL:

* `&&` -- AND
* `||` -- OR
* `!` -- NOT
* ternary (conditional) operator: kind of like a shorthand way of writing if statements;
  takes the syntax `condition ? expression1 : expression2`, where the first expression
  is run if the condition is true, and the second is run if the condition is false. example:
  `age > 21 ? alert('here\'s your beer!') : alert('go home, kid.')`

### ASSIGNMENT:

* `=` -- assignment
* `*=` -- multiplication assignment
* `/=` -- division assignment
* `%=` -- remainder assignment
* `+=` -- addition assignment
* `-=` -- subtraction assignment
* `<<=` -- left shift assignment
* `>>=` -- right shift assignment
* `>>>=` unsigned right shift assignment
* `&=` -- bitwise AND assignment
* `^=` -- bitwise XOR assignment
* `|=` -- bitwise OR assignment
* destructuring assignment: for assigning properties or elements of an object or array,
  using object- or array-like syntax. examples: `[a,b,c] = [1,2,3]`; `{a,b,c}={a:1,b:2,c:3}`

### EQUALITY:

* `==` -- equality
* `!=` -- inequality
* `===` -- identity (strict equality)
* `!==` -- nonidentity

### POSTFIX/PREFIX:

* `foo++` -- postfix increment
* `foo--` -- postfix decrement
* `++bar` -- prefix increment
* `--bar` -- prefix decrement

### UNARY:

* `delete` -- deletes a property from an object
* `void` -- discards the return value from an expression
* `typeof` -- checks for the type of the object
* `+` -- converts operand to Number
* `-` -- converts operand to Number, negates it
* also see bitwise NOT and logical NOT

### ARITHMETIC:

* `+`, `-`, `/`, `*` -- work as expected
* `%` -- remainder operator
    * this is often incorrectly called a modulo (or, more incorrectly, 'modulus').
    * result of remainder operator takes the sign of the dividend (rather than the divisor)
* `**` -- exponentiation. example: `4 ** 4` // => 256
    * not implemented in current widely-supported js version (ecmascript 5.1)
    * not implemented in current standard (ES2015)
    * proposed for ES7/ES2016--in stage 3 (implementation) as of feb 2016

### COMPARISON/RELATIONAL:

* `in` -- determines if object has given property
* `instanceof` -- determines if obj is an instance of another object
* `<`, `>`, `<=`, `>=` -- work as expected

--------

## PRECEDENCE

Operators will be evaluated in a specific order. If there are operators that
have the same priority, it's probably a good idea to check MDN or somesuch,
because it's not all just left-to-right as one might expect. Here's a (very)
cut-down list, in declining order (so the beginning of the list would be
evaluated first, last operator in the list would be evaluated last).
Grouping, `new`, postfix increment & decrement, NOT, prefix increment and
decrement, unary plus and minus, multiplication and division, remainder, addition
and subtraction, bitwise shifts, less than and greater than comparisons, all the
equality/inequalities, bitwise and logical OR and AND (and bitwise XOR), the
ternary (conditional), all your assignment operators, and then finally your
spreads and sequences.
