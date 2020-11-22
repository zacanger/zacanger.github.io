---
title: EVERYTHING IS A STREAM, or Notes On FRP
created: 2016-01-18
tags:
  - rxjs
  - reactive
  - js
  - frp
  - fp
---

IT ALL MAKES SENSE NOW.

Promises are Observables. Promise++, specifically. Note that that means
Observables are _not_ Promises/A+ compliant. A Promise would be an Observable
with one single emitted value. Our streams return many values.

Listening to streams is Subscribing. We return _new_ streams, hence the term
Immutability, which is regarding the original (unchanged, unchangeable)
streams.

We do things like mapping, filtering, and scanning. Simple functions applied
to streams that return new streams.

A `map(f)` takes input stream, applies `f()`, produces value on output stream.

If one creates what we will call a 'metastream' we're basically making a
stream of POINTERS. WHY DOES THIS ALL MAKE PERFECT SENSE?!

RxJS has a `.flatMap()` which is brilliant, it flattens said 'metastream' and
emits on a _trunk_ stream everything that would be emitted on the _branch_
streams.

Okay, following the tutorial, I'm going to move these notes over to the actual
rx-js/frp directory....

There's a `.startWith()` that does EXACTLY what it sounds like. No matter the
input stream, the output of `startWith(x)` will have `x` at the beginning.

It looks to me like everything about FRP makes a lot more sense if
graphed/charted first. ASCII can work for this pretty well. Example:

```
  streamyInput: -1---2---3---45->
   inputStream: ----a----b--c--->
  dostuffThing: -----X-----X---->
  outputOfThat: ---------E----E->
streamPostWhat: ----Q---IDK----->

```

Hurray, streams!

In Rx there's a `combineLatest()` that takes two input streams and joins the
two most recently emitted values from both streams, like:

```
A: ---a-------e----i------->
B: -----b--c----d------q--->
//////combineLatest(f)//////
-----AB--AC---EC-ED-ID--IQ->

```

Huh. I don't actually know why this isn't working, exactly.

OH WAIT DUH, I forgot jQuery. Thank goodness. I really was hoping I wasn't
gonna have dumb problems. YAY THIS IS NICE!

--------

Other Rx notes:

Cold Observables start running _on subscription_; that is, the values are
pushed from the observable to the observers when Subscribe is called. Values
are not shared among subscribers.

Hot Observables are already producing values, even before a subscription is
active. (Mouse events or constant input streams from an API would be good
examples.) When an observer subscribes to a hot observable, it gets all the
values in the stream starting from when it subscribes. This sequence is shared
among subscribers.
