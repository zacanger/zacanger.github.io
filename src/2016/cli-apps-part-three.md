---
title: html2text in node tutorial
published_at: 2016-09-27 20:36:00
author: zacanger
tags: node cli terminal html markdown
---

Okay, ready to build another command-line app in Node?

If you haven't seen my last two posts, you should check them out, since I'm not
going to cover a lot of the basics again. They're both on writing small cli apps
in Node, with no dependencies.

* [React component generator](http://blog.zacanger.com/2016/a-basic-cli-app-in-node.html)
* [JSON Note-taking app](http://blog.zacanger.com/2016/note-taking-app.html)

And here's the finished product from the latter:

```javascript
#!/usr/bin/env node

'use strict'

const {
  readFileSync
, writeFile
}       = require('fs')
, log   = console.log
, arg   = process.argv[2]
, n     = './notes.json'
, file  = readFileSync(n)
, notes = JSON.parse(file)

const writeTheFile = () => {
  const taken = JSON.stringify(notes, null, 2)
  writeFile(n, taken, 'utf8', err => {
    if (err) return log(err)
  })
}

const takeNote = (notes, note) => {
  notes.push(note)
  writeTheFile()
}

const removeNote = (notes, noteIndex) => {
  notes.splice(noteIndex -1, 1)
  writeTheFile()
}

const runApp = () => {
  if (arg) {
    switch (arg) {
      case '-s':
        log(notes)
        break
      case '-r':
        const noteIndex = process.argv[3]
        removeNote(notes, noteIndex)
        break
      default:
        takeNote(notes, arg)
    }
  } else {
    return log('Please pass an argument')
  }
}

if (!module.parent) {
  runApp()
}
```

--------

What we're going to build this time is going to be a little more complex. We're
going to write a program that downloads a website and turns it into Markdown for
easy offline reading. This isn't a new concept, and I actually use a Python script
called [html2text](https://github.com/aaronsw/html2text) for this on an
almost-daily basis, but just for fun, we'll do something similar in Node.

This will also be the first time we'll be working with external modules, which
is really the most exciting and awesome thing about Node.

Our goal here is to have a small tool we can use like this:

```bash
./index.js zacanger.com
```

And it'll give us back the contents of `zacanger.com`, in Markdown, ready to
read in the terminal, pipe to an editor, or whatever.

First things first: we'll need a project. Make a new directory and get into it,
and `npm init`.

```bash
mkdir html2txt
cd html2xt
npm init -y
```

The `-y` flag just means "don't ask me questions." You can skip that flag and
fill in the info for your `package.json` if you'd like, or just go back and edit
it later.

We're going to be using a couple of things built-in to Node, so we can go ahead
and require them now. We'll need `http`'s `get` method, and also a way to work
with an argument. If you've done either of my previous tutorials, you'll already
be familiar with Node's `process.argv`.

```javascript
const { get } = require('http')
const url = process.argv[2]
```

Let's see if we can't get some HTML, just as a starting point.

```javascript
get(url, res => {
  res.on('data', d => {
    console.log(d)
  })
  res.on('end', () => {
    console.log('done')
  })
})
```

Try that out with something like `node index.js http://google.com`.

You should see something like `<Buffer 3c 21 64 6f 63 74 7` (and so on).
[Buffers](https://nodejs.org/api/buffer.html) are great and all, but that's
pretty useless for actual reading. Try calling `toString` on that data and you
should see some actual HTML (`console.log(d.toString())`).

(Note: you may see a 301 page here.)

Awesome! We now have all the functionality of prepending `view-source:` to a URL
in the browser. Let's do something with that HTML, since it's probably not how
you prefer to read stuff.

There are a lot of great modules out there for working with Markdown. For this
post, I've decided to go with a super simple one without a whole lot of options,
[to-markdown](https://www.npmjs.com/package/to-markdown). If you're not super
familiar with npm, you're about to learn just about all you need to know to get
started.

In your terminal, `npm i -S to-markdown`. This is a shorthand for the command
`npm install --save to-markdown`; most npm commands have shorter versions, and
it can really save you a lot of time if you get used to using them.

You should see a bunch of stuff happen in the terminal. If you check your
`package.json`, you'll now see `to-markdown` in there. It should like something
like this:

```json
{
  "name": "something",
  // probably some other stuff
  "dependencies": {
    "to-markdown": "^3.0.1"
  }
}
```

(Yes, I know you can't have comments in JSON.)

Next we'll need to get that into the program. If you're using Babel, you can use
`import`, but to keep things simple we'll stick with `require`.

```javascript
const toMarkdown = require('to-markdown')
```

Now try running the HTML through this before logging it out.

```javascript
// ...
const toMarkdown = require('to-markdown')
// ...
  res.on('data', d => {
    console.log(toMarkdown(d.toString()))
  })
// ...
```

If you run the script again, you should see beautiful, super-readable Markdown!
All done!

--------

Well, mostly. This is nice and all, but there are definitely some things we can
do to make this script a bit better. Firstly, it's annoying to have to always
type `http://` before a URL, so maybe we should automatically add that on.

```javascript
const url = process.argv[2]
const src = url.includes('http://' || 'https://') ? url : \`http://${url}\`
```

All this extra bit is doing is checking if the passed in argument aleady has a
scheme, and if it doesn't, just sticking on on the beginning. If you're not
familiar with template literals, check out the previous tutorials and the [docs
on
MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

If you're not familiar with `Array.prototype.includes()`, it's basically a
shorthand for `.indexOf(foo !== -1)`.

Make sure you change the `get` call to use `src` instead of `url`.

And, as in the previous tutorials, we'll want to just be able to execute this
script, without needing to type in `node` each time, so add a shebang and make
it exectuable.

```shell
chmod +x index.js
```

```javascript
#!/usr/bin/env node

const { get } = require('http')
// ...
```

Now you should be able to just do something like `./index.js zacanger.com` and
see some results.

`to-markdown` can handle take some options. One of them is to use
[GitHub-Flavored
Markdown](https://help.github.com/categories/writing-on-github), which is
pretty nice since that's probably what most of us are used to using. To enable
this, just pass `{ gfm: true }` in the call to `toMarkdown`:

```javascript
// ...
console.log(toMarkdown(d.toString(), { gfm: true }))
// ...
```

You may notice some tags are making it through the conversion (`script`, `span`,
`div`, and probably a few others); I'm not going to go over all of the options
that `to-markdown` can take, but you should check out the docs and learn how to
write filters, if you're interested. You could also write your own function to
strip out unwanted elements, and run the Markdown through this:

```javascript
const cleanOutStuff = string =>
  string.replace(/(div|script|span)/g, '')

console.log(cleanOutStuff(toMarkdown(d.toString(), { gfm: true })))
```

But it'd probably be easier to just learn the options rather that spinning
something custom like this.

One thing that really irks me when I'm reading in the terminal is text that
doesn't wrap. Sometimes I'm on a very large screen, and it can get difficult to
keep track of where I am when the text is too wide. 80 characters is a pretty
reasonable limit, so why don't we get this text to wrap there? We're going to
use another module for this:
[wordwrap](https://github.com/substack/node-wordwrap).

```shell
npm i -S wordwrap
```

```javascript
const wordwrap = require('wordwrap')
```

This module needs to know how many characters it can put in a line. We could
just pass it `80`, but I think maybe we should handle cases where the terminal
is resized very small but maybe won't stay that way, so we're going to find out
how big the terminal currently is and base our decision on that.
`process.stdout` has a way for us to find this out.

```javascript
const wordwrap = require('wordwrap')
const { rows } = process.stdout
const wraplength = (rows < 80 ? 80 : rows)
const wrapper = wordwrap(wraplength)
```

All we're doing here is wrapping to either the width of the terminal or 80
characters, whichever happens to be greater.

Now we can use that `wrapper` when we log out the results.

```javascript
console.log(wrapper(toMarkdown(d.toString(), { gfm: true })))
```

--------

So, awesome! Your script should now do just about everything you want it to do.
There's really only one big thing left to do: make it less ugly. That
`console.log` is really getting gross, don't you think? I like to handle this by
just defining a bunch of functions I can throw together, so I don't have to have
all this junk cluttering up my space.

```javascript
const opts = { gfm: true }
const convert = a => toMarkdown(a, opts)
const wrap = a => wrapper(a)
const log = a => console.log(a)
```

I'm using `a` as a parameter here. You can use something more descriptive if
you'd like, it really doesn't matter.

And I think we should also just wait until we have all the data before logging
anything, so let's adjust our HTTP call (and stick it in a function):

```javascript
const main = arg => get(arg, res => {
  let b = '' // `b` for `body`
  res.on('data', d => b += d.toString)
  res.on('end', () => log(wrap(convert(b))))
})
```

Your linter might yell at you saying you can't return assignment. It's probably
right, but nothing's going to break. If you're concerned about it, just wrap
that `b += d.toString()` in some braces.

Obviously, this is a function, so we need to call it somewhere.

```javascript
main(src)
```

We're just passing it our URL that may or may not have `http://` stuck on to it.

--------

Now you're really done! I suggest you go check out `to-markdown`, play around
with `process`, and see what else you can do with this thing. If you make
something pretty neat, you should consider releasing it! Check out `npm help
adduser` and `npm help publish` to see how you could go about this. (There are
probably similar modules out there, though, so make sure you're not stepping on
anyone's toes first!)

I'd also suggest you do some basic error handling, but that's totally up to you.

For the previous two tutorials I waited until the following post to show a
finished version of the script; since this is the last tutorial on writing CLI
apps in Node that I intend to write, the full script is below, as well as my
manifest file (`package.json`).

Note: I tend to prefer shorter (but hopefully still readable) names for things,
and a somewhat opinionated code style, so the full script below may differ
a bit from your results, and that's totally fine.

```json
{
  "name": "html2txt",
  "description": "html2text sorta thing for blog post",
  "version": "0.0.1",
  "author": {
    "name": "Zac Anger",
    "email": "zac@zacanger.com",
    "url": "http://zacanger.com"
  },
  "license": "WTFPL",
  "main": "index.js",
  "scripts": {
    "start": "node index"
  },
  "homepage": "https://github.com/zacanger/blog#readme",
  "repository": {
    "type": "git",
    "url": "https://github.com/zacanger/blog.git"
  },
  "bugs": "https://github.com/zacanger/blog/issues",
  "keywords": [
    "html",
    "markdown"
  ],
  "dependencies": {
    "to-markdown": "^3.0.1",
    "wordwrap": "^1.0.0"
  },
  "devDependencies": {}
}
```

```index.js
#!/usr/bin/env node

const
  url      = process.argv[2] || 'zacanger.com'
, { get }  = require('http')
, { rows } = process.stdout
, len      = (rows < 80 ? 80 : rows)
, toMd     = require('to-markdown')
, ww       = require('wordwrap')
, wrapper  = ww(len)
, opts     = { gfm: true }
, conv     = a => toMd(a, opts)
, wrap     = a => wrapper(a)
, log      = a => console.log(a)
, src      = url.includes('http://' || 'https://') ? url : \`http://${url}\`

const main = a => get(a, res => {
  let b = ''
  res.on('data', d => {b += d.toString()})
  res.on('end', () => log(wrap(conv(b))))
})

if (!module.parent) main(src)
```

Thanks for reading! If you note any problems, please hit me up [on
Twitter](https://twitter.com/zacanger) or put in an issue [on
Github](https://github.com/zacanger/blog/issues).
