---
title: redux notes, part one
created: 2016-08-02
tags:
  - redux
---

Because the Redux docs say "Redux is actually really simple!" when sometimes
it's not, and because those docs themselves are pretty overwhelming when
you're first trying out Redux, I'm going to attempt to distill the docs and
bits of my own (admittedly limited) personal experience with Redux into a
couple of blog posts.

--------

The store is an object that holds state. There's only ever one store in Redux,
with many reducers that act on it.

`getState()` returns the state from the store.

`subscribe(listener)` says "Hey, call `listener` when the state changes."

There's also a `replaceReducer` but unless you're writing hot middlware or
something you probably won't touch this one.

State can by any type, though obviously it's probably best to just use an
object here.

Actions are always objects, and they always have a `type`.

```javascript
store.dispatch({type: 'do-stuff'})
// it's conventional to use all uppercase, but it's also hideous. so.
store.dispatch({type: 'DO_OTHER_STUFF', stuff: '[things to do here, maybe]'})
```

Action creators are functions that create actions based on any sorts of
arguments.

```javascript
const sendSomeData = 'send-some-data'
const sendSomeDataActionCreator = data => ({
  type : sendSomeData
, data
})
```

A 'bound' action creator would be one that creates the action and immediately
dispatches it. This might be familiar to folks who've worked with Flux before.

This is how you might have something like this in Flux:

```javascript
const sendMoreData = data => {
  const doIt = {
    type : sendMoreData,
    data
  }
  dispatch(doIt)
}
```

And this is how it'd work in Redux:
```javascript
// assuming you already have the dispatch and action creator, you'd just
const boundSendMoreData = data =>
  dispatch(sendMoreData(data))
```

There's also a `bindActionCreators()` to just do this for you, and React-Redux
has `connect()`.

Async actions should go through middleware to be turned into regular actions
before being dispatched.

Reducers always take state and an action and return state.
`reducer (state, action) => state`
These are what they sound like&mdash;reducing functions.
The state a reducer takes is your existing (or previous, I guess) state.
Reducers are pure functions.

A dispatch is a function that takes an action (or an async action). It may then
dispatch an action (or actions) which will affect the store.
There's a base `dispatch` that always sends an action to the reducer.

Middleware are about what you'd expect&mdash;functions (HOF) that take a
dispatch function and return a dispatch function.

There are 'store enhancers' that are higher-order functions that take a store
creator and return a different store creator. They're basically kind of a
middleware for the store creator. You probably won't directly use one, ever.
Instead you'll just use the regular store creator (`createStore`).
