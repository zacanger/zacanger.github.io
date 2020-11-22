---
title: Notes from the AngularJS Utah Meetup
created: 2016-04-24
tags:
  - rxjs
  - immutable
  - js
  - utah
  - meetup
  - notes
---

So what with my last computer dying, getting a new phone, trying to find a job,
preparing to maybe move, and all the other nonsense going on, I haven't really
blogged at all lately. Oh well.

My to-do list is gigantic, like a whole huge directory tree of several gigabytes full of unfinished stuff.

Somewhere in there, there's rewriting my entire website.

I've just switched from GoDaddy's hosting to my own VPS (a droplet), since
GoDaddy's cost was going up by about 110%. This means I have a LOT more
available to me, now. Not quite as much space, but I can run whatever I need
to on my server now, so... I think it's time to finally update everything. I
plan on leaving most things as just plain old static sites (because, let's be
honest, no one cares how flashy this crap is if it takes a year to render it
on an old phone). The blog might change a bit, though. I'm still using that
same old script (based originally on
[BashBlog](https://github.com/cfenollosa/bashblog), heavily modified over the
past almost-year). Nothing against that script, it does its job and
everything, but a 1300-line shell script to basically turn Markdown into HTML
is absurd -- ESPECIALLY since it doesn't include the parser.

Anyway, here are some notes from the NG-JS meetup a couple of weeks ago. They
were lost on my old laptop, but the SATA-to-USB thingy came in the mail the
other day, so I can finally just do something with these.

--------

### Immutable Data Structures

I didn't really take notes on this, which kinda sucks, but what I really got
out of it much more was a way to get started and some sparked interest. Here's
the little bit I did jot down.

```
https://github.com/ryoia/ (functional-frontend-slides/)
purescript, check it out for _real_ sometime.
github.com/mgechev/angular-immutable
stimulus(?) (immutable library?)

what's the _real_ difference between Object.assign() and Object.freeze() ?
```

### RxJS

Nothing against this guy, but... what the hell is he doing? Does he even know?
I think he's probably really intelligent and good at stuff, but is just
totally lost right now, being on a stage talking in front of all these...
ten-ish... people.

None of this is exactly new. [Check over
here](https://github.com/zacanger/extras/tree/master/rxjs-frp) for a demo from
a few months ago, using RxJS.

```
// observables

const foo = Rx.Observable.create(observer => {
  observer.onNext({value : 0}) // kinda like yield
  observer.onCompleted() // done

  return function dispose() {
    // do stuff that needs to be done on done here
    console.log('disposed')
  }
})

const bar = foo.(reduce(
  // stuff
))

bar.subscribe(x => console.log(x))
// subscribe: consumers

// .onCompleted(), if called before last yield,
// nothing else will happen (so throw it inside your slowest or
// last async function!).

setTimeout(() => {
  bar.dispose()
}, 1000) // discards subscription, then.

// .delay(1000) holds for ms
// Rx.Observable.of(val, value, valoo, vlyou)
// .doOnNext(x => console.log(x))
// tap into next in stream, perform action on it
```
