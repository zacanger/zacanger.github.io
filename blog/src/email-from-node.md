---
title: email from node
created: 2016-01-28
tags:
  - email
  - node
---

`nodemailer` and `nodemailer-smtp-transport`

```
var transporter = nodemailer.createTransport(
  smtpTransport('smtps://foo@thing.com:asdf@bar.com'))
var transport = nodemailer.createTransport(smtpTransport({
  host: 'host'
, port: foo
, auth: {
    user: 'username'
  , pass: 'password'
  }
}))
transporter.sendMail(mailOptions, function(err, info){
  if(error){res.send(error)}
  else{res.send(info)}
})
```

using a service, we're just sending the bare instructions there from the
front-end, so sendgrid or whatever would take care of the actual compiling,
rendering, and all that nonsense. (remember the blogs on tinyletter or
whatever, about how to even make your email acceptable? hmmm....)

sendgrid, mandrill, and mailgun are the big ones. sendgrid is a little less
likely to throw your emails in spam. 12k per month or something like that
(with daily cap of maybe 400-ish) for free. they have a slight delay when you
sign up, maybe a few hours. obvs we'd likely want to do our own server/service
for large-scale, but the analytics available on these things are worth it...?
(see: pb:tag/analytics.)

to use sendgrid we'd need to `npm i -S sendgrid`. then we're using
fs.readFile(), i suppose, to work with things on the disk. (note that this
could also be in streams, and it could also be in a db....) sendgrid can work
with some templating on the back end, though it evidently doesn't inline your
css for you.... ah, i see, it looks like zurb's got a tool for that (of
course--they've got a tool for everything). i think tinyletter has one, too.

there are yeoman generators for all this stuff. why do the dirty work
yourself?

zero and rabbit are things. i guess rabbitmq is currently the more popular
one?
