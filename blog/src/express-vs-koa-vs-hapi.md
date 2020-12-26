---
title: Express vs Koa vs Hapi
created: 2015-12-30
starred: true
tags:
  - express
  - koa
  - js
  - hapi
  - node
---

**Note**: this post is outdated. Koa 2 saw a nearly complete API change, and
Express and Hapi may have also changed, since I wrote this. I'm leaving it up
anyway, as is, because it's seen a lot of traffic over the years. I haven't
checked in on Express or Hapi in a long while, but here's an updated version of
the Koa example from the original post:

```javascript
import Koa from 'koa'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()
const port = 3000

router.get('/api/items', (ctx) => { ctx.body = 'Get' })
router.get('/api/items/:id', (ctx) => { ctx.body = `Get id ${ctx.params.id}` })
router.put('/api/items/:id', (ctx) => { ctx.body = `Put ${id}` })
router.delete('/api/items/:id', (ctx) => ctx.body = 'Deleted')
router.get('(.*)', (ctx) => { ctx.status = 404; ctx.body = 'Are you lost?' })

app.use(router.routes())
app.listen(port, () => { console.log(`Listening on ${port}`) })
```

---

Quick little comparison of the three. Express is clearly the most commonly
used, but I'm inclined to jump to Koa whenever I can. The simple fact that the
guy who initially started Express passed that off to a company to maintain and
instead works on Koa, now (which he also started), says to me that maybe Koa's
the right way to go.

Okay, so all three are Sinatra-alikes for Node.

Express was started in 2009, and is now maintained by StrongLoop, the Node API
company.

Koa was started in 2013, and rather than a 'server-side web development
framework build on node.js' (that's Express), Koa is 'expressive middleware
for node.js using generators ... to make writing web applications and REST
APIs more enjoyable.' It's super small, too--around 400 SLOC.

Hapi was started in 2011, and was originally built on Express. The original
author still maintains it, backed by the original company (...Wal...Mart...).
It's no longer Express-based, because 'configuration is better than code ...
business logic must be isolated from the transport layer...', so, there's
that.

Making things happen:

```javascript
// express
const express = require('express')
const app = express()
const port = 3000
// etc, we already know all this
app.listen(port) // http.createServer() basically

// koa
const koa = require('koa')
const app = koa()
const port = 3000
const server = app.listen(port, () => {
  console.log('listening on ' + port)
}) // well, THAT looks super familiar, huh?

//hapi
const Hapi = require('hapi')
const server = new Hapi.Server()
server.connection({ port: 3000 })
server.start(() => {
  console.log('server over yonder on ', server.info.uri)
}) // that takes a weee bit more work, there.
```

routing:
```javascript
app.get('/', function(req, res){res.send('hi')})

app.use(function *() {this.body = 'hi'}) // so, koa uses es6 generators.
// the context (this) is node's `request` and `response`, wrapped up
// `this.body` can be string, buffer, stream, object, or null

server.route({
  method : 'GET',
  path: '/',
  handler: (request, reply) => {
    reply('hi') // holy boilerplate, batman
  }
})
```

--------

How about a little API practice?

```javascript
const express = require('express')
const app = express()
const router = express.Router()

router.route('/items')
  .get((req, res, next) => {res.send('get')})
  .post((req, res, next) => {res.send('post')})

router.route('/items/:id')
  .get((req, res, next) => {res.send('get ' + req.params.id)})
  .put((req, res, next) => {res.send('put ' + req.params.id)})
  .delete((req, res, next) => {res.send('delete ' + req.params.id)})

app.use('/api', router)
app.get('/', (req, res) => {res.send('hi')})

const server = app.listen(3000, () => {console.log('listening')})
```

Nothing new there.

