---
title: void elements
published_at: 2016-08-09 13:58:00
author: zacanger
tags: html
---

i posted this a while back on [my old blog](http://zacanger.com/blog) but it's worth posting again.

obviously this doesn't apply when using jsx, because everything needs to be closed. but, in jsx, if
it _can_ be a self-closed tag (meaning literally any of these but also anything else that doesn't
have children), please self-close it.

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

you can't possibly have anything in any of them, like, between tags. what can you put between
an opening and closing line break tag? **nothing**. so why would you need a closing tag?  **you wouldn't**.
so don't close it. none of that `<img src="img.jpg"></img>` bs. No `<br />`. and please, please,
never do something just weird like `<link rel="stylesheet" type="text/css" href="styles.css" />`.
