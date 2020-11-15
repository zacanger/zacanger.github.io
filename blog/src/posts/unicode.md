---
title: Unicode
created: 2016-01-13
tags:
  - unicode
  - text
  - ascii
---

Unicode is not a 16-bit system. Unlike mapping letters to bits (`A => 0100
0001`, for example), with unicode, characters are mapped to a theoretical
concept called a **code point**. So it's an... ideal.

This 'code point' ideal is represented by the numbers we've already seen, like
`U+0639`, and such. The numbers are hexadecimal (base 16) (and the `U+` prefix
is for 'unicode').

So, early on in the life of unicode, the idea was to store those numbers in two
bytes each. But then there was some high-school level drama between the
high-endian clique and the low-endian gang, so now we have this `FF FE` or
whatever at the beginning--that's the Unicode
[BOM](https://en.wikipedia.org/wiki/Byte_order_mark).

But _then_, basically because Americans were still using the same restricted set
of the Latin alphabet, we came up with UTF-8. That kind of screwed everyone else
over, because now we have 0-127 all in one singe byte, and then 128 on up stored
in 2-6 bytes. So the characters we use every day in American English still look
the same as before (when we used ASCII), but now a whole bunch of other scripts
(and symbols) are kind of screwy, because it takes several bytes to use other
characters.
