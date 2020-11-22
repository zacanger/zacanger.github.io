---
title: Monthly Webmaster Checks
created: 2016-01-19
tags:
  - webmaster
  - maintenance
---

This is a list of stuff to check regularly on any content-focused website,
intended for use by the (semi-)technical person who is maintaining the website
and assigned to "do something about it" for all the things that need reporting
and improving. If the tasks make you go cross-eyed with incomprehension, then
you can consider either how to learn more, or how to find someone to help you
out!

As the list is generic it doesn't describe how to perform the check, or what you
are looking for, and doesn't cover checks on more functional/interactive
websites like ecommerce.

The list includes a mixture of critical and merely "improvement-oriented" things
to look at: if you are not sure what is critical and what not, that's a good
question for your webmaster to work on!

--------

#### Main Checks

1. Check current tasks list (in your lists and in the shared task manager) and double check your email for specific items that are already pending tests or fixes from webmaster
2. Backups
    1. Run new backup if not recent from schedule
    2. Download recent auto backups; archive
    3. Snapshot files not covered by auto backups; archive
    4. Snapshot settings such as custom CSS, plugins list, redirects
1. Wordpress (etc CMS) updates
2. Check Google Webmaster Tools:
    1. ...for errors / alerts
    2. ...for recent crawl and sitemap
    3. ...for speed and mobile-friendly indications
    4. ...extract list of 404s
1. Run sitemap spider
    1. ...and save snapshot of pages
    2. ...note pages missing meta title and description, assign task
    3. ...extract list of errors
    4. ...extract list of external links and test
1. Work through error/404 list to find and correct link... add redirects
2. Run html validator on key pages
3. Google Analytics sweep:
    1. Check any alerts / intelligence events
    2. View reports based on agreed performance indicators such as bounce rate for sources of traffic, and variance of attentiveness for mobile visitors
    3. Any GA reports related to current ad campaigns
    4. Check and report custom segments and content groups which are being watched
    5. Note most popular devices and browsers; report if necessary
1. Perform Google site: search to see pages indexed are as expected
2. Run key URLs through Google Mobile Friendly test tool; note tasks as needed
3. Security plugin/tracking: check recent logs (e.g. logins, blocked logins, updates)
4. Check webmaster@ email if separate (or website feedback form)
5. Uptime tracking: review this period's uptime stats; report if necessary
6. Website informal browse test: click thru top pages in desktop and note any new visual tweak issues (to your eagle eye!)
7. Website page browse in (not normally used) browsers (esp IE and mobile) - also in incognito mode e.g. to test cookie warning
8. Speed:
    1. Perform Google pagespeed test and compare results to previous; assign tasks if not already on list
    2. Perform waterfall pageload speed test and compare results to previous
1. Further common issues to find, queue in task list:
    1. New not-well-compressed images
    2. New not-well-embedded video
    3. Adding missing alt tags on images
    4. Adding missing GA events on contact links such as phone and mailto
1. If not all ticked off, review list of main systems needing better password / 2FA
2. From current task lists, report back notes on things not yet done but 'next up'
3. Reminders to clients on current decision questions still open

#### Additional checks (if applicable to client/service)

* Website users/customer contact events
    * Check and if necessary report on GA events for ticket/enquiry, chat, mailto, phone clicks
    * Check chat and ticket/enquiry logs are as expected
* Report latest views on mobile usability
* Spider for https mixed content errors
* If not done by CMS, generate sitemap from files/pages list
* Analytics click / navigation views to watch for issues
* Analytics report data related to possible usability issues seen
* Reports from CDN (e.g. Cloudflare)
* Other analytics tools (e.g. click/mouse tracking tools)
* Other webmaster tools (e.g. Bing)
* Server logs
* Server/hosting panel messages and updates
* Error logs / dashboards from 3rd party systems such as email tickets, Google Apps
* Automated SEO/accessibility on-page-factors tool sweep and queue tasks
* Queue tasks for more involved stuff from pagespeed issues
* Repeat checks for staging site? -_-
