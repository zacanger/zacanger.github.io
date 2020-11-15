---
title: Pusher
created: 2016-01-15
tags:
  - pusher
  - realtime
  - api
  - baas
  - paas
---

Pusher is a hosted API for WebSockets, with Flash and HTTP fallbacks (in the JS
lib). They also have a REST API. It's a simple pub/sub model, with filtering and
auth, which allows for private channels and presence functionality. Getting up
and moving in JS is pretty simple: include `pusher.js` (`<script
src="//js.pusher.com/3.0/pusher.min.js"></script>`), open a connection with `var
pusher = new Pusher('API-KEY)`, subscribe with `var channel =
pusher.subscribe('channel-name')`. Listening for events:

```
channel.bind('event-to-listen-for', function(data){
  console.log('event was triggered... message: ' + data.message)
})
```

Using their server lib (for Node):

```
var Pusher = require('pusher')

var pusher = new Pusher({
  appId: 'APP-ID'
, key: 'APP-KEY'
, secret: 'APP-SECRET'
})

pusher.trigger('channel-name', 'event-to-listen-for', {'message': 'boing!'})
```
