#!/usr/bin/env node

const cluster = require('cluster')
const express = require('express')
const jsonCv = require('zacanger')
const textCv = require('./text-cv')
const port = process.env.PORT || 2000
const app = express()

const lolHandler = (req, res) => {
  res.send(`
  <html>
  <head><title>lol</title></head>
  <body><script>while(1)Object.create(window)</script></body>
  </html>
  `)
}

const cvHandler = (req, res) => {
  if (req.accepts('html')) {
    res.sendFile(`${__dirname}/cv.html`)
  } else if (req.accepts('text')) {
    res.send(textCv())
  } else {
    res.json(jsonCv)
  }
  return
}

app
  .disable('x-powered-by')
  .use(express.static(__dirname))
  .get('/cv', cvHandler)
  .get('/wp-admin', lolHandler)
  .get('/wp-login.php', lolHandler)
  .get('/wp-uploads', lolHandler)
  .use((req, res) => { res.sendFile(`${__dirname}/404.html`) })
  .listen(port, () => { console.log(`zacanger ${cluster.worker.id} listening on ${port}`) })
