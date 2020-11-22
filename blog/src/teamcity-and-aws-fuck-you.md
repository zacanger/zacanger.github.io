---
title: crappy error messages
created: 2016-06-29
tags:
  - aws
  - teamcity
---

teamcity and aws have the worst error messages.

things that don't count as real error messages:

`Environment health has transitioned from Degraded to Warning. Command failed on 1 out of 2 instances. Configuration update in progress on 1 instance. 0 out of 2 instances completed (running for 9 minutes).` WHAT COMMAND?

`No agents connected after instance start. Please check the image has TeamCity agent configured and it can connect to the server using http://foo.bar address. Start the instance manually to check for agent again.` (What actually happened? Any errors? Network? Permissions? Anything? No?)

`Incompatible Runner: Command Line` (on a Debian instance. Fuck you.)
