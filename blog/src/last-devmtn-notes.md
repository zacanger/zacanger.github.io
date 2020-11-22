---
title: the last of the devmountain notes!
created: 2016-05-22
tags:
  - devmtn
---

This should be the very last of my random notes from my time going through
the course at [DevMountain](http://devmounta.in).

Finally.

As always, don't take this stuff too seriously, there's a fair chance a lot of
it is not correct, and any opinions have most likely changed maybe probably
sortakinda.

These last bits are in chronological order of file modification date. I believe
this was from during the second week of Angular.

--------

## ANGULAR

so, `expressions`, basically that's why we're gonna be mashing those braces
constantly. it's kind of like inline scripts, but minus the script tags?

`directives` are the powerful bit. jqueryish dom extension? apparently something
we'll use a lot is `ngRepeat`, which, if it means writing less html, is a-ok
with me.

```html
<div>
  <div data-ng-repeat="user in users">
  <h4>{{user.name}}</h4>
  <p>{{user.properties}}</p>
  </div>
</div>
```

so it's like how python folks write python everything, including html; we're
writing javascriptish markup! it makes sense in those terms. that snippet there
just created that same div for each user in users; say we have several user
objects, it'll just go right ahead and repeat that markup per user.

`ngShow` determines if an element should be shown or not, based on a boolean.

```html
<div data-ng-repeat="pizza in boxes" data-ng-show="pizza.topping == 'peppers'">
  <h4>{{pizza.shop}}</h4>
  <p>{{pizza.properties}}</p>
</div>
```

guess what. your gross-ass hawaiian pie? not in those divs, no sir.

`ngSwitch` OHH THIS IS USEFUL. we could've used this last week.

```html
<div data-ng-switch="pizza.photo">
  <h3>{{pizza.stuff}}</h3>
  <p>your pie totally looks this goods</p>
  <img src="pepperoni.jpg" data-ng-switch-when="pepperoni">
  <img src="hawaiian.bmp" data-ng-switch-when="gross_as_fuck">
  <img src="heaven.png" data-ng-switch-when="peppers">
</div>
```

--------

directives straight up from angular are all named `ngSomethingStuff`; they're
used like "ng-something-stuff" (or "data-ng-something-stuff") in view. they can
also be comments (?), dom elements, or CSS classes (oh hai jquery what up).

one could use 'operations' within those little handlebars up there (i believe
we're calling those `expressions`, and `operations` would be our word for
executable snippets, basically?). so `{{pizzza.beInMe()}}` is totally valid.

`ngModel` to create two-way data-binding.

aaaaand i do believe this example just literally piped a username to uppercase.
OKAY. `{{name | uppercase}}` that is, apparently, called a `filter`, though in
the interest of correctness (and also just to irk ryan :P) i'll keep calling
them pipes, thank you very much.

hmm. it would seem the guy who wrote this intro to angular is either getting
paid by google, or currently sitting on someone's dick there... some of the
worship is just a wee bit too cloying for real life.

`ngApp` is the directive to include a partial (to bind an application, in the
parlance). `ngView` to actually use it.

`.config` does (whodathunkit) configuration, basically by d i (?). you *could*
pass a function with parameters named after what you're sourcing that way, but
it's not good practice (actually, i hadn't thought about that before... what
happens to variables by the time they've been through minification, base62, and
gzip? ⊙▃⊙). instead, you should use an array with the names of the elements that
should get all shot up in your page, because, y'know, ain't no one messing with
your actual data.

`routes` are a big deal, from what i hear. here's a simple one from this guy's
blog post:

```javascript
angularStuff.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/objects', {
    templateURI : 'view/objects.html'
  , controller  : 'ObjCtrl'
  }).otherwise({templateURI : 'view/NOPE.html'})
}])
```

please forgive me, but i need to take a minute to say some things that should be
obvious.

