---
title: shell things
created: 2016-01-24
tags:
  - sh
  - bash
  - shell
  - sed
  - vi
  - vim
---

Just some tidbits.

Renaming all files in `cwd` to have a certain extension:

```
for i in *; do
  mv $i $i.ext
done
```

Or with sed: `find . -name "file" | sed 's/.*/mv & &.ext/' | sh`

Or in vi: something like `ls -a file* > a`, then `vi a`, and the command
`:%s/.*/mv & &.ext/`, then `ZZ` and `sh a`. (It's the same as the sed command
above, just in vi, basically).

--------

Doing the same thing, but with files of a certain extension:

```
for i in *.txt; do
  x=`basename $i .old`
  mv $i $x.ext
done
```

Or with sed: `find . -name "*.old" | sed 's/\(.*\.\)\(.*\)mv & \1ext/' | sh`.

Or in vi: `ls -a file* > a`; `vi a`; `:%s/\.old$/\.ext/`; `sh a`.

--------

`:!./%` runs your current file from vi.

--------

This little script is pretty nice. It's a much shorter version of something I
modified from soem blog somewhere (check my dotfiles for the full thing, which
I called
[writescripts](https://github.com/zacanger/z/blob/master/bin/sh/writescripts)):

```
if [ ! -f $1 ]; then
  echo "#!/usr/bin/env bash" > $1
fi

while [ 1 ]; do
  $EDITOR $1
  chmod 755 $1
  ./$1
  read dummy
done
```

`paste` is _really_ useful, and you should learn it.

that's all, for now, i think.
