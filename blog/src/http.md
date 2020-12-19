---
title: http
created: 2016-06-01
tags:
  - http
---

http: k-v store of urls and resources

representations: dictionaries of actual resources

eh?

example: url: foo.bar/video with:
representations: various formats and sizes of said video

methods: possible to define custom

get, put, and delete are really obvious

patch: like put, but for small changes

head: get, but for just meta about the resource

options: what all can i even do with this thing?
(useful for... cors, i guess)

post: kind of a catch-all for whatever else you want to do rly
it's not actually intended to be used as the C in CRUD

i may be rethinking my position on url parameters vs queries

remembering, from [my docs](http://mdkb.zacanger.com/urls):

[URLs](http://www.ietf.org/rfc/rfc2396.txt) are made up of (usually just some) of these parts:
`<scheme>://<username>:<password>@<host>:<port>/<path>;<parameters>?<query>#<fragment>`.

* The scheme is the _protocol_ (http, https, ftp, git, etc.). It ends with `:` (not `//`).
* The username and password are fairly self-explanitory, and we don't see that a whole whole lot these days, except
  maybe in FTP.
* The host is the part we all know well, like 'github' or 'google.' It can be a domain name or an IP address.
* The port (80 for HTTP, 443 for HTTPS, etc.) is self-explanitory; defaults to 80.
* The path would be segments (like `/doc/search` or whatever), and can contain semicolons to separate parameters (like `thing=foo;stuff=bar`).
* Queries can be before or after parameters, and that'd be something like `/?q=foo+bar`.
* Fragments are for specific parts of a resource, like `somepage.html#somesection`.
* `; / ? : @ & = + $ ,` are reserved characters (meaning they have special uses in URLs).
* `- _ . ! ~ * ' ( )` are unreserved (you can use them almost wherever you'd like).
* `{ } | \ ^ [ ] \` ` are unwise to use in URLs (note that this includes the backslash and backtick/grave, which may not render in Markdown code blocks, depending on parser).
* `< > # % "` don't use these, at all (except the `%` and `#` _if_ you have a valid reason for it, because they do special things in URLs).

--------

* content headers from client to specify what it can be (accept)
* content headers from server to specify what it is (content-type)

cache-control, last-modified, and etag to control caching

client will check if-modified-since and if-none-match

accept-encoding (with gzip or compress) yay

on server, max-age and etag ; send 304 if if-no-match matches etag