yes, this way of working with partials and configs is pretty sweet, but let's be
honest, here, and very straightforward: partials and templating systems and
whatnot exist solely for the purpose of making things *easier* on the people
doing the programming. somehow i feel like going with even more nested
punctuation is more of an exercise in concrete poetry than a highly advanced and
developed javascript framework. ugh.

`.controller` is, like, what you use for controllers. `$scope` links your
controllers and their bound views. (?) (or binded, if you're this fellow.)

```javascript
angularThang.controller('BTCtrl', ['$scope', function ($scope) {
  $scope.objects = [{
    key  : 'value'
  , next : 'another'
  },{
    key  : 'let\'s do it again'
  , next : 'okay, now we\'re done'
  }]
}])
```

`$watch` calls a listener for a controller on an attribute of its scope (oh boy,
pronouns, this is fun). `$broadcast` will trigger an event on a scope, which'll
be transmitted to that scope, and *all* of its children. to trigger a global
even, you'd use `$rootScope`. without copying down every example from this
rather crudely typed out blog post, we're basically using
`$scope.$watch(stuff)`, `$scope.$broadcast`, `$scope.$on` etc. so, y'know. extra
`$$$$$$$$` for everyone.

obviously `services` are gonna be my favourite toy here. there's an `$http`
builtin! (i think... as mentioned, this blogger is probably better at writing
code that writing words, so... i don't really know). so you can inject them (oh
geez, really? we're going with 'inject' here? we couldn't've said 'require' or
'load' or some other generic and often used term that could maybe be *slightly*
less confusing in this context?) into your controllers and whatnots and
fiddlybits, straight up. same goes for custom
services/external/third-party/whatever, i suppose. basically you've just got to
have some sort of usable api there for other services & fiddlywhatnots to
access.

`$http` is a thin wrapper on XHR; `$resource` is higher level (though without
any examples of how, all i have to go on is that you can call POST something
like 'save' and get something like 'GIMME DAT' or whatever... so... what?). and
i think `$resource` is *not* a builtin, because you'd need to have a dependency
on `ngResource` to use it. and here he says we've got `$httpBackend` built in to
test without a web server, but he doesn't mention if that's actually a builtin
or a core module that would need to be required, nor does he mention whether or
not it runs a webserver itself or just sends out a fake packet, internally, or
whatever.

--------

so, jeremy's super-boiled-down 10-second run-through of the MVC pattern
definitely clarified the actual role of the controller. i mean, i kind of
understood that it's basically binding models and views, but never really
understood it as the actual middleman until just now. that is awfully sensible.

implied, but not stated explicitly: react is less of a bottleneck as a view than
angular is.

something to keep in mind: `$scope` is straight up two-way binding, not sortof
or sometimes as was implied in the article.

oh, `directive` is basically just silly slang for attributes.

mismatched bits and bobs? not with angular, it'll just boink up some fresh new
dom nodes for your loose-ends

$timeout basically same syntax as setTimeout, except

```javascript
$timeout(function(){
  $scope.thing = 'that'
}, 10000)
```

EVEYTHING that goes IN the html that angular will use is INSIDE of
ng-controller, attached to its $scope

so for the  HTML to even give a crap about what's going on in your javascript,
it's gotta be in a $scope. everything that you want angular to actually act on
had better be {{}} in the html and $scope in your js

as jeremy explained it, your js as it sits in your files is ALSO basically kind
of a starting point, because (and see 1.md for more notes on triggering events),
what angular does is (he said scan for but i understood it as wait for triggers
from) basically an excuse to go changing things. so your objects, variables,
whatever are OH MY GOD NOW I KNOW WHAT IMMUTABLE JAVASCRIPT IS A BIG DEAL OKAY
(no, not because of angular, but because it just hit me how how loose EVERYTHING
can really be in javascript... wow, no wonder js get so much hate. it probably
deserves it.)

ng-repeat makes a miniature scope for the foo part of `ng-repeat="foo in bar"`
-- underneath, i suppose. that's super slick.

```text
<input ng-model="someFilter"> // filter is a keyword to angular, it knows to look for a filter as defined by itself
<div ng-repeat="some in such | filter: someFilter">
{{some.stuff}} {{some.things}} // okay, and i suppose, it looks like filter is just a builtin that does just that one
{{some.stuff}} {{some.things}} // exact thing... it only shows the thing that you're inputting/providing as a filter
{{some.stuff}} {{some.things}} // BUT that does not necessarily have to mean actual filtered string fragments.
{{some.stuff}} {{some.things}} // THIS MAKES LIFE EASY.
</div>
<div ng-repeat="some in such | filter: { name: someFilter location { name: locationNameFilter } }">
// so basically we're interactively filtering here, but also filtering by the type of whatchamacallits,
// filtering the objects with a nesting (so, narrowing) way. we could that we need to pass an object,
// and that object ought to have a certain .property, and that key's value should PROBABLY have a capital A
// or else, y'know, hey angular, throw that shit out.
// that, right there, could be a simple (though obviously not exactly performant...) way to work on that
// little knowledge management problem we have.
// <div ng-init="whatisUPYO = true">YO</div>
// <div ng-init="heywhatever = false">YO</div>
// <div ng-show="heywhatever">YOU CAN'T SEE ME</div>
// <div ng-show="whatisUPYO">BUT YOU CAN SEE ME</div>
// within the ng-thingy"IN HERE THIS PLACE THIS BIT RIGHT HERE" you can
// basically work with any executable javascript code you'd like...
// though that would be an awfully bad idea, i suppose.
//
// ... we have ng-hide also, which is just ng-show-" = false "
// so you're basically only hiding if (true/truthy). negates the need for
// double negatives, or some such.
// they're only really working on css `display: none;`
// ng-if will actually keep something off the dom if it fails, so
// HOLY CRAP ANGULAR HAS A BUILT IN LINK FILTER. FILTER IS NOT JUST FILTER.
// this means you can probably pipe to a whole fucking LOAD of things, and
// seeing as scripting languages basically mostly exist to abstract themselves
// more and more every year until they grow actual intelligences...
// THIS MEANS THIS IS BASICALLY LIKE POSIX PIPES. WHICH MEANS I CAN, WITH A BIT OF WORK
// AND A LOT OF SYNTAX HELP AND PROBABLY ALL SORTS OF FAILURES, ESCAPING, SANITIZING,
// AND TESTING... basically it could become fairly easy to port posix utilities to
// angular. and since that's written in javascript... that could be extracted and
// maybe combined and turned into its own library for porting posix-compliant shell
// scripts (or, theoretically, any, i guess...) to... the... browser.
// oh gosh. this clarified some things, for sure.
// though i STILL DON'T KNOW WHY WE NEED TO DO TEMPLATING WITH MORE PUNCUATION
// RATHER THAN LESS
// JADE MAKES THINGS EASIER
// SO DOES STYLUS
// SO WHAT THE HELL WHY CAN'T JAVASCRIPT TEMPLATING FOR JAVASCRIPT ACTUALLY BE GOOD

```

--------

```javascript
function factorial (num){
  if (num == 0) {
  return 1
  } else {
    return (num * factorial(num - 1))
  }
}
```

ngoptions: says hey, make this array into a selection dropbox kinda thing

ves) ng-model (and some other diretives) need to have a parent (or both) for expcetionally good looksk to w=be happpy

