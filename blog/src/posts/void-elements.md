---
title: Void Elements
created: 2016-08-09
tags:
  - html
---

Obviously this doesn't apply when using jsx, because everything needs to be
closed. But, in jsx, if it _can_ be a self-closed tag (meaning literally any of
these but also anything else that doesn't have children), please self-close it.

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

See what they all have in common?

You can't possibly have anything in any of them, like, between tags. What can
you put between an opening and closing line break tag? **Nothing**. So why
would you need a closing tag? **You wouldn't**. So don't close it.
