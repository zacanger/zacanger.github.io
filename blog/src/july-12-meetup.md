---
title: meetup notes i guess
created: 2016-07-12
tags:
  - fp
  - meetup
  - notes
---

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
