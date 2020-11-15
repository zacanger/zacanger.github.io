---
title: Node Notes
created: 2016-02-03
tags:
  - node
  - notes
---

I really enjoy node. This is all pretty disorganized. It's also all one giant
code block, since I took the 'notes' bit in comments. The repos mentioned are
[here](https://github.com/zacanger/node-misc) and
[here](https://github.com/zacanger/examples). Yay.

--------

    // killing a process
    var psTree = require('ps-tree')
    var kill   = function(pid, signal, callback){
      signal   = signal   || 'SIGKILL'
      callback = callback || function(){}
      var killTree = true
      if(killTree){
        psTree(pid, function(err, children){
          [pid].concat(
            children.map(function(p){
              return p.PID
            })
          ).forEach(function(tpid){
            try{process.kill(tpid, signal)}
            catch(ex){}
          })
          callback()
        })
      } else {
        try{process.kill(pid, signal)}
        catch(ex){}
        callback()
      }
    }
    // with `kill(child.pid)` somewhere else in code
    // OR
    var dead = process.argv[2]
    exec('pkill ' + dead, function(err, stdout, stderr){
      if(stdout){console.log('stdout: ' + stdout)}
      if(stderr){console.log('stderr: ' + stderr)}
      if(err){throe err}
    }
    // one could also just use the standard resume and pause...
    process.stdin.resume() // to start
    process.stdin.pause()  // to stop
    // and here's a cleanup example
    // catches ctrl+c, cleans up, then does its thing
    process.stdin.resume() // so program doesn't close instantly
    if(options.cleanup){console.log('clean')}
    if(err){console.log(err.stack)}
    if(options.exit){process.exit()}
    // and then...
    process.on('exit', exitHandler.bind(null,{cleanup:true})) // do something while closing
    process.on('SIGINT', exitHandler.bind(null,{exit:true}))  // catch ctrl+c
    process.on('uncaughtException', exitHandler.bind(null,{exit:true}))
    // and another way of doing this
    // we should put this in its own script, i suppose
    function noOp(){}
    exports.Cleanup = function Cleanup(callback){
      callback = callback || noOp // attach user cb to emitter
      process.on('cleanup', callback) // if no cb, will still ctrl+C

      process.on('exit',  function(){
        process.emit('cleanup') // app-specific cleaning before exit
      })
      process.on('SIGINT', function(){
        console.log('ctrl+c') // catch ctrl+c, exit normally
        process.exit(2)
      })
      process.on('uncaughtException', function(e){
        console.log('uncaught exception')
        console.log(e.stack)
        process.exit(99)
      })
    }
    // note that node does _not_ allow a listener on SIGKILL. we use the above script like so:
    var cleanup = require('./cleanup').Cleanup(myCleanup) // loads, registers
    // var cleanup = require('./cleanup').cleanup() // noOp
    function myCleanup(){
      console.log('cleanup up')
    } // all code following this is just for demo purposes
    process.stdin.resume()
    function error(){
      console.log('error')
      var x = require('')
    } // these are each different ways to test this:
    //  setTimeout(error, 4444)
    //  setTimeout(function(){process.exit(3)}, 4444)
    //  try ctrl+c


    ///////////////////
    // Timers in Node//
    ///////////////////

    setTimeout(functionToCall, msToWait)
    // works in node and browsers
    // invoke the fn N milliseconds later
    // clearTimeout() can be called to cancel it
    // 4ms 'clamping', meaning 0 actually equals 4ms
    clearTimeout(timeoutID)
    // browsers and node
    setInterval(function, intervalMs)
    // browsers and node
    // calls function repeatedly
    // use setTimeout if function could take too long to complete
    // and would overlap next interval
    clearInterval(intervalID)
    // same idea as clearTimeout
    process.nextTick(function)
    // node only
    // up to 1000 of them (can config with process.maxTickDepth) will
    // all happen in a row before any I/O
    // misusing nextTick can _kill_ performance
    setImmediate
    // node
    // definitely the better practice!
    // if you need to use node v0.8, process.nextTick will be an
    // okay substitution, though.
    // no window, so it can be called directly
    // schedules function to be invoked after rest of js in the
    // current tick runs, but before doing any I/O
    // so setImmediate runs, then lets I/O run, then goes to the next
    // queued setImmidate
    clearImmediate
    // node
    // same as clearInterval and clearTimeout

    /////////////////
    // NPM SCRIPTS //
    /////////////////

    // npm-run (`npm run foo`) can actually be used directly to run any binary
    // in node_modules/bin, by name.
    // npm's scripts section (in the package.json) passes to sh, so we can use
    // ||, &&, &, |, etc.
    // NPM can also just straight up execute your shell scripts, so you can do
    // something like `scripts:{"foo":"./scripts/bar.sh"}`, and that's totally
    // valid.
    // Preinstall and postinstall scripts are super useful. And you can even use
    // scripts from the interwebs this way, by just putting your command in there:
    // "webscript":"curl http://somesite.com/somescript.js | node"
    // as it happens, most scripts fields in the package.json support a 'pre' and
    // 'post' field. publish, install, uninstall, version, test, start, stop, and
    // restart all support pre and post hooks by default. it's easy enough to
    // define a new script, and then define new pre-and post-scripts for that.
    // just doing `npm run` on its own will actually list out all the available
    // scripts.
    ////////////////////
    // NODE PROCESSES //
    ////////////////////

    var exec = require('child-process').exec
    exec('node -v', function(error, stdout, stderr){
      console.log('stdout: ' + stdout)
      console.log('stderr: ' + stderr)
      if(error){console.log('exec error ' + error)
      } // so,  this is good for a short process
    }) // but since it doesn't return until exit, not good for streams
    // this one logs immediately:
    var exec  = require('child-process').exec
      , child = exec('node ./foo.js')
    child.stdout.on('data', function(data){
      console.log('stdout: ' + data)
    })
    child.stderr.on('data' function(data){
      console.log('stdout: ' + data)
    })
    child.on('close', function(code){
      console.log('code: ' + code)
    })
    // spawn is a little different. it launches a new process and should be used
    // for longer-running communication with what we're running. the methods are
    // fairly similar.
    child_process.exec(command, [options], callback)
    child_process.spawn(command, [args], [options])
    // killing processes on meecro$haft is a little different than in the real world
    // they have a `taskkill`, though, so we can do something like the following:
    var isWindows = /^win/.test(process.platform)
    if(!isWin){kill(proccessing.pid)
    } else {
      var cp = require('child_process')
      cp.exec('taskkill /PID' + processing.pid + ' /T /F', function(error, stdout, stderr){
        // etc. the /T is to terminate all subprocesses; the /F is to forcefully terminate.
      })
    }
    // there's also child_process.fork, which creates new _node_ processes

    /////////////
    // NODE-FS //
    /////////////
    // var fs = require('fs')
    // fs.writeFile(filename, data, [encoding], [cb])
    var fs = require('fs')
    fs.writeFile('howdy.md', 'asdfLOTS OF TEXT HERE!', function(err){
      if(err) return console.log(err)
      console.log('YEUPPP!')
    })
    // every query requires a callback.
    // we use fs.read to read files, and fs.write to write to them
    // before reading or writing, first we need to open a file.
    fs.open('/path/to/file', 'a', function(error, fd){
      if(error){
        throw error
      }
      var readBuf = new Buffer(1024)
        , bufOffs = 0
        , bufLeng = readBuf.length
        , filePos = 0
        , writBuf = new Buffer(512)
        , wbufLen = writBuf.length
        , filPos2 = null
        , bufPos = 0
      fs.read(fd, readBuf, bufOffs, bufLeng, filePos, function(error, readBytes){
          if(error){
            throw error
          }
          console.log('read', readBytes)
          console.log(readBuf.slice(0, readBytes))
        })
        fs.write(fd, writBuf, bufPos, wbufLen, filPos2, function(error, written){
          if(error){
            throw error
          }
          console.log('wrote', written)
        })
    })
    // see my examples repository for a lot more involving node-fs

    /////////////
    // BUFFERS //
    /////////////
    // buffers are instances of the Buffer class, which handles raw binary data
    // (because JS is great with regular old unicode strings, but binary strings?
    // that's a mess.)
    // Buffers correspond to raw allocated memory. They're kind of like arrays of
    // integers, but not resizable, and with binary-specific methods. Every 'integer'
    // represents a byte, so is limited to 0-255 (inclusive).
    var buf = new Buffer(8) // uninitialized, with 8 bytes
    var buf = new Buffer([2, 9, 4, 8]) // initialized to contents of array
    // (each being integers representing bytes)
    var buf = new Buffer('Stringy string, what up?', 'utf-8') // initialized,
    // to binary encoding of first string _as specified by second argument_ (utf-8, here)
    // node buffers support ascii, utf-8, binary (don't do this!), base64, and
    // ucs2 (2-byte, little endian)
    var buf = new Buffer(16)
    buf.write('howdy', 'utf-8') // will return '5,' for 5 bytes written
    // a third argument can be passed, for the index where we should _start_ writing
    buf.write(', what up?', 5, 'utf-8')
    buf.toString('utf-8') // also returns unwritten bytes
    buf.toString('utf-8', 0, 10) // returns only the ten we've writen so far!
    buf[12] = buf[10] // setting individual bytes
    buf[14] = '1'.charCodeAt()
    buf.isBuffer(object) // checks to see if object is a buffer
    buf.byteLength(string, encoding) // checks number of bytes required to encode string
    buf.length // returns length of buf, total (_not_ written)
    buf.copy(target, targetStart=0, sourceStart=0, sourceEnd=buf.length) // we copy
    // what's in one buffer to another. target buffer is first arg, rest are just to
    // copy only a specific section of the source, into a specific section of the target
    // an example of this:
    var foo = new Buffer(30)
      , bar = new Buffer('quux', 'utf-8')
    foo.write('baz', 'utf-8')
    bar.copy(foo, 10)
    foo.toString('utf-8', 0, 20) // 'baz/\u0000\u0000�Uquux\u0000\u0000�U�\u0001'
    // slicing is similar to arrays, except it's _not_ a new buffer, just references a
    // specific section of the memory space.
    var asdf = foo.slice(2, 6)
    asdf.toString() // 'z�\u001'
    asdf.write('ghjkl')
    foo.toString('utf-8', 1, 18) // 'aghjk\u0000\u0000�Uquux\u0000\u0000�U'

    /////////////
    // STREAMS //
    /////////////
    // streams let you process data as its generated/received
    // they can be readable, writeable, or both
    // they handle data events, instead of dealing with data from a callback
    // readables emit the event `data` for every incoming data chunk and the
    // `end` when there's no more data. writeables can be written to with `write()`
    // and closed with `end()`. all types emit `error` on error. see the examples
    // repo (cp.js) for a good (very basic) example of streams.
    // fs.createReadStream() opens a new readable. see read-stream-server.js in
    // the examples repo for a decent demonstration.
    // fs.createWriteStream() opens a new writeable. see write-stream-server.js
    // in the examples repo for a demo.
    // stream.pipe is used to take a readable stream and hook it up to a writeable
    // one. it basically works like 'pipe' in unix/any other context.
    // check the examples repo, node-stream-pipe.js for a very basic example.
    // don't forget to listen for `exit` when you're spawning a child process!
    // otherwise your stuff just hangs there.
    // stream.pipe is also good for working with file stream. check the repo,
    // node-file-streams-pipe.js (it'll look super familiar, i bet). this one
    // will take anything you put in (to stdin), and on exit (`ctrl-c`), you should
    // check out `wrote.md` in that same directory!
    // stream.pipe is pretty important for HTTP req/res objects, too. check
    // node-streams-proxy.js in the examples repo to see how this works.
    // the module `oppressor` is really swell for our basic compression needs.
    var http  = require('http')
      , fs    = require('fs')
      , opres = require('oppressor')
      , port  = 8000
    var server = http.createServer(function(req, res){
      var stream = fs.createReadStream(__dirname + '/index.html')
      stream.pipe(opres(req)).pipe(res)
    })
    server.listen(port)
    // and now we have shiz compressed for browsers that support gzip and deflate!
    // (that's, like, all of them, unless you're still using IE, and if you are,
    // please go away, please.)
    var offset = 0
    process.stdin.on('readable', function(){
      var buf = process.stdin.read()
      if(!buf)return
      for(;offset<buf.length;offset++){
        if(buf[offset] === 0x0a){
          console.dir(buf.slice(0, offset).toString())
          buf = buf.slice(offset + 1)
          offset = 0
          process.stdin.unshift(buf)
          return
        }
       }
       process.stdin.unshift(buf)
    })
    // here we've made a tiny lil parser that splits @ `\n`
    // note that this 100% already exists as a module, but
    // this is just an example, ya ken?
    // 'classic' streams are node pre-merger streams.
    // when there's a `data` listener, it switches to 'classic' mode
    // and works the way it did in that old API (check node 0.12 docs, maybe?).
