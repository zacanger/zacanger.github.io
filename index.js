#!/usr/bin/env node

const
  express = require('express')
, port    = process.env.PORT || 4000
, app     = express()

app
.use(express.static(__dirname + '/blog/fin'))
.use((req, res) => res.sendFile(__dirname + '/blog/404/index.html'))
.listen(port, () => console.log(`blog on ${port}`))

