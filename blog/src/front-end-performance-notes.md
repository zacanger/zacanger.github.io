---
title: Front-End Performance Notes
created: 2015-12-28
tags:
  - performance
  - front-end
  - js
  - browser
  - css
---

Performance matters. That's just a thing. I really don't care all that much
about the browser-side stuff, personally, and I'm a wee bit sick of a lot of the
client-side frameworks that have most of the market, because they mean you
really _have_ to care about using a lot of JS in the browser... because that's
where you're doing most of the work.  Things like Angular really show off this
kind of horrible way of building apps. Putting all the work in every person's
browser sure makes a lot of sense if you've got one tiny SPA and you're serving
it from a home netbook or whatever...  but come on, people. Stop hurting users.
Be realistic. It's not even about doing what's probably actually the _right_
thing to do... it can, if you want, just be about the dollar. Users don't want
to wait. No one wants to wait. Sending out a whole bunch of scripts to a
three-year-old knockoff tablet from China that's running on DSL out in the
country and then figuring that user is okay with waiting while their device
slowly loads it all in and slooowly runs the scripts and then finally starts
showing them the goddamn site they're trying to see... that's how you lose
people.  There are truckloads of studies out there about the negative impact of
every millisecond, so I won't keep rambling, and will start getting down to some
note-taking and summarizing.... Oh, right. I'm reading through [this little
guide](https://browserdiet.com), right now, so that's what sparked this. I know
I've read it before, but I'm really hardcore procrastinating learning Redux
right now, so I figured I'd do something else. This is actually in my school
notes directory, but it may end up as a blog post. Certainly sounds like it. Who
knows?

--------

The sort of traditional-ish 'best practice' thing to do is to never use inline
styles/scripts (`<div style="stuff:things;" onClick="doThis">`), though there
are use cases for it. For sites with just a very small amount of styles/scripts,
you could embed (`<style>` and `<script>` tags). But all-around it's best to
keep everything separated out, at least when you're working. Build tools can
always inline things later for you, if you need this.  Do keep in mind that
latency is _far_ more important that size, so if you can lower the amount of
requests you're making in any way, fucking do it.

Styles in the `<head>`, traditionally scripts down at the bottom of the body,
although if you're doing all of your rendering in the client, firstly, shame on
you, but also, stick your scripts up top, because otherwise no one will see
_anything_ until your JS is all loaded. We usually throw CSS up top because
designers would hate to for anyone to see the site without their
painstakingly-chosen font pairings, even just for a flash. Use `async` in your
script tags (`<script async src="./foo.js"`), when you can (keep in mind that
they'll all be executed in no particular order, so if using `async` you can't
rely on dependency chains--which you shouldn't be doing anyway).

Minify everything. That's just a given. Also a given, but I'll say it here
anyway: _*don't try to minify your goddamn markup_*. Yes, people do that. Yes,
it can be done, a little bit. It's not worth the trouble. It barely works.  It
frequently just _doesn't_ work. So give up on that. Markup renders super fuckin'
fast. HTML isn't slowing down your page; the two-dozen requests and the
browser-side routing are slowing down your page. Along with
minification/uglification(/obfuscation), obviously you'll want to bundle. Again,
build tools make this really easy.

On that note, don't use `@import url('bar.css');` in production code. Browsers
can download `<style>` tags in in parallel, but not `@import`s (and only so many
tags in in parallel, which is why you should bundle). Build tools, build tools,
build tools.

For third-party code, _load asynchronously_. Or use iframes like your
grandfather, I don't care. Or you could do something like this:

```javascript
(function(){
  var script,
      scripts = document.getElementsByTagName('script')[0]
  function load(url){
    script = document.createElement('script')
    script.async = true
    script.src = url
    scripts.parentNode.insertBefore(script, scripts)
  }
  load('//example.url/quux.js')
  load('//another.one/baz.js')
}())
```

if you want. Or you could just not be all about them external scripts. Totally up to you.

Oh, and on that note, if you're using jQuery (which you are, admit it, you
goon), do _try_ to get the latest one.  They do actually keep that updated and
worked on and are usually actually optimizing it and making it better. Though
you should keep in mind that there _are_ some breaking changes (especially right
now, what with jQuery 1.x still in use in a lot of places, the 2.1.x being super
common, and 3.0.0-alpha currently out--though they did a **great** job of
breaking as little as they possibly could, that's for sure).

If legacy browsers (read: Safari, IEanything, Mozilla pre-mid-30s) are a
concern, optimize your loops (modern browsers do this automatically). One big
help would be to store the size of arrays, so the JS engine doesn't have to
recalculate this every time it runs through the loop. Here's how that'd be done:

```javascript
var i, len,
    arr = new Array(42)
for (i = 0, len = arr.length; i &lt; len; i++){
  // do stuff
}
```

This would also help in a situation where, inside your loop, you're working with
a `NodeList`. It just helps to have a limit set before your for loop, so you
don't wind up doing an infinite loop, for example appending something that
you're maybe also using as the constraint for your loop, or whatever.

`document.write` is really not even worth mentioning, but I will mention it
anyway. Don't do it. Just don't. It's bad.  It's not the worst thing you could
ever do in Javascript, but it's also definitely not a good thing to do.
Especially don't ever do it inside (or after) a `window.onload`, unless you want
everything on your page replaced.

Repaints: avoid, if you can. That's a non-layout style change (like a colour,
for example). Reflows: avoid even more.  That'd be a layout change (like the
height or width of an element). If you need to change these things, collect all
the data you'll be using _before_ changing anything, that way you can do it all
at once and the browser can just go ahead and re-render it all _once_.

