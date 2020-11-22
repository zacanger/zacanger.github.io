---
title: basic auth
created: 2016-02-12
tags:
  - auth
  - node
  - js
  - passport
---

* Basic HTTP:
    * restricted based on system user/pass
    * http://zacanger:encryptedpassword@zacanger.com
* Form-based:
    * restricted based on cookies
    * success = stored cookie on client
    * `POST whatever.com/login (headers)`
* Token-based:
    * requests with auth token
    * https://foo.bar/whatever?auth_token=asdfghjkl123456789
* OAuth
    * rate limited, expired, revoked server-side
* Passport
    * this is, clearly, the preferred method, both with devmtn and with express in general, i feel

--------

```javascript
// npm i -S the things we're requiring right here

var express  = require('express')
  , session  = require('express-session')
  , passport = require('passport')
  , Facebook = require('passport-facebook').Strategy
  , app      = express()
  , port     = 3000

app.use(passport.initialize())
app.use(passport.session())

passport.use(new Facebook({
  , callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done){
  return done(null, profile)
}))

app.get('/auth/facebook', passport.authenticate('facebook'))
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/'
  , failureRedirect: '/login'
}), function(req, res){
  console.log(req.session)
  console.image('http://zacanger.com/gifland/ferret-fail.gif')
})

passport.serializeUser(function(user, done){
  done(null, user)
})

passport.deserializeUser(function(obj, done){
  done(null, obj)
})

app.get('/me', function(req, ers){
  var currentUser = req.session.user
  res.send(currentUser)
})
app.listen(port, function(){
  console.log('oi oi oi at ' + port)
})
```
