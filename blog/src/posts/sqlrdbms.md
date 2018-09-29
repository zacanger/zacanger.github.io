---
title: 'SQL/RDBMS'
created: 2016-01-28
tags:
  - db
  - rdbms
  - sql
  - sqlite
---

* It makes sense that document stores (like Mongo) are a lot faster for reads--everything is stored all in one place. Here's your object with your stuff. Tables mean doing joins, which is slower. But goddamn, there's so much more flexibility and power there. And also potential to screw up your queries, of course. But unlike Mongo, you _can_ do this. That's why populate kind of sucks.
* _One query_. Number one rule for decent DB performance.
* UML is great here. I mean, it's worth actually [learning UMl (the actual language)](http://www.uml.org/) because without knowing this stuff, you have to keep gigantic graphs by hand (by point-and-click), which is exhausting and not okay.
* Transactions. Transactions are kind of, super simplified, a series of actions that you want to execute as one single operation. If it fails, it just simply goes back to its previous state. The idea here is that your data is never getting screwed up. Modern DBs also have niceties like preventing multiple concurrent writes to the same data.
* So... let's learn some basic queries!

--------

### Queries

These will be in SQLite, specifically.

    SELECT * FROM foo_bar
    SELECT quux,baz FROM foo_bar
    /* find this thing in that table */
    SELECT * FROM what WHERE things = 'stuff'
    /* WHERE is a simple conditional */


* There are normal operators (`< > = <>` etc).
* When defining schemas you have to define types. When doing queries, you can _use_ those types.
* The `AND` word chains conditions in queries. Syntax is `SELECT foo FROM bar WHERE quux = 'baz' AND jargon > 3`
* The `OR` is the same concept.
* `IN` kind of a shorthand way of doing a bunch of chained `OR`s. `WHERE things IN ('foo', 'bar')`, or `NOT IN ('quux', 'baz')`
* `DISTINCT` is the first thing on this list that doesn't come after the `WHERE` clause.
  - `SELECT DISTINCT column FROM table`
  - `SELECT DISTINCT column FROM table WHERE condition <> 'thing'`
* Queries are _not_ case-sensitive, but it is definitely good practice to capitalise them.
* `ORDER BY` would be `SELECT * FROM foo ORDER BY id desc` for example. Simple sort.
* KnexJS allows a SQL-like interface from Node to SQL.
* Bookshelf allows for Javascript-like queries to SQL from Node (and is built on top of Knex).
* `LIMIT` the amount in a page. There's also `SKIP`.
* `COUNT(4)` or `COUNT(*) FROM foo WHERE bar`
* `SUM(num_people) FROM group`
* `SELECT AVG(num_people) FROM group`
* `MAX` and `MIN` are largest and smallest from that thing you're querying.
* `GROUP BY` splits table based on the values of the rows.
  - `SELECT COUNT(*) things FROM bar_table GROUP BY foo_column`
* Nested queries are putting a query inside a query. Basically you query something, and then query what that returns.
  - `SELECT * FROM foo_table WHERE foo_column = (SELECT MIN(num_people) FROM foo_table)`
* `NULL` for empty values
*  Dates are format `YYYY-MM-DD`
* Aliases: `AS`, as in `SELECT f.thing, b.thing FROM foo AS f`
* Column aliases work the same way: `SELECT thing.stuff AS asdf`
* `LIKE` has two characters: `%` represents zero, one, or multiple characters; `_` represents one character.
  - `LIKE "SUPER _"` would be "SUPER 1", "SUPER A", etc, whereas `LIKE "SUPER%"` would be "SUPERASDF", "SUPER FOO BAR QUUX BAZ", "SUPER" on its own, etc.
  - `LIKE` is _not_ case sensitive (the actual query).
* `CASE` goes `CASE WHEN foo = whatever THEN value WHEN bar = whatever THEN stuff... ELSE thing_for_else END`
* `SUBSTR(column_name, index, number_of_chars)`. Character number is optional; if not included, it returns the whole rest of the string. (In other versions of SQL, `RIGHT` can do this.)
* `COALESCE` takes a list of columns, returns value of the first column that is not `null`. `SELECT foo, COALESCE(bar, quux) as baz FROM asdfghjkl`


#### Joins

This is a big deal, so it gets its own subsection.

* Joins are the big performance issue. Things take a long time to find, when they're in multiple tables. (_This isn't from the lecture, but I'd place 5 joins as a limit for my own usage, and even that is getting pretty gross...._)
* `INNER JOIN ... ON`
* `table_name.column_name`
* `SELECT table.column, table_two.column_thing FROM table_two JOIN table ON table.column = table_two.column_two`
* `INNER JOIN` is the default join. There are many ways to join, though.
* Mutiple joins... are a pain. Basically `SELECT ..., ... FROM ... INNER JOIN ... ON ... = ... INNER JOIN ... ON ... = ...`
* `WHERE` clauses in joins can be like `ON ... = ... WHERE ... <> ... AND .... <> ...`
* A `LEFT JOIN` will return `null` values, too.

Aaaandd... my brain kinda hurts. That's enough of that. Here are a couple of resources for learning the basics of relational databases:
* [SQL Teaching](https://www.sqlteaching.com/)
* [Stanford's Free Online Mini-Courses](https://lagunita.stanford.edu/courses/DB/2014/SelfPaced/about)
