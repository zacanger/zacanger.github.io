---
title: Crawling from the Front End
created: 2016-01-24
tags:
  - crawling
  - frontend
  - web-crawler
---

The steps are pretty simple. We're going to use Yahoo's API.

* First, create an array to store visited links: `var visitedLinks = []`.
* Now, define a seed URL and root domain: `var link = http://some.url, rootDomain = some.url`.
* Now we need a recursive function that takes in the link.
* In the function, define a URL to request from Yahoo, to get all the internal links on that page.
    * The Yahoo Query Language looks like this: `SELECT * FROM html WHERE url = '" + encodeURI(link) + "' AND xpath=\"//a[not(contains(@href,'" + rootDomain + "'))][contains(@href,'http')]\""`
* This returns JSON, which contains an array of objects under data=>query=>results=>a, with each object containing a key of `href` and a value of a link.
* We need to loop through this, check if the link is in the `visitedLinks` array, move on if true, and add it to the array otherwise. Then we call the function again and use the new link as the parameter.
* To limit this, we can do something like `if(vistedLInks <= 10000){ourFunction(newLink)}else{console.log('done!')}`
