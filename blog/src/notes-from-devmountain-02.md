---
title: More DevMountain Notes
created: 2016-05-05
tags:
  - devmtn
  - js
  - css
  - angular
---

This is a bunch more notes from my time going through the course at
DevMountain.

These notes are specifically from the first three weeks. They're a mess.

Don't take anything too seriously. I probably didn't know what I was talking
about, a lot of the time.

[TOC]

--------

## css

if a div has position absolute, position RELATIVE on another
element will be in RELATION to the div that has ABSOLUTE.

so, top 0 is in RELATION to something else that has ABSOLUTE,
otherwise just defaults to in relative to HTML.

in simpler terms... position is basically just referring to its immediate parent,
unless there's no frame of reference there. all hierarchical. (lol hence C in CSS....)

* box-model:
    * border goes OUTwards from the element
    * padding goes IN and squishes the element
    * LOTS of padding will actually stretch an element out
    * margins--space between picture and other items

--------

## rly just beginning js

    // Variables

    // JavaScript uses "lexical" scoping for variables, meaning it matches
    // a variable based on its name.  "Name" isn't the same as "name".

    // Variables hold values (Numbers, Strings, Arrays, Objects, Functions, Boolean)
    var myAge = 39
    var myName = 'Jared'
    var myKids = ['Isaac','Abbi','Natalia','Camila','Bella']

    // Conditional Statements (if/else)

    // Conditional statements use comparison operators to produce a
    // Boolean result (true/false)
    if (myAge < 20) {
      // do something
    } else if (myAge < 40) {

    } else {
      // do something else
    }

    // Truthy and Falsy
    // There are 6 values that are considered "falsy"
    // '',0,false,undefined,null,NaN

    // == vs ===
    // The double equals will convert the string to a number
    // The triple equals will return false if the values aren't
    // the same type
    if ('42' == 42) {
      console.log("'42' == 42")
    }

    if ('42' === 42) {
      console.log("'42' === 42")
    }

    // Function Declaration
    function DoubleANumber(number) {
      console.log(number * 2)
    }

    // A function can also return a value
    function DoubleANumber2(number) {
      return number * 2
    }

    // Function Invocation
    DoubleANumber(10)

    // If a function returns a value, we save that in a variable
    var doubled = DoubleANumber2(10)
    console.log(doubled)

    // Function Expression

    // Functions themselves can be stored in a variable
    var func = function SayHello() {
      console.log("Hello")
    }

    // When a function is used in an expression, the function name
    // isn't required.  This is called an anonymous function
    var func1 = function () {
      console.log("Hello")
    }

    // We'll see where using anonymous functions is a common
    // pattern in a future lesson

    // Scope
    var name = "Jared"

    // A function can access variables declared outside the function
    function SayMyName() {
      console.log(name)
    }

    SayMyName()

    // A function argument is "local" to the function, and "hides"
    // the outer variable with the same name
    function SayMyName2(name) {
      console.log(name)
    }

    SayMyName2("John")

    // A variabled declared inside the function also "hides" the
    // outer variable with the same name
    function SayMyName3() {
      var name = "Bob"
      console.log(name)
    }

    SayMyName3()

    // But variables declared inside a function are only
    // visible inside the function
    function ShowAge() {
      var age = 10
      console.log(age)
    }

    //console.log(age) // This is an error because "age" isn't defined

    // Functions can be "nested" inside of other functions.  Scope works
    // from the inside-out.
    function Grandpa() {
      var name = "Grandpa"
      function Dad() {
        var name = "Dad"
        function Son() {
          var name = "Son"
        }
      }
    }

    // There are two rules to remember with functions
    // 1. A function can access the the variables declared in outer functions
    // 2. A function can access those variables even after the outer function
    //    has been invoked and returned.
    // A function that has "remembered" these values is called a closure.

    // Closures
    function Person(firstName, lastName) {
      function SayMyName() {
        console.log(firstName + ' ' + lastName)
      }
      console.log('All done')
      return SayMyName;
    }

    var person = Person('Jared','Stark')
    person()

    .call(scope, arg1, arg2, etc) // takes ARGUMENTS, comma sep
    .apply(scope, [arg1, arg2, etc])// takes ARRAY of arguments
    using .call() or .apply() invokes the function, so no need to invoke like fun();
    .bind() does NOT invoke, just binds values prior to invocation.
    // this way one can bind values WITHOUT calling it, so no need to create another inner function
    // and go through lots of work to avoid screwing up scope

