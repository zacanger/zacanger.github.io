---
title: Github Organizations
created: 2016-01-19
tags:
  - git
  - github
---

And general notes on working with other humans.

* `git push -u origin branchName` (push new branch--short for `--set-upstream`)
* `git pull origin master`, no matter what branch you're in, will pull and merge master into your current branch. so, do `git pull <remote name> <branch name>`
* `git stash` to push changes to temp thing before pulling, then `git stash pop` to throw those back over after you pull, so it's basically a kind of automerge. Then you can go ahead and do your merge in depth.
* Make sure your master and remote master are in sync. Keep master merged into your feature branches at least once a day.
    * Checkout master, pull that, switch to feature branch, merge that. To merge your feature branch in, be on master, then `git merge feature-branch`.

I guess not really a whole lot of notes. Oh well.
