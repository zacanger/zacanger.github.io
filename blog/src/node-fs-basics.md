---
title: node fs basics
created: 2016-02-12
tags:
  - node
  - fs
  - js
  - notes
---

this is another one that'll be presented just as a giant code block.

    // using files in node
    var fs = require('fs')
    var buf = new Buffer(1024)

    // reading asynchronously
    fs.readFile('foo.md', function(err, data){
      if(err){
        return console.error(err)
      }
      console.log('async read: ' + data.toString())
    })
    // and synchronously
    var data = fs.readFileSync('foo.md')
    console.log('sync read: ' + data.toString())
    console.log('#############\n')

    // opening
    // fs.open(path, flags[, mode], cb)
    // flags can be r (r), r (rw), rs (r synchronously), rs+ (rw, sync),
    // w (write), wx (fails if file exists), w+ (rw, creates file (or truncates existing)),
    // wx+ (fails if path exists), a (append), ax (fails if path exists),
    // a+ (file for read & append), ax+ (fails if path exists)
    console.log('opening file')
    fs.open('foo.md', 'r+', function(err, fd){
      if(err){
        return console.error(err)
      }
      console.log('opened')
    })

    // information about files
    // fs.stat(path, callback)
    // .isFile() returns true if file, .isDirectory returns true if dir,
    // isBlockDevice returns true if block device, isCharacterDevice...,
    // isSymbolicLink ..., isFifo, isSocket
    console.log('getting file info')
    fs.stat('foo.md', function(err, stats){
      if(err){
        return console.error(err)
      }
      console.log(stats)
      console.log('got yer file')
      console.log('symlink? ' +  stats.isSymbolicLink)
      console.log('char? ' + stats.isCharacterDevice)
    })

    // writing: fs.writeFile(filename, data[, options], cb)
    console.log('gonna write a file')
    fs.writeFile('bar.md', 'stuff!', function(err){
      if(err){return console.error(err)}
      console.log('written!')
      console.log('reading that now')
      fs.readFile('bar.md', function(err, data){
        if(err){return console.error(err)}
        console.log('async read: ' data.toString())
      })
    })

    // closing: fs.close(fd, callback)
    console.log('opening file')
    fs.open('bar.md', 'r+', function(err, fd){
      if(err){return console.error(err)}
      console.log('opened')
      console.log('reading it')
      fs.read(fd, buf, 0, buf.length, 0 function(err, bytes){
        if(err){console.log(err)}
        if(bytes > 0){console.log(buf.slice(0, bytes).toString())}
        fs.close(fd, function(err){
          if(err){console.log(err)
        }
        console.log('closed!')
        })
      })
    })

    // truncating: fs.ftruncate(fd, len, cb)
    // ... meh

    // deleting: fs.unlink(path, cb)
    console.log('gonna DELETE a file!')
    fs.unlink('bar.md', function(err){if(err){return console.error(err)}
    console.log('deleted!')})

    // mkdir: fs.mkdir(path[, mode], cb)
    fs.mkdir('./test', function(err){
      if(err){return console.error(err)}
      console.log('created a directory at \'test\'')
    })
    fs.mkdir('./asdf', function(err){
      if(err){return console.error(err)}
      console.log('created one called \'asdf\', too!')
    })
    // fs.readdir(path, cb)
    fs.readdir('./', function(err, files){
      if(err){return console.error(err)}
      files.forEach(function(file){
        console.log(file)
      })
    })

    // fs.rmdir(path, cb)
    fs.rmdir('./asdf', function(err){
      if(err){return console.error(err)}
      fs.readdir('./', function(err, files){
        if(err){return console.error(err)}
        files.forEach(function(file){
          console.log(file)
        })
      })
    })

    // there are a whole bunch of other methods, but i feel like this is good enough for now, yes?
