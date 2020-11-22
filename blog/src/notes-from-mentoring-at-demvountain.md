---
title: notes from mentoring at devmountain
created: 2016-05-06
tags:
  - devmtn
  - mentoring
  - angular
  - mongo
  - js
---

## webinar notes

* `%` is not _exactly_ modulo, but rather remainder. Eg `9 % 3 // 0` , or `10 % 3 // 1`
* `var++ === var=var+1`
* `var-- === var=var-1`
* however
* `varTwo = var++` would mean `varTwo = var`, `var=var+1`, etc. keep in mind.
* and, `varTwo = ++var` is the same as `++var,` `varTwo = var`
* (so, if `var` is originally one, both `varTwo` and `var` are now equal to two).
* In other words, `++var` says 'increment this `var`; the value of the expression is the final value,'
  while `var++` would mean 'remember var? go ahead and increment it, but the value of the expression
  is the original value of `var`.' `var++` and `++var` are the same thing, but when used in an expression,
  they'll return differently.
* math using parens works just like math using parens in real life:
  those things happen first. convenient, neh?
* mention `===` vs `==` ? the book doesn't touch on that early enough.
* in the case of `true || whatever`, `whatever` will never be checked;
  in the case of `false && whatever`, `whatever` will never be checked. they are evaluated _only when necessary_.

* keywords:

```
break case catch class const continue debugger
default delete do else enum export extends false
finally for function if implements import in
instanceof interface let new null package private
protected public return static super switch this
throw true try typeof var void while with yield
```

`if (2 && null){console.log('yes')}` returns `undefined`

`if (2 && 3){console.log('yes')}` returns 'yes'

```javascript
console.log('stuff') // this is a single-line comment, ignored by the interpreter
/* and this
* is a multi-line commment
* also ignored
* and full of words
*/
```

--------

## Functional JS

Functions are first-class objects. This means that `var foo = 2` and `var bar
= function(quux, baz){return quux + baz}` are equally valid. This isn't
exactly special, but it means that (importantly) functions can be passed as
arguments. `var fooBar = function(fn, quux, baz){return fn(quux, baz)}` is
still good, as is the following:

```javascript
var sum = function(a, b){
  return a + b
}
var exec = function(fn, a, b){
  return fn(a, b)
}
exec(sum, 28, 98)
```

Higher-order functions are functions that _return other functions_. `var stuff
= function(things){return function(){return things}}`. Closures, for example,
always return the same thing, as in `var what = stuff(function(){}) ; what()
=== what()`.

A closure's inner function has access to its parent's scope _even after the
parent function has been returned_. `function asdf(){var texty = 'howdy';
function ghjkl(){console.log(texty)}ghjkl()}`.

--------

## local and session storage

* same api for both, but sessionStorage loses data on browser close.
    * `storage.getItem(k)` returns value for key
    * `storage.removeItem(k)` removes ''
    * `storage.setItem(k, v)` stores ''
    * `storage.clear()` empties storage contents.
* api expects strings, so _if needed_, implement a wrapper. json.stringify is chill.

--------

## [Google's Search Operators help page](https://support.google.com/websearch/answer/2466433)

--------

## mongo

* `mongod --fork --syslog` will throw it in the background

* from the mongo shell, `use admin` and `db.shutdownServer()` to kill. or, just `mongod --shutdown`

* For Mac users, if they've installed with Ports (or Brew?), this alias would be nice:
    * `alias mongo-start='mongod --fork --logpath /var/log/mongo.log --logappend --dbpath=/tmp/mongo'`

--------

## angular

Don't design a page, then manuipulate the DOM (as you would in jQuery). Here,
we're no longer building websites that we make expressive and add to with
Javascript... we're building applications in the browser, and thinking about
_architecting_ an app, rather than building a website.

