---
title: BaconJS
created: 2016-01-19
tags:
  - bacon
  - js
  - frp
  - streams
  - events
  - functional
  - programming
  - reactive
  - fp
---

_Note: this post references 'the snake game' a lot. That's over
[https://github.com/zacanger/extras/tree/master/bacon](here), now._

Bacon is a JS lib for FRP, like Rx, but not MS.

Here's some jQuery, because I don't know why.

```
var go = $('#clickMe').asEventStream('click')
go.onValue (
  () => $('#output').append('clicked!'))
```

Is it just me or is this tutorial using _typescript_? Eww, it totally is!
Gross.

`scan` combinator is kinda like `reduce`, except async and produces multiple
values. So, there's an initial value, and a function to combine them. Returned
stream contains the aggregate.

```
var clicks = $('#example button').asEventStream('click')
  , counter = clicks
      .map(1)
      .scan(0, (x,y) => x + y)
counter.onValue(x => $('#example .output').html(x))
```

Ohh, okay, so the 'take' and 'skip' combinators are new. They do what they
sound like. Basically like slicing arrays, but with streams.

--------

Since we're avoiding side-effects (yo, this is functional programming), we
instead use _event switching_. What that means is, _when x, do y_; for our
case (at least right now?), on event _x_, start event-stream _y_. With Bacon,
we'll be mostly using `flatMapLatest` to handle things here. It takes an event
stream (_x_), and from each _x_ event, maps it to a new stream (_f(x)_), for
function _f_. `stream.flatMapLatest(x => Bacon.sequentially(100, [x, x+1,
x+2]))` maps the numeric _x_ events to the stream `[x, x+1, x+2]`. The delays
here mean that the next even from source _x_ occurs _**before**_ `x+2`, so
that's skipped. Only on the last event, after which there are no more _x_
events, would all source _x_ events appear in the returned stream. So, in
other words, when event _x_ occurs in source steam (_x_), the output becomes
(or _switches!_) to `f(x)` (again, for function _f()_).

Note (in the snake game) the difference between how we handle the apple and
how we'd handle it imperatively. In 'traditional' (lol) programming, we'd be
updating that from several places in the code, reacting to events. Supposedly
that 'feels more natural' to people? I don't know. I guess I haven't been
programming long enough to feel more natural doing things imperatively.

Event streams are _kinda_ like spreadsheets? Eww, spreadsheets. But it makes
sense, I guess. `A1 = B1 + C1`; here `A1` is totally defined in terms of other
'cells' rather than being updated from an external source.

Okay, so implementing our own combinators is pretty nice. We add to Bacon so
we can keep using this little DSL. See the snake game, the bit where we change
window size, for how this is done.

NOTE: `snake-game.bak.js` is where the actual attempts at learning ended up,
with lots of comments. `snake-game.js` is the final version, cleaned up and
less ugly and weird and whatever.
