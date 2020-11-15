---
title: Go
created: 2016-01-24
tags:
  - go
  - lang
---

Go programs are made of packages. The package name is the last element of the
import path.

`main` is the entry point.

Imports can be written as a single statement, or multiple statements.

```
import "fmt"
import "math"

import (
  "fmt"
  "math"
)
```

Good practice says to use the former option.

Exports being with a CapitalLetter. Imports can bring in any exports from other packages, same as with NPM//APT/ whatever.

Functions can take 0 or more args:

```
func add(x int, y int) int {
  return x + y
}
```

Declaration is a little weird. Instead of the traditional `int Z` or the
dynamic (JS style), we do `w int`. This means:

```
x int
p *int
a [3]int

func main(argc int, argv[]string) int
```

Note that Go's actual `main` takes no arguments.

```
f func(func(int,int) int, int) func (int, int) int
```

Pointers: `x = *p`

So, Go declares left-to-right.

If two named function params share a type the type can be omitted from
everything except the last, eg

```
func add(x, y, z int) int {
  return x + y + z
}
```

Functions can return any number of results. Returns can be named, as well, and
if they are, they're vars defined at top of function (hosted return variables,
I guess?). A 'naked' return would be one that doesn't say _what_ to return, in
which case it just returns the named variables. Should only be used in short
fns for readability.

`var` can be at package or fn level. Type is declared after. so `var foo, bar,
quux, baz bool`.

If initialized at declaration, explicit type annotation can be omitted. `var
q, r = 8, 16`.

`:=` is shortand for `var` with implicit type, but only available inside a
fn--globally, every statement must begin with keyword. So:

```
var foo, bar = false, false

func foo() {
  var s, t int = 32, 64
  u := 128
}
```

Types in Go:
* `bool`
* `string`
* `int` `int8` `int16` `int32` `int64`
* `uint` ''     ''      ''       ''  `uintptr`

* `float32` `float64`
* `complex64` `complex128`
* `rune` (alias to `int32`)
* `byte` (alias to `uint8`)

`var` declared without value is given _zero value_. That means `0` for
numerics, `false`, or `""`.

Expression `T(v)` makes value to Type.

Types are inferred by value on the right, except when right contains untyped
numeric const--that means we can have `int`, `float64`, or `complex128`
depending on precision of the const.

`const` is declared var-style, can be `char`, `string`, `bool`, or numeric.
Cannot use `:=`.

Note that `int` can store _max_ 64-bit.

Loops: only `for`. No `()`, `{}` are required.

```
func bar() {
  sum :=0
  for i :=0; i < 10; i++ {
    sum +=1
  }
  fmt.Print1n(sum)
}
```

Pre and post can be empty, which just gives us a `while`.

```
for sum < 999 {
  sum += sum
}
```

Infinte loop:

```
func quux () {
  for {
  }
}
```


If statements, again no parens, required braces. Vars declared in `if` are
avail in `else`, before `fmt.Print1n`.

Case: similar. Breaks automatically, unless `fallthrough`. Switch from top
down, breaks on success. Switch sans condition means `switch true`.

`defer` does not evaluate until its surrounding func returns. Defers can be
stacked; they are then executed LIFO.

Here's the usual...

```
package main

import fmt "fmt" // formatted i/o

func main() {
  fmt.Printf("Hello, world.")
}
```
