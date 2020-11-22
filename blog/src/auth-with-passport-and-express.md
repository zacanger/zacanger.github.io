---
title: Auth with Passport and Express
created: 2016-01-23
tags:
  - passport
  - express
  - node
  - auth
  - authentication
  - local
  - login
---

## Passport/Flash Issues

`npm i -S express-flash`, and `var flash = require('express-flash')` in your
app. `app.use(flash())`.

So, make a route in your app/routes/config file, wherever you're keeping
those, something like `app.get('/forgot', function(req,
res){res.render('forgot', {user: req.user})})`, assuming you have some html
with a form that `POST`s, and input for the email.

This assumes `async` and `nodemailer`, plus a mailing service (like sendgrid
or gmail or whatever).

```
app.post('/forgot', function(req, res, next){
  async.waterfall([
    function(done){
      crypto.randomBytes(20, function(err, buf){
        var token = buf.toString('hex')
        done(err, token)
      })
    },
    function(token, done){
      User.findOne({email: req.body.email}, function(err, user){
        if(!user){
          req.flash('error', 'no account!')
          return res.redirect('/forgot')
        }
        user.resetPasswordToken   = token
        user.resetPasswordExpires = Date.now() + 3600000
        user.save(function(err){
          done(err, token, user)
        })
      })
    },
    function(token, user, done){
      var smptTransport = nodemailer.createTransport('SMTP', {
        service: 'foo',
        auth: {user: 'your username for the service', pass: 'your pass for the service'}
      })
      var mailOptions = {
        to: user.email,
        from: 'learny-app@thing.bar',
        subject: 'reset yer passwerd, yo'.
        text: 'hey, click the thingy and stuff, right here, to reset yer passwerd: http://' + req.headers.post + '/forgot/' + token '\n' + ' .'
      }
      smtpTransport.sendMail(mailOptions, function(err){
        req.flash('info', 'email sent to ' + user.email + ' to reset yer passwyrd.')
        done(err, 'done')
      })
    }
  ],
  function(err){
    if(err) return next(err)
    res.redirect('/forgot')
  })
})
app.get('/reset/:token', function(req, res{
  User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: $gt: Date.now()}), function(err, user){
    if(!user){
      req.flash('error', 'invalid password reset token')
      return res.redirect('/forgot')
    }
    res.render('reset', {
      user.req.user
    })
  })
})
app.post('/reset/:token', function(req, res){
  async.waterfall([
    function(done) {
      User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function(err, user){
        if(!user){
          req.flash('error', 'nope, nope nope.')
          return res.redirect('back')
        }
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        user.save(function(err){
          req.logIn(user, function(err){
            done(err, user)
          })
        })
      })
    },
    function(user, done){
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'quux',
        auth: {
          user: 'same as above',
          pass: 'same as above'
        }
      })
      var mailOptions = {
        to: user.email,
        from: 'learnythingy@stuff.baz',
        subject: 'changed pw!',
        text: 'heyo,\n\n' +
          'account ' + user.email + ''s password was changed \n'
      }
      smtpTransport.sendMail(mailOptions, function(err){
        req.flash('success', 'pw changed')
        done(err)
      })
    }
  ], function(err){
    res.redirect('/')
  })
})
```

--------


## Passport with Express and Flash--what's going on, here? (Take two.)

So, a flash message is just a variable, yes? A very temporary variable. It's
stored in a session, and only available once--for the next request. If we
attempt to rerender the page (or whateber), that flash variable is _gone_. So,
here's an example of how that might work:

```
router.post('/signup', passport.authenticate('local-login', {
  successRedirect : '/profile'
, failureRedirect : '/signup'
, failureFlash    : 'true' // just allowing flash messages, here
}))
// passport handles auth:
passport.use('local-signup', new LocalStrategy({
  usernameField     : 'email'
, passwordField     : 'password'
, passReqToCallback : true // we can pass the whole request, now
},
function(req, email, password, done){
process.nextTick(function(){
    User.findOne({'email' : email}, function(err, user){
        if (err){
          return done(err)
        }
        if (user){
          return done(null, false, req.flash('loginMessage', 'sorry, no'))
          } else {
            var user            = new User()
            user.local.email    = email
            user.local.password = user.generateHash(password)
            user.save(function(err){
              if (err){
                throw err
              }
              return done(null, user)
})}})})})) // hey, look, it's lisp!
// now back in our router...
router.get('/signup', function(req, res){
  res.render('signup', { message : req.flash('signupMessage')})
})
```

This is basically where we are right now. Everything _looks_ like it should
work, but it totally doesn't. I think what we need here is to fix the session.

```
app.use(session({
  secret            : config.sessionSecret
, resave            : false
, saveUninitialized : true
, cookie            : {secure : true} // _this_ is a problem!
}))
```

On a local machine, there's no HTTPS.

--------

Stack says:

```
app.post('/login', passport.authenticate('local', {
  successRedirect: '/loggedin',
  failureRedirect: '/login',
  failureFlash: true
}))
```

Three things might happen here:

* Internal error, which Express will handle, spit out a 500
* Invalid auth (no user, password != user.password, whatever):
    * Here we _don't_ generate an error, we just pass `false` as the user object:
        * `next(null, false)`… this triggers the `failureRedirect`, which will be a generated 401 by default.
* Or, maybe there's a real user (`next(null, user)`), in which case we go to the `successRedirect`, yay!

In the second case, a message could be passed as well, like `next(null, false,
{message: 'sorry, you lose!'})`. If there's that `failureFlash` up there
(which _is_ optional, as it happens), and we've got `connect-flash` installed,
the message is stored in the session so you can access it for a template or
whatever.

Another option here would be to do things the long way (manually):

```
app.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if(err){
      return next(err) // generated 500 error
    } // and now we generate some JSON to spit back regarding
    if(!user){ // auth status
      return res.send({success:false, message:'auth failed, yo!'})
    }
    return res.send({success:true, message:'hooray, you\'re in!'})
  })(req, res, next)
})
```

Yet _another_ potential problem here is how things are being dealth with in
the front end. Requests from the browser act according to the response. If the
browser's sending, for example, with AJAX, using jQuery (this is a very
specific example, I know), then the jQuery will be expecting JSON back, will
be _getting_ HTML, won't know what to do with it, and maybe you won't know
what's going on here, because you maybe don't have a `.fail()` in your call.
…and this is getting _really_ specific, based on just two things I'm reading
on Stack Overflow, so let's ditch that path, shall we? And just show a quick
code sample:

```
app.post('/login/ajax', passport.authenticate('local-login'))
// login form sent here
app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}))
// custom cb something kinda along these lines, maybe?
app.post('/login', function(req, res, next){
  passport.authenticate('local-login', function(err, user, info){
    switch (req.accepts('html', 'json')){
      case 'html':
        if(err){return next(err)}
        if(!user){return res.redirect('/login')}
        req.logIn(user, function(err){
          if(err){return next(err)}
          return res.redirect('/profile)
        })
        break
      case 'json':
        if(err){return next(err)}
        if(!user){return res.status(401).send({"okay":false})}
        req.logIn(user, function(err){
          if(err){return res.status(401).send({"okay":false})}
          return res.send({"okay":true})
        })
        break
      default:
        res.status(406).send()
    }
  })(req, res, next)
})
```
