---
title: NOTES FROM DEVMOUNTAIN
created: 2016-05-05
tags:
  - devmtn
  - notes
  - js
  - css
  - angular
---

This is going to be a crapton of my notes, from when I was going through the
course at DevMountain.

Looking back over these, a lot of them are dumb. What I mean by this is that
my opinions on things were dumb.

Whatever.

Don't take it all so seriously. Some of it could be really helpful. This is
about half of my collected notes _that were inside project files_. Everything
else has already been cleaned up and posted, or is in a directory of drafts
somewhere. This stuff is totally unedited.

--------

## ng probs

    // this is in a `.then`. NOTE THAT ANGULAR WILL GIVE YOU AN OBJECT EVEN IF YOU HAVE AN ARRAY
    // though it will give you your _objects_ in the _array_ that they come in, it'll still work
    // on the front end.
    // we were having issues here looping over the array and setting the returned index on scope,
    // then trying to return that. this works a lot better.
    .then(function(stuff){
      $scope.foo = stuff
      $scope.things = stuff.StuffToBringBack
    })

--------

## angular: directives

directives are different than controllers and services. directives ALWAYS return an object. when you write a
ctrl or svc you're giving some definitions to something that already exists. with directives you're closer
to writing routing. you're writing a set of instructions. they return an object. objects get, obviously,
key-value pairs.

    .directive('myDirective', function(){
      return {
        template: 'Key: Value, key: value';
      }
    })

directive names MUST be camelCase. pascal case will not be recognized. nor
snake case?

i mean, really, it's all made a lot more complicated than it needs to be.
we're starting out basically just making our own little bits. it makes sense.
if it works as a template file, or as just regular html,
it'll work as a custom directive. just more reusable as a directive.

we could have a directive with a TYPE. imagine a function that returns a
customer with an attribute that's .type... so we'd have a directive called
myCustomer, type="name", then another, type="smoking habits". paramaters here
are always (element, attribute).

