---
title: Firebase Notes
created: 2016-02-03
tags:
  - firebase
---

firebase with $firebaseObject (or $firebaseArray) and $bindTo just makes all
the __MAGIC__ MORE magical; with angularfire and firebase and angular doing
everything for you, we now have, basically, a sorta meteor-like 3-way-binding.

```
<ng-change="$scope.save(thingy)"> will propogate back to firebase
(or <ng-change="thingy(save)"> // $scope.sav(thingy) if we're doing things
modularly).

ng-model-options="{debounce: {'default': 5000}}" // debounces. to 5000 ms. wowe.
```

--------

Firebase's Node API is exactly the same as the JS API for the browser. So it
doesn't matter if you include their script, Bower install it, or are working
on the server and do `npm install -S firebase`, anything mentioned here will
work just the same.

Creating a reference: `var firebaseRef = new
Firebase('https://firebase-url.firebaseio.com/')`

Accessing a child of that reference: `firebaseRef.child()('path/of/child')`

Firebase does not support arrays. Anything that looks like an array is
actually an object, with the indices as keys. So `['foo', 'bar']` is actually
`{0: 'foo', 1: 'bar'}`. But their API will make it look like an array if it
looks like an array in the db. If every key is an integer, and more than half
of them are non-empty, Firebase clients render an array. That means the those
items in the 'array' have to be mostly sequential on their end, eg 0, 1, 2, 4,
5, 6 is okay, but not 1, 2, 3, 7, 22. Arrays _are_ okay to store if only one
client can possibly write to your Firebase at a time. Don't refer to the
indices of the array. Don't `remove()`

FB can have up to 32 child nodes. A key can be 768 bytes, UTF, none of the
following: `.$#[]/`.

A full DB backup can be pulled by just requesting the root URL.

```
firebaseRef.set({
  title   : 'Let There Be'
, author  : 'God'
, subject : 'ES6'
, factors : {
  , browserSupport : false
  , developerJoy   : false
  , buildTools     : true
  }
})

firebaseRef.child('factors/buildTool').on('value', function(snapshot){
  console.log(snapshot.val()) // true
})

// auth:
firebaseRef.createUser({
  email    : 'bruh@lol.wut'
, password : 'irelyluvprogrammerin'
}, function(error, userData){
  if (error){
    console.log(error)
  } else {
    console.log('done', userData.uid)
  }
})
```

* `set()` writes to/replaces data to a _defined path_, like `editors/lines/column`
* `update()` updates keys to defined path, without replacing data
* `push()` adds to data, generates new unique id, like `editors/lines/unique-id/column`
* `transaction()` yes, like in sql