factories vs services vs providers; basically down to personal style, though we'll just go with ryan's style

--------

$q is angular's implementation of promises.

```javascript
var myDeferred = $q.defer()

async(function(val) {
  myDeferreed.resolve(val)
}, function(error) {
  myDeferred.reject(error)
})

async(myDeferred.resolve, myDeferred.reject)
//
var myPromise = myDeferred.promise
myPromise
.then(function(data) {
  console.log('It worked!', data)
}, function(error) {
  console.log('NOPE', error)
})
```

can assign success/failure ops right after creating the deferred (before async()), and can assign as many ops as we like.

we can also assign ONLY success or failure functions:

```javascript
promise.then(function() {
  console.log('assigning only success here')
})

promise.catch(function () {
  console.log('assigning only failure here')
}) // this is the same as typing out promise.then(null.errorCallback)

promise.finally(function() {
  console.log('on, and this one will happen whether we fail or succeed.')
})
```

can chain promises (as values), for example asyncTwo(asyncOne), but like:
```javascript
var promise = asyncOne().then(asyncTwo)

$q.reject(reason) // will return rejected, with provided reason
$q.when(value) // will return resolved, with provided value.
$q.when(value) // can serve as a wrapper for a 3rd party promise. example:
$.ajax() //jQuery
var jqPromise = $.ajax({
// stuff here })
var angPromise = $q.when(jqPromise)

$q.all( [] )
// in the above, one passes an array of promises to $q.all

//
// angular flow in ten seconds or less:
// this is according to luke, so it's probably correct.
// $http.get(url)
// promise.then on that
// to display it, call that function on the service
// return that, $scope.that thing
// {{let's go ahead and display that.thing however we want that}}

//

// angular hits serious view bottleneck around 1800 items.

// node's event loop is exactly the same as normal async javascript, just not in a browser

//

$q.defer() // making a promise
$q.resolve() // start resolving that promise, start invoking chain of .then callback functions,
             // aka 'i'm done and it worked!'

doThing(){
  function doThing(){
    var promise = $q.defer
    // stuff to do
    // this needs a callback, probably
      function callback(){
        promise.resolve(['stuff', 'that you got', 'because you asked for it'])
      }
    return promise
  }
}

var url = 'http//zacanger.com/blog"
var promise = $q.defer()
$http({
  method: 'GET'
, url: url
}).then(function(response){
  var whatever = response.data
  // do things
})
```

