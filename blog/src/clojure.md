---
title: clojure
created: 2016-06-01
tags:
  - clj
---

just a few clojure notes

i don't know if any of this is vastly different from cljs? i'd think not,
because really you're just talking about a different target (jvm vs js vm),
rite? but who knows. i mean, normally you wouldn't talk about clojure and
clojurescript with two different names if they were the exact same language
and the only actual difference was the target vm.

i'd look this up but i'm on a plane. so.

some notes!

everything, i believe, takes the format of `(action thingsTo actOn)` which is
called a form.

```clojure
(def varname varval)
(def me "zac")
```

but there's also the `let` keyword which is different. for functions?

```clojure
(let [myname "zac"]
  (println myname))
```

oh wait is it `def` or `defn`? crud now i'm seeing `defn`.

```clojure
(defn functionName
  [arguments moreArgs] ;; comment
  returnValue)         ;; the above could be just [] if no args

;; so maybe

(defn multiplier
  [a b]
  (* a b))

(multiplier 4 4)

(defn fnName
  ([ifThisPatternIsMatched] returnThis)
  ([elseIfThisOne sureWhyNot] returnThisInstead))

(defn fooBar
  ([a] a)
  ([a b] (* a b))
  ([a b c] (/ (* a b) c))
  ([a b c d] (* (/ a b) c d)))

;; so [] are args, () are forms, {} are keys or something?
;; no, keys are with :, so {} are just... i don't know, yet.

;; and a private function just has a - after it, i think? like
(defn- thisIsNotPublic
  [] ;; and other stuff -- are in-line comments a thing?
  )
```

Testing with lein (what is lein, exactly? I think it's a package manager?):

```clojure
(ns project.namespace-test
  (:require [clojure.text :refer :all]
            [project.namespace :refer :all]))

;; deftest defines a test fn
;; testing for description for it
;; is -- assertion

(deftest nameOfTest
  (testing "this is what i'm testing"
    (is (true)))) ;; i don't know if this is valid
```

okay so leiningen is 'automation made easy'

pkg mgmt, testing, pm, etc.?

`lein new app <appname>`

that will layout a whole project directory for you, damn.

lein searches maven and clojars for packages, with `lein search <packagename>`.

update `:dependencies` in `project.clj` (which i think is like a meta file
package.json-y kinda thing) and do a `lein deps` to install that stuff.

* `lein run`
* `lein test`
* `lein repl`
* `lein install`
* `lein uberjar` -- this packages up the whole rpoject (as a jar, i guess?)

zipper is a thing that does things but i don't really have the
attention span to read this right now.

did i mention i was on a plane? i wasn't _really_ on a plane. i'm in an airport.
for a lot of hours. it's a long story. sort of. it's actually a relatively short
story, but it's kind of boring. so whatever.

there are transducers, which are _not_ like a `map` or `functor` or whatever.

these are composable transforms

did i mention that i'm in an airport? all night, i'll be here.
meant to be home by now. in bed. sleeping. having seen the people i really miss,
hugs all around, had a beer, unpacked, showered maybe, gone to bed.
i'll be home, instead, by maybe noon-ish tomorrow possibly, having missed
another day of work, sweaty and gross, eurgh.

on the other hand i met some nice people stuck in this zombie airport, so.
