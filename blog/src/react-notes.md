---
title: REACT NOTES
created: 2016-01-25
tags:
  - react
  - webpack
  - js
  - notes
  - redux
---

This is all _such_ a mess, and so unsorted, so, sorry about that in advance.

This is also almost entirely notes from very early on in trying to learn React,
so not all of it will be completely valid, probably. Okay. So.

Enjoy.

[TOC]

#### REACT NOTES (yeah, again):

There's no `if...else` in JSX. Doesn't work. Don't try it (in your JSX).

Don't try `<!doctype>` either. It'll break stuff.

Same with HTML comments. Not worth the trouble, I guess. No one reads them,
anyway, so whatever.

Don't try to use your own code style. JSX needs to be written the way the docs
say to. Doing React means doing React _their_ way, so screw your purely
stylistic preferences, they don't matter anymore. Which, unfortunately, means
semicolons everywhere. Gross.

_Every single XML tag needs to be closed_. That means that `<br>` is invalid,
but `<br></br>` is... totally valid. Also, self-closing tags (which literally
do not even exist in HTML anymore) work just fine, so `<div />` is valid. What
the hell.

In JSX, **everything** in `{}` will be evaluated as Javascript. So you can do
some things there, if you need to. (But not `if...else`!)

Any JSX over multiple lines needs to be wrapped in parens. If it's
single-line, you don't need them.

Evidently it's better to indent all the stuff going in your tags just inside
the tag, rather than even with the first whatchamacallit. This is what I mean:

```
<input type="text"
       value={whatever.stuff}
       onChange={this.foo.bar} />
```

...is apparently NOT the way to do it. Instead, we want to do:

```
<input
  type="text"
  value={whatever.stuff}
  onChange={this.foo.bar} />
```

which, personally, I find more annoying and _less_ readable, but apparently
that's how the React community does, so whatever. Oh, and as to the closing of
the tag, no matter what it's gonna be hideous, so I don't know or care whether
it should be on a newline. Probably not, because that's just even more lines,
but I have seen a lot of this:

```
<input type="text"
  value={whatever.stuff}
  onChange={this.foo.bar}
/>
```

which is really even more annoying, but whatever. Lastly, as far as style
goes, I'll just put what would make the most sense to **me**, personally. Note
how clean and lined up things are? Yeah. Much better, to my eyes. Still ugly
af, though.

```
<input type="text"
      value={whatever.stuff}
   onChange={this.foo.bar} />
```

--------

Redux:

Actions describe a desired change inside the app. Actions have types. What I'm
doing in my example Redux todo app is putting functions in the actions
subdirectory, rather than putting them directly in the components; this is
because we're not changing the internal state, we're changing the Redux store.

The idea behind immutable is simply what it sounds like: mutable states are
not desirable. So instead of making changes to states, immutable returns a new
copy for every change. The API of the lib is pretty close to regular Js
variable types, which is why we can just ~~push~~ _unshift_ (because we want
it on the top, duh) to a list like we would to an array.

The way this little project works is like this:

* component fires an event (adding or removing a task)
* action is dispatched
* if the action is addTodo, task is pushed to the current state, and a new copy is returned
* etc., etc., etc.
* store is updated

... that's all I've got. So far.

With Redux, you will always only have **one** store, and use _reducers_.

The `connect` bit lets you choose which parts of the state you want to give to
your component. That's kinda necessary in anything resembling a real app,
which would have multiple reducers.

Oh, so what we're doing is handling all state in Redux, and taking it
completely out of the actual components. That's sensible, I guess. Hence the
term 'state container.'

And actions are just pure functions. so `dispatch(addTodo('test'))` is exactly
the same as `dispatch({type: 'addTodo', todo: 'test'})`. (One thing to keep in
mind, then, is to never do an AJAX request before returning an action; that
would mean a possibly different output, if there was a failure, which would
make the function totally not pure at all.)