okay, promises are so much simpler and more straightforward than people are probably thinking.
really, basically, we're just going over use-cases and examples now. which is totally fine,
of course.

note that when we go ahead and send a buncha chained promises, we're gonna get stuff back
however it comes back, not in the order we started things. we'd want to sort things after,
if needed, not (obviously) within promises, because that would make all of that redundant;
we'd basically be using promises to run some synchronous javascript, at that point.
dumb.

JSONP: this is how we get around cross-origin problems.

--------

```javascript
var promise = new Promise(function(resolve, reject){
  setTimeout(function(){
    resolve('hi')
  }, 5000)
})

return promise

function whatUp(){
  say('BLAHR')
}
```

--------

this.whatever makes 'whatever' (in a service) visible to the controller.

it's a good idea to go ahead and be like

```javascript
var hello = 'oi!'

this.returnedInfo = function(){
  return hello
}
```

that way... data is made, protected, changed, broken, etc., all in one place.
just accessed through that nice little function there.  i am so confused about
bananas

--------

```html
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>o hello there</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.1/angular.min.js" type="text/javascript"></script>
  </head>
  <body ng-app>
    <div ng-controller="MyApp">
      <input type="text" ng-model="name"><br>
      <p ng-cloak><strong>howdy,<em>{{name}}</em></strong></p>
    </div>
    <script>function MyApp($scope){$scope.name = "zacanger"}</script>
  </body>
</html>
```

--------

