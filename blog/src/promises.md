---
title: Promises
created: 2016-05-05
tags:
  - promises
  - es6
  - es2015
  - js
---

Important things:
* The actual promise is immutable (nothing can change that)
* There's a guarantee that we'll get something back
* Usually create a promise with a constructor (`new Promise`)
* Usually its two handlers are named `resolve` and `reject`
* A promise will have one of three states:
    * Pending (until something happens)
    * Fulfilled (if the first handler is called)
    * Rejected (if the second handler is called)
* It can only be 'settled' (either resolved or rejected) once.
* Can't cancel a promise.
* No way to check the status (if pending, fulfilled, or rejected).
* An immediately-resolved promise can be created like `Promise.resolve('something')`.
* An immediately-rejected promise can be created like `Promise.reject('something')`.
* Attach a `then()` to consume the promise.
* `.then` takes a callback that gets passed the resolved value, on fulfillment.
* It can actually take a rejection callback too.
* You can pass in `null` instead of the first one, which is the same as just doing a `.catch()`.
* You can chain `.then()`s.
* You SHOULD use `.catch()` instead of the `.then(null, cb)` style.
* This way you can chain multiple `then`s and then have a final `catch`.
* `throw`ing will automatically reject that promise.
* `Promise.all()` takes arr of promises; once all are fulfilled, it returns arr of fulfilled values.
    * Otherwise (if any are rejected) it will reject.
* `Promise.race()` is similar, but will fulfill once first promise in the array fulfills.
* Don't program with promises using same patterns as with callbacks.
    * (Don't do a `.then(fn(res), fn(err))`; use `.then().catch()`.)
* Don't nest promises. Use a `.all` instead.


Examples:

```javascript
const promise = new Promise((resolve, reject) => {
  if (something) {
    resolve(value)
  } else {
    reject(reason)
  }
})

const p = Promise.resolve('something')
p.then(res => console.log(res))
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('asdf'), 2000)
})
p2.then(res => {
  res += 'ghjkl;'
  console.log(res)
})
p2.then(res => console.log(res)) // this is still 'asdf'

somePromise.then(
  val => console.log('fulfilled', val)
, err => console.error('rejected', err))

pr.then(val => console.log('fulfilled', val))
  .then(null, err => console.error('rejected', err))

const throwProm = new Promise((res, rej) => {
  if (something) {
    throw new Error('rejected')
  } else {
  resolve(stuff)
  }
})
throwProm
.then(val => val + 8)
.then(val => console.log('hey', val))
.catch(err => console.error('err', err.message))

const fulProm = new Promise((res, rej) => res(8))
fulProm
.then(val => val + 8)
.then(val => {throw new Error('failure')})
.then(val => console.log('yay', val))
.catch(err => console.error('error', err.message))

one()
.then(res => Promise.all([res, two(res)]))
  .then(results => /* stuff */)
  .catch(err => /* handle err */)

```
