---
title: api design notes
created: 2016-05-14
tags:
  - api
  - design
---

think in terms of positives, not negatives

for example 'ishidden(true)' is confusing.
instead to 'isvisible'.

think about ng-show/hide ng-disabled what? this is confusing.

instead of this, think in terms of enabled/showing

this is both for myself (because i get confused) and for other people

evidently it's not always clear especially to non-native english speakers what
the hell is going on

example from ariya hidayat's blog: if you asked him if `A` equals `a` if
`caseInsensitive` is `false`, that'd take a minute of thinking to even
understand. instead, why not just `caseSensitive`?