The DOM is the devil. Okay, no, not really, and even if it was, we'd still have
to mess with it, because we're dealing with Javascript, here, and we're
specifically talking about front-end performance, so...

Really, though, as we did in the example near the top (the array thing), try to
store (cache? whatever, pick a word, I don't care...) the bit you're acting on,
so you don't need to query the DOM constantly (if you're doing something a lot,
I mean). `for (var i = 0; i &lt; 100;
i++){document.getElementById("thingy")blahblahblah}` is not really okay at all;
`var stuff = document.getElementById("thingy"); for (var i = 0; i &lt; 100;
i++){stuff += things or whatever}` is a good sight better, don'tcha think?
Javascript isn't a slow language. If it was slow, I probably wouldn't like it
all that much, and as it happens, I'm starting to grow fond of it. The _DOM_ is
slow. There's so much going on up in there, all the time, a truly _insane_
amount of stuff that most people never even have to think about. So think about
that for a minute next time you go to mess with the DOM. It's gonna go all
old-lady-crossing-the-road on yo ass.

Ugh, jQuery. I know, shut up, okay. I use it too. Kinda have to. Everything
depends on it. Like, every framework, basically. And also the stability of the
earth's rotation. And life, and probably death, too. Okay. So when you're using
it (which is right now, I bet), using `$("#thing")` is gonna be faster than
using classes or elements (or shit like `children()`). Of course, that means
you're doing things with IDs, which means maybe causing specificity issues down
the road in your CSS, but screw it, there's always `!important`, or total
refactoring. (I jest. Using IDs is faster, and the specificity issue won't _be_
an issue unless you make it one.)

On the topics of jQuery and loops (which is the topic that we're on now, by the
way), `jQuery.each` is slow.  `for...in` is slower. Reverse for and while loops
are actually faster(est? fasterest?), but because they're super-duper
annoying-as-BALLS, don't use them.

And don't be afraid to just use regular old Javascript for things that you might
usually grab jQuery to handle. As it happens, you can do a _lot_ of things in
vanilla JS these days, without needing to reach for the `$()`. Just know what
tools you should be using, I guess; don't stick with with a tool out of habit
long after there's any need for it, but don't be afraid of using that tool if
nothing else will do the job as efficiently, all around. That's said a lot,
especially in our industry ('Use the right tool for the job'), but definitely
still isn't said enough.

Optimize how you handle images. That doesn't just mean shrinking your photos
down to size--there are other things you can do to speed up image loading. CSS
sprites are kind of obnoxious to work with, but if you have a lot of small items
(say, icons, or toolbar buttons, or something), you'll save yourself a
double-handful or more HTTP requests right there. Another option would be data
URIs. Again, annoying as crap, and you wouldn't want to handle any large images
this way, but for small items you can just do something like `.little-tiny-img {
background-image:
url('data:image/png;base64,reallylongassstringofrandomalphanumericcharacters')}`
and save yourself a request there.

As for your actual images, you're definitely best off using (can you guess what
I'm going to say?) a _build tool_.  Or just any tool, really. This isn't
something it's at all reasonable to do manually, so find a tool you like that
will remove the metadata, embedded thumbnails, etc., and then figure out if you
want to compress your image as well; that'll bring down the actual image
quality, but as it happens, most screens don't display images at an insanely
high resolution anyway.

That's just about it, I think. Requests matter a lot, probably more than file
size, unless your files are huge. If your files are huge, make them not huge.
Vanilla JS is usually faster than jQuery, but definitely not always.  Messing
with the DOM is slow, especially if you're doing so manually (or with jQuery).
There are good reasons for libraries and frameworks like React, Vue, Riot, and
Mithril. Don't be wary of using a solution, if it's the right solution for the
problem. Don't go looking for a problem, just because you have a solution.

Learn a build tool. Learn more than one. Webpack and Browserify are fantastic
tools for front-end development. Gulp is definitely where you should be, on the
back end (in my personal, sometimes humble opinion). Grunt is a pain, and is
kind of unfashionable these days anyway.

Test things. If there are bottlenecks, find them and fix them. Here are some
links for website performance testing tools:

* <http://www.webpagetest.org/>
* <https://developers.google.com/speed/pagespeed/insights/>
* <http://httparchive.org/>
* <http://yslow.org/>

That's all. Okay. Done.

Go away now.

Byeeee.
