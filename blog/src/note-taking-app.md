---
title: Node CLI 2, Note Taking App
created: 2016-08-26
tags:
  - node
  - cli
  - terminal
---

## Build a Note-Taking App for the Terminal, in Node

This is a follow-up to my [first
post](blog.zacanger.com/2016/a-basic-cli-app-in-node.html) on writing
command-line apps in Node. I suggest you read that first, but this post
should stand on its own if you don't want to. Below is the little React
component generator that you'd get if you follow that tutorial.

```javascript
#!/usr/bin/env node

const type = process.argv[2]
const component = process.argv[3]
const { writeFile } = require('fs')

const help = () =>
  console.log(`
  please pass component type and component name
  example: ./rcg.js function Foo
`)

if (!component || !type) {
  return help()
}

const pureComponent = `
import React from 'react'

const ${component} = () => <div>${component}</div>

export default ${component}
`.trim()

const classComponent = `
import React, { Component } from 'react'

export default class ${component} extends Component {
  render() {
    return (
      <div>${component}</div>
    )
  }
}
`.trim()

const doTheThing = kind => (
  writeFile(`${component}.js`, kind, 'utf8', err => {
    if (err) console.log(err)
  })
)

switch (type) {
  case 'function':
    doTheThing(pureComponent)
    break
  case 'class':
    doTheThing(classComponent)
    break
  default:
    return help()
}
```

--------

## Introduction

