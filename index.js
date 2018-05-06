#!/usr/bin/env node

const cluster = require('boring-cluster')
cluster('server.js', { name: 'dotcom' })
