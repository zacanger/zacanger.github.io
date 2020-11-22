---
title: bash builtins
created: 2016-01-21
tags:
  - bash
  - shell
  - sh
  - unix
  - linux
  - disaster-recovery
---

Let's say that in some hypothetical horrible world, we have a system with no
utilities, except the shell we're using, which happens to be GNU Bash. Maybe
we were dumb and did something like `rm -rf --no-preserve-root /`, I don't
know. Here's how we can get some basic programs back, just by using Bash
builtins.

`type` still exists!

We need an `ls`. So, `echo 'ls() { printf '%s\n' ${1:+${1%/}/}*; }' >> foo.sh`

`source foo.sh`

Here's a rough `cat`: `(while read line; do echo "$line"; done) < stuff.txt`

`executable () { if [[ ( ! -d $1 ) &&  ( ! -h $1 ) && -x $1 ]] ; then echo "$1"; fi }`

To find executables: `for file in /*; do executable $file; done`.

Wanna just lock ourselves out for real?
`echo 1 > /proc/sys/kernel/sysrq` `echo "b" > /proc/sysrq-trigger`.

http://eusebeia.dyndns.org/bashcp go here, if we really must rescue a system
and have no other options.
