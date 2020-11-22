---
title: Meteor Notes
created: 2016-01-21
tags:
  - meteor
  - js
---

## General Notes, from that time I played with Meteor

`{{#with foo}}` is a template tag that takes arg (foo). that is the _data
context_ for the block in that tag. being a _tag_, it needs to be closed later
(`{/with}`).

{{#each}} also takes an argument, usually a 'cursor' such as the result of
`Collection.find()`.

Includes are like so: `{{> foo bar}}` which will bring in the bar from foo.

meteor's blaze will soon just be a thin templating layer over react.

iron router is meteor's primary routing package. its 'data' method helps with
data contexts.

in meteor there are html _templates_ and js _template helpers_, in which data
context is accessible via `this`. an example:

```
<template name="profile">
  <h3>profile</h3>
  {{#with profile}}
  <img src="{{avatarPath}}" />
  {{#with name}}
  <p>{{fullName}}</p>
  {{/with}}
  {{/with}}
</template>


Template.profile.helpers({
  profile: function(){
    return Users.findOne(Session.get('userId'))
  },
  avatarPath: function(){
    return 'images/' + this.avatar
  },
  fullName: function(){
    return this.first + ' ' +  this.last
  }
})
```

a dedicated {{log}} helper can be more useful than console.log(this)

```
Template.profile.helpers({
  log: function(){
    console.log(this)
}})


<template name="profile">
  {{#with profile}}
  {{log}}
  <!-- etc -->
  {{/with}}
```

the `..` keyword in helpers is to access a parent. That's pretty fucking rad,
actually. And the `../..` also works exactly as expected (eg `{{blah ..}}` and
`{{blahblah ../..}}`).

#### Reactivity in Meteor

Reactive computation: block of code (inside of a function) that re-runs when a
reactive data source _inside_ it changes.

```
Template.hello.helpers{(
  counter: function(){
    console.log('counter helper is running')
    return Session.get('count')
  }
)}```
```

Here, counter re-runs whenever count changes (count is retrieved by
Session.get('count_')).  Session variables are _reactive sources_. Template
helpers are _reactive computations_.

Reactive variables in Meteor:

* Session variables
    * defined with `Session.set()`
    * retrieved with `Session.get()`
    * global to the app, and reactive
* Cursors
    * what you get when querying db
    * (via `Collection.find()`)
* Subscription's `ready()` method
    * `subscription.ready()` is when the client has received all data
* some others, including:
    * `Meteor.user()`
    * `Meteor.userId()`
    * `Meteor.status`
    * `Meteor.loggingIn`

Reactive computations:

* template helpers (eg `{{something}}` in a template, duh)
* iron router (third party) hooks are reactive
    * route functions and _most_ hooks are run in a reactive computation

Custom reactivity in meteor: reactive-var (third party package) enables
defining own reactive variables. these don't have global names (like
Session.get('foo')'s foo), more like this.foo.get() declared like `new
ReactiveVar()`.

```
var count = new ReactiveVar(0)
count.set(1)
count.get() // 1
```

There's also `ReactiveDict`. That's a thing.

Custom reactive computations: `Tracker.autorun(function(){})` Read the full
Meteor manual for more on that, I guess.

Reactivity can be passed on through composition, eg `var getCount =
function(){ return Session.get('count') }` -- getCount is a reactive data
source, by virtue of Session.get('count'), which is itself a reactive data
source. SO...

```
Template.hello.helpers({
  counter: function(){
    console.log('counter helper is running')
    return Session.get('count')
  }
})
```

IS THE SAME AS

```
var getCount = function(){
  return Session.get('count')
}

Template.hello.helpers({
  counter: function(){
    console.log('counter helper is running')
    return getCount()
  }
})
```

both ways, counter reruns whenever count session variable changes.

composition only applies to functions. not variables.