```javascript
const koa = require('koa')
const route = require('koa-route')
const app = koa()

app.use(route.get('/api/items', function*(){this.body = 'Get'}))
app.use(route.get('/api/items/:id', function*(id){this.body = 'Get id: ' + id}
app.use(route.put('/api/items/:id', function*(id){this.body = 'put ' + id}))
app.use(route.delete('/api/items/:id', function*(id){this.body = 'Delete Id '}))
app.use(function*(){this.body = 'are you lost?'})

const server = app.listen(3000, () => {console.log 'listening on 3000'})
```

So, that's pretty nice. Can you see why I like Koa?

```javascript
const Hapi = require('hapi')
const server = new Hapi.Server(3000)

server.route([
  {
    method: 'GET',
    path: 'api/items',
    handlder: (request, reply) => {
      reply('get item id ')
    }
  },
  {
    method: 'GET',
    path   : '/api/items/{id},'
    handler: (request, reply) => {
      reply('get item id ' + request.params.id)
    } // same thing here for all the other methods
  }
])

server.start(() => {console.log 'listening on 3000'})
```

Note that the Hapi version of things definitely takes a lot more code, but
that's also intentional. (Remember, Hapi's meant to be easily changed for any
team and/or project, so a lot of things are very manual; you also wouldn't
usually use Hapi for small projects like in the examples.) Errors in Hapi are
also a little more helpful, since it goes ahead and automatically provides
HTTP error codes for you... in JSON, no less.

So, thoughts:

Express is the standard. Everyone knows it, because it's been around forever.
It's very mature, stable, got a lot of users and a lot of backers and
contributors. It's got a nice little built-in router. It does _not_ have error
handling, it's pretty damn opinionated, it's rather big these days, and
there's so much out there _for_ it that it's easy to get lost in all the
middleware and options and whatnot.

Koa's very small, and so, it's very flexible. It uses ES6 (Hapi does, too,
_now_, but that was a recent switch for them, I think), which is really nice.
Because it's so small, it's a lot easier to just go ahead and write your own
middleware. Like Express, though, that can lead to a decision problem.

Hapi definitely has their corporate backing game on point. That's great for
them, because that means it _has_ to be stable. It's very consistent and
reusable. It's also a whole goddamn lot of code to write, compared to the
other two. If we're working on a large, complex app, maybe that'd be worth it,
but for smaller apps (like, probably, most of the ones any of us will ever
write on our own or in small teams), it's just too much. If you're doing
something really big, something like... oh, I dunno, some giant retailer,
let's call them 'Mal Wart,' if you've got to run this huge multinational
enterprise system, then maybe Hapi actually would be really great for you.

I think it's probably pretty easy to see why I favour Koa. For what it's
worth, just as an example, here's what it takes to get a server running in raw
Node:

```javascript
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const port = process.argv[2] || 4444

http.createServer((request, response) => {
  const uri = url.parse(request.url).pathname
  const filename = path.join(process.cwd(), uri)
  fs.exists(filename, (exists) => {
    if (!exists) {
      response.writeHead(404, {'Content-Type': 'text/plain'})
      response.write('404 Not Found\n')
      response.end()
      return
    }
    if (fs.statSync(filename).isDirectory()) filename += 'index.html'
    fs.readFile(filename, 'binary', (err, file) => {
      if (err) {
        response.writeHead(500, {'Content-Type': 'text/plain'})
        response.write(err + '\n')
        response.end()
        return
      }
      response.writeHead(200)
      response.write(file, 'binary')
      response.end()
    })
  })
}).listen(parseInt(port, 10), () => {
  console.log('server up on ' + port)
})
```

No options. No nothing. If your file you want to serve isn't called
'index.html,' that kinda sucks for you. I keep this around in my `~/bin` (with
`#! /usr/bin/env node` at the top, executable) for running super quick servers
when I'm just playing with things. The point of showing that bit, though, was
to emphasise just how fantastic it is to even have things like Express. And
keep in mind, there are more than just these three options. You've got
Restify, LoopBack, Meteor, a lot of things built on Express (like Sails), and
a load of things built on some combination of Socket.io and one middleware
framework or another. Go play with options, they're all fun.
