---
title: editor design notes
created: 2016-06-13
tags:
  - editor
---

ages ago, like multiple months ago, i really wanted to make an editor that was
better these are a bunch of notes i took on that topic there's a crapton more
in the notes taken while working with the group on
[pharaoh](http://pharaoh.js.org), but those can wait for osme other time.

now, i'm perfectly 100% satisfied with what i get out of a
[well-configured](https://github.com/zacanger/z.git)
[neovim](https://neovim.io).

--------

## editor idea

* libraries, etc: in local storage
* POST to back end
* offline: save to local, queue, push when back online
* do while loop: cash saves, settimeout, push to backend periodically
* alert for unsaved files on exit
* codefolding and tabs.
    * VS Code STILL doesn't have these basics. Wow.
* autosaves, but saves are git commits?
    * easy reversion. integrate with dropbox/gdrive/whatever to keep commits distributed but private.

### Things any programming editor-cum-environment should do
#### (including some really obvious ones, but i just want to make it all clear)

* allow navigation of projects
* enable editing of source code
* detect syntax of languages (through extension is okay)
* integrate with compiler(s)/interpreter(s), CI, REPL(s) (depending on language specificity of the editor)
* allow for community collaborative effort to build/maintain language & feature support
* integrate with modern development tools/environments (browsers, source control, deployment, etc)
* allow for non-code (text, hints, live previews, etc) !!
* allow for collaboration _within_ editor (realtime remote connection) !!
* interpret code as it is typed; show results locally !!
* abstract _above_ just a normal directory tree for navigation/code organization !!

!! -- almost certainly only through extensibility (packages/plugins), and even then these are pretty far-out goals,
technologically. the last two are especially difficult, even conceptually, and would need a lot of HCI design research
before even prototyping.

### notes from brett victor's talks and such
* Information Design two big rules: Show the data, and show comparisons.
* Larry Tesler: personal vendetta against modes in software. 'Don\'t mode me in.'
* He's the reason we have straight-up WYSIWYG editing and stuff.
* His editor was called 'Gypsy.' Click and drag? That's him.
* Cut, copy, and paste: that's him.
* That's funny, kinda, because the best software is still moded.
* This is curious, because to everyone else at the time, modes were just a way of life
  with computing. This wasn't a problem to anyone else, just to him.

## on version control and ot and eve in general
* Recording changes as they happen is easier than inferring them after the fact.
* Preserving history (the context in which a change was made) is necessary for proper merges.
* Being predictable is more important than being smart.
* Partial edits, merge conflicts, etc. prevent only that current view/component/whatever from running,
  rather than the whole thing.

## Links

* [Git-backed editor](https://github.com/jdleesmiller/jotgit) build on Meteor, in Coffeescript.
* Some bits relating to editor design:
    * [bret victor's 'inventing on principle'](https://vimeo.com/36579366)
    * [(and his followup to it, so people would stop misinterpreting in)](http://worrydream.com/LearnableProgramming/)
    * [an empirical study of imperative programming assignments](http://dl.acm.org/citation.cfm?id=2677279)
* Some things about LightTable:
    * [discussion about writing plugins](https://groups.google.com/forum/#!topic/light-table-discussion/T3DhzWhabok)
    * [plugin template](https://github.com/mdhaney/lt-plugin-template)
    * [clojurescript tutorial for lighttable users](https://github.com/swannodette/lt-cljs-tutorial)
    * [basics of hacking on lighttable](http://product.reverb.com/2014/05/10/getting-started-programming-light-table/)
    * [basic walkthrough of plugin build](https://github.com/LightTable/Declassifier)
    * [using node in lighttable](https://github.com/LightTable/LightTable/wiki/Creating-an-LT-Client-using-LTs'-bundled-Node)
* Eve links:
    * [Auckland layout editor for constraint-based UI](http://www.cse.yorku.ca/~wolfgang/papers/layoutALE.pdf)
    * [BloomUnit: Declarative Testing for Distributed Programs](http://db.cs.berkeley.edu/papers/dbtest12-bloom.pdf)
    * [BOOM Analytics: Exploring Data-Centric, Declarative Programming for the Cloud](http://db.cs.berkeley.edu/papers/eurosys10-boom.pdf)
    * [Compiling Mockups to Flexible UI](https://4d75d27f-a-62cb3a1a-s-sites.googlegroups.com/site/sinhnish/documents/fluidLayouts.pdf?attachauth=ANoY7crdYgssu75ccg3Gc6sSDm-dxh2rWHL5jLVh7LkNKtUgFpv2GDqK8AVzr1IJ53Dg6eM5StLasOQk-SDN4KWaCi-phlQK30GSum-hbWOzT5VVSiNRJ7U3F_FJ8pBMndIjR60O9bYSSzxu1TJmR6kX4dlEuCL16pituZTrEFj7BNnX-SRU3JajEKY4f9s_mYqR3uTF4GW5Jm2EkHgpEUfSZtCrUJOZVPO4NGg7nc59490937x_VW4%3D&attredirects=0)
    * [Constraint Solvers for User Interface Layout](http://arxiv.org/pdf/1401.1031v1.pdf)
    * [Database Queries that Explain their Work](http://arxiv.org/pdf/1408.1675.pdf)
    * [Dedalus: Datalog in Time and Space](http://db.cs.berkeley.edu/papers/datalog2011-dedalus.pdf)
    * [Edelweiss: Automatic Storage Reclamation for Distributed Programming](http://db.cs.berkeley.edu/papers/vldb14-edelweiss.pdf)
    * [Evita Raced: Metacompilation for Declarative Networks](http://p2.berkeley.intel-research.net/papers/EvitaRacedVLDB2008.pdf)
    * [Improves Novice Programmers Learning](http://faculty.washington.edu/ajko/papers/Lee2011Gidget.pdf)
    * [Lightweight Modular Staging and Embedded Compilers: Abstraction Without Regret for High-Level High-Performance Programming](http://infoscience.epfl.ch/record/180642/files/EPFL_TH5456.pdf)
    * [Lightweight Modular Staging and Embedded Compilers: Abstraction Without Regret for High-Level High-Performance Programming](http://lampwww.epfl.ch/~rompf/thesis_120716.pdf)
    * [Logic and Lattices for Distributed Programming](http://www.neilconway.org/docs/socc2012_bloom_lattices.pdf)
    * [OctopusDB: Towards a One Size Fits All Database Architecture](https://infosys.uni-saarland.de/publications/DJ11.pdf)
    * [OLTP Through the Looking Glass](http://db.cs.berkeley.edu/cs286/papers/lookingglass-sigmod2008.pdf)
    * [Opis: Reliable Distributed Systems in OCaml](http://icwww.epfl.ch/~kuncak/papers/DagandETAL08Opis.pdf)
    * [Why Not Questions about Program Behavior](http://repository.cmu.edu/cgi/viewcontent.cgi?article=1165&context=hcii)
