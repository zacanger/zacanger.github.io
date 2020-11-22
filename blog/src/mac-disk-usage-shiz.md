---
title: mac disk usage shiz
created: 2016-02-17
tags:
  - mac
  - apple
---

i don't have a mac. so. whatever. but here's how to find out
where all your disk space went, if you do have a mac.

* to find large files from the mac os x finder:
    * command-h to go home
    * command-f to find
    * in the 'find' options:
        * 'kind', set to 'other' (anything not 'media' or 'apps,' i think)
        * 'file size', set to 'greater than', (set amount and unit)
            * maybe try 10 GB, work down from there? (5 GB, 1 GB, 500 MB, etc.)

* commands you can enter in the terminal:
    * `du -h . | grep ^[5-9][0-9][0-9.]M`
        * # will list all directories by total size of contents, if larger than 500mb
    * `du -h . | grep [0-9][0-9]G`
        * # same thing, but will only find directories over 10GB
    * `du -h . | sort -nr`
        * # shows all directories from current, sorted by size (smallest to largest);
        * better in smaller-ish directories (du's already kinda slow, and sort is even slower)
    * `find . -maxdepth 1 -mindepth 1 -type d  -exec du -hs {} \;`
        * # shows all directories, ordered by name, with size of directory printed next to it

* some graphical os x programs to visualise disk usage:
    * [most commonly recommended treemap-style disk-usage visualising tool](http://downloads.sourceforge.net/project/grandperspectiv/grandperspective/1.5.1/GrandPerspective-1_5_1.dmg?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fgrandperspectiv%2Ffiles%2Fgrandperspective%2F1.5.1%2F&ts=1454688889&use_mirror=superb-dca2)
    * [shows files ordered by desc. size, allows deletion (use caution!)](https://www.omnigroup.com/download/latest/OmniDiskSweeper)
    * [free, highly recommended, cross-platform, web version--but requires java](http://www.jgoodies.com/download/jdiskreport/jdiskreport-1_4_1-mac.zip)
    * [simpler interface, treemaps-style, hasn't been updated in a while, might not run on newer os x](http://www.derlien.com/download.php?file=dix1.0universal)
    * [must-have tool on windows, cleans out cache, duplicate files, empty dirs, etc., seems there's a mac version](http://download.piriform.com/mac/CCMacSetup111.dmg)
    * [another treesize type of viewer, paid, but with a free demo](http://www.spacegremlinapp.com/mac/SpaceGremlinPro2.0.3.zip)
    * [this company's apps are all commercial](https://nektony.com/downloads)
        * they have a suite (disk analyzer/scanner, uninstaller, duplicate finder, hidden file viewer, etc.)
        * [and they have a free trial](https://nektony.com/download/mac-cleanup-suite/mac-cleanup-suite.dmg)
