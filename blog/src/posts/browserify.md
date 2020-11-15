---
title: Browserify
created: 2016-01-14
tags:
  - bundler
  - browserify
  - tidbits
  - build-tools
---

Browserify is really kinda pretty cool. The big difference between this and
other bundlers is that it provides `require()` for the browser.

It doesn't take configs. You just run it! For example: `browserify node_modules
-o app/bundle.js`. You can put that in your package.json.

`browserify -r ./src/stuff:module-to-map-to > public/bundle.js` would give you a
long bit of minified code that turns your local 'stuff' into the module
'module-to-map-to,' and enables a browser-side equivalent of the CommonJS
`require()` with a very large function, in that 'bundle.js,', which is GREAT.
