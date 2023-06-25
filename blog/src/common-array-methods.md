---
title: Common JS Array Methods Cheatsheet
created: 2023-06-25
tags:
  - javascript
---

Cheatcheet for common JS array methods, because this is a super common category of
questions on StackOverflow and I'm sick of typing it up in a comment, so now I
can just copy-paste it.

* filter: I have an array and want to have a smaller or equal array including
    the same elements, based on a predicate
* map: I have an array and want to have a same-length array of the same or
    different elements, based on a transformation
* find: I have an array and want to find the first matching element based on a
    predicate
* findIndex: like find, but I want the index, not the element itself
* forEach: I want to potentially do something for every element, but I'm not
    expecting any returned array
* reduce: I have an array and want to have something, in the end, based on that
    data. Could be an array, or a string, or an object, or whatever, doesn't
    matter. Can be used to implement just about any other array method, if you
    really wanted to.

There are many others, but these are the most common IME. Hopefully this shows
up in the first few SERP so these type of questions gradually die out.
