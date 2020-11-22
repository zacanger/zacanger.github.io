---
title: More React Notes
created: 2016-04-27
tags:
  - react
---

## Lifecycle &Co.

* The three phases of life:
    * Mounting
    * Updating
    * Unmounting
* Mounting:
    * `getInitialState()`, before component is mounted.
    * `componentWillMount()`, _immediately_ before mounting.
    * `componentDidMount()`, _immediately_ after mounting. DOM-node-dependant initialisation happens here.
* Updating:
    * `componentWillReceiveProps()`, invoked when mounted component receives new props from parent. Use this
      when changing state (`this.setState()`).
    * `shouldComponentUpdate()`, invoked when component 'decides' whether or not to push updates to the DOM.
      Return `false` from this if we don't want React to update.
    * `componentDidUpdate()`, invoked _immediately_ after updating.
* Unmounting:
    * `componentWillUnmount()`, _immediately_ before component unmounts and is destroyed. Clean-up goes here.
* While mounted, `component.forceUpdate()` is also available. This is for any mounted component whose state
  has changed without `this.setState()`.

The big, big difference between `props` and `state`: state is private to components.
A parent component (or any other component) can never manipulate the state of another (with `setState` or whatever).

* So:
    * parent passes new props to child
    * child handles new props with `componentWillReceiveProps`
        * calls `setState` if necessary
    * child handles new state in `componentWillUpdate`
        * if component is stateful, `componentWIllReceiveProps` will be enough here

Defaults set in `getInitialState` will be used for initial rendering.
