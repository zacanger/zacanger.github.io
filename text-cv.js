const { readFileSync } = require('fs')
const { resolve } = require('path')
const cv = readFileSync(resolve(__dirname, 'cv.md'), 'utf8')

module.exports = () => cv
