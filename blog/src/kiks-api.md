---
title: "kik's api"
created: 2016-02-17
tags:
  - kik
  - api
---

Kik's API is kinda basically shit.
Their API docs are also basically shit.
Probably becaues their API is basically shit.
Kik's a lot more focused on people building Kik-friendly websites than they
are on people integrating with their service.

Kik's js: http://cdn.kik.com/kik/2.0.5/kik.js

Kik requires that we make terms of use and privacy policy available, like so:

  <head>
    <link rel="terms" href="termsofuse.html">
    <link rel="privacy" href="privacypolicy.html">
  </head>

User-related stuff:

    kik.getUser(function(user){
      if(!user){
        alert('nope!')
      } else {
        console.log(user.username)
        // user.fullName
        // user.firstName
        // user.lastName
        // user.pic
        // user.thumbnail
        // ^^ these are all strings.
      }
    })
    if(kik.hasPermission(){
      // cool! user has given us permission to work with their account
    })
    // to work with a user anonymously (doesn't expose identifying
    // information, also doesn't require permission from user):
    kik.getAnonymousUser(function(token){
      console.log(token) // str
    })
    // kik's auth only works over https.
    kik.sign('foo bar data etc.', function(signedData, username, host){
      if(!signedData){
        // either failed, or user denied
      } else {
        console.log(signedData, username, host)
        // all strings. need to be passed to verification service.
        // we'd pass stuff to a back-end for that.
      }
    })
    // to make this work with the anonymous thing, it's almost exactly the same:
    kik.anonymousSign('data', function(signedData, anonToken, host)){
      // same stuff, except we would get anonToken instead of username
    }

Messaging:

    kik.send({
      title     : 'message title'
    , text      : 'message content'
    , pic       : 'http://if.we/want/to/send/a/photo'
    , big       : true // optional, for large images, etc.
    , noForward : true // optional, for restricting receiving user from forwarding the message
    , data      : {something: 'stuff'} // optional, arbitrary JSON, max 7.5kb
    })
    kik.send('otherUser', {
      title : 'etc'
    // all the same stuff here.
    })
    if(kik.message){
      // do things; now we know the user has opened the message.
    }

Kik has some analytics stuff for messaging, but I really just don't care about that.

Social things:

    kik.showProfile('zacanger') // shows profile!
    kik.pickUsers(function(users){
      if(!users) // cancelled, maybe.
    }  else {
      users.forEach(function(user){
        alert('user.username') // etc., all the same stuff from the user info.
      })
    })
    kik.pickUsers({minResults:1,maxResults:4}, function(users){
    // etc.
    })
    kik.pickUsers({preselected:[{username:'zacanger'}]}, function(users){
    // same objects as from call to pickUsers
    })
    kik.pickUsers({filtered:['badPerson','iHateThisGuy']}, function(users){
    // users we don't want to show. doesn't work with preselected.
    })
    kik.pickUsers({filterSelf:false}, function(users){
    // allow user to see their own profile in the user picker
    })

Misc:

    // events:
    function someEventHandler(){
    // do stuff...?
    }
    kik.on('event', eventHandler) // bind to event
    kik.off() // unbind
    kik.once() // only bind once, ignore after that.
    // event can be, for example, 'message'.
    kik.trigger('message', {title:'title'}) // objects are passed to all even listeners.

    // platform & browser detection:
    var platform = kik.utils.platform.os
    console.log(os.name, os.version) // string, int
    var browser = kik.utils.platform.browser
    console.log(browser.name, browser.version)
    var eng = kik.utils.platform.engine // rendering engine
    console.log(engine.name, engine.version)
    // for unsupported browsers (iOS <= 5, android <= 2.3), use a meta tag:
    // <meta name="kik-unsupported" content="android-2.3"> (or whatever).
