---
title: streams
created: 2016-05-15
tags:
  - js
  - streams
---

bits and pieces of notes on streams

```javascript
const foo = fetch('/something')
.then(r => r.json())
.then(d => d.thingwewant)

const bar = fetch('/otherstuff')
.then(r => r.body)

const stream = someTaggedFunctionThing`
  <div>${foo}</div>
  <span>${bar}</span>`
```

* streams can be infinite
* you can be aware of the beginning and end of a stream
* unread values are buffered (unlike how events pre-listener(s) are just gone)
* piping
* error-handling (down the pipeline)
* cancellation (up the pipeline)
* flow control (react to the reader speed)
* one reader per stream
* untapped stream can be used like `tee`

with `fetch`, `result.value` is always of type `Uint8Array` (binary; use `TextDecoder`
on that if text content expected).

there may be transform streams implemented in the browser at some point (r/w).

`reader.cancel()` (or `response.body.cancel()` if fetch)

```javascript
const stream = new ReadableStream({
  start(controller){} // called immediately
, pull(controller){}  // called when buffer isn't full; called until buffer is full
, cancel(reason){}    // called if stream is cancelled
}, queuingStrategy)   // how the stream buffers (default : one item)

```

* `controller.enqueue(something)` queues `something` in the stream's buffer
* `controller.close()` ends
* `controller.error(e)` sends `e` (is a terminal error)
* `controller.desiredSize` amount of buffer left (can be negative if overfilled)
    * `queuingStrategy` is used to get this
* you could call `controller.enqueue()` whenever there's data to send (stream as a push source)
* you could wait until there's a `pull` called, then queue up some data (pull source)
* you can do whatever you like (basically)
* staying within the bounds of `controller.desiredSize` and having backpressure on the source
  is good/efficient. won't break anything if you don't, though, unless you run out of memory.

html renders as it's received (no matter how it gets there). so fetching/compiling/whatevering
markup on the fly (aka client-side rendering, aka the devil usually) without streams means
slowness.

here's a thing basically just copied out of jake archibald's blog. it's like this because we
don't have a `.pipe()` in the browser. we need that.

```javascript
const stream = new ReadableStream({
  start(controller){
    // start and end from cache, middle from network with cache fallback
    const
      start = caches.match('/start-cached')
    , end   = caches.match('/end-cached')
    , mid   = fetch('/middle')
        .catch(() => caches.match('/middle-cached'))
      push  = stream => {
      const reader = stream.getReader()
      return reader.read().then(function process(result){
        if (result.done) {
          return
        }
        controller.enqueue(result.value)
        return reader.read().then(process)
      })
    }

    start.then(response => push(response.body))
    .then(() => mid).then(response => push(response.body))
    .then(() => end).then(response => push(response.body))
    .then(() => controller.close())
  }
})
```

From here down I'll probably just be taking notes on streams in Node.

