---
title: void elements in html
created: 2016-02-08
tags:
  - html
---

you know what _really_ gets on my nerves? people who close tags that don't get
closed, in html.

i mean, html in general just kinda gets on my nerves, because, let's be
honest, xml is ugly, and it's mostly just writing a crapload of the same stuff
over and over again. we should be past that, by now.

but seeing a tag with a closing slash (or, worse, a closing tag) when it can't
be closed, that really just irks me.

these are the elements that don't get closed. if you look at the list, you'll
see why that is.

* area
* base
* br
* col
* embed
* hr
* img
* input
* keygen
* link
* menuitem
* meta
* param
* source
* track
* wbr

see what they all have in common?

you can't possibly have anything in any of them, like, between tags. what can
you put between an opening and closing line break tag? **nothing**. so why
would you need a closing tag?  **you wouldn't**. so don't close it. none of
that `<img src="img.jpg"></img>` bs. No `<br />`. and please, please, never do
something just weird like `<link rel="stylesheet" type="text/css"
href="styles.css" />`.

not only is there no need for it, it's actually just straight-up wrong.

k?
