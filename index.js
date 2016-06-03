#!/usr/bin/env node

'use strict'

const
  express = require('express')
, port    = process.env.PORT || 2000
, app     = express()

app
.use(express.static(__dirname))
.use((req, res) => res.sendFile(__dirname + '/404/index.html'))
.listen(port, () => console.log(`zacanger listening on ${port}`))

