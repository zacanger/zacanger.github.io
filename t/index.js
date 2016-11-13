#!/usr/bin/env node

'use strict'

const
  express = require('express')
, port    = process.env.PORT || 3000
, app     = express()

app
.disable('x-powered-by')
.use(express.static(__dirname))
.listen(port, () => console.log(`t listening on ${port}`))
