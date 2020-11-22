---
title: Functional Programming Vocabulary
created: 2016-01-16
tags:
  - fp
  - programming
  - vocabulary
---

* arity
    * number of args a function takes
    * ary + ity (it's two suffixes!)
    * binary, ternary, etc = arity of two, arity of three, etc
    * variable number of args = variadic
    * dyadic = binary (talkin greek here)
* hof
    * function that takes function as arg
    * or function that returns a function
* partial application
    * getting a function with lower arity compared to original function
    * by fixing number of args
* currying
    * converting function with multiple arity into function with arity of one
* purity
    * pure function's return value is determined ONLY by input values
    * no side effects
* side effects
    * if modifies some state
    * or has observable interaction with external functions
* idempotency
    * no side effects on multiple executions with same parameters
* points-free
    * does not include information regarding arguments
* functor
    * structure than can be mapped over
    * simplest in js is an array
* referential transparency
    * expression that can be replaced with its value without changing its behavior
    * eg `let oi = ()  = 'howdy'`; `oi()` can be `'howdy'`, hence is referentially transparent
* lazy eval
    * delays evaluation of expression until needed
    * allows for structures that are not available in imperative langs where sequence is significant
* monoid
    * data type and two-param function that combines two values of the type, where an identity value that doesn't affect result also exists
    * example: 1 + 1 (data type is number, function is =)
    * 1 + 0 (identity value is 0)
* monad
    * abstraction. provides interface for executing common sequence of commands on a value one normally avoids acting on directly
    * optional value monad is common (to avoid exposing to null values)
    * a monad is a special functor that also returns a monad
    * so, can be chained to describe sequence of operations
    * useful when sequence matters (hence nickname 'programmable semicolons')
    * example: `let Identity = v => ({bind: transform => transform(v)})`
