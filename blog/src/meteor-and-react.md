---
title: meteor and react
created: 2016-01-21
tags:
  - meteor
  - react
  - js
---

anything in `<template>is a _meteor_ template</template>`; include in html by
`{{> thatTemplate}}`, or in js with `Template.thatTemplate`. (not doing that at
all with react as view.)

`React.createClass` defines a new view... class. why are components classes?
`props` are attributes that allow compnents/classes to inherit _data_.

`render()` (react) gets a description of the markup to show. html's inside jsx,
so get used to angle brackets in your scripting, yay.... jsx: `className`
instead of `class`. jsx, not templating lang... just compiles to plain old js.

jsx can use es6 (what about esnext-next?). this includes `const` & `let`,
`methodShorthand(){...}`, and `=>`.

collections: how meteor stores persistent data. aka mongo. lol duh. accessible
from server and client.

`collectionName = new Mongo.Collection("collection-name")` to make that happen.
that makes a new mongo collection on the server, and cache on the client.
