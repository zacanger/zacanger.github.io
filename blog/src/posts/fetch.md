---
title: fetch
created: 2016-05-12
tags:
  - js
  - fetch
---

fetch is a thing

uses promises

here's doing stuff with xhr:

```javascript
var xhr = new XMLHttpRequest()
xhr.open('GET', url)
xhr.responseType = 'json'

xhr.onload = function(){
  // do stuff with xhr.response
}

xhr.onerror = function(){
  console.error('crap')
}

xhr.send()
```

and the equivalent with fetch:

```javascript
fetch(url)
.then(res => res.json())
.then(data => /* do stuff with data */)
.catch(e => console.error(e))
```

granted i'm also using es2015 in the fetch example, which makes it even nicer-looking,
but whatever.

using esnext async functions:

```javascript
(async() => {
  try {
    let res = await fetch(url)
    let data = awat res.json()
    // do stuff with data
  } catch(e) {
    console.error(e)
  }
})()
```

xhr is kinda gross. i mean, everyone's used to it, and it basically works, but... yech.

fetch is basically complete i think? i mean, evidently it's even in safari's dev preview version.

if it's made it to safari, it's probably safe to use.

fetch keeps req and res separate (they're constructors).

request.context lets you tell where the req actually came from (eg link vs loaded asset vs whatever).

you can throw a `no-cors` in your request so stuff doesn't fail (like it would with XHR) without CORS headers.

```javascript
fetch('//foo.com', {mode : 'no-cors'}).then(response => console.log(response.type)) // opaque
```

can't actually read the content of response here, but it could be used by something else (add an event listener
for when it comes back, for example).

other modes: `same-origin`, `cors`, and `cors-with-forced-preflight`.

you could also cache that stuff, which is nice.

xhr buffers the entire response into memory. with fetch you can access the stream. actually with XHR you can access
it sort of, with `responseText` while it's still going on, but it's going to put it all in mem anyway.

```javascript
fetch(url)
.then(response => {
  let foo = 'some string, for example'
  let reader = response.body.getReader()
  reader.read().then(result) => {
    // okay there's actually a little more to this, but the idea is,
    // we can have an if in here to check if this bit of the stream
    // is equal to the thing we want. and then, say
    reader.cancel('i guess we\'re done, here')
  }
})
.then(result => /* do stuff */)
.catch(e => console.error(e))
```

`response.body` is a `ReadableStream`.

How cool is this? Think about it. You have a stream of data from somewhere. You can generate
content on the go, using that, with fetch. You can feed that to the view as you get it.

I guess fetch didn't have streams when it first started to be implemented, so they have some
other readers they stuck in there. So, `response` (or `request` actually, too), then

* `.arrayBuffer()`
* `.blob()`
* `.formData()`
* `.json()`
* and `.text()`

Once they've been called, you can't call another one on that same stream (they 'drain' the stream). What we could
do instead is `.clone()`: `fetch(url).then(response => respone.clone().json().catch() => response.text())`.

You can check `response.headers` to decide what you need to do with it.

```javascript
fetch(url)
.then(response => {
  if (response.headers.get('Content-Type') === 'application/json') {
    return response.json()
  }
  return response.text()
})
```

`headers` can be used for reading and writing, has `Headers.prototype[Symbol.iterator]`. You get better
control over cache, and same-origin requests without credentials (no credentials is fetch's default).

You _can't_ abort a request with fetch before at least the headers come back (yet).

You can't track progress (yet), but you can do stuff to do that on your own (by working with `Content-Length`).

Sync is in the spec, but doesn't look like anyone will implement that in the API.

Oh right, thre are other verbs here. Or just POST?

```javascript
fetch(url, {
  method  : 'post'
, headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
, body    : 'stuff=things&hello=world'
})
.then(/* etc. */)
```

And credentials (like cookies, for example): `fetch(url, {credentials : 'include'})`

There's a node module called `fetch-it` which is basically like (and is based on `axios`), but using fetch
instead of XHR. Looks pretty nice.

There are a bunch of other fetch implementations. But it's already basically in browsers, so Node can't be
_too_ far behind... right?
