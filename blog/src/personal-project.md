---
title: notes from my personal project at devmountain
created: 2016-05-19
tags:
  - devmtn
  - electron
  - nwjs
---

# this is probably a mess

a whole bunch of basically totally disorganised notes from when i was working
on my 'personal project' at devmountain.

this was meant to be a sort of ghost/medium for the desktop -- a blogging platform
for people who actually cared about writing. turns out no one really wants that.
also it turns out [ghost was working on a desktop application](https://github.com/TryGhost/Ghost-Desktop)
cool.

requirements for this: make a mean stack app, basically.

anyway [this is the remains of that poor app i built](https://github.com/zacanger/ayuba)
and more importantly here's the mess of notes i took while doing stuff with that.

--------

## Planner

At DevMountain, for projects, you're encouraged (required, really) to use a planning
paper, which is basically a big sheet of paper divided up into sections that represent
pieces of a standard MEAN-stack app, and a sort of roadmap-to-an-end-product thing along
the bottom.

I was actually out sick the day those got handed out for the personal projects, but NBD,
there was a PDF version floating around so I threw a little app up using that (converted to
PNG and colour-inverted) using a little bit of PHP and jQuery to make a kind of sticky-notes
bulletin-board kind of thingy to serve the same purpose. One benefit of this is that I was
able to easily just save all my notes out (they were all just in a big text file anyway, on
my server). Note: I'd initially planned on using my earlier app from my 'no-server' project
(something we do at DevMountain early on, just an Angular app that can actually use a server
so long as it's a BaaS and not one we've spent time doing, because we don't actually know how
to do that at that point) called [markvi](https://github.com/zacanger/markvi).

Anyway, these are the contents from my planning thing.

### Ideas and Users

concept: a blogging platform _for writers, and readers_, based not around the
ADHD social media style of content-creation and likes and shares that's taken
over the popular idea of the blog, but instead around long-form writing; essays,
meaningful stories, and such. the target audience here is the moderately
technically savvy pseudo-bohemian; 25-50, used to smoke cloves, probably hangs
out in coffee shops too much.

### Features

* mvp: oh wait, that's already done. well, except for getting it to work in the
  desktop client, which is the entire idea here.
* the rest:
    * a clean, simple 'feed' (a la jekyll archive pages), filterable by tag and possibly date.
    * comments.
    * import/export without relying on the browser (to markdown and html).

### Views

1. the existing markdown editor (however, likely revamped to move away from
  plain old codemirror, and to include a basic rte-style toolbar).
1. the rendered panel, alone (the reading view; same on one's own posts as
  someone else's).
1. the 'social' view: a feed, no 'content-based' sorting, just purely ordered
  chronologically, and filterable by tag (and POSSIBLY date range).
1. -ish?: comments. they'll be isolated (data-wise), so it may be smarter to
  load them in dynamically (see: discourse [not discuz, they're ruby], but don't
  do that stupid thing where half the page disappears, that's some annoying-ass
  bullshit).
1. settings. VERY simple. name, email, password, export (if possible) to an
  archive file, delete account.

### Controllers

* browser, main, and nav (see existing codebase)
* not controllers, but...
* services: files (existing)
* filters: filename and cut (existing)
    * by tag (feed view)
    * (also possibly by date -- narrowing -- feed view)

### Endpoints

Those are a thing, yes.

### Schemas

```javascript
// possible schemas ??

const mongoose = require('mongoose')

const user = mongoose.Schema({
  username : {type : String, required : true}
, pass     : {type : String, required : true, minlength : 6}
, post     : [{mongoose.Types.ObjectId, ref : 'post'}]
, comments : [{mongoose.Types.ObjectId, ref : 'comment'}]
})

const post = mongoose.Schema({
  title    : {type : String, required : true}
, content  : {type : String, required : true}
, tags     : Array
, date     : {type : Number, default : new Date()}
, author   : [{mongoose.Types.ObjectId, ref : 'user'}]
, comments : [{mongoose.Types.ObjectID, ref : 'comment'}]
})

const comment = mongoose.Schema({
  date    : {type : Number, default  : new Date()}
, content : {type : String, required : true}
, post    : [{mongoose.Types.ObjectId, ref : 'posts'}]
, author  : [{mongoose.Types.ObjectId, ref : 'user'}]
})

mongoose.model('user', user)
mongoose.model('post', post)
mongoose.model('comment', comment)
```

### Other Thoughts:

this would be relatively easy to throw up in a web browser. blogging platforms
are a dime a dozen, especially ones built on node. the idea here isn't to make
another tumblr, but to bring actual writing back to the web. sort of like
medium, but without all the twitter. a key part of that is having it NOT be in a
browser. right now the goal is to put all this in an electron shell, but i'm not
going to focus super hardcore on that right this moment. if i can get everything
else in place and rock-solid first, then i'll stuff it all in electron. if not,
then i'll just write up a manifest file and call it a chrome app. either way,
fuck y'all, it's already got nigh on a thousand installs....

--------

## The Presentation Speech

This is what I'd planned to say when presenting my app. I think instead
I just kind of mumbled a little bit about how neat CodeMirror is and how
annoying it was to struggle with the `'node-integration'` issue with
Electron.

### Markdown

…is a lightweight markup language which makes writing for the web a much quicker
and easier process than if using a rich text editor (like Word), which wouldn't
translate to HTML anyway, or writing HTML manually. Intead of `<em>` or
`<strong>`, in Markdown you'd use a `_` or `*`, or `__` or `**`. Readme files on
Github are usually written in an implementation of Markdown called Github
Flavoured Markdown, which shows just how popular the format has grown. Stack
Overflow, the Discourse comment system, and various blog systems including
Ghost, Wordpress, Tumblr all use Markdown, if not by default than as an option.

vi is possibly the most influential editor of, like, ever. it was written in
1976, and either vi or one of its descendants (usually vim, which stands for 'vi
improved') has been on almost every unix-based system since then, including
every computer in this building (except the microsoft machines -- and even on
those, if you have git-bash or something similar). vim's power comes from how
easily and quickly it can manipulate large chunks of text. For example, typing
in `d5k` will delete five lines upwards, and`497G` jumps to line 497.

So, putting these things together makes for a really great tool for writing. Not
necessarily writing Tweets or Facebook posts, but writing longer texts, like
articles or essays. That's the purpose of this app. It's not a social blog. It's
kind of like Medium minus Twitter, Tumblr minus reblogging, or LiveJournal
minus… teenagers.

Since the editor component itself is based around CodeMirror, it's very
extensible, which is exciting because it leaves so much open for future
development. For example, if we wanted to make this a Javascript editor instead,
we could just change a few lines and now we have the right syntax highlighting,
automatic indentation, et cetera.

Oh, and, so, this is all a desktop app. It runs perfectly fine in a browser, but
from the beginning it was really meant to be a desktop tool; browsers are
distracting, this not so much.

Aaaand here's the code.

--------

## misc notes

All this stuff was just thrown in another file.
It's mostly to do with [Electron](https://electron.atom.io), I think.

check https://github.com/atom/electron/blob/master/docs%2Fapi%2Fbrowser-window.md
before trying to get any other browser-shit going on--we'll want to move things
into their own windows, i feel; chromeless might be a good idea, at least for
the editor view

```
const BrowserWindow = require('electron').BrowserWindow
let win = new BrowserWindow({width : 1900, height : 1600, frame : false})
```

so basically it's just a new browser window, frame as false, but we want to
probably lock the px to whatever screen we're working with, if CSS continues to
fail miserably.

-- note: check how atom manages to not fuck that up. except those bits where
they do.

frameless = non-draggable (even with alt?). specify `-webkit-app-region: drag`
in css. or, say, `body { -webkit-app-region: drag }` for all of that. this
necessitates `button { -webkit-app-region: no-drag }` (same for non-button
clickables, one assumes).

* `DownloadItem` is an eventemitter. will-download event of Session.
* downloadItem.setSavePath(path)
* downloadItem.cancel()
* downloadItem.getURL() // origin url
* file.path = real (fs) path

### printing

```javascript
webContents.printToPDF(opts, cb) // where:
opts:
  marginsType: 0, 1, 2 (0 default)
  pageSize: 'A4', 'A3', 'Legal', 'Letter', 'Tabloid'
  printBackground: false (duh)
  landscape: false (is portrait)
cb function(err, data){if err etc, data = content buffer}

empty opts = `{marginsType: 0, printBackground: false, printSelectionOnly: false, landscape: false}`

// sample from electron docs
const BrowserWindow = require('electron').BrowserWindow
const fs = require('fs')
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')
win.webContents.on('did-finish-load', function() {
  // Use default printing options
  win.webContents.printToPDF({}, function(error, data) {
    if (error) {
    throw error
    }
    fs.writeFile('/tmp/print.pdf', data, function(error) {
      if (error) {
        throw error
      }
      console.log('done did dat')
    })
  })
})
```

* main process is a normal node script
* renderer process is a normal website, plus node modules (eg in script tags or whatever)
* electron's built-in modules don't need `require('asdf')`; set
  `process.env.ELECTRON_HIDE_INTERNAL_MODULES = TRUE`
* shell.openExternal(url) opens in eg xdg-browser
* shell.openItem('/FULL/path/to/item') = xdg-open

### menus

* new MenuItem(opts):
    * id: string, unique within menu
    * submenu
    * checked: bool
    * visible: bool
    * enabled: bool
    * label: string
    * type: normal, separator, submenu, checkbox, or radio
    * role: action; if specified, next thing will be ignored
    * click: function -- click(menuItem, browserWindow) -- this is that 'next thing'
* recommended to set role:
    * undo
    * redo
    * cut
    * copy
    * paste
    * selectall
    * minimize
    * close

electron-rebuild would automatically take care of headers & native node module
builds. so, after each `npm i`, do a `./node_modules/.bin/electron-rebuild`

the 'npm' way: same as usual, except env variables:

```
export
  npm_config_disturl=https://atom.io/download/atom-shell
  npm_config_target=0.33.1 # ???
  npm_config_arch=x64
  npm_config_runtime=electron
HOME=~/.electron-gyp npm install module-name # home equals? what?
```

one important thing: nw.js's url in the package file? nah, bro, electron don't
do that shit. so manually creating the browser window and loading HTML is the
right way with electron.
