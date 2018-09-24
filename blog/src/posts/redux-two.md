---
title: redux notes, part two
created: 2016-08-06
tags:
  - redux
  - react
---

Because the Redux docs say "Redux is actually really simple!" when sometimes
it's not, and because those docs themselves are pretty overwhelming when
you're first trying out Redux, I'm going to attempt to distill the docs and
bits of my own (admittedly limited) personal experience with Redux into a
couple of blog posts.

--------

All your data moves in one direction. This is the same as in Flux. You will
always go through the same steps in redux:

* Action (call `store.dispatch()` with an object that describes something
  happening)
* Reducer (pure function called based on the action that was dispatched that
  calculates next state)
* Your root reducer combines a bunch of reducers' outputs into one state tree
  (assuming you have a root reducer, which you probably do)
* The store saves the state tree as returned by the above&mdash;now that's your
  state (and at this point anything you subscribed with will be invoked)

All your state in redux is just an object&mdash;just one object. It's probably a
good idea to try to keep that as shallow as possible, and reference things by
keys (IDs), rather than deeply nesting stuff.

Reducers are just functions. They take your existing state (state previous to
acting on it) and an action and output state (new state).

```javascript
const someReducer = (oldState, action) => newState
```

It's a reducing function just like you'd pass to `Array.reduce()`, it it should
always be a pure function. Don't mutate arguments, call non-pure functions, make
API calls, or anything like that in a reducer. If you don't know what a pure
function is, it's actually super simple:

> Given the same arguments, a pure function will always have the same output.
> This means it's a function who's result relies solely on its arguments.

One thing you should get in the habit of doing is using 'default arguments.'
This is new in ES2015, and saves you a bit of code. This means you could have
some initial state:

```javascript
const initState = {
  something     : 'a'
, somethingElse : 'b'
}
```

And instead of needing to write

```javascript
const reducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initState
  }
  // do stuff
}
```

You can just do

```javascript
const reducer = (state = initState, action) => // do stuff
```

Reducers are frequently switch statements. This might seem a little weird at
first, since most JS folks avoid switch statements (I think some linters even
warn about them, saying they're 'confusing'), but it makes sense in reducers
since you can handle various actions in one function. Remember, an action is
just an object: `{type: 'do_thing'}` with possible other fields: `{type:
'do_thing', to: 'stuff'}`.

```javascript
const someReducer = (state = initState, action) {
  switch (action.type) {
    case do_stuff:
      return Object.assign({}, state, {something: action.to})
    default:
      return state
  }
}
```

Note the `Object.assign()`&mdash;we don't mutate state, we return a new state
based on the old state and the action. You'll probably want to use a polyfill
for `.assign()`, but chances are you're already using Babel anyway. You could
also use something from Lodash, Underscore, or some other library.

It's always a good idea to return `state` (which is our old state) as a default,
in case we get sent some unexpected action.

It's also a good idea to split your reducers and compose them:

```javascript
const firstReducer = (state = {}, action) => {
  switch (action.type) {
    case something:
      return stuff
    default:
      return state
  }
}

const secondReducer = (state = initState, action) => {
  switch (action.type) {
    case whatever:
      return firstReducer(state.field, action)
    default
      return state
  }
}
```

This means that `firstReducer` only needs to get the state that it actually
cares about, when it needs to do something. Also note that defaut state is an
empty object there. It could be anything you want it to be, just make sure it's
the shape your reducer expects to act on.

When you have a lot of reducers, you can use `combineReducers`:

```javascript
import { combineReducers } from 'redux'

const lotsOfReducers = combineReducers({
  firstReducer
, secondReducer
// , etc.
})

export default lotsOfReducers
```

And you can do this as many times as you like, in as many files as you need.

All you're doing with reducers is taking in the state as it exists, taking in an
action, and outputing the new state. What you're operating against is the store.

The Store is a really important bit. It holds all the state of your app. This
is different from Flux, where you'd have a lot of little stores. In Redux
there's only one. It's accessed similiarly&mdash;you have `getState()`, you
dispatch actions, and you can have listeners subscribe to changes. To create a
store in Redux, you just use `createStore`.

```javascript
import { createStore } from 'redux'
import someReducer from './someFile'
const store = createStore(someReducer)
// createStore can take your initial state, too
const store = createStore(someReducer, initialState)
// and for creating a store as simply as possible (mocking in testing, etc.):
const store = createStore(() => ({})) // your store is just an empty object, now
```

`store.subscribe()` returns a function for _un_subscribing. So you can do
something like:

```javascript
const unsubscribe = store.subscribe(someListener)
unsubscribe()
```
