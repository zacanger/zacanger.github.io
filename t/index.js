#!/usr/bin/env node

const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const { writeFile } = require('fs')
const getData = img => img.replace(/^data:image\/\w+;base64,/, '')
const getRandomString = () => Math.random().toString(36).substring(8)
const getBuf = d => Buffer.from(d, 'base64')
const writeImg = b => writeFile(`${getRandomString()}.png`, b)

// get img from post on go button click
// img -> writeImg(getBuf(getData(img))) -> tweet
app
.disable('x-powered-by')
.use(express.static(__dirname))
.listen(port, () => console.log(`t listening on ${port}`))
