---
title: fixing parallels weirdness
created: 2016-05-22
tags:
  - mac
---

at work, parallels kept crashing. what led to this:
* took a system update on the mac from the app store
* after rebooting, went over to parallels, which runs windows 10
* that needed an update too apparently, so took that
* after rebooting the virtual windows, didn't think about it for a while
* went back to it, went to un-suspend or whatever you'd call it, and it crashed
* happened several times, tried force quitting, killing all related processes, rebooting the mac, no luck
* the fix on the kb was totally unrelated. running prd_client_app manually gave the following:

```
May 19 15:40:33  pdfm-bootstrap[84883] <Notice>: launcher[84847]: Start finished. Agents: 0; Service: 4
[zach:/Applications/Parallels Desktop.app/Contents/MacOS] 73 $
[zach:/Applications/Parallels Desktop.app/Contents/MacOS] 73 $ ././prl_client_app
objc[84919]: Class YRKSpinningProgressIndicator is implemented in both /Applications/Parallels Desktop.app/Contents/Frameworks/PDControlCenter.framework/Versions/A/PDControlCenter and /Applications/Parallels Desktop.app/Contents/Frameworks/libPrlGui.2.dylib. One of the two will be used. Which one is undefined.
objc[84919]: Class DeallocHook is implemented in both /Applications/Parallels Desktop.app/Contents/Frameworks/libPrlGui.2.dylib and /Applications/Parallels Desktop.app/Contents/MacOS/././prl_client_app. One of the two will be used. Which one is undefined.
objc[84919]: Class MethodInfo is implemented in both /Applications/Parallels Desktop.app/Contents/Frameworks/libPrlGui.2.dylib and /Applications/Parallels Desktop.app/Contents/MacOS/././prl_client_app. One of the two will be used. Which one is undefined.
objc[84919]: Class PreviewItem is implemented in both /Applications/Parallels Desktop.app/Contents/MacOS/././prl_client_app and /Applications/Parallels Desktop.app/Contents/Resources/libprl_shared_apps.dylib. One of the two will be used. Which one is undefined.
objc[84919]: Class QLResponder is implemented in both /Applications/Parallels Desktop.app/Contents/MacOS/././prl_client_app and /Applications/Parallels Desktop.app/Contents/Resources/libprl_shared_apps.dylib. One of the two will be used. Which one is undefined.
objc[84919]: Class SSBaseDelegate is implemented in both /Applications/Parallels Desktop.app/Contents/MacOS/././prl_client_app and /Applications/Parallels Desktop.app/Contents/Resources/libprl_shared_apps.dylib. One of the two will be used. Which one is undefined.
May 19 15:41:10  pdfm-bootstrap[84957] <Notice>: launcher[84948]: Is executed with params 'start'
May 19 15:41:10  pdfm-bootstrap[84969] <Info>: agent[84958]: Loading pids from /tmp/.pd/280366361/.prl_agents_pids
May 19 15:41:10  pdfm-bootstrap[84970] <Info>: agent[84958]: prl_event_tap already started with pid 84870 and alive
May 19 15:41:10  pdfm-bootstrap[84971] <Info>: agent[84958]: Starting prl_naptd...
May 19 15:41:10  pdfm-bootstrap[84977] <Warning>: agent[84958]: prl_naptd not started
error: failed to execute subprocess: -2
May 19 15:41:10  pdfm-bootstrap[84980] <Info>: agent[84958]: Dump pids to /tmp/.pd/280366361/.prl_agents_pids
May 19 15:41:10  pdfm-bootstrap[84981] <Notice>: launcher[84948]: Start finished. Agents: 0; Service: 4
```

most of that is probably irrelevant, apparently that class is implemented in both thingy
is gui related, found a lot of other stuff about that that had nothing to do with actually crashing.
anyway, the thing that actually ended up working was:

`sudo "/Applications/Parallels Desktop.app/Contents/MacOS/inittool" init -b "/Applications/Parallels Desktop.app"`

note: run that as sudo from your normal user, don't `sudo su` and then do it.

after that, i just opened parallels again and it worked. so. idk. no issues since.
if anyone else can't get anything to work, maybe that'll help.