I really love writing little command-line utilities in Node. There are other
languages that may be better for this (Bash, Ruby, Perl), but Node is just
more _fun_ than those (at least to me). I especially love trying to do simple
little tools with no dependencies, or wrapping up awesome modules to be used
in your terminal. The majority of [my published
modules](https://www.npmjs.com/~zacanger) are little tools like this. A lot
of folks only think of Node as the thing that runs Express, or the thing that
lets them test their code without a browser, or whatever, though. So, this
will be a short tutorial on writing a command-line app in Node. At the end of
it, you'll have a totally awesome little app for taking notes in JSON. The
full version of this app (with a few adjustments and additions) is
[here](https://www.npmjs.com/package/lilnote), and you can install it to use
in your terminal with `npm i -g lilnote`.

Okay, so, let's do stuff!

## Update Node

First things first&mdash;make sure Node and npm are up to date. If you're
already using at least versions 6 of node and 3 of npm (`node -v` and `npm
-v` to find out), you're fine. Otherwise, you really should update.

I recommend using [n](https://www.npmjs.com/package/n) for this. If you
already use NVM, go with that; if you're on Windows, you'll likely have to go
download the new version and manually install it. Otherwise, just `npm i -g n
&& n latest && npm i -g npm@next` (you can leave out the last bit, but it's
nice to have the newest version of the coolest tools).

## Start a Project

Make a new directory and start a project (`mkdir note-taking-app`, `cd
note-taking-app`, `npm init`, `touch index.js`, and `chmod +x index.js` to
make it executable).

You won't need any dependencies here; the `npm init` isn't vital, but if you
later wanted to add dependencies, publish this (please don't unless it's
significantly different from [lilnote](https://npmjs.com/package/lilnote)!),
or something, it'd be nice to just have this already set up.

If you want, you can add some fields to your `package.json` to specifiy that
it's a global, command-line sort of app. Add `"preferGlobal": true` and
`"bin": "./index.js"` for this.

## Write Some Code

Open the `index.js` in your editor.

The first thing you'll need to write is the shebang. This is to let your
shell know how to execute this file. For a Node script, it should read
`#!/usr/bin/env node`. Any time you're writing an executable script, this
goes on the first line. You'll use a similar thing for any language you'd use
(for example, `#!/bin/bash` for a Bash script, or `#!/usr/bin/ruby` for a
Ruby script&mdash; the `env` bit says 'find out what my computer thinks Node
is, and execute that script with that thing'&mdash;it's the same idea as
doing `which node index.js`).

We're going to require some stuff. If you happen to be using `babel-node` or
using `babel-register` you could use `import`s here, but we'll go with
`require`s because this means we can keep our app dependency-free.

Add `'use strict'` to the next line. You don't _have_ to do this, [but you
should](https://www.nczonline.net/blog/2012/03/13/its-time-to-start-using-javascript-strict-mode).

We'll require just one thing to start with: `fs`, which is built in to Node.

Our file should currently look like this:

```javascript
#!/usr/bin/env node

'use strict'

const fs = require('fs')
```

Our app is going to read input from the terminal, so we'll need to use the
built-in `process`. This provides an `argv`, which is an 'argument
vector'&mdash;an array of all things entered on the command-line, which will
always start with `node` and the file that's being run. So, we'll use
`process.argv[2]`, which will be the first manually entered argument.
Sidenote: `process` is an awesome piece of Node, and if you're not familiar
with it, open a REPL (just enter `node` in the terminal) and type in
`process`, and skim through that gigantic object.

```javascript
const arg = process.argv[2]
```

Parsing arguments is tedious and sometimes difficult. There are a
[lot](https://github.com/tj/commander.js) of
[awesome](https://github.com/substack/minimist)
[modules](https://www.npmjs.com/package/yargs) that exist for this, and if
you keep building cli apps in Node you should definitely investigate these,
but for this tutorial we'll parse options manually. In the same way that you
should know how HTTP works and then maybe use [Koa](http://koajs.com) or
[hapi](http://hapijs.com), you should know how arguments work before deciding
on a library to handle them.

We'll need a couple of other things before we can really get going. We should
probably do something with that `fs` module&mdash;let's use it to specify a
piece of JSON we'll work against. I won't get into how to handle what happens
if that file doesn't already exist here, but you can check out [lilnote's
source
code](https://github.com/zacanger/lilnote/blob/master/check-file.js#L10) if
you're curious. For our purposes, you should `touch notes.json` in the same
directory as your app, and put an empty array (`[]`) in there. (Note:
`lilnote` uses a file under the user's home directory; that's another thing
we won't worry about right now, but it's [pretty
easy](https://github.com/zacanger/lilnote/blob/master/check-file.js#L10) to
do.)

Let's add another couple of declarations:

```javascript
const n = './notes.json'
const file = fs.readFileSync(n)
```

We'll also have a variable here for our read-in notes.

```javascript
const notes = JSON.parse(file)
```

And since we'll be using `console.log` in a few places, let's just make that
a little shorter:

```javascript
const log = console.log
```

Your file should now look something like this:

```javascript
#!/usr/bin/env node

'use strict'

const fs = require('fs')
const log = console.log
const arg = process.argv[2]
const n = './notes.json'
const file = fs.readFileSync(n)
const notes = JSON.parse(file)
```

And your file structure should look something like:

```
project-root
  package.json
  index.js
  notes.json
```

## Make It Do Things

So let's do stuff! First let's make a way to record notes taken. This will
work by just calling your script and treating the first argument as a note.

```shell
./index.js "go to the grocery store"
./index.js cook
./index.js eat
./index.js "wash dishes"
```

Let's write a function for this.

```javascript
const takeNote = (notes, note) => {
  notes.push(note)
  const taken = JSON.stringify(notes, null, 2)
  fs.writeFile(n, taken, 'utf8', err => {
    if (err) return log(err)
  })
}
```

Note that we're using function expressions, not function declarations. This
could also be written as:

```javascript
function takeNote (notes, note) {
  notes.push(note)
  var taken = JSON.stringify(notes, null, 2)
  fs.writeFile(file, taken, 'utf8', function(err) {
    if (err) {
      return log(err)
    }
  })
}
```

These extra parameters to `JSON.stringify()` make our JSON look decent. Check
out the [docs on
MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
if you're not familiar with them.

We're taking in the array of notes and a note, and pushing that note to the
array of notes. Then we're using `writeFile()` from `fs` to write to the
`file` we declared earlier, using the `taken` we declared earlier, with the
encoding `UTF-8`. The callback here is in case there's an error&mdash;if the
file doesn't already exist, for example.

We should handle this function where we process our command-line arguments,
which we'll get to in a little bit.

Let's also write a function for removing a note by its index in the array.

```javascript
const removeNote = (notes, noteIndex) => {
  notes.splice(noteIndex -1, 1)
  const taken = JSON.stringify(notes, null, 2)
  fs.writeFile(n, taken, 'utf8', err => {
    if (err) return log(err)
  })
}
```

Awesome! That's like 90% of our app right there.

We should probably handle some arguments so we can actually use this thing.

## Make It All Work

We're going to do this with a series of `if` statements. We could also use a
`switch` here, but for a lot of people that'll seem a little unfamiliar.
Let's assume that you'll use `-s` to show all notes, and `-r` to remove a
note. We should also handle a case where there are no arguments passed.

```javascript
if (!arg) {
  return log('Please pass an argument')
}
if (arg && arg === '-r') {
  const noteIndex = process.argv[3]
  return removeNote(notes, noteIndex)
}
if (arg && arg === '-s') {
  return log(notes)
}
else {
  return takeNote(notes, arg)
}
```

So, that's a basic way to handle command-line options. Let's just wrap that
last bit in a function and call it at the end. It's not beautiful, but if you
put a little bit of work into this, you could have a decent app! Here's how
your whole file should look, now:

```javascript
#!/usr/bin/env node

'use strict'

const fs = require('fs')
const log = console.log
const arg = process.argv[2]
const n = './notes.json'
const file = fs.readFileSync(n)
const notes = JSON.parse(file)

const takeNote = (notes, note) => {
  notes.push(note)
  const taken = JSON.stringify(notes, null, 2)
  fs.writeFile(n, taken, 'utf8', err => {
    if (err) return log(err)
  })
}

const removeNote = (notes, noteIndex) => {
  notes.splice(noteIndex -1, 1)
  const taken = JSON.stringify(notes, null, 2)
  fs.writeFile(n, taken, 'utf8', err => {
    if (err) return log(err)
  })
}

const runTheApp = () => {
  if (!arg) {
    return log('Please pass an argument')
  }
  if (arg && arg === '-r') {
    const noteIndex = process.argv[3]
    return removeNote(notes, noteIndex)
  }
  if (arg && arg === '-s') {
    return log(notes)
  }
  else {
    return takeNote(notes, arg)
  }
}

runTheApp()
```

This isn't beautiful, but as with the last post, I'll leave it to you to
clean it up, handle funky cases, and whatnot. If you're having fun with this,
check back for my next post! Also, if you have any thoughts on fun
command-line projects in Node but aren't sure how to get started, hit me up
and I'll see about writing something up!
