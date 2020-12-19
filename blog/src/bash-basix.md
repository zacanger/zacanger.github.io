---
title: bash basix
created: 2016-05-16
tags:
  - sh
  - shell
  - bash
---

some sort of notes sort of taken as an aside during a lecture i gave on the
basics of shell usage

* debugging a bash script: use the `-x` flag
* semicolons divide commands that are on the same line
* newlines are much more readable
* bash variables: there are local, global, string, integer,
  constant, and array variables.
    * global = env variables.
    * local are available only in current shell.
    * also predefined vars, like id (try `echo $UID`).
    * capitalised by default. case-sensitive. local ones
    * are sometimes done in lowercase, though. can contain
    * integers, but can't _start_ with integers.
* to get started with everything: `man 1 intro`
* also `git help everyday`
