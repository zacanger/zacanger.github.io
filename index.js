#!/usr/bin/env node

'use strict'

const
  express = require('express')
, port    = process.env.PORT || 2000
, dns     = require('dns')
, app     = express()

app
.use(express.static(__dirname))
.get('/cv', (req, res) => res.sendFile(`${__dirname}/zacanger.json`))
.use((req, res) => res.sendFile(`${__dirname}/404/index.html`))
.listen(port, () => console.log(`zacanger listening on ${port}`))
