---
title: SystemJS and JSPM
created: 2016-01-14
tags:
  - bundler
  - build-tools
  - systemjs
  - jspm
  - browser
  - js
---

SystemJS is a module loader. It works with ES6 modules, AMD (the sort that
RequireJS brought to the browser), CommonJS (the kind that most people are more
familiar with, the synchronous sort), Node (which basically just uses CommonJS),
and global scripts. It's basically the [es6 module loader
polyfill](https://github.com/ModuleLoader/es6-module-loader) on hella steroids.
Using plugins, you can load in assets (styles, images, whatevers).

To use it in the browser, you'd do something kinda like

```
System.config({baseUrl: '/app'})
System.import('main.js')
```

assuming we've got SystemJS coming from a CDN in there somewhere. That doesn't
sound at all exciting, since we're just loading in 'main.js' from the '/app'
directory, but we can do some cool things with it, like

```
System.config({
  baseUrl: '/app'
, transpiler: 'babel'
, babelOptions: {
    // etc.
  }
})
```

so, y'know, that's actually pretty super cool. We could write in ES6 and have
it _just work_.

SystemJS uses `Promise` and `URL`. If they're not available, it'll load in an
external polyfill file. Probably needed for IE. If we're using a CDN instead
of bundling, load a `window.Promise` and `window.URLPolyfill` in, before
SystemJS.

To get up and rolling, we need to do a tiny bit of boilerplate.

```
var System = require('systemjs')
System.transpiler = 'babel'
System.import('./app.js').then(function(m){
  console.log(m)
})
```

That assumes we're installing with NPM, and not using JSPM at all. We should
think about using it, though.

```
var System = require('jspm').Loader()
System.import('someLibrary').then(function(things){
  console.log(whatever)
})
```

So, with JSPM, we'd be handling almost everything in JSPM's own config file.
