---
title: 'Angular Meetup, 13th Oct, 2015'
created: 2015-10-13
tags:
  - meetup
  - angular
  - javascript
  - notes
---

### Notes:

Bene Brown; author on subject of empathy.

### The Technical Bit

Jordan Last, speaker on Angular, client-side storage.

Problem: people want wikis, but don't like the word 'wiki.' (Yes, it's more
complicated, but not so much so that a wiki wouldn't handle it).

Organization of survey site data (BYU Archaeology Dept.) &c.; Android devices,
needed compat. with iOS. This fellow ended up with [Ionic](http://ionic.io) to
handle building apps.

Okay, new question, how to work with storage? He checked out Cordova
(PhoneGap), but wasn't into SQLite so much. Wanted straight-up persistant
storage in the browser.

What options were there? Local, IndexedDB, WebSQL. Obviously IndexedDB isn't
useful for people who want to stick with that Apple Webkit crap; Local storage
is okay for... a little bit of stuff. They ended up choosing WebSQL (despite
its deprecation), because they're big on relational databases and didn't want
to get into Mongo or Node stuff. (Sidenote, this fellow doesn't quite grasp
how the W3C works, or the problems with non-standard or deprecated
technologies. Oh well.) Quick rundown on the very barest basics of ORM, aka
Why We're Calling This A Model.

Looks like he's using [Persistence
JS](https://github.com/coresmart/persistencejs). In persistence, you would
save an object like, for example:

```
persistence.add(this)
persistence.flush()
callback && callback()
```

And now you have your whatsit all set. That's your save method. Then, say,
`thingy.save(function);` and, y'know, there you go. Oh, wait. He forgot a bit
about persistence. Needs `schema.sync` and a `.config` bit to get up and
working.

Now, to query WebSQL in this kind of screwy setup (persistence-specific):

```
whatever.getStuff = function(thingPassed, maybeAnother) {
  whatever.all().filter('thingPassed', '=' whateveritis); // i suppose i missed quite a bit here
}
```

And, finally, deleting... which evidently should be pretty easy. Too easy to
go over.

#### Closing points:

* Never access the DB directly--do it through lots of Javascript and boilerplate and awkward ways.
* Keep model-specific DB stuff with the model
* Absolutely don't need to use persistence.js or WebSQL (thank goodness)
* Use an ORM, silly!

Oh, and the fellow who organized this thing maybe isn't aware of other stuff
going on aroud here. LunchJS would be worth looking into.

And this Jordan fellow is interesting. Bit enthusiastic, dresses half his age,
but information architecture + comp sci + dev + project management = all the
things I'm really interested in, mostly, pretty much.

Oh, and it was kinda neat to check out Adobe's SLC building.
