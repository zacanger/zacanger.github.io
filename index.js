#!/usr/bin/env node

const
  express = require('express')
, port    = process.env.PORT || 4000
, app     = express()

app
.use(express.static(__ dirname + '/public'))
.use((req, res) => res.sendfile(__dirname + '/public/404/index.html'))
.listen(port, () => console.log(`blog on ${port}`))

