---
title: FP in JS
created: 2016-04-09
tags:
  - javascript
  - js
  - fp
  - functional
  - notes
  - examples
  - map
  - filter
  - reduce
  - promises
  - closure
  - closures
  - recursion
---

Notes taken while going through
[this guy's videos](https://www.youtube.com/channel/UCO1cgjhGzsSYb1rsB4bFe4Q/videos).

You should watch them all. He's great.


    'use strict'

    //
    // HOF
    //
    // Higher Order Functions
    // functions are values
    // const something = function > function something
    // obvs functions passed into functions
    // composition yay
    // example: filter (method on array, takes another function as action)
    // filter's should return true or false to determine whether item belongs in arr
    let something = [{foo : 'bar'}, {quux : 'baz'}, {whatever : 'target'}]
    let newArr
    for (let i = 0; i < something.length; i++) {
      if (something[i].what === 'target') {
        newArr.push(something[i])
      }
    }
    // vs
    let newArr = something.filter(thing => {
      return thing.what === 'target'
    })
    // or, using reject
    let isTarget = something => thing.what === 'target'
    let notTarget = something.reject(isTarget)
    // note: there's also find. that returns just the first item that matches.

    //
    // Map
    //
    // map's cb returns a transformed object to put into array
    let peeps = [
      {name : 'geordyn', relationship : 'bffl'                   }
    , {name : 'erin'   , relationship : 'number one bro'         }
    , {name : 'ryan'   , relationship : 'nemesis. also, the one.'}
    , {name : 'andrew' , relationship : 'special mormon'         }
    , {name : 'sarah'  , relationship : 'grandma'                }
    ]
    // non-functional way of doing getting an array of the names
    let names = []
    for (let i = 0; i < something.length; i++) {
      names.push(something[i].name)
    }
    // vs
    let names = peeps.map(peep => peep.name)
    let about = peeps.map(peep => peep.name + ' is my ' + peep.relationship + '.')

    //
    // Reduce
    //
    // map, filter, reject, and find are fairly specific list transformations.
    // reduce is is more of a swiss-army knife. it can do just about anything.
    // reduce wants an object, though. (yes, it's a method on the array prototype.)
    let stuffToSum = [
      {amount : 4   }
    , {amount : 16  }
    , {amount : 1024}
    , {amount : 4096}
    ]
    // so...
    let total = 0
    for (let i = 0; i < stuffToSum.length; i++) {
      total += stuffToSum[i].amount
    }
    // vs
    let total = stuffToSum.reduce((sum, stuff) => sum + stuff.amount, 0)
    // this is adding stuffToSum[0].amount to sum (which is initialised at 0)
    // and returning that sum, then going again with stuffToSum[1].amount and
    // the current sum (4), and so on.
    //
    // let's say we have some file in TSV format, like below. (i'm using 4 spaces
    // to represent a tab here, since tabs = 2 spaces in all my editors, and 2 spaces
    // isn't large enough to clearly distinguish fields here, i think.)
    // miss lady    an item    7    20
    // miss lady    a thing or two    75    2
    // some dude    another product    33    9
    // some dude    some product    100    1
    // we need to transform this into a nice looking object (containing two objects,
    // one for each person, each containing an array of objects that are the items bought).
    import fs from 'fs'
    let contents = fs.readFileSync('./thatFile.tsv', 'utf8')
    .trim()                        // remove trailing newline
    .split('\n')                   // split into array of strings at newlines
    .map(line => line.split('\t')) // \t is a tab character
    .reduce((persons, line) => {
      persons[line[0]] = persons[line[0]] || []
      persons[line[0]].push({
        name  : line[1]
      , cost  : line[2]
      , quant : line[3]
      })
      return persons
    }, {})
    console.log('contents: ', JSON.stringify(contents, null, 2))

    //
    // Closures
    //
    function sendReq(){
      let reqId = 'asdf'
      $.ajax({
        url : '/someurl'
      , success(response){
          console.log('request ' + reqId + ' returned')
        }
      })
    }
    // see, we don't have to pass stuff around here. reqId is going to be 'asdf'
    // no matter when jquery's ajax finishes whatever it's doing. nice.
    // there's also this classic example:
    function makeAdder(x){
      return(y => x + y)
    }
    let
      add4 = makeAdder(4)
    , add8 = makeAdder(8)
    console.log(add4(16))
    console.log(add8(64))

    //
    // Currying
    //
    // so, you've got some arguments. you could have a function that
    // takes your bunch of arguments and does stuff with them. or you could
    // have a function that takes your first argument and winds up returning
    // a function that takes your second argument which returns a function
    // that takes your third argument... etc., you get the idea.
    let self1 = (name, age, language, location) =>
      `Hi, I'm ${name}, age ${age}. I speak ${language} and live in ${location}.`
    console.log(self1('zac', 26, 'english', 'utah, i guess'))
    // vs
    let self2 = name => age => language => location =>
      `Hi, I'm ${name}, age ${age}. I speak ${language} and live in ${location}.`
    console.log(self2('zac')(26)('english')('utah, i guess'))
    // why? maybe i don't know everything about myself yet, but my app will find
    // out some of this information later. so i call self('zac'), have a birthday,
    // call self(27)('english') because it's been another year and i still only
    // speak one language, and then i call self('texas??') because i've moved.
    // now, finally, i have the return value (the introductory sentence)!
    // what about self1? we could always use something from some library to
    // transform it, like wu.js's autoCurry, or whatever. for the sake of familiarity,
    // try lodash (first npm i -S lodash):
    import _ from 'lodash'
    let me = _.curry(self1)
    console.log(self1('zac'))
    // yay! okay, another example.
    let
      guitars = [
      {brand : 'ovation'    , type : 'acoustic' }
    , {brand : 'silvertone' , type : 'acoustic' }
    , {brand : 'esp'        , type : 'electric' }
    , {brand : 'teton',     , type : 'acoustic' }
    , {brand : 'danburn'    , type : 'electric' }
    , {brand : 'homemade'   , type : 'cigar-box'}
    ]
    , isType    = (type, obj) => obj.type === type
    , electrics = guitars.filter(x => istype('electric'), x)
    console.log(electrics)
    // okay, so using the same guitars array:
    import _ from 'lodash'
    let isTypeCur = _.curry((type, obj) => obj.type === type)
      , acoustics = guitars.filter(isTypeCur('acoustic'))

    //
    // Recursion
    //
    // recursion is not at all a difficult idea. won't even
    // bother laying it out here, really. a function calls itself
    // until it's done calling itself. it's a super useful way to
    // program, especially in actual functional languages.
    // es6 makes recursion a lot nicer. we can get rid of the
    // if statement in the below function in es6 because we won't
    // end with a 'RangeError: Maximum call stack size exceeded
    // or whatever.
    let countDown = num => {
      if (num === 0) {
        return
      }
      console.log(num)
      countDown(num - 1)
    }

    //
    // Promises
    //
    function loadStuff(url, cb){
      let img = new Image()
      img.onload = () => {
        cb(null, img)
      }
      img.onerror = () => {
        let msg = 'failed loading ' + url
        cb(new Error(msg))
      }
      img.src = url
    }
    export default loadStuff
    // with
    import loadStuff from './loadStuff'
    let addThing = src => {
      let el = document.createElement('img')
      el.src = src
      document.body.appendChild(el)
    }
    loadStuff('/thing/to/load.png', (err, img) => {
      if (err) {
        throw err
      }
      addThing(img.src)
      loadStuff('/thing/two.png', (err, newImg) => {
        if (err) {
          throw err
        }
        addThing(img.src)
        // etc
      })
    })
    // vs
    function loadThing(url){
      return new Promise((resolve, reject) => {
        let img = new image()
        img.onload = () => {
          resolve(image)
        }
        img.onerror = () => {
          let msg = 'failed loading ' + url
          reject(new Error(msg))
        }
        img.src = url
      })
    }
    export default loadThing
    //with
    import loadThing from './loadThing'
    let addThing = src => {
      let el = document.createElement('img')
      el.src = src
      document.body.appendChild(el)
    }
    Promise.all([
      loadThing('/path/one.png')
    , loadThing('/path/two.png')
    // , etc
    ]).then(images => {
      images.forEach(img => addThing(img.src))
    }).catch(err => {
      throw err
    })

