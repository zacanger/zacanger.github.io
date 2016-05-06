#!/usr/bin/env node

const
  express = require('express')
, port    = process.env.PORT || 4000
, app     = express()

app
.use(express.static(__dirname + '/fin'))
.use((req, res) => res.sendFile(__dirname + '/404/index.html'))
.listen(port, () => console.log(`blog on ${port}`))

