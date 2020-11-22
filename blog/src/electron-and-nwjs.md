---
title: Electron and NW.js
created: 2016-01-15
starred: true
tags:
  - nwjs
  - electron
  - desktop
  - js
  - javascript
  - apps
  - node
---

Electron (formerly known as Atom Shell) and NW.js (formerly known as Node
Webkit) are similar projects that bring Javascript to the desktop. They're both
based on browser runtimes. Electron is sponsored by Github, and uses
libchromiumcontent and Webkit 537 (as of Autumn 2015). NW.js is sponsored by
Intel and uses Chromium and Blink/Webkit 537. They both use the V8 JS engine
(from Chrome), are fully open source (MIT Licensed), can access a variety of
open and licensed codecs, work on Unix-like systems (and, with a little extra
work, on Windows), and can use Flash (in Electron's case, through the Pepper
plugin). The biggest difference I've had in working with them is that Electron,
being currently more popular (likely because of the Github support, and the
popularity of the Atom editor, which is built on Electron) is usually closer to
the current version of Chromium, and NW.js is usually a few versions behind.
Electron seems to have a lot more community activity around it right now, too,
so there are a lot of useful NPM packages like
[Electron-Prebuilt](https://www.npmjs.com/package/electron-prebuilt) (and [a
lite version](https://www.npmjs.com/package/electron-prebuilt-lite)) and
[Electron-Packager](https://www.npmjs.com/package/electron-packager) (and [an
interactive
version!](https://www.npmjs.com/package/electron-packager-interactive)).
Electron also needs a Javascript entry point, which looks something like this:

```
var app           = require('app')
  , BrowserWindow = require('browser-window')
require('crash-reporter').start()

var mainWindow = null

app.on('window-all-closed', function(){
  if(process.platform != 'darwin'){
      app.quit()
  }
})
app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width                : 1200
  , height               : 800
  , 'accept-first-mouse' : true
  , 'title-bar-style'    : 'hidden'
  , 'node-integration'   : false
  })
  mainWindow.loadUrl('http://127.0.0.1:9090')
  mainWindow.on('closed', function(){
    mainWindow = null
  })
})
```

That 'node-integration' line is _really important_ if you want to use certain
client-side libraries like Angular or jQuery that use the word 'module;' your
stuff will just completely break without it.

NW.js, on the other hand, can just be pointed at your `index.html`, and that's
enough to get started. That's really convenient, but for my own uses I've
found that Electron has a lot more options. Its binaries are significantly
larger, but there are evidently ways to cut them down. Don't count on being
able to build an Electron app in less than a hundred megs, though.

If you're doing something small, like a text editor or some other little
widgety kind of app, you'd probably still be better off with Qt or GTK--you
can write a full text editor in GTK-Webkit with Python in less than 16kb, and
that's if need a full rich-text interface with buttons and such. But for
larger apps, and especially for apps you've already written for the browser,
NW.js and Electron are both really great options. If you're going to be
relying on a lot of the Node environment, Electron's got a better interface to
Node because of its separated rendering and browser engines, but you do have
to keep in mind that you'll be limited as to what client-side libraries you
can use.
