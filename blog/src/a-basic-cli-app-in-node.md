---
title: Node CLI 1, React Component Generator
created: 2016-08-24
tags:
  - node
  - cli
  - terminal
---

I'm going to walk through a super basic app in Node that you can
run in your terminal. I've got a more in-depth tutorial coming up soon,
but wanted to get this idea out there tonight.

[Someone](http://ryanwalsh.io) brought up the idea of a React component
generator the other day, and I immediately thought _Bash script_. Well, that's
pretty easy.

```shell
#!/bin/bash

echo "
import React from 'react'

const $1 = () => (
  <div>$1</div>
)

export default $1
" > $1.js
```

There you go, a basic pure component generator script. This could be a little
more complex, handle some content, handle generating a class instead of a
function, and whatever, but that's the basic idea, in Bash.

> Keep in mind, none of this is React-specific. All we're doing is handling
> arguments and spitting out a file.

The idea here is that you just call this script from somewhere and it gives
you a component already laid out for you. It's not too fancy, but it's useful.

```shell
$ ./my-script.sh Foo

$ cat Foo.js

import React from 'react'

const Foo = () => (
  <div>Foo</div>
)

export default Foo
```

That could save a little bit of time. I use something similar for generating
an `index.html` for React apps.

This is a lot like using snippets in your editor, except it doesn't rely on
you having that editor and those snippets handy. You could pass this around to
anyone who uses any editor, on any computer, and get the same result. You
could upload it to somewhere and just `curl my-script.sh | bash` and not even
need to have the file around. Pretty handy, I think.

But... what about in JS? I mean, we're JavaScript devs, right?

It's still pretty straightforward in Node, as it happens.

We only need one file to get going. I'll call mine ~~compgen~~ rcg.js, for React
Component Generator.

```shell
touch rcg.js     # create a new file
chmod +x rcg.js  # set an executable bit on the file
vi rcg.js        # open it for editing
```

(Obviously substitute your editor for `vi`.)

What's the first thing any executable script needs? A shebang! We'll also go
ahead and use `process`. If you don't know `process`, open Node in a terminal
(`node`) and just type in `process`. It's pretty cool. The bit we want is
`.argv`, which is an array of all arguments passed. It always has `node` and the
file that's calling it as the first two elements, so we don't need those.

```javascript
#!/usr/bin/env node

const args = process.argv.slice(2)
const type = args[0]
const component = args[1]
```

What we're going for here is a script we can call like `./rcg.js function Foo`,
or with a `class` parameter instead.

The next thing we'll need to do is actually sketch out these components. I'll be
using template literals. If you don't have a recent version of Node, you should
update. If you can't update, you'll have to use string concatenation instead (so
really, you should just update). To update (on Mac or Linux; on Windows you
should just go to [the website](http://nodejs.org) and download a new version),
just `npm i -g n && n latest`.

Let's write out what a pure (function) component looks like, first.

```javascript
const pureComponent = `
import React from 'react'

const ${component} = () => <div>${component}</div>

export default ${component}
`
```

It doesn't have a whole lot going on, I know. This is just a quick file
generator, it can't write your code for you. :P

If you can't update node, that'd look something like this:

```javascript
var pureComponent = 'import React from \'react\'' +
'function ' + component + '(){' +
  'return <div>' + component + '</div>' +
'}' +
'module.exports = ' + component
```

(Kind of annoying, right?)

So now, let's get one for a class (I won't go through doing this one with an old
version of Node, nor with `React.createClass`&mdash;just with ES2015 classes).

```javascript
const classComponent = `
import React, { Component } from 'react'

export default class ${component} extends Component {
  render() {
    return (
      <div>${component}</div>
    )
  }
}
`
```

Lovely! Obviously this should be more complex; if your class only has a render
function that returns JSX, just use a function instead.

Great, now you have a bunch of stuff in a file that doesn't do anything! Let's
handle arguments and make it actually do things.

There are a lot of great libraries for parsing options, and I'll list a few of
them in the next blog post. For now, we'll just use `if` statements.

```javascript
let toWrite // this is what we'll end up writing to a file
if (type === 'function') {
  toWrite = pureComponent
}
if (type === 'class') {
  toWrite = classComponent
}
if (type !== 'function' && type !== 'class') {
  console.log('please pass type of component as first argument')
}
```

That's a little sloppy&mdash;intentionally! I'm hoping you take some time to
write this out a little better than just copying and pasting from this blog
post.

There's one major bit left: actually writing a file. We'll need Node's `fs` for
this.

```javascript
const { writeFile } = require('fs')
```

Now, at the bottom of our file, let's actually do the fun bit.

```javascript
writeFile(`${component}.js`, toWrite, 'utf8', err => {
  if (err) console.log(err)
})
```

Now your whole file should look something like this:

```javascript
#!/usr/bin/env node

const args = process.argv.slice(2)
const type = args[0]
const component = args[1]
const { writeFile } = require('fs')

const pureComponent = `
import React from 'react'

const ${component} = () => <div>${component}</div>

export default ${component}
`

const classComponent = `
import React, { Component } from 'react'

export default class ${component} extends Component {
  render() {
    return (
      <div>${component}</div>
    )
  }
}
`

let toWrite
if (type === 'function') {
  toWrite = pureComponent
}
if (type === 'class') {
  toWrite = classComponent
}
if (type !== 'function' && type !== 'class') {
  console.log('please pass type of component as first argument')
}

writeFile(`${component}.js`, toWrite, 'utf8', err => {
  if (err) console.log(err)
})
```

Boom! You've made a command-line app! You can drop this anywhere in your
`$PATH` and call it from anywhere to generate a component for you! (`$PATH` is
where your system looks for files to execute. If you don't have something like
a `~/bin` directory, maybe `mv rcg.js /usr/local/bin`. If you don't want to
move it somewhere like that, you can always either do `./rcg.js` or `node
rcg`.)

That's it! This script is not super clean. There are a few little things that
can be done to make it a lot better, like using a `switch` statement to handle
arguments, handling unexpected arguments, not overwritting an existing file,
passing more options, and trimming extra lines from the generated files, and
not keeping your templates in the same file as all the rest of the things. I'm
going to leave that up to you. Have fun with it!

If you're interested in doing this kind of stuff in Node, be sure to check
back! I've got two more tutorials on writing command-line apps in Node, which
will go progressively more in depth, on the way