Related to that, don't try to build out your site in HTML, CSS, and Javascript
(or jQuery, or whatever), and use Angular for models and controllers. Angular
doesn't like that. Angular gets mad. If you're committing to using Angular,
you're committing to learning that DSL, and using it. Angular wasn't built by
Javascript people to program in Javascript. It was designed by Java people for
designers to be able to sketch out concepts in the browser.

The _view_ is the official 'record' in Angular. So you never actually change
the DOM, except in directives, which are applied in the view.

Angular's two-way data binding is actually probably it's strongest feature, at
least for small apps. Using jQuery, we might do something like the following
to update content based on events:

```javascript
$.ajax({
  url : '/thing.json'
, success (data, status) {
    $('ul#log').append('<li>data is here!</li>')
  }
})
```

(where in the HTML we might have `<ul id="log"></ul>`). In Angular, we'd do:

```javascript
$http('/thing.json').then(response => {
  $scope.log.push({msg : 'data is here!'})
})
```

for a view that looks like `<ul><li ng-repeat"thing in
log">{{thing.msg}}</li></ul>`.

We could also just have, in our view, something like `<input
ng-model="thing.msg">`, and there's our two-way data binding.

Angular's separation of concerns is very much an MVC-ish architecture. You
have a view, a model (representing data), a service layer (reusable tasks),
directives for DOM manipulation, and controllers to just stick it all
together. We also have DI in Angular, which is not at all new, but was a
little unusual in client-side code before Angular really took off. Essentially
this just means we're exporting components, and then importing them in some
other bit of code.

Something to keep in mind with Angular is that you're essentially compiling
your Angular in the browser, into something your browser's Javascript
rendering engine can handle. This is the big reason Angular can have
performance problems. Angular is esssentialy _template driven_ (just another
way of saying that it's all about the view, as above). In traditional sites,
we're using unobtrusive Javascript; that is, we build a site, use semantic
HTML, style things in a stylesheet linked into the header, throw all our
scripts in a file linked in the footer, and the page still works. In an
Angular app, you're fucked if you don't want/use/have JS, because your entire
`index.html` might only consist of opening and closing tags, and a couple of
links to scripts/styles. Everything is written in Angular, which means you
literally cannot use your thing as a website anymore, because it is not (one
clear indicator of this is just how badly hash routing fucks up a lot of
things).

This really goes back to the 'Angular Way' of doing things--Angular isn't a
framework for programmers to program; it's not a framework to make performant,
navigable, friendly sites for users to use--it's a DSL for Java developers and
designers to be able to use and comprehend equally well. Angular treats your
HTML as if it's code to be compiled. In that way it deviates from a regular
MVC--the view in Angular is actaully mixed into your logic, and usually has
its own logic mixed into _it_. Angular compiles all of that into standard
languages that browsers can actually understand.

Angular has no real solution for itself. If SEO, accessibility, compatibility,
maintainability, performance, comformity (to actual standards), ease of use,
best practices, and conventional wisdom are important, Angular's probably not
the best choice. If you need to sketch out an idea and none of those are
really a big deal, it's not necessarily a bad option.

In Angular, you _want_ to use two-way binding (I mean, really, why else use
Angular, anymore?). Rather than writing a function to update a DOM node based
on an event, we're binding an element in the template, using either an
attribute or the `{{}}` notation. So, `<input ng-model="foo.bar">`, and
`{{<p>{{foo.bar}}</p>}}`. Now, we're sending data from the view, to the model
(`$scope.foo.bar`), and then sending that to our view.

Services are essentially helper functions, sorta. They're an object that
contains data and functions. They're always singletons. Nuff said.

One really basic way to think about the difference between Angular and many
other ways of writing Javascript applications would be this little summary:
'Don't select... _direct._' What I mean is, unlike in jQuery, where you use a
selector to find the elements, and then do things to them, in Angular you
write your code _in_ your elements (as in `<button ng-click="stuff()">`), or
simply write your own elements, and plug them in.

Angular's super opinionated about things. If you want to use unobtrusive JS,
don't use Angular. Angular's position is that it's an HTML extension; it's
template-driven, declarative, and compiled.
