---
title: Actually The Last Of The Notes
created: 2016-05-29
tags:
  - devmtn
---

## WAIT I FOUND MORE NOTES

These should be the very last of the notes taken while at DevMountain. I stuck
in like two comments somewhere just because there was something actually
incorrect, but as usual, please don't take anything in here seriously, there's a
pretty good chance I didn't know what I was talking about when I wrote a lot of
this.

--------

```javascript
function format(){
  var args = [].slice.call(arguments)
  var initial = args.shift()
  function replacer(text, replacement){
    return text.replace('%s', replacement)
  }
  return args.reduce(replacer, initial)
}
```

this is my implementation, called format.js, stolen mostly from bevacqua. it's
like util.format(), but for not-node.

so, you can pass arguments to console.log and console.error that will be passed
to util.format()

so %s for strings, %d for numbers, and %j for objects are valid

```javascript
console.trace(label)
console.time(label) and console.timeEnd(label)
console.assert(expression, arguments)
console.dir(object)
```

--------

Don't use Mongoose. Mongoose actually does have all the problems I thought it
had. Try Mongolayer at least once. https://github.com/simpleviewinc/mongolayer
`npm i --save mongolayer`

Recursive populates, create vs insert fixed, find/create and save using
different syntax fixed, and each document only having the fields added to it,
rather than being a whole new instance of the schema fixed. Records getting
default values instead of not filling that field fixed. Plus other things.

--------

Generators DO look just like infinite loops. I'm not wrong. Turns out that's
because they are infinite loops, but that's okay, because they're basically kind
of backgrounded until called. You hit it up with an iterator, get what you need,
and then it goes back to sleep. So, in a way, maybe that's kind of like a
builtin thing that you'd imagine needs to be an infinite loop, but isn't in the
way because you only poke it when you need it. (Like Math.random(), kinda?)
That's my interpretation, anyway.

--------

## Notes on Mongo schema design

#### (in a one-to-n sort of situation...)
- Embed N if low cardinality & don't need to access embedded N standalone (outside parent object's context) (array of documents)
- Array of refs to N objects if cardinality is one-to-many, or if N objects should need to stand alone (array of refs)
- Ref to One from the N objects if cardinality is very high (parent ref in the N-side document)

#### the six rules of thumb, according to mongodb:
1. favour embedding unless there is a compelling reason not to
1. needing to access an object on its own is a compelling reason
1. arrays should not grow. more than a couple hundred on the 'many' side, don't embed. if there are more than a couple thousand, don't use an array of objectid refs.
1. don't fear application-level joins.
1. keep r/w ratio in mind when denormalizing. mostly read is a good candidate. frequently updated means it's not worth it.
1. structure your models around how you will access data. how the app queries and updates are very important here.

--------

Type _introspection_ is a feature of languages where, at runtime (which, for the
sake of keeping it in my head, we'll say is when said language goes from source
to not-source, whether that's a binary or a browser window, or whatever... (Java
bytecode doesn't count, I'm not even sure where it falls on the range of
'scripting' to 'compiled')  a program can take a peek inside and see what the
_type_ of an _object_ is.

So:

```ruby
A=Class.new
B=Class.new A
a=A.new
b=B.new
a.instance_of? A
=> true
b.instance_of? A
=> false
b.kind_of? A
=> true
```

```php
if ($obj instanceof Cat) {
  // hey look, it's a cat!
}
```

```python
thingy = whatever(100)
blingy = blahhh(17)
type(thingy)
<type 'whatever'>
isinstance(thingy, type(whatever))
True
isinstance(thingy, type(blingy))
False
```

Python also has `hasattr`, which is nifty.

--------

## Cron in Node

`node-schedule` seems quite popular. It's a 'cron-like' and 'not-cron-like'
scheduler. I believe that means it's a scheduler, but it's time based instead of
interval based (because `setInterval` exists). Node-schedule is for in-process
scheduling, so once your script has executed, it's gone (and then cron makes a
lot more sense, because otherwise you'd have to write a script just to start
node-schedule to do whatever it is that you need done at whatever time and/or
date).

--------

Gulp:

