#!/usr/bin/env bash

./node_modules/.bin/alex src || true

./node_modules/.bin/mdspell "**/*.md"

