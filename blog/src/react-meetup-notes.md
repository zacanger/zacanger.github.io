---
title: notes and little bits from the react meetup on 17th nov at devmountain
created: 2016-05-22
tags:
  - react
---

# IMPORTANT:

don't take anything here seriously. i think it's just interesting to reread
my initial reaction when i was confronted with everything that is react.

--------

## React Meetup, 17 Nov, 2015

React:
* Good at managing state.
* which is to say, dynamism
* Components, just like... everything else these days, so that's totally irrelevant.
* virtual dom, which is not exactly facebook's anyway.
* unidirectional data flow, which is a mouthful.
* that is, the loop.
* more boilerplate to run that... less boilerplate-replacer built into react?

--------

Random-ass notes and stuff.

Erm. Thus far, it's web architecture 101. Components are a thing. People don't
like to refresh whole pages. Etc.

`render() == render: function(){}`

`this.setState` = important, should always use

React is a view. But, does server-side rendering. Which is much more up my
alley, because it's not making life miserable for users. We can check that out
when we check out all those other frameworks, for fun.

React is compiled.

Redux is a state container. Which actually makes sense now. Because everything
is state, in React, it seems. So, it abstracts state and manages it
independently from the front-end, which is how React _can_ do it's thing on the
server.

My god, though, React people are worse than Lisp people. Everything has to be
about how they do things better, even when they very clearly just do things at a
totally okay level.

[OH. It turns out that React looks like PHP to be because it was influenced by XHP](https://www.quora.com/React-JS-Library/How-was-the-idea-to-develop-React-conceived-and-how-many-people-worked-on-developing-it-and-implementing-it-at-Facebook).
Which is PHP, influenced by E4X (ECMAScript with random XML all up in it). So
React is Javascript based on PHP based on Javascript based on XML. So it's
totally okay to think that it's hideous. That's good.

app.jsx:
```jsx
import React from 'react' // same as var React = require('react')
import ReactDOM from 'react-dom'
import List from './List'
import Friendz from './Friendz'

const App = React.createClass({
  getInitialState(){
    return (
      bros: ['bman', 'brosef']
    )
  },
  componentDidMount(){}, // onload
  componentWillMount(){}, // not quite on load?
  addFriend(newFriend){
    this.setState({
      friends: this.state.friends.cocat(new, newFriend)
    })
  }

  render() {
    return (
      <div>what up {this.state.bros}</div>
    )
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

miniform.jsx:
```jsx
import React from 'react'

const Friendz = React.createClass(
  render() {
    getInitialState(){
      return {
        newFriend: ''
      }
    },
    updateFriend(e){ // for event.
      this.setState({
        newFriend: event.target.value
      })
    },
    return (
      <div>
        <input type="text" />
        <button onClick={() => this.props.addFriend} onChange={this.state.newFriend}>add it!</button>
      </div>
    )
  }
)

export default Friendz
```

list.jsx:
```jsx
import React from 'react'

const List = React.createClass({
  render() {
    const friendsLIs = this.props.friends.map({item, list}) =>
      return <li key={index}>{item}</li>
      // return ( ) something...?
  }
})

export default List // like module.exports = {}
```
