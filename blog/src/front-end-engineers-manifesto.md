---
title: "Front-end Engineer's Manifesto"
created: 2016-01-28
tags:
  - design
  - front-end
  - manifesto
  - list
  - js
  - css
---

A somewhat modified version of the document found [here](http://f2em.com).

* **USERS** are the most important part of what I do.
    * The users' needs come first.
    * What I want, as a developer, is much less vital.
* Progressive enhancement is the most important phrase I know.
    * WIthout JS, without Webkit, without even CSS, what I build will still function.
* Simplicity is respect.
    * Unnecessary complexity, whether in code or in design, should always be fought.
    * Simple interfaces mean minimal mental overhead.
    * Complicated interactions and designs are taxing.
* Choices matter; I will help the people I can influence make good ones.
    * Web browsers are not all created equal.
    * Software that does not implement web standards, or which is not responsive to the advancement of the web, should be recommended against.
    * The choice of browser is especially important on mobile devices, where Safari will result in broken websites.
* I believe in the openness of the web.
    * Flash should be fought, tooth and nail.
    * Proprietary formats should never enter my work.
    * Device-independent content first.
* Performance is critical.
    * I understand that HTTP requests mean latency, and latency means frustrated and lost users.
    * I understand that my hardware is not representative of the real world, and will be mindful of limited hardware and low bandwith.
* I will never stop educating myself.
    * I will learn from the root, rather than beginning with abstractions: Javascript before jQuery, CSS before Sass, et cetera.
    * I will better myself not just in code and maths, but also in art, music, design, research, and the study of usability.
    * I understand that I cannot learn everything, and will be mindful of what I do not know.
* I believe that Free and Open Source code and software are the future of the web.
    * When considering file formats and media codecs, open is always better.
* I will never underestimate the importance of accessibility.
    * Users who may have trouble differentiating colours or difficulty reading small fonts are not _all_ of accessibility.
    * Users who prefer to use the keyboard, or print content, or browse on limited devices, matter too.
* I will contribute.
    * Giving back to the community, in the form of bugfixes, workarounds, polyfills, snippets, raised issues, documentation, and any other form is imperative.
    * This is how the web grows. This is how the development community grows.
* I accept responsibility for `view-source:`
    * I will use future-safe code.
    * I will always prefer feature detection over user-agent sniffing.
* My code is portable.
    * Overzealous CSS specificity and the polution of the global Javascript namespace will be avoided.
    * I will be mindful of browser quirks.
* I will choose the right tool for the job.
    * Whether a choice between large frameworks, or small libraries, or languages, or even preprocessors, I will educate myself.
    * I will learn from the mistakes others have made to help me make the right choice for my project.
* I will create applications with security in mind.
    * My code will be properly escaped to help prevent XSS and CSRF.
    * I will not store sensitive information in cookies.
        * I will avoid cookies unless there are no alternatives.
    * I will use HTTPS wherever appropriate.
    * I will be responsive in correcting any issues that may harm the users of my code.