Directory structure: A lot of examples and boilerplates will organize files by
nature (including the ones I've been doing), so something like this:

```
actions/
  thoseActions.js
  theseActions.js
components/
  header.jsx
  footer.jsx
  somestuff.jsx
  otherstuff.jsx
containers/
  thiscontainer.js
  thatcontainer.js
reducers/
  index.js
  foobar.js
routes.js
tests/
  ... basically the same structure as above, repeated.
```

...etc., etc., etc., and there's nothing necessarily _wrong_ with that, but
it's kinda not actually scalable, I think. Especially since that means every
time you have a new 'feature,' you're throwing files in several directories.
Doesn't that sort of obstruct the whole componentized way of doing things? If
we're using ES6, which we are, because we need to find some relief from JSX,
and ES6 at least makes some things a little less horribly unpleasant, we can
export more than once from a file. Since Redux is handling state, and our
components are just dump pluggable bits, why not nix some of that?

```
  import {something} from 'redux'
  import {connect} from 'react-redux'
  import * as WhateverActions from './WhateverActions'

  export function Foo(){name, stuff}{
    return <div>lots of stuff here</div>
  }

  function mapStateToProps(state){
    return {...state}
  }
  function mapDispatchToProps(dispatch){
    return bindActionCreators({...WhateverActions}, dispatch)
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Whatever)
```

So now we have one less file, and if we are actually doing some testing, we
can, like, `import {Whatever} from './Whatever.js'`. Lovely. And instead of
throwing all our tests in a mirroring directory, let's be a _wee_ bit more
like Python (where we'd just have tests in the actual files) and move our
tests closer to our code, shall we?

```
  src/
    app/
      header.jsx
      header-test.js
      app.js
      app-test.js
      routes.js
      routes-test.js
      reducers.js
      reducers-test.js
    whatever/
      whatever.jsx (this would be the file we faked above, with component and container both)
      whatever-test.js
      whatever-reducer.js
      whatever-reducer-test.js
    ... and you get the idea....
```

That's even more of a bad example of _actual_ separation of concerns, but it's
incredibly evident that React's idea of 'separation of concerns' differs
wildly from the rest of the world's. If we're trying to just organize things
by component, which we very definitely are in React, this makes a lot more
sense. Good going, interwebsh, you've helped me clean up my directories a lot!
Thanks. :)

--------

```
ES7:        ::a.b  <->  a::a.b
             a::c  <->  c.bind(a)
So:         ::a.b  <->  a.b.bind(a)

So: <input onChange{this.onInputChange.bind(this)} />
Is: <input onChange={::this.onInputChange} />
```

--------

Here's another proposed directory/file structure for react projects. The
benefits of this one are clear feature ownership, predictability of module
usage, and that everything literally maps to the route hierarchy (which maps
to the UI hierarchy). That's a bit backwards from how we normally (outside of
React, since there isn't really a 'normal' for React, it seems) do things.

Let's say we have two types of directories: 'feature' directories and
'generic' directories. Features might be 'users,' 'admin,' or 'comments;'
generics would be your usual 'components,' 'stores,' 'actions,' and 'helpers.'

So, let's say this is our route:

```
var routes = (
  <Route name="App">
    <Route name="Admin">
      <Route name="Users" />
      <Route name="Reports" />
    </Route>
    <Route name="Course">
      <Route name="Assignments" />
    </Route>
  </Route>
)
```

For this, we'd set up our directories like so:

```
app
└── screens
    └── App
        └── screens
            ├── Admin
            │   └── screens
            │       ├── Reports
            │       └── Users
            └── Course
                └── screens
                    └── Assignments
```

So, let's assume that each screen will have an `index.js` which serves as the
entry point. React Router would call this a 'route handler.' There'll also be
a `config/routes.js` up there somewhere.


```
app
├── config
│   └── routes.js
├── screens
│   └── App
│       ├── screens
│       │   ├── Admin
│       │   │   ├── screens
│       │   │   │   ├── Reports
│       │   │   │   │   └── index.js
│       │   │   │   └── Users
│       │   │   │       └── index.js
│       │   │   └── index.js
│       │   └── Course
│       │       ├── screens
│       │       │   └── Assignments
│       │       │       └── index.js
│       │       └── index.js
│       └── index.js
└── index.js
```

So, here each 'screen' has its own modules. So now we've got scope built right
into our structure. Assuming each 'screen' has its own components:

```
app
├── config
│   └── routes.js
├── screens
│   └── App
│       ├── components
│       ├── screens
│       │   ├── Admin
│       │   │   ├── components
│       │   │   ├── screens
│       │   │   │   ├── Reports
│       │   │   │   │   ├── components
│       │   │   │   │   └── index.js
│       │   │   │   └── Users
│       │   │   │       ├── components
│       │   │   │       └── index.js
│       │   │   └── index.js
│       │   └── Course
│       │       ├── components
│       │       ├── screens
│       │       │   └── Assignments
│       │       │       ├── components
│       │       │       └── index.js
│       │       └── index.js
│       └── index.js
└── index.js
```

Each component there is used only in that one screen--not even the child
screens. But every screen _also_ has a 'shared' directory, for sharing between
siblings, or with a parent.

```
app
├── config
│   └── routes.js
├── screens
│   └── App
│       ├── screens
│       │   ├── Admin
│       │   │   ├── screens
│       │   │   │   ├── Reports
│       │   │   │   │   └── index.js
│       │   │   │   └── Users
│       │   │   │       └── index.js
│       │   │   └── index.js
│       │   └── Course
│       │       ├── screens
│       │       │   └── Assignments
│       │       │       └── index.js
│       │       └── index.js
│       └── index.js
└── index.js
```

With this structure, each screen has its own directory to hold its
modules. In other words, we've introduced "scope" into our application
file structure.

Each will probably have a `components` directory.

```
app
├── config
│   └── routes.js
├── screens
│   └── App
│       ├── components
│       ├── screens
│       │   ├── Admin
│       │   │   ├── components
│       │   │   ├── screens
│       │   │   │   ├── Reports
│       │   │   │   │   ├── components
│       │   │   │   │   └── index.js
│       │   │   │   └── Users
│       │   │   │       ├── components
│       │   │   │       └── index.js
│       │   │   └── index.js
│       │   └── Course
│       │       ├── components
│       │       ├── screens
│       │       │   └── Assignments
│       │       │       ├── components
│       │       │       └── index.js
│       │       └── index.js
│       └── index.js
└── index.js
```

These components are used *only in the current screen*, not even the
child screens. So what about when you've got some shared components
between screens?

### Shared Modules

Every screen also has a "shared" generic directory. If its children
share any components with each other or the parent, we put the shared
code in "shared". Here is our growing app with some new shared, and not
shared modules.

```
app
├── config
│   └── routes.js
├── screens
│   └── App
│       ├── components
│       ├── screens
│       │   ├── Admin
│       │   │   ├── components
│       │   │   ├── screens
│       │   │   │   ├── Reports
│       │   │   │   │   ├── components
│       │   │   │   │   ├── stores
│       │   │   │   │   │   └── ReportsStore.js
│       │   │   │   │   └── index.js
│       │   │   │   └── Users
│       │   │   │       ├── components
│       │   │   │       └── index.js
│       │   │   ├── shared
│       │   │   │   └── stores
│       │   │   │       ├── AccountStore.js
│       │   │   │       └── UserStore.js
│       │   │   └── index.js
│       │   └── Course
│       │       ├── components
│       │       ├── screens
│       │       │   └── Assignments
│       │       │       ├── components
│       │       │       └── index.js
│       │       └── index.js
│       ├── shared
│       │   └── components
│       │       ├── Avatar.js
│       │       └── Icon.js
│       └── index.js
├── shared
│   └── util
│       └── createStore.js
└── index.js
```

This will basically make requires/imports work the same way they do in Node,
where if you require something without a filepath, it'll look in
`node_modules/`, then `../node_modules/`, and on up until it finds something,
hopefully. As with the previously mentioned structure, we can put our tests
right where they belong: in with the code.

```
app
├── __tests__
├── config
│   └── routes.js
├── screens
│   └── App
│       ├── components
│       │   ├── __tests__
│       │   │   └── AppView.test.js
│       │   └── AppView.js

... etc.

├── shared
│   └── util
│       ├── __tests__
│       │   └── createStore.test.js
│       └── createStore.js
└── index.js
```

This is _definitely_ more for larger React applications... this is
complicated, kinda, and takes a lot of files and a lot of directories, but
it's easy to see how it could work out well and be maintainable.

Note that we're using the word 'screen' here because 'view' has a lot of other
connotations, for example as the V in MVC, or as a shared template. Screens
are literally just one screen in the app. Almost like using web languages to
make _web stuff_, for the web. Y'know, like we used to, back in the good old
days.

--------

#### REDUX

Something worthy of note: immutability doesn't mean one _can't_ change an
object, it just means we don't, I guess. The rule here is, basically, 'if you
change it, replace it.'

```
var obj = {something: 'value'}
obj.something = 'new value'
// we just changed 'obj'

let obj = {something: 'value'}
obj = {...obj, something: 'new value'}
// we just made a new copy of 'obj', with that key changed

shouldComponentUpdate(newProps){
  return newProps.obj !== this.props.obj
}
// method to determine if components need to update themselves
```

Everything is an _action_. Only one state object. No weird buzzwords, just
straight up objects & arrays & primitives. Everything works by reducers (to
change state). You have a starting state and a current value. You return a new
state. Everything is sequential. Any series of identical actions performed
against the same state will result in the same returned state (so, states
_could_ be thought of as 'purely functional,' at least in that respect).

--------

#### WEBACK IS A PAIN

Seriously, it's a pain. Here's what I've learned:

* Don't bother trying to use the Node API, it's weak and half-broken.
* Don't count on their docs, because they suck.
* Don't even bother using it for anything other than React, because the rest of the world uses sane, sensible bundlers.
* Also, there's no need for jsx-loader, because babel-loader does JSX by default.

Webpack won't reload your entry point, just components.

Here's a solution to avoid needing to require all your files inside of each
other (if it's a safe thing to do, for your project):

```
var req = require.context("../fooDirectory", true, /^(.*\.(js$))[^.]*$/igm)
req.keys().forEach(function(key){
  req(key`^)
})
```

Another way would be to make an `index.js` or whatever in that `fooDIrectory`,
and put this in it:

```
var req = require.context('./', true, /\.js$)
req([])
```

And, in your `main.js` or `app.js` or whatever:

```
require('./fooDirectory/index.js') //, or
require('./fooDirectory') //, or...
import bar from './fooDirectory'
```
