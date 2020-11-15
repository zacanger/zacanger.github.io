---
title: getting up and running with nw.js really super quickly
created: 2016-02-14
tags:
  - nwjs
  - desktop
  - node
  - electron
  - app
---

There are basically two main ways to build a desktop app in JS: Electron
(formerly called 'Atom-Shell') and NW.js (formerly called 'Node-Webkit').
Electron's really swell, probably offers more options overall, and has a cleaner
way of keeping Node and client-side code separate. NW.js is a heckuva lot
easier, overall, though.

This is what I've been using to build and run Pharaoh:
https://github.com/nwjs/nw-builder

There's also a nifty sort of version manager for NW.js here:
https://www.npmjs.com/package/nwjs , which worked a little more smoothly out
of the box, but gave me issues when trying to get Node integration to work.

To get up and running with NW.js using nw-builder, you basically just need to
put the relevant information in your `package.json`. The relevant info on that
is all here: https://github.com/nwjs/nw.js/wiki/Manifest-format but mostly
it's just something like

```
"window": {
  "height": 800,
  "width": 1200,
  "title": "my app"
}
```

et cetera. The `main` field (which usually has, like, `server/index.js` or
whatever in it), needs to be what NW.js is pointed to. That can be an HTML
file (`"main": "./client/public/index.html"` or whatever) or a URL (if you're
serving the app, especially locally--this is how Atom, Brackets, LightTable,
etc. do things, except using Electron).

That's basically it, I think. There are a lot of great Yeoman generators and
stuff to scaffold out NW.js apps, but they're mostly overkill.

Using `nw-builder` makes things pretty simple. `npm i -g nw-builder`, then
just run `nwbuild -h` to see the options. (I use `nwbuild -r .` in the project
root/wherever the relevant `package.json` is, to run the app).

Their docs are really good, and there's a crapload of options and neat stuff
you can do: https://github.com/nwjs/nw.js/wiki
