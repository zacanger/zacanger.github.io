#!/bin/sh

./node_modules/postcss-cli-simple/bin/postcss \
  --use --autoprefixer --autoprefixer.browsers "> 5%" \
  --use cssnano --no-cssnano.discardUnused \
  -o assets/styles.min.css assets/styles.css
