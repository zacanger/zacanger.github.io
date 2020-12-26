---
title: Portable Environments With Bash
created: 2020-12-25
tags:
  - bash
---

I recently switched from `st` to `xterm` on my Linux machines, and I also have a
Mac and a Windows machine with WSL. `st` and Terminal.app allow for copy-pasting
using fairly intuitive keyboard shortcuts, but I didn't know what the equivalent
was for `xterm`. Fortunately, it doesn't matter, because I have bash aliases
that do what I need to do. The nice thing about having well-developed config
files ("dotfiles") is that you may not even need to learn all the new shortcuts
and clicking options for new software, you can just use what you already have.
In the case of copying and pasting, here's what's in [my
dotfiles](https://github.com/zacanger/dotfiles):

```shell
if [[ $(uname) == 'Darwin' ]]; then
  alias co='pbcopy'
  alias pa='pbpaste'
  alias clc='echo -n | co'
else
  alias co='xclip -selection clipboard'
  alias pa='xclip -selection clipboard -o'
  alias clc='echo -n | co && echo -n | xclip -selection primary'
fi
```

Usage is something like this:

```shell
# copy some text. let's say you're trying to use youtube-dl to
# download a video, and you put the youtube URL on your clipboard
youtube-dl $(pa)

# to put something on the clipboard, just pipe it through:
echo foo | co
```

I thought this was handy enough to share, particularly from the standpoint of a
philosophy for working with your computers: you could spend lots of time reading
the manpages for each new app you run into, or you could handle enough of the
edge-cases to get by in your own config and never have to worry about it.

Happy holidays!