--------

## js basix

    object that contains a function = {
      function() {
        return: stuffs
      }
    }
    call.the(object(function())

* `arrayName.pop()` removes the last item from the array
* `arrayName.push("item", "maybeAnotherItem")` adds to the end of the array
* `arrayName[integer] = "item"` adds item at this place in array; could leave empty items thusly
* `arrayName.shift()` removes FIRST item from array
* `arrayName.unshift("item", "more if you want", "hey why not")` adds to the BEGINNING of array
* `arrayName.splice(startingInteger, integerofItemsToRemove, "string", "item", "etc")`

    // example:
    var bits = ["bots", "boots", "bats", "beets", "boats", "bets"]
    bits.splice(2, 2, "wat", "wuuuuuuuh")
    // would result in:
    bots boots way wuuuh boats bets

use same method to just remove from an array eg `bits.splice(3, 3)` would return from the above, `bots boots boats bets`

to move items from one array to another, also splice, like so: `var stib = bits.splice(2, 5)`

this would leave bits unchanged.
2 is the starting index of item to be copied;
5 is the element AFTER the last one to be copied.
can use same method simply to reduce current array (overwrite)

    true, false: booleans (so no quotes)
    if blahblah
        break;
    don't know why i'm making a note of 'break.'

    whateVaR.toLowerCase(); //does that thing that it says it does. WOOWWOWOWOWW
    wutTHEfack.toUpperCase(); //does the exact opposite of the thing above this line. MIND. BLOWN.

    .slice(indexinginteger, firstCharAFTERtheslice) // so, second number minus first number equals total characters in the slice
    example: var threeLetterPrefix = thatDudesName.slice(0, 3)
    .slice(singleNumber) would return until the end of the string.

    var blah = whatever.length
    //returns the length of 'whatever'

in the case of true || whatever, whatever will never be checked;
in the casae of false && whatever, whatever will never be checked.
they are evaluated _only when necessary_.

expression is kinda like a clause in natural language;
can have nested subclauses, whatnots.
statemets, more like full, complete sentences.

builtin function `Number()` converts given value to integer. for example:

    var ancient = Number(prompt('how many milliseconds have you been alive?'), ''))
    alert('you're one old sonofabitch, " + ancient + " is a long freaking time.')

do loop is similar to while, but do will always execute at least once;
it doesn't test until after the first execution. example:

    do {
      var asdf = prompt("what do they call you?")
      } while (!asdf)
    console.log(asdf)
    // this will keep prompting until the prompt recieves a string

standard loop boilerplate pattern: counter variable to count (duh);
while loop (check counter against limit?) then update counter.

OH WAIT WE CALL THIS A FOR LOOP DUH.

    for (var number = 0; number <= 26; number = number + 1)
          console.log(number)
    //0
    //1
    //etc, until we are less than or equal to 26.

* for loop syntax:
    * for (bit that initializes the loop, like setting an integer at 0 to count up;
    * expression check if the loop should still go, like defining a counting limit;
    * what to do, if we've made it through those first bits)
    * always needs three sections/two semicolons

`+=` is not the only thing that works for updating;
looks like all math operations, when done `i *= i`;
obvs `i += i` and `i -= i` can be shortened to `i--` and `i++`

switch: it's case, i guess, but minus esac (because, note, we also don't use done, or fi... wtf).

so:

    switch (thingy(whatthewhat)) {
      case "oioioi!":
        alert("OI! OI! OI!")
      case "blaahh":
        whatever
      break
      default:
        console.log("u r a bag of dix")
      break
    }

functions always have curly braces around body, even if just one command

braces are allowed everywhere but only define a new local environment within functions,
and only really useful for grouping conditionals and loops

like any other variable, functions can totally get new names.
their values are just as mutable as any other vars'.

use brackets when accessing vague proprop (eg looping over) from object;
otherwise dot notation if know specific key

NOT `for i in arr.length whatever`

....

rather,
`return arr[arr.length -1]`

    //GLOBAL SCOPE
    var x = 1;

    function outerFunction() { //LOCAL SCOPE FOR OUTERFUNCTION
      return function innerFunction() { //LOCAL SCOPE INNERFUNCTION
        return 'hello';
      }
    }
    function returnOne() {
      return 1;
    }
    var myNewFunction = outerFunction();
    myNewFunction();
    myNewFunction();
    var numOne = returnOne();

    function makeCounter() {
      var counter = 0; //local scoped makeCounter and children
      return function myCounter() {
        counter++;
      }
    }

    var count = makeCounter();
    count(); //return 1
    count(); //return 2
    var count = makeCounter();

    var secondCount = makeCounter();
    secondCount() //return 1

a closure references variables OUTSIDE OF ITSELF
and remembers those even when its parent scope (parent function) has returned

remember, don't need to do
`if whatever == true/if whatever != true (or == false)`
just need to do

    if (whatever)
    return true
    else
    return false
    ... and that's all.


    // reversing an array without using array.reverse() ...
    function flipIt(arr){
      var flipped = new Array
      for(var i = arr.length-1; i >= 0; i--){
        flipped.push(arr[i])
      }
      return flipped
    }


--------

## ajax (jquery) snippets

    $(document).ready(function(){
      var app = $('app')
      var header = $('<h3>Random Colour Palette</h3>')
      var button = $('<button>Colours!</button>')
      var clear = $('<button>New ones!</button>')
      var list = $('<ul></ul>')
      button.on('click', function(){
        $.ajax({
          method: 'GET',
          url:'http://www.colourlovers.com/api/palettes/random?format=json',
        }).then(data){
          var dataObj = JSON.parse(data)
          showData(dataObj)
        })
      }

      app.append(header)
      app.append(button)
      app.append(clear)
      app.append(palette)

      function showData(data){
        var image = indexOf('imageUrl')
        var paletteDiv = $('<div></div>')
        //    var image = $(image tag  + url)

        pallet.append(paletteDiv)
      }

    })

--------

## toy problem notes, week two

    function checkEvens( num ) {
      if (num % 2 === 0) {    // this just checks if the argument passed is divisible by two
        return true
      }
    }

    function compareLengths( originalArr, newArr ) {
      if (originalArr > newArr) {
        return 'More odds than evens.'   // this is pretty self-explanitory
      } else if (originalArr < newArr) { // just comparing lengths (whodathunkit)
        return 'More evens than odds.'   // and returning based on which is longer
      } else {
        return 'Same number of evens and odds'
      }
    }

    function howMany( originalArr, newArr, evensOrOdds ) {
      if (evensOrOdds === 'More odds than evens.') {
        var length = originalArr.length - newArr.length // this is the bit where things are
        console.log('There are ' + length + ' more odds than evens.')
      } else if (evensOrOdds === 'More evens than odds.') {
        var length = newArr.length - (originalArr.length - newArr.length)
        console.log('There are ' + length + ' more evens than odds.')
      } else {
        console.log('There are the same number of evens and odds.')
      }
    }

    function myCallbacks( iterator, lengthCompare, counter, arr ) {
      var newArray = []                      // hey hey hey, a sweet new array
      arr.forEach(function( num, index ) {   // let's loop over the old array first
        if (checkEvens(num)) {               // see if them items is %2===0
          newArray.push(checkEvens(num))     // if they is... i can't keep that up...
        }                                    // we just push them to the new array.
      })
      var evensOrOdds = lengthCompare(arr, newArray) // we compare lengths of the old array and new array
      counter(arr, newArray, evensOrOdds)            // we pass the old array, the new array, and the variable above
    }                                                // to the parameter from the top of this function

    var myArray = [1, 2, ,3 ,4 ,5 ,6, 7, 8, 9, 10, 11] // oh, HERE's that array we keep talking about

    myCallbacks(checkEvens, compareLengths, howMany, myArray) // let's invoke that function and pass it ALL THE THINGS

--------

## something about some twitter clone thing

### do this

* hide tweet button and character count initially (so, just not there)
* on click, double textarea size, reveal character count and tweet button
* ch count decrease realtime
* at 10 chars, count turns red
* if chars > 140, disable tweet button (and re-enable if =< 140)
* new tweet pushed to column immediately, w/ prof image in top left, full username and name
* tweet actions on :hover over individual tweets only
* rt/timestamp/reply area hidden by default; expand on click
* timestamps with timeago (or, i think, livestamp actually)
* icons for favs/rts in upper right of tweet card
* bootstrap tooltips on :hover over avatar
* localstorage (or howabout localForage?)
* or baas... ... yeah. localforage.

#### notes on changes

* setting max-viewport is a *horrible* practice. nixed.
* normalize instead of reset; cdn instead of stuck in our own stylesheet.
* updated to jquery 2.1.4; cdn instead of in our js directory.
* replacing ids with classes, at least for starters... just a few ids in here, sprinkled around ಠ⌣ಠ
* `page-container` = `container`
* `dashboard` = `dash`
* `profile-summary` = `profile`
* `char-count` = `count`
* `tweet-controls` = `controls`
* because i don't like to type

#### notes on the process (and result)

* so it turns out that i'm 99% sure none of us is doing this right. after doing epic battle with
* the javascripts, i've been defeated. manually moving the first tweet down and putting the new
* tweet's content in its place, right now, kind of relies solely on using the actual username/name
* of the former top tweet on the feed (btw, css could probably use an update... twitter's one column
* of user and tweets, and two side columns of promos and ads, now.). that's, uh, totally unrealistic.


--------

## murr nuutes

    // make a loop. then have it go 1-5 endlessly. then have it only do it once.

    // our way
    // function count () {
    //   while (true) {
    //    for (i = 1; i <= 5; i++) {
    //      console.log(i);
    //     }
    //   }
    // }

    // correct way
    // function countOnce () {
    //   for (var i = 0; i < 1; i++) {
    function makeCounter () {
      var num = 0;
      return function () {
        if (num < 5) {
          return num++;
        } else {
          num = 0;
          return num;
        }
      };
    }
    //   }
    // }

    // other way

    // function makeCounter() {
    //  var x = 1;
    //  retrun function() {
    //    console.log(x1);
    //    x++;
    //    if (x>5) {
    //      x=0;
    //
    //    }
    //  }
    // }

    function makeCounter () {
      var counter = 1;
      var counter2 = 1;
      return function myCounter () {
        if (counter2 > 11) {
          return null;
        } else if (counter === 6) {
          counter = 0;
        }
        counter2++;
        return counter++;
      };
    }

    // Objects: less primitive than primitives.
    // create an object literal that models a facebook message:

    // var fbMsg = {
    //    sender: 'Jack';
    //    recipient: 'Jill';
    //    topic: ['water', 'pail', 'hill', 'cranial trauma']
    //    }

    // or, using new Object();

    var fbMsg = { };
    fbMsg.sender = 'Jack';
    fbMsg.recipient = 'Jill';
    fbMsg.topic = ['water', 'pail', 'hill', 'cranial trauma'];

    // removing from object, much less work than in array

    delete message.recipient;

    // brackets also work for accessing properties on an object

    fbMsg['fuzzy date'] = 'yesterday afternoon';

    // for loops over keys/values in an object:

    for (var key in fbMsg) {
      console.log(key);
    }

    for (key in fbMsg) {
      console.log(fbMsg[value]);
    }

    // you don't really NEED to declare that something's a variable...
    // that's bad practice, though. that'll make your whatever a global variable.
    //
    // there are no constants in javascrpt, apparently.
    // so, js isn't really modular. and scripts included in html will basically
    // just override in loading order. so, a script tag by the footer would
    // override one that's all the way up at the beginning of your body, if they
    // had the same globals, for example.

    // wrapping an entire function (even anonymous) in parens is a sweet idea!
    // this way you're not polluting global namespace, and you can just
    // invoke the 'function expression' immediately, so it's not really any
    // different in practice than as if you'd left off the parents. so...

    (function () {
      var yo = 'billybob';
      console.log('what up ' + yo);
    })();(function () {
      var yo = 'margie-jo';
      console.log('what up ' + yo);
    })();

    // i guess a lot of minifiers will automatically just wrap all your scripts
    // in these kind of expressions?

    // a function is an object. it has a property called prototype.
    // the keys of prototype (which is an object itself) are inhereted by any other
    // object below that one.
    //
    // one can add to a prototype after declaring that function.
    //
    // a prototype describes the idea of a thing; here's all the things that would
    // be in a facebook message, y'know? so this way, we just made a CONSTRUCTOR.
    // and there's your use for the new Object syntax! now we know how to use that.
    //

    function Message(sender, recipient, topic) {
      this.from = sender;
      this.to = recipient;
      this.subject = topic;
    }

    // if you DON'T explicity definte a prototype, you'd get one anyway,
    // it would basically just be implied/automatic.
    // readability is a good reason to explicitly define it, though.
    // also, you can set values in your prototype, obvs, that'll then be applied
    // to all the stuffs that uses that prototype.

    // // so we could also go ahead and comment out all that like so

    function Message() {
    }

    Message.prototype = {
      to: ' ',
      from: ' ',
      about: ' ',
      date: ' ' // note no comma on this line
    };        // also note that this could return stuff in ANY GODDAMN ORDER.

    var msg = new Message ('joe', 'ruth', 'pickles and cream cheese');
    var mssg - new Message ('ann', 'barb', 'i hear joe eats some weird stuff');
    console.log(msg, mssg);

    // this will make each one basically have the same structure (oh! prototype)
    // is basically a framework for building objects!), but each INSTANCE is a
    // totally different actual object. okay.

    // the keyword this: this.thing, etc... this just references the new (current
    // parent) object, that's all!

    // okay. a method is a property containing a function definition. that sounds
    // more complicated than it needs to. a method is kind of like a little
    // function that works just on an object, i guess.
    // or, in other words, it's literally just a property, the value of which
    // happens to be a function.

    // okay, and so as was just cleared up, things that use the notation that
    // makes me think they're just being confusing and shit? yeah. basically just
    // properties of the string object, or the window object, or the browser
    // object, or the global (in node) object.

    // but wait. what about node, really, seriously? i mean, is global the same
    // as browser? or window? because those are actual structures that would need
    // to be emulated, right? um... i'll want to ask our lecturer this, though
    // chances are we'll actually be getting to this in a few weeks.

    //
    // ARRAYS
    //

    // Length of an array is how many items. In arrays, order matters (unlike objects).



    // snippet for reversing strings, because we apparently don't have a builtin
    // for this, exactly...
    var reversed
      , name = "zac anger";

    reversed = name.split("").reverse().join("");
    return(reversed);

    //
    // THIS
    //

    // `this` is not assigned a value until an *object* invokes the *function*
    // where `this` is defined.
    // So, while it seems (to me, and I guess to others) that `this` refers to the
    // object, it's not until an object invokes a function that `this` is
    // actually assigned a value. The actual *value* is __only__ based on which
    // object invoked said function. `this` has the value of the invoking object
    // in most cases. sometimes it does not.

    // IMPLICIT is the value attached to a keyword when it refers to an object
    // and it applies to the PARENT object
    //
    // EXPLICIT (call, apply, bind)
    //
    // DEFAULT (window object)
    //
    // NEW in creation of new objects

    // To mantain `this` inside anonymous functions, we can set the value
    // before entering all that forEach bidnez.
    // eg var that = this ... lol

    var arrOne = [1, 44, 7, 89];
    var arrTwo = [44, 2, 19, 21, 37, 1];
    var arrThree = [56, 19, 44, 1, 12, 89];
    function arrayItUp(arrOne, arrTwo, arrThree) {
      for (var i = 0; i => arrOne.length; i++) {
        for (var j = 0; j => arrTwo.length; j++) {
          for (var k = 0; k => arrThree.length; k++) {
            if (arrOne[i] === arrTwo[j] && arrOne[i] === arrThree[k]);
            arrFour.push(arrOne[i]);
          }
        }
      }
      return arrFour;
    }
    arrayItUp(arrOne, arrTwo, arrThree);

    // all of this could've just been basically a foreach loop... and avoided
    // the scope problems... crap.


    //
    // back to `this`
    //
    // because it's better to keep methods and their objects/properties together in
    // the same model, one can always go ahead and make a method over there, and
    // then include that method as the value to a key under the object. that way
    // you've got modularity of a sort, but also keeping your models together in
    // one place.
    // so defining it in one place and then pointing to it in a second and maybe
    // invoking it in a third? it's still going to point to that _function_ that
    // called it (or, rather, that function's object).
    // may be important, because he's said this several times now:
    // 'we want our models to represent the real world.' and...
    // 'we want the behaviors that represent our models to be with those models.'
    // i suppose this is more expressive? either way, it's obvious how it'd be
    // much easier to maintain and scale.
    //
    // .call is ONLY on a function, yo.
    // .apply works identically to call, except in how one passes in parameters.
    // first argument is *always* what `this` is bound to... which to use depends
    // on how you intend to pass in parameters.
    // btw, `arguments` is actually a keyword, apparently--for use in functions,
    // it provides an array of all the passed parameters.
    // but with .call, the second argument is a comma sep list;
    // .call and .apply invoke the function immediately. .bind dooesn't. instead,
    // it kind of makes a new function for you. that's actually super cool!
    // OKAY OKAY wait. so. both call and apply are functions  that can ONLY be
    // called on other functions! The one difference here is that call accepts both
    // a first argument AND ANY ADDITIONAL ARGUMENTS THA ARE PASSED TO IT.
    //
    // okay, here's a new example.

    var car = {};

    function (doors, model, make) {
      this.doors = doors
      this.make = make
      this.model = model
      return
    }

    car.call (car, 2, 'Hyundai', 'Equus');

    // so this is actually just a super roundabout way (in this simplified example)
    // to do a constructor functon, i guess.


    // okay, so the NEW keyword! var blah = new Blah(thing2 thing2);
    // but javascript IMPLICITLY does that, and IMPLICITY returns things for you,
    // and so makes things easier for you. HOWEVER, `new` is actually a shortcut
    // for you. but don't do that. it's not pretty, and it's not nice.
    // there's a thing that's like if (this instanceof Foo) or so, which will aid
    // in avoiding using the window/browser/global object. syntax is super fuzzy
    // though.
    //
    // currying: providing missing paramaters, some or all, when you call BIND.
    // it will not override anything. so:

    function what(one, two) {
      console.log('oi! ' + one);
    }

    var huh = { meh: 'yo' }; meh.what(); (two);

    // so with apply, those other parameters after the first, you'd better get
    // them into an array.
    //
    // from rey:
    // The this Keyword
    // In JavaScript, the thing called this, is the object that "owns" the JavaScript code.
    //The value of this, when used in a function, is the object that "owns" the function.
    //The value of this, when used in an object, is the object itself.
    //The this keyword in an object constructor does not have a value. It is only a substitute for the new object.
    //The value of this will become the new object when the constructor is used to create an object.
    //Note     Note that this is not a variable. It is a keyword. You cannot change the value of this.
    //
    //http://www.codeproject.com/Articles/857357/Introduction-to-HTML-WebSockets , https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API and http://www.html5rocks.com/en/tutorials/websockets/basics/ are some good primers on the websockets topic mentioned a little bit ago; and https://www.pubnub.com/blog/websockets-vs-rest-api-understanding-the-difference/ and https://news.ycombinator.com/item?id=3636681 for differences between websockets and http/rest/ajax/xhr/every-other-hacker-news-buzzword.
    //
    //
    // ASYNC
    //
    // to avoid problems with async functions and synchronous functions causing conflicts
    // (eg a sync one returning undefined because the async one hasn't finished yet),
    // just do callbacks. that makes __sense__, okay!
    //
    // worth noting again that setTimeout really isn't fantastic practice, so maybe just don't do that...
    // but if you do, it's super not difficult, so don't make it difficult.
    // just put in a function (which can obviously just be calling something defined elsewhere), and the
    // time (in milliseconds, which can also be calculated elsewhere). that's all.

    function doThatThing(arr){
      return ('Hello ' + arr + ', how are you?');
    }
    setTimeout(doThatThing, 1000);

    // ask:
    // would it be harmful to think of underscore (or functional javascript in general) as
    // being modular libraries/modules? (because javascript, at least in the browser, is not
    // inherently modular -- no more so than it is inherently functional, object-oriented,
    // or anything else... it's dynamic and multi-paradigm).

    // order.updateTotal();
    // console.log(order.total.bind();

    // he uses 'self'; we could just as easily use 'that' or whatever `var foo = this.bar`
    // ... or we could not, also.
    //
    // Functions as parameters

    // Create a function that calculates 10% tax
    function calculateTax(amount) {
      return amount * 0.10;
    }

    // Create a function that takes in an order amount calculates total
    // including tax
    function calculateTotal(amount) {
      return amount + calculateTax(amount);
    }

    var orderTotal = calculateTotal(10.00);
    console.log(orderTotal);

    // Create a function that calculates 7% tax for Utah
    function calculateUtahTax(amount) {
      return amount * 0.07;
    }

    // Update calculateTotal to include a state parameter use
    // the new utah calculator when the state is Utah
    calculateTotal = function (amount, state) {
      if (state === 'Utah') {
        return amount + calculateUtahTax(amount);
      } else {
        return amount + calculateTax(amount);
      }
    };

    orderTotal = calculateTotal(20, 'Utah');
    console.log(orderTotal);

    // Q: What are some potential problems with this method?
    // Q: What if tax calculation for Utah is based on county?
    // Q: What if we need to calculate for other states?

    // Update the calculateTotal to accept a function
    // as a parameter that can calculate tax
    calculateTotal = function (amount, taxCalculator) {
      return amount + taxCalculator(amount);
    };


    // Invoke calculateTotal with both calculateTax functions
    orderTotal = calculateTotal(30, calculateUtahTax);
    console.log(orderTotal);

    // Q: What is better about this approach?


    // Create a another function called GetTaxCalculator
    // that takes state as a parameter and returns the
    // correct tax calculator
    function GetTaxCalculator() {

    }

    // Q: If we add new tax calculators, what code will need to be updated?

    // Using functions as arguments to other functions is one way we can
    // get results from an asynchronous function.

    // Asynchronous & functions as callbacks

    // Create a function called done, that writes done to the console
    function done() {
      console.log('done');
    }

    // Use setTimeout and pass the done function as the callback
    setTimeout(done, 2000);

    console.log('after setTimeout');

    // Q: Why does 'after setTimeout' display before 'done'?


    // Create a function called getColors that uses setTimeout to simulate
    // an asynchronous call to a web server that returns an array of colors
    var getColors = function () {
      setTimeout(function () {
        //console.log('Returning colors...');
        return ['Red','Blue','Purple','Black'];
      },500);
    };


    // Q: What will the value of colors be? Why?
    var colors = getColors();
    console.log('Colors: ' + colors);

    // Update getColors to solve the problem by using a callback
    getColors = function (displayColors) {

      setTimeout(function () {
        displayColors(['Red','Blue','Purple','Black']);
      },500);

    };
    // Invoke getColors again using the callback
    var displayColors = function (colors) {
      console.log(colors);
    };

    getColors(displayColors);
    console.log('after getColors');


    // Q: What challenges does asynchronous code create? How does it affect
    // code readability?
    // Q: What advantages does it provide?

    // Create a function called forEach that takes an array as the first parameter, and a function as the second parameter.  The forEach function should loop over the items in the array and invoke the callback function, passing in each item in the array
    var forEach = function (items, callback) {
      for (var i = 0; i < items.length; i++) {
        callback(items[i]);
      }
    };

    // Create an array of colors
    var colors = ['Red', 'Blue', 'Purple', 'Pink'];

    // use forEach to loop over the array of colors.  Pass a callback
    // to forEach that receives a color as a parameter and outputs the
    // name of the color to the console.
    forEach(colors, function (color) {
      return color;
    });

    // Now create an order object that has a total property, and a property called items that is an array containing item prices. Add a method called updateTotal that uses the forEach function to loop over the items and update the total property
    var order = {
      total: 0,
      items: [1.99,2.50,9.99],
      updateTotal: function () {
        this.total = 0;

        forEach(this.items, function (item) {
          this.total += item;
        });
      }
    };

    // Invoke the updateTotal method and display the order total
    order.updateTotal();
    console.log(order.total);

    // Q: Why is the total zero?

    // Change the updateTotal method to solve the problem using 'self'
    order.updateTotal = function () {
      this.total = 0;

      var self = this;
      forEach(this.items, function (item) {
        self.total += item;
      });
    };

    order.updateTotal();
    console.log("Total using 'self': " + order.total);

    // Change the updateTotal method to solve the problem using 'bind'
    order.updateTotal = function () {
      this.total = 0;

      forEach(this.items, function (item) {
        this.total += item;
      }.bind(this));
    };

    order.updateTotal();
    console.log("Total using 'bind': " + order.total);

    // Change the updateTotal method to solve problem by passing 'this'
    // to forEach
    // This solution requires updating our forEach function itself and isn't
    // always an option

    // Update forEach to take a 3rd parameter, which is what 'this' should
    // be bound to
    forEach = function (items, callback, whatThisShouldBe) {
      for (var i = 0; i < items.length; i++) {
        callback.call(whatThisShouldBe, items[i]);
      }
    };

    // Update updateTotal to pass it the order object
    order.updateTotal = function () {
      this.total = 0;

      forEach(this.items, function (item) {
        this.total += item;
      }, this);
    };

    order.updateTotal();
    console.log('Total using update to forEach: ' + order.total);


    //
    //
    // JQUERY
    //
    //

    // things to keep in mind:
    // css and images will load up to 6 in parl
    // js will only load in order, once after another
    // because obviously some things depend on other things
    //
    //
    .find // finds all below
    .children // finds only direct immediate descendant
    // this is like nesting in css selectors, basically


    // dragndrop in jquery:

    .on('mousedown', function() {
      isPressed = true;
    }

    .on('mouseup', function(){
      isPressed = false;
    })

    .on('mouseenter', function(){
      if(isPressed) {
        $(this).addClass(color);
      }
    })

    // assuming we're using that paint example, obvs.

    // notes on localstorage:
    localStorage.setItem('key', 'value'); ==
    localStorage.key = 'value'; ==
    localStorage['key'] = 'value';

    return localStorage.key; ==
    return localStorage.getItem('key'); ==
    return localStorage['key'];

    delete localStorage.key also works.
    ;;;;;;;;

    //
    //
    //
    // AJAX THINGS
    //
    //
    // make data
    // change data
    // check data
    // move data
    // delete data
    //
    // is there anything else in an application but these five things?
    // this is a dare, from jeremy. hmmmmmmmmmmm.
    //
    // notes: jeremy says to not store drug money data on PCs xD
    // (because everything is data, data, data, data, data)
    //
    // Create - POST
    // Read    - GET
    // Update - PUT
    // Delete - DELETE
    //
    var ajaxParams = {
      method: 'GET',
      url: 'http://zacanger.com/blog/feed.rss',
    }


    $.ajax(ajaxParams).then(function(response){

    })

    // cyclomatic complexity
    // more things you're doing
    // more bugs
    //

