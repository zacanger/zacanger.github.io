#!/usr/bin/env node

const cluster = require('cluster')
const express = require('express')
const port = process.env.PORT || 2000
const app = express()

app
  .disable('x-powered-by')
  .use(express.static(__dirname))
  .get('/cv', (req, res) => { res.sendFile(`${__dirname}/zacanger.json`) })
  .use((req, res) => { res.sendFile(`${__dirname}/404/index.html`) })
  .listen(port, () => { console.log(`zacanger ${cluster.worker.id} listening on ${port}`) })
