---
title: package.json is just fine
created: 2023-07-02
tags:
  - javascript
  - npm
---

Quick response to [this nonsense](https://frantic.im/javascript-gom-jabbar/),
section by section, because it's highly upvoted on Hacker News and is a load of
bullshit.

Semver is good, actually, and if you never hit v1, that's a you problem. Not
even really a problem, just a thing that is.

The `browser` field in package.json was never really heavily used. I've never in
8 years of working in the Node ecosystem actually seen it in the wild. And if
you did try to require a Node builtin in your browser bundle, chances are your
bundler fixed that for you.

Sure you've got `type: module`. This is because the language spec didn't have
modules originally. No we all just use `type: module`, mostly, unless you have
old packages you haven't bothered to update (like me). You don't have to care
about it. Set it in your init options and don't worry about it. And it's not a
big deal to use ESM in CJS (`require('foo').default`) or vice versa (it
literally just works).

Your npm scripts are a mess? Again, that's a you problem. Stop jumping between
package managers and just use npm. If you have more than, maybe, 10 scripts, you
probably need to rethink how you're testing and building.

You're still using watchman. Again, guess what, that's a you problem. If you
don't ever bother dealing with tech debt, you don't deserve to whine about you
have tech debt. Gulp is actually still around, but I haven't seen anyone using
it in a few years.

You're using a bunch of deps, some of which are obsolete (`str.padStart`
exists). Guess what? _That's a you problem._ Who's the person who ran `npm i
every damn package they saw in a tutorial` and never bothered to clean things up
later on? Use `npm-check-updates` to keep your deps current, use `grep -r
package-name .` to see if you're actually using a module, and once in a while
actually deal with your tech debt.

If you don't want to see donation messages, change your log level. If you don't
want to see deprecation notices, update your packages and deal with your tech
debt. Simple as.

If you choose libraries based on opinions you saw on Twitter, you're in for a
bad time. Moment is fine, though not really actively maintained. There are
others that are also fine. Lots of libs are bloated and full of bad code. Just
pick something that works, is popular, and is active.

Again, use `ncu`. Update to the top of the current semver major range, then walk
through updating each one until you're current. It might take a couple of hours,
but after that you can just do it routinely, once every sprint or whatever. It's
really not that big of a deal. Call me when you have to deal with an emergency
kernel update across hundreds of servers that potentially degrades IO perf.
Wimp.

What the hell is `resolutions`? That's not a thing. You're making that up. (Oh,
I see it's a yarn thing. Don't use yarn, just use the standard, that's your
problem.)

`devDependencies` are so you don't have to ship shit to your package's users. Do
you need Webpack or Babel or your personal crappy ESLint config to head over to
someone installing your package? You do not. If you don't know what devDeps are
for, go read the docs.

If your lint config is so strict that you can't work effectively, change it. If
you have so many errors that it's a distraction, maybe try fixing some of them?
Invest time in taking care of this shit so you have a nice codebase. Why are you
whining about it when they're your rules to begin with?

If you have PostCSS explicitly installed but it's a peerDep, let it be a
peerDep, that's how it works these days. Also there's no native extension in
PostCSS or its deps. You might be thinking of an old SASS package from years
ago.

It takes about 4 lines of config and one extra package to get Jest working with
TS. Easy stuff. But if you don't like that, good news, you can pick from one of
hundreds of other test runners. Personally I'm a big fan of `node-tap`.

If you have multiple tools that serve the same purpose, again, that's your
problem. Delete them. You don't need esbuild and swc and TypeScript and Babel.
If you're writing TS, just use TS. Don't use Rollup and Webpack on the same
codebase, just pick one. Terser is a minifier, usually a plugin for an actual
build tool, so now you're just being silly.

Of course `engines` lists Node. The purpose of `engines` is really to tell
consumers of your package their requirements. Node 10? Node 16? That actually
does matter, and it's a programmatic way of explaining requirements.

Final note: your package.json is in a weird order. `npx sortpack` to fix that.
