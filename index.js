#!/usr/bin/env node

'use strict'

const
  express = require('express')
, port    = process.env.PORT || 2000
, dns     = require('dns')
, app     = express()

const getIp = (req, res) => {
  let ip
  if (req.method === 'GET') {
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    dns.reverse(ip, handleResponse)
  } else {
    res.writeHeader(501)
    res.end()
  }
  function handleResponse(error, domains) {
    switch (req.headers.accept) {
      case 'application/json':
        const data = {'ip' : ip}
        if (!error && domains.length > 1){
          data.hostname = domains[0]
        }
        res.writeHead(200, {'content-type' : 'application/json'})
        res.write(JSON.stringify(data))
        res.end()
        break
      default:
        res.writeHead(200, {'content-type' : 'text/plain'})
        res.write(ip)
        res.end()
    }
  }
}

app
.use(express.static(__dirname))
.get('/cv', (req, res) => res.sendFile(`${__dirname}/zacanger.json`))
.get('/ip', getIp)
.use((req, res) => res.sendFile(`${__dirname}/404/index.html`))
.listen(port, () => console.log(`zacanger listening on ${port}`))