jer.html
```html
<!DOCTYPE html>
<html ng-app="dm7FirstApp">
  <head>
    <meta charset="utf-8">
    <title>jeremy's example</title>
  </head>
  <body ng-controller="myCtrl">
    This is Plain Text

    <div style="background-color: red">
      {{name}}
    </div>

    Input box : <input type="text" ng-model="foo">

    <div>Curly Brackets : {{foo}}</div>

    <input ng-model="person.name">
    <input ng-model="person.cereal">
    <input ng-model="person.media">
    <input ng-model="person.random">

    <div>
      Your person is :
      <div>{{person.name}}</div>
      <div>{{person.cereal}}</div>
      <div>{{person.media}}</div>
      <div>{{person.random}}</div>
    </div>

    <h2>Repeat</h2>

    Filter: <input ng-model="carfilter.name">

    <div ng-repeat="car in cars | filter: carfilter " class="car">
      {{car.name}} - Year: {{car.year}}
    </div>

    <h2 ng-init="isAwesome = true">Show/Hide</h2>
    <div ng-show="isAwesome">Yay, you are awesome!</div>
    <div ng-hide="isAwesome">We're sorry you're not awesome</div>
    <div ng-if="isAdmin">You must be the boss</div>
    <button ng-click="isAwesome = !isAwesome">Click Me!</button>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.min.js"></script>
    <script>var app = angular.module('dm7FirstApp', []);

      app.controller('myCtrl', function($scope, $timeout){
        $scope.name = "That lame teacher"

        $scope.cars = [
          {name: "Astin Martin", year: 1972},
          {name: "Kia", year: 1973},
          {name: "Jeep", year: 1975},
          {name: "51 Mercury", year: 1951},
          {name: "Tesla", year: 2008}
        ]

        $scope.isAwesome = true
        $scope.isAdmin   = true

        $scope.clicked = function(){
          $scope.isAwesome = !$scope.isAwesome
        }

        $scope.person = {
          name: "namless",
          cereal: "air",
          media: "silence",
          random: "nothing"
        }

        $timeout(function(){
          $scope.foo = "bar"

          $scope.cars[2].name = "Monster Truck"
        }, 3000)

      })

    </script>
  </body>
</html>
```

--------

j_promise_notes.js
```javascript
// controller
angular.module('httpApp').controller('myCtrl', function($scope, myService){
  $scope.test = "Working"

  $scope.isLoading = true
  var promise = myService.getStarship()

  promise.then(myService.getPilots)
  .then(function(starshipWithPilots){
    $scope.starship = starshipWithPilots
  }

  //    promise.then(validateEmails)
  //           .then(sendEmails)
  //           .then(reportSuccess)
  //           .then(askUserForResendOption)
  //           .then(resendMoreEmails)

})


// service
angular.module('httpApp').service('myService', function($http, $q){
  var baseUrl = "http://swapi.co/api/starships/10/?format=json"
  this.getStarshipWithPilots = function(){
    var deferred = $q.defer()

    $http({
      method: 'GET',
      url: baseUrl
    }).then(function(response){
      var starship = response.data

      var pilotObjs = []
      var totalPilots = starship.pilots.length

      starship.pilots.forEach(function(pilotUrl){
        $http({
          method: 'GET',
          url: pilotUrl
        }).then(function(pilotResponse){
          pilotObjs.push(pilotResponse.data)

          if(pilotObjs.length === totalPilots){
            starship.pilots = pilotObjs
            //order pilots alphabetically
            deferred.resolve(starship)
          }
        })
      })
    })
    return deferred.promise
  }

  this.getStarship = function(){
    var deferred = $q.defer()
    $http({
      method: 'GET',
      url: baseUrl
    }).then(function(response){
      var starship = response.data
      deferred.resolve(starship)
    })
    return deferred.promise
  }

  this.getPilots = function (starship){
    var deferred = $q.defer()
    var arrayOfPilotUrls = starship.pilots
    var pilotObjs = []
    var totalPilots = arrayOfPilotUrls.length

    arrayOfPilotUrls.forEach(function(pilotUrl){
      $http({
        method: 'GET',
        url: pilotUrl
      }).then(function(pilotResponse){
        pilotObjs.push(pilotResponse.data)

        if(pilotObjs.length === totalPilots){
          starship.pilots = pilotObjs
          //order pilots alphabetically
          deferred.resolve(starship)
        }
      })
    })
    return deferred.promise
  }
})

```
