---
title: things learned dealing with electron and the mean stack
created: 2015-12-16
starred: true
tags:
  - javascript
  - js
  - electron
  - angular
  - mean
  - school
  - css
---

In the interest of [blogging the little
things](http://coffeecoder.net/blog/blog-little-things/), I want to write down a
couple of things I learned while struggling through [my
project](https://github.com/zacanger/ayuba.git). Nothing major, but a few things
that I really had to dig to find answers to, buried way underneath unrelated
issues in Github and whatnot.

--------

Firstly: Mongo is not an effective way to store data for a desktop app. If
you've got to wrap up Mongo into your app, you're looking at a huge binary; if
you're calling to Mongolab or whatever, you're looking at an online-only app,
which defeats the purpose. Ayuba will be moved to IndexedDB or similar before
being rolled back into [markvi](https://www.npmjs.com/package/markvi).

[CodeMirror](http://codemirror.net) and [Ace](http://ace.c9.io/) are both
really great, but if they're breaking things, it's okay to just not use them.
Syntax highlighting isn't all that important, not for
[Markdown](daringfireball.net/projects/markdown/).

Parsers are hard. They're mostly just regular expressions, and that's really
exhausting and annoying and not fun. It's a lot more sensible to just use [a
really good one](https://github.com/showdownjs/showdown) that already suits
your purpose.

[Electron](http://electron.atom.io) is cool, but still new and it still has
issues. [NW.js](http://nwjs.io) is a lot more solid, works a lot more
intuitively, and is worth learning. Either way, it's a lot easier to just use
the [right tools for the job](https://www.python.org/), even if it's not what
you're paying money to learn.

CSS is annoying. No one likes CSS. But it's really really really not worth
screwing yourself over by using [one of the](http://getbootstrap.com) [popular
and really](http://materializecss.com/) [inflexible and
overweight](http://yuilibrary.com/) [UI/widgeting/CSS
frameworks](https://material.angularjs.org/latest/) out there, because they
won't give you any room to breathe later.

Number one important and really frustrating thing I learned, though, was that
Electron needs to be told that it can use Angular, jQuery, etc., explicitly.
Here's an example of my `app.js` to start my Electron app:

```
var app = require('app')
  , BrowserWindow = require('browser-window')
  , mainWindow = null // keep reference of window; otherwise gc will close it!

app.on('window-all-closed', function(){
  if (process.platform != 'darwin') {
    app.quit()  // because osx holds processes open even after
  }             // all windows are closed
})

// electron's window!
app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width: 1600
 ,  height: 900
 ,  'accept-first-mouse': true
 ,  'title-bar-style': 'hidden'
 ,  'node-integration': false // otherwise various client-side things break
  })

  mainWindow.loadUrl('http://127.0.0.1:4444/admin') // our internal server...

  // mainWindow.openDevTools()

  mainWindow.on('closed', function(){
    // if we have multiple windows, store them in an array
    // this is where we'd get rid of those
    mainWindow = null
  })
})
```


The relevant line is commented, but to emphasize: `'node-integration'` needs
to be set to `false` if you want to use frameworks/libraries that might have
conflicts with native Node things, like the word `module`. I couldn't find
this documented anywhere, and it really threw me off, for about four days
straight, until I found an issue raised on Github related to this (link's long
lost, now), with the solution to my problem mentioned way down in there
somewhere, buried. So, now you know... if your front-end code keeps breaking
in Electron, and Electron doesn't need to be aware of your app's Node backend,
there's a possible solution for you.

Feel free to check out the [code from my
project](https://github.com/zacanger/ayuba/tree/master/the-real-one) and tell
me how bad it is. Maybe this'll help someone, at some point.
