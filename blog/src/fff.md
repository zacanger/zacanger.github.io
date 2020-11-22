---
title: More Notes Taken While Watching MPJ's Videos
created: 2016-06-05
tags:
  - js
  - fp
---

Classes, actually faster than factory functions, by ~twice.
But... who cares, when you're talking about a thousandth of a millisecond?

Better programmers means better software means better solutions for bigger
problems.

Dear Zac: Please start writing tests. Thanks! Love, Zac.

'The Overjustification Effect' ... side projects are valuable in multiple
ways. (I think everyone knew this.)

Clojure: in parens, operator and operands. Example: (doThings toThis andThis
andThis andThis).

APPARENTLY I know 90% of Clojure, now. Cool. Can someone please explain to me
why cljs has brackets and braces, then? Like... wat?

* Five steps to understanding a new code base:
    * Find a mentor who really understands that code base and is willing and able to take the
      time to talk to you about it.
    * Get an overview of the codebase from said mentor, on style, frameworks, libs, architecture,
      etc. for all of it, then go study all those things _apart_ from the current code so you
      know how they're all supposed to work. Also find out the history of the code.
    * Complete a task. A tiny feature or bugfix or something.
    * Don't get stuck. If you're not getting anything done for more than like a half hour or
      whatever and you can't figure it out, _ask that mentor_.
    * Code review, review, review code, code, code review.

### FUNCTORS

I don't really know what a functor is but apparently map and filter are
functors.

Functors are objects that have a map-type method. Not the method itself.

A JS array is a functor. Same with promises (from libraries, not the spec!)
and streams.
