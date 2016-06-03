#!/usr/bin/env node

require('fs').createReadStream('./zacanger.json').pipe(process.stdout)