Restrict as a property: E means element (so you'd do <myDirective> instead of
<div myDirective> A is attribute, so it'd be <div myDirective> can do BOTH so
it'd work for either. (restrict: EA) C is for class, but let's not do that!
That seems like a really not okay and very bad idea. This is basically for
semantic enforcement. Element would be good for a custom block, eg
<myDirective>a whole bunch of shit just about this one</myDirective>
<mySECONDdirective>another whole bunch</mySECONDdirective> etc A would be good
for tacking things onto elements that would likely be there anyway, it seems.
If you need to take in parameters, A would be better.

custom filters like this!

    <input model="whatcha">
    <span custom="format">
    function link(scope, element, attributes){
    var whatever
    stuffings
    }
    return { link: link; }
    scp.$watch('format', function(value){
    format=value;
    updateTime();
    });


link ALWAYS takes in at leaste those three, and alkways in that order!

inside a directive, feel free to do some jquery-lite. if you want to use, say,
d3, or three.js, you can go ahead and inject that into angular and use it.
(we're talking about other DOM manupilation, not utilities like lodash).

inside a link whatever, that scp refers to its parent's scope, it shares
parent's scope by default. eg if custom up there is directly below mainCtrl,
scp means mainCtrl's $scope.

underneath .directive, the scope: { stuff } actually means, like, scope
INSTRUCTIONS or somesuch.

SCOPE

    scope: {
    string: '@',
    link: '=',
    func: '&'
    }

The properties on the scope object represent the attributes on the directive
in the html. Our example scope object here would look something like this in
the html. `<example-directive string="a string" link="user"
func="updateUser()"></example-directive>` The hard part here is the `@`, `=`,
and `&`. They each have very important and distinct meanings.

* `@` says take in my attribute value as a string.
* `=` says take in my attribute value as a two-way bound variable from the parent scope.
* `&` says take in my attribute value as a reference to a function on the parent scope.

* (from another notes snippet):
    * `@` : string/text (one-way)
    * `=` : two-way
    * `&` : binds parent scope's methods into directive's scope
    * `<` : one-way (outer-to-inner)

--------

## firebase

firebase with $firebaseObject (or $firebaseArray) and $bindTo just makes all
the __MAGIC__ (that we poor slobs are are too dumb to even vaguely comprehend)
even MORE magical; with angularfire and firebase and angular doing everything
for you, we now have, basically, a subpar meteor-like 3-way-binding.

`<ng-change="$scope.save(thingy)">` will propogate back to firebase
(or `<ng-change="thingy(save)"> // $scope.sav(thingy)` if we're doing things
modularly).

`ng-model-options="{debounce: {'default': 5000}}" // debounces. to 5000 ms. wowe.`

--------

## express

* if chain in express:
* method, url, callback
* `app.all('/endpoint', function(){console.log('a thing')})`
* so it's one long chain of if statements. like we do manually. that's all.
* express chain [{method: 'all', endpoint:'/endpoint', function(){}, {method: 'get', endpoint:'/nextone'}etc etc etc etc}]d
* all endpoints are hit, with exception dependent on response
* req and res are passed to EVERY function by express
* ongoing request and response are passed on down whole if statement chain
* a controller can't reference arrays from another file.
    * so, your server (or, let's say, your index) couldn't have something defined that a ctrl needs to access
        * (assuming your ctrl is set up as a an object, module.exports = {} with your functions(req, res, next) all in there.)
    * solution?
    * move your stuff into the file where you want to access it, i guess.
    * module.exports can be an array, too. that makes sense in a db context, okay.

--------

## express more

#### req.params vs req.query

* Params and Query do the same thing.
* Params is hardcoded into endpoint; query allows some flexibility.
* Query uses http://url.url/api/endpoint?whatever=something
* Param would be more like http://url.url/api/endpoint/something


    app.get('api/hobbies/:type/:fun', function(req, res){
      req.params.type // boring
      hobbies.forEach(function(hobby){
        if (hobby.type = req.params.type) {
          res.send(hobby)
        }
      })
    });

    localhost:8989/api/hobbies/boring/no

    app.get('api/hobbies', function(req, res){
      req.query.type // boring
      hobbies.forEach(function(hobby){
        if (hobby.type = req.query.type) {
          res.send(hobby)
        }
      })
    })

    localhost:8989/api/hobbies?type=boring&fun=no

    var hobbies = [];



#### how to not need to use express-cors (or whatever-cors)

    var express = require('express');
    var request = require('request');

    var app = express();
    app.use('/', function(req, res) {
      var url = apiServerHost + req.url;
      req.pipe(request(url)).pipe(res);
    });

    app.listen(process.env.PORT || 3000);

OBVIOUSLY this only applies when everything's local; this is a proxy server, essentially, sort of.

also there's an express builtin: `app.use(express.static()`, eg `app.use(express.static('public'))`


#### monogooooooooooo(se)

Turns out if you send Mongoose anything that's not in your schema, it's just like "Oh, okay, I'm not interested" and tosses that bit out, I guess.

When we're not doing eg `require('./path')` (but rather `require(/path)' with no dot first`), it looks in `node_modules/`. Obvs usually we'll probably look from cwd instead. Any way to look from project root by default?

    getStuff: function(req, res){
      Stuff.find().populate('things.whatevers').exec()
        .then(function(data, err)
    // etc., etc., etc., etc.

--------

## ionic

* We're getting a little super-fast (read: unplanned and, I think, unannounced) rundown on Ionic.
* Which is totally fine, but it's basically Angular, plus Phonegap, which are two things I rather dislike.
* Okay, I'm using the Yeoman generator-ionic-gulp seed.
* Aaaaand this is just like Angular, except with predefined CSS rules, basically.
* The 'magic' is all in the bit where it handles compiling/wrapping for you.
* So... on with my personal project, I suppose.

--------


## D3

* svg starts 0,0 top left, not bottom left.
* svg has no z-index. just renders in order it's written.
* rotations and transforms on svg will screw with things when it comes to moving stuff!
* d3, chaining methods super common.

--------

## react

* react is reacty. it reacts, sometimes reactively.
* it's still ugly as hell and i hope it dies, though.
* note that i'm doing all this in vim because:
    * A. lighttable doesn't like react and
    * B. lighttable has my projects loadded up, currently, and i don't want to add yet another workspace.
* so, this will probably all be formatted like shit, because vim doesn't understand, no matter how many times i tell it, that i don't want it to turn spaces into tabs, i want the opposite.
* oh well.

--------


## S3

* Basically, since Mongo can't store images without doing difficult-ish things involving GridFS,
  the prescription is to use S3 in... basically the same way, actually, which results in more total requests,
  but the hope is that Amazon's caching or somesuch is good enough to offset the latency.
* Amazon needs your regional server to be passed in during requests. Which is both sensible and silly, since really that should be a part of your keys.
* When Amazon wants a 'Key' in your paramss, that's not a key. That's the actual thing you're fuckin' with. so, req.body.img.
* Buffers in node are bytes in python are strings in PHP if they were mutable.

--------

## deployment while in development

### heroku

* workflow: have a project. have a git repo in it. `heroku create`, assuming you use/have heroku.
* (same as `git remote add heroku https://someurl.herokuapp.com`)

### digital ocean

* digital ocean: works the same as ever, which is to say, it's not convenient,
  but it it's okay. prefer koding if they let me back in, but if not,
  maybe using codeanywhere/codenvy/c9/any one of the other IDEs with built in dev servers.

--------

...that's all, for now. There will probably be more, once I sort through the
first three weeks' worth of shit.
