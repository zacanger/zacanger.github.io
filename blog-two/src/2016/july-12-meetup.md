---
title: meet notes i guess
published_at: 2016-07-12 20:39:25
author: zacanger
tags: fp meetup notes
---

this is all i have

```javascript
const
  id    = a => a
, add   = (a, b) => a + b
, sub   = (a, b) => a - b
, mul   = (a, b) => a * b
, div   = (a, b) => a / b
, mol   = (a, b) => a % b
, idF   = () => a => a
, addF  = a => a => b => a + b
, cur   = fn => a => b => fn(a, b)
, rCur  = fn => b => a => fn(a, b)
```
