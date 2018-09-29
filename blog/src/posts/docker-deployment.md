---
title: deploying docker images
created: 2016-06-03
tags:
  - docker
---

# Deploying Docker Images

You can use Docker's repos. That's the easy way so I won't talk about it here.
There are loads of good docs out there on that, and anyway, it's built into the
tools. Instead this post deals with deployment of images that you can't publish
(like your company's code).

## The non-repo way

This way doesn't give you any of the nice features of having a repo, but it's
also much easier to deal with.

First export your (running) container. Do a `docker ps` to get its name or ID,
then `docker export <that-name> > foo.tar`.

Then you'll want to get it to your server (using `sftp` or whatever else works
for you). On the server, do a `cat foo.tar | docker import -`

Boom, it's there. You can run it the same way you would normally (like `docker
run -p 80:80 -d foo` or whatever).

## The your-own-repo way

This is a little more difficult, but you get to keep all the benefits of a
Docker repo without making stuff public.

Get your own repo with `docker run -p 5000:5000 samalba/docker-registry`.

Hurray, once that's done you'll have your own Docker registry running!

Do something like `docker login localhost:5000` and set up some login
credentials.

To push your stuff to it, first tag it with info, like `docker tag
mycompany/theirprivatecode localhost:5000/mycompany/theirprivatecode`.

Do use this repo, just use `docker push
localhost:5000/mycompany/theirprivatecode` instead of pushing to a public repo.

You'll want to do a `docker ps` and get the container ID for your local
registry, and commit that so you don't lose your stuff. Or you can use `-v` or
set up volumes.

You'll want to do a `docker ps` and get the container ID for your local
registry, and commit that so you don't lose your stuff. Or you can use `-v` or
set up volumes.

Okay, so probably you'll want to put that somewhere not-on-your-local-machine.
`ssh` into your server and do an `ssh -R 5000:localhost:5000 -l` to forwared
that port. Then to deploy forreal, just `docker pull
localhost:5000/mycompany/theirprivatecode`.

Then to run it you should be able to just `docker run
mycompany/theirprivatecode`.