Some important things to remember (for me to remember, that is) -- differences between the
proposed Stream and Node's streams:
* Readable
    * `.read()` instead of `.on('readable')`
    * Also a sync `.read()`
    * Cancellation semantics added
    * `desiredSize`
    * `tee`ing built in
    * `data` event fully gone (it's only in Node streams in compatability mode, btw)
    * `pause` and `resume` aren't a thing
    * no `unshift`
    * binary/string/object mode switching isn't a thing
    * size parameter is gone (use BYOB readers)
* Writable
    * No cork/uncork
* Transform
    * now just `{readable, writable}` rly
* other
    * promises instead of cbs
    * no enc/dec built-in
    * `pipeTo(writable)` and `pipeThrough(transform)` instead of just `pipe()`
        * so `source.pipeThrough(thing).pipeTo(destination)` is syntactic sugar for
      `source.pipeTo(thing.writable) ; thing.readable.pipeTo(destination)`

Okay, so, Node streams.
* `req` and `res` are streams
* `.pipe()` listens for 'data' and 'end' from fs streams
* `.pipe()` handles backpressure for ya
* types of streams:
    * readable
    * writable
    * transform
    * duplex
    * 'classic'
* chain pipes, don't break crap out
    * `one.pipe(two).pipe(three)`, not `one.pipe(two);two.pipe(three);`
    * that's basically the same as `one | two | three`

```javascript
//
// readable
//

const Readable = require('stream').Readable
const rs = new Readable
rs.push('something, and ')
rs.push('something else.')
rs.push(null) // this tells data consumers that we're done with rs
rs.pipe(process.stdout)
// so the pushes are buffered until a consumer wants them (the pipe to standard out)

// instead of buffering:
let c = 100
rs._read = () => {
  rs.push(String.fromCharCode(c++))
  if (c > 'z'.charCodeAt(0)) {
    rs.push(null)
  }
}
rs.pipe(process.stdout)
// ._read can take a size param, the amount (in bytes) that the consumer wants
// to call it like that, try `node thisfile | head -cN` where `N` is an integer
// note that we'd need to set up an error handler here because there'll be a SIGPIPE
// after `head` (EPIPE in node). that's not an issue when keeping your business all
// in node.
// `Readable({objectMode : true})` to be able to push arbitrary stuff (not just
// buffers and strings).

process.stdin.on('readable', () => {
  let buf = process.stdin.read()
  console.dir(buf)
})
// echo stuff, pipe it, eg `(echo foo ; echo bar ; sleep 10 ; echo asdfghjkl) | node this-script.js`
// usually we'd probably pipe a stream into another stream, maybe using through2 or somesuch
// the above will return null at the end of what's being sent, because there's nothing left
// we could do `.read(N)` where `N` is bytes. doesn't work for object streams.
process.stdin.on('readable', () => {
  let buf = process.stdin.read(2)
  console.dir(buf) // so we'd get 2-byte chunks here. adding:
  process.stdin.read(0) // will get the rest and make this actually work.
})

// YAY, that's it for readable streams

//
// writable
//

const Writable = require('stream').Writable
const ws = new Writable()
ws._write = (chunk, encoding, next) => {
  console.dir(chunk)
  next()
}
process.stdin.pipe(ws)
// chunk is the data written
// encoding (string) is only for when `opts.decodeStrings` is false and we've been given a string
// the third arg is cb, tells consumer to go ahead and write more. it can take an err obj
// if input stream is string, that'll be converted to buf. when creating the stream we can do
const strWs = new Writable({decodeStrings : false})
// and if we're getting in objects
const objWs = new Writable({objectMode : true})

// writing is basically as simple as calling .write (as we do with stdout)
// you can do a .end() to say we're done. that can take data to write, right before ending.
// write returns false when there's more data in incoming buff than opts.highWaterMark;
// listen for drain event to know when it's empty

//
// transform
// these are duplex streams that do exactly what it sounds like. sometimes called 'through' streams.
//

//
// duplex
// r/w where both ends are two-way. example: `x.pipe(y).pipe(x)`

//
// classic streams
//

// we're on node 6.1.0 as of this writing, and chances are i won't be doing much node stuff
// at all in the forseeable future, so i really don't care too too much about the legacy
// streams api. just `require('readable-stream')` instead of `'stream'`, if we must support
// node or other streams from <=v0.8.

// readable example:
const sin = process.stdin
sin.on('data', buf => console.log(buf))
sin.on('end', () => console.log('peace'))
// as soon as a data listener is registered, you're using compatability mode, so
// basically you lose a lot of functionality.
// through (the package) lets you use legacy streams with pipe
// these also have pause and resume.

// writable:
// define write(buf), end(buf), and destroy(). end doesn't HAVE to have (buf), but
// it should work so that stream.end(buf) means stream.write(buf) ; stream.end(), so just do that.

//
//
// streams that are built in to node
//
//

// not gonna take really extensive notes here, for the reasons above and also because
// it's really easy to just go to the api docs and read all of them.

```
