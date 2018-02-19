#!/usr/bin/env node

const cluster = require('boring-cluster')
const { resolve } = require('path')
cluster(resolve(__dirname, 'server.js'), { name: 'dotcom' })