```javascript
gulp.task('nameOfTask', ['arraywithTasksToExecute', 'beforeThisTaskHappens', 'whichAreOptionalReally'], function(){})

```

--------

## Electron vs Node Webkit

- Electron: `main` in `package.json` is the `app.js` or whatever to run.
- nw.js: `main` is the `index.html` to display.
- nw.js: can specify options about window, such as toolbar, width, and height.
- electron: you do that in the app.js or whatever.
- electron's menus are available on the main process. for dynamic updates to menus from within the app (rendering process), need to use ipc (built-in to electron).
- nw: call set menu, and set stuff. it's all bundled anyway, so whatever.
- nw: shell calls are totally fine.
- electron: need to spawn child procs with the `pipe` stdio option.

A package for nw.js is a zip archive wit hthe extension 'nw.' There must be a
package.json, which includes the 'main' key (html to open on load), and name of
package (similar to node modules).

'nodejs' field on package.json is boolean; set false to disable node running
there (purely client-side). node-main is the path to the script for node to run
(so we could have nodde run the server, and nwjs working with its own files, and
there _shouldn't_ be conflict.)

- user-agent (should be pretty obvious.)
- remote enalbes calling node in remote pages, whitelist of hostnames.
- chromium-args (literally).
- js-flags (string) for example:`{"name": "test", "main": "index.html", "js-flags": etc function etc}`
- inject-js-start and inject-js-end (THESE ARE THE IMPORTANT BITS, PAY ATTENTION HERE!)
    - start: local filename (relative to index.html) to specify js to inject. js is executed AFTER all css, but BEFORE any other scripts are run or the dom is built.
    - end: same, but it's excecuted AFTER loaded, before the onload event. mostly used as an option of Window.open() to inject js into a new window.

- window:
    - title str
    - width/height int
    - tooolbar bool
    - icon str (path to the icon)
    - position  str (null, center, or mouse)
    - `min_width`, `min_height`, `max_width`, `max_height` int
    - `as_desktop` bool show as x server desktop background window
    - resizable bool
    - always-on-top bool
    - visible-on-all-workspaces bool
    - fullscreen bool
    - `show_in_taskbar` bool
    - frame bool (sets frameless; avoid if setting fullscreen to true!)
    - show bool (false would mean hidden startup [tray?])
    - kiosk bool (fullscreen, prevents mouse-driven leaving app; alt-f4 still works, and ctrl-q probably does as well)
    - transparent bool (would need composition support) (if true, set with rgba as in css)

- webkit
    - plugin bool (defaults false, for loading media plugins)
    - java bool (fuck no, leave that shit where it is)
    - page-cache bool

More on nw stuff:

whether a .nw file (renamed zip) or project directory, the package.json needs to
be in the root, and if it's the .nw, that needs to be the actual project
directory contents, not a directory containing them.

`console.log` redirects to dev tools (same with console.warn and console.error)

the `process` object:
- `process.versions['node-webkit']` is set with nw's version
- `process.versions['chromium']` is set with the chromium version that the nw version is based on (so, for example, node-webkit version 0.13.0-alpha7, chromium version 47.0.2526.73, node version 5.1.0)
- `process.mainModule` is set to the _start_ page, eg `index.html`--this is whatever's under `main` in the package.json, UNLESS there's a specified `node-main` field there.

`__dirname` can only be called by node modules (with `require()`). webkit doesn't have that (not in devtools either). a hacky fix:

`exports.dirname = __dirname` in a file, then require that (eg `var dirname = require('./dirnamefile').dirname; console.log(dirname)` would return dirname).

--------

# MISC NODE THINGS

What the hell is an event emitter, anyway? Oh, okay. So. Here's an example.
`net.Server` emits an event when a peer connects. `fs.readStream` emits an event
when a file is opened. `events.EventEmitter` objects! This can be accessed
directly by requiring `events`.

Functions can be executed when an event is emitted--these are called
__listeners__ (not something silly like emitter methods or whatever, that would
just be nonsense). In those functions, `this` is the `EventEmitter` to which the
listener is attached.

Something worth noting: _HANDLE EVENTEMITTER ERRORS_. Errors are special events
in node, and if there's no listener for it, node'll just print a stack trace and
exit. So always always always be aware, and do something like `.on('error', fn)`
to make sure you're handling errors the way you __want__ to handle them, rather
than just letting shit crash and die.

--------

Gulp core's api is THIS SIMPLE. Check this out.

```javascript
.src(globs [, options])   // takes glob, returns stream in
.dest(path)               // takes path, returns stream out
.task(name [, deps], fn)  // defines task
.run(tasks... [, cb])     // runs task
.watch(glob [, opts], cb) // watches fs
```

That's IT. The entire codebase is actually readable in a relatively short amount
of time. Fuckin' beautiful.

Clearly that doesn't include `.pipe()`, but pipe isn't exactly an api thing I
think. It's a pipe. That'd be like saying 'oh yeah, you need to learn |, that's
a really important thing' or whatever. Sure, it's the most vital and fundamental
thing about \*n\*x, but it's not a thing you learn, I guess.

(note : pipe is from node, not gulp-specific)

--------

Regarding ES6 `let` and `const`: `let` would be mutable. `const` is basically
exactly what it sounds like.

(note : not exactly)

--------

React things:

`componentWillMount()` is triggered _once_, before any rendering.

`componentDidMount()` is triggered _after_ initial rendering. Access to DOM, here!

`componentWillReceiveProps(object nextProps)` triggers after component receives new props.

`shouldComponentUpdate(object nextProps, object nextState)` optimize rendering, return false if no need to update.

`componentWillUpdate(same as above, there ^^ )` triggered after shouldEtc,etc..., and before `render()`.

`compnentDidUpdate()` after rendering. Modify the DOM here.

`componentWillUnmount()` just before component unmounted from DOM--do cleanup here.

`displayName` good for debug especially. ES6 classes, derived from class name.

`getInitialState()` equivalent of constructor in classes.

`getDefaultProps()` same, bro.

`mixins` array

`statics` properties and methods for component

--------

Webpack: `preLoaders` gets executed before `loaders`, regardless of order; this
still goes in under `module:{}`.  `jshint-loader` works in here! That'll just
look for your standard `.jshintrc`.

Eslint would be better for React, especially because of `eslint-plugin-react`.
Eslint also has autofixing (--fix) for some stuff.

With eslint we'd just include that as an npm script, eg `npm run lint` with
`"lint": "eslint . --ext .js --ext .jsx --fix"`.

Eslint also follows an `.eslintignore`, and an `.eslintrc`. Rules have
_severity_: 0 for disabled, 1 for warning, 2 for error. Some rules take an
_array_ instead, like `"quotes": [2, "single"]`.

When there's a lint error with Eslint, npm will give you an `ELIFECYCLE` error.
To hide that, we could do `npm run lint --silent`; alternatively, the same npm
script above could have `|| true` appended, but if we invoke that from somewhere
else, it'll pass even when there are failures.

`jscs`, with `jscs-loader`, follows `.jscsrc`.

And, lastly, there's always EditorConfig and the `.editorconfig` file.

--------

Flux: really just an architecture pattern that means it has a _unidirectional
data flow_. Like, seriously, that's all. Here's an example diagram: `Actions ->
Data Stores -> Components (Views)`. That's _it_. All Flux really is is a way of
_thinking_ about things. That's why there are libraries that _implement_ Flux
patterns, like Alt.

Another example diagram:

```           (listens())
  Stores <- - \
 |              Components
 |(listens)      |
 \               / (calls)
  --> Actions <--
```

--------

Some React Vocab:

As of some...time, _all_ React custom components _must_ be Uppercase, like This,
to differentiate from standard xml/html. See [this
gist](https://gist.github.com/sebmarkbage/f1f4ba40816e7d7848ad) for more info on
that.

There are five main types in React (and that's a horrible word to use, can we
think of something better? Kinds of elements? Things? Idk...).

React Elements are the primary... thing. A `ReactElement` has four properties:
type, props, key, ref. No methods, nothing on prototype. Created like `var foo =
React.createElement('div').` You pass these to `React.render`, with a DOM element
(HTML or SVG), like `React.render(foo, document.body)`. To add properties to it,
pass a properties object as the second argument. Children to the third. (Note
that if using JSX, that's a bit less verbose.

`ReactElement`-_factory_ is a function that generates `ReactElement` with
specific `type` property. `function createFactory(type){return
React.createElement.bind(null, type)}`; `var div = React.createFactory('div');
var foo = div({className: 'my-div'}); React.render(foo, document.body)`. Common
HTML tags have built-in factories in React (like `var quux = React.DOM.ul` or
`var bar = React.DOM.li`). But, again, JSX negates the need for factories.

`ReactNode` could be `ReactElement`, string, number, or array of ReactNodes
(`ReactFragment`). This is a property of other `ReactElement`s used to represent
children. Kind of basically create a tree of REs.

`ReactComponent` would be where the real meat of React can be found. Here we can
create whatsits in React, and then sort of encapsulate them with their own
little embedded _state_. And remember, in React, everything is state. And
everything is a really ugly bit of PHP that wants to be Javascript. So, `var
thingy = React.createElement(SomeComponent)` or `var thingy = <Some Component
/>`


```
React.render = (ReactElement, HTMLElement | SVGElement) => ReactComponent

type ReactNode = ReactElement | ReactFragment | ReactText

type ReactElement = ReactComponentElement | ReactDOMElement

type ReactDOMElement = {
  type: string,
  props: {
    children: ReactNodeList,
    className: string,
    etc.
  },
  key : string | boolean | number | null,
  ref : string | null
}

type ReactComponentElement<TProps> = {
  type: ReacetClass<TProps>,
  props: TProps,
  key : string | boolean | number | null,
  ref : string | null
}

type ReactFragment = Array<ReactNode | ReactEmpty>

type ReactNodeList = ReactNode | ReactEmpty

type ReactText string | number

type ReactEmpty = null | undefined | boolean

type ReacetClass<TProps> = (TProps) => ReactComponent<TProps>

type ReactComponent<TProps> = {
  props: TProps,
  render: () => ReactElement
}

```

--------

#### Waterfall Model:

```
Requirements ==>
  Design       ==>
    Implementation ==>
        Verification ==>
            Maintenance
```

Also known as:

```
Denial ==>
  Bargaining ==>
    Anger      ==>
      Depression ==>
          Acceptance
```

--------

TO DISPLAY BRACES (`{{}}`) IN ANGULAR, YOU NEED TO WRAP THEM IN A WHATEVER
(`<span>`, `<p>`, whatever) AND GIVE THAT TAG THE ATTRIBUTE `ng-non-bindable`,
LIKE IN `<code ng-non-bindable>{{show.things}}</code>`.

--------

Dates/times in JS:

```javascript
var myDate  = new Date('December 31, 2015 11:58:30')
  , myEpoch = myDate.getTime()/1000.0
console.log(myEpoch)

var yourDate  = new Date(1451631690 * 1000)
console.log(yourDate.toGMTString() + ' ' + yourDate.toLocaleString())
```

--------

```javascript
_.isString(str) = (typeof str === 'string') = (toString.call(str) === '[object String]')
// underscore's okay, typeof is okay, but this one here is the shiznit, fo sho
```

--------

A transpiler is a compiler. It takes code that can't be run on whatever engine
it's targetting, and compiles it so it works. The only actual difference is that
when funky-code-X is compiled into normal-code-Y, it stays at around the same
level of abstraction. So, turning JSX or ES6 into ES5 doesn't really make a vast
difference in terms of performance, and it's not like Javascript is a low-level
language that we're compiling to, using Babel--we're just basically
cross-piling. Hence the 'trans' prefix.

--------

```css
/* hides the element so it's just _gone_ */
.thing {display: none;}
/* hides its attributes and stuff, but the tag is still there, so it might take up space */
.stuff {visibility: hidden;}
```

NPM -- local (to project) `.npmrc` _must_ be `0600`! Otherwise NPM ignores them.
Idea being that they should only be readable and writable by the single user
account. The local `.npmrc` can be overridden by arguments (such as `npm config
set foo:port 9999`_).
