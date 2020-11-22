---
title: PropTypes for Classnames
created: 2017-02-11
tags:
  - react
  - proptypes
  - classnames
---

The [classnames](https://npmjs.com/package/classnames) library is nice.
It lets you do stuff like

```javascript
import cn from 'classnames'
import styles from './styles.css'

const Thing = ({ foo }) =>
  <Stuff className={cn(styles.thing, { [styles.foo]: foo !== 2 })} />
```

And a whole bunch of other stuff, and it just works. If you write your CSS
in CSS, you should check it out.

There is one sort of pain point with it, though. If you have components that
can take anything that's `classnames`-compatible, PropTypes get a little annoying.

```javascript
Stuff.propTypes = { className: string.isRequired }
```

This doesn't work, because you're passing all sorts of stuff in, possibly.

A solution is to make your own custom PropTypes. You don't even need to
get into fancy stuff involving validation, just combine a bunch of other
PropTypes into your own.

Let's say you have a `propTypes.js` file somewhere where you define custom
PropTypes.

```javascript
import { PropTypes } from 'react'

export const classname = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.object,
      PropTypes.string
    ])
  )
])
```

That's all you need! Then you can do:

```javascript
import { classname } from './propTypes'
import cn from 'classnames'

const Stuff = ({ className }) =>
  <span className={cn(className)}>

Stuff.propTypes = {
  className: classname // this is your custom thing
}
```

That should solve all PropTypes warnings and let you throw anything the
`classnames` library can handle at your components.

----

Edit 10th January, 2018:

Bonus: a Flow type for this library (TypeScript should be similar):

```javascript
// @flow

type classes =
  | { [className: string]: * }
  | string
  | false
  | void
  | null

type classnames = (...args: Array<classes | classes[]>) => string
```
