---
title: redux notes, part three
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

Just want to take a second to go over some syntax before going on more about
Redux. A lot of folks who're new to React might also be new to new JavaScript,
so some things might be looking a little unusual.

```javascript
const foo = 'bar' // is roughly the same as
var foo = 'bar' // EXCEPT that you could not then do
foo = 'baz' // because you'd be reassigning a const which is not okay.
let asdf = 'ghjkl' // is a lot more like var
asdf = 'qwerty' // no errors

import React from 'react' // is kinda like
const React = require('react') // except it's actually just a part of the language now
import { resolve } from 'path' // is like
const { resolve } = require('path') // which is like
var path = require('path')
var resolve = path.resolve

export const whatever = () => {} // is like
module.exports.whatever = function(){}

export default MyThing // is like
module.exports = MyThing

const
  a = 'a'
, b = 'b'
, c = 'c'
, o = { a, b, c } // is the same as

var a = 'a'
var b = 'b'
var c = 'c'
var o = {
  a : a
, b : b
, c : c
}

const someFunc = param => param // is roughly the same as
function someFunc(param) {
  return param
}
// though there _are_ important differences
```

If you're not at all familiar with ES2015, you should really go get comfortable
with it. I put together a repo a while ago for that, full of examples and notes.
Check it out [here](https://github.com/zacanger/es6-and-builds/tree/master).
(Also if you want, check out my semi-maintained bunch of examples and resources
for learning React [here](https://github.com/zacanger/react-bits).)

--------

`react-redux` (not a part of Redux itself, since it's supposed to be
framework/library agnostic... ish) is something you'll need for writing React
apps using Redux. It sort of enforces the presentational/container (or
dumb/smart) way of structuring your components.

Note&mdash;you don't _need_ `react-redux` to be able to use Redux with React, it
just helps. A lot.

I won't go into the whole presentational/container component thing, there are a
lot of blogs posts and such out there on that topic, but it's basically what it
sounds like; you have components that handle how things look and components that
handle how things work.

`react-redux` gives you this `connect()` function which is pretty handy. You can
do a lot of the stuff it does by hand using `store.subscribe()`, but then you
start needing to worry about `shouldComponentUpdate` and all this stuff, and
it's all kind of annoying.

When wrapping a 'dumb' component up in a 'smart' component, there are two
functions you usually throw in there. One is called `mapStateToProps`, and the
other is `mapDispatchToProps`. I'd suggest you take a good look at the [official
docs](https://github.com/reactjs/react-redux) on `react-redux` to get a good
feel for how it all works, but setting up a container component turns out to be
pretty straightforward.

```javascript
import { connect } from 'react-redux'
import { someReducer } from './wherever/your/reducers/are'
import AComponent from './AComponent'

const mapStateToProps = (state, ownProps) => ({
  somethingInState: someReducer(state, ownProps.maybeSomeProperty.Here)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  something: probablyAnActionOrOtherFunction
})

const AComponentThatIsNowConnected = connect(
  mapStateToProps
, mapDispatchToProps
)(AComponent)

export default AComponentThatIsNowConnected
```

`mapDispatchToProps` is a little tricky, so I'd really suggest just checking out
[the docs](https://github.com/reactjs/react-redux/blob/master/docs/api.md).

There's one other important bit, and that's this thing called `Provider`. It's a
component that makes the store available to all your container components
without you needing to actually pass it down everywhere. It uses this funky
[context](https://facebook.github.io/react/docs/context.html) thing under the
hood. You don't need to put it everywhere, you just wrap a root component in it.

```javascript
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import App from './App'

const store = createStore(reducers)
const root = document.getElementById('root')

render(
  <Provider store={store}>
    <App />
  </Provider>
, root
)
```

This can trip you up when testing! You don't need to do much to work around it,
but it can be annoying the first time you see all these random errors. Try
something like:

```javascript
import test from 'ava' // seriously awesome test runner
import React from 'react'
import { mount } from 'enzyme' // seriously awesome testing thing for React
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import MyComponent from './MyComponent'

test.beforeEach('Set up <MyComponent />', t => {
  const store = createStore(() => ({}))
  t.context = mount(
    <Provider store={store}>
      <MyComponent
        some='props'
      />
    </Provider>
  )
})

// and then you can do
test('<MyComponent /> isn\'t broken!', t => {
  t.is(t.context.prop('some'), 'props')
})
// and it won't throw errors about not finding a store and stuff!
```
