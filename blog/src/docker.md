---
title: docker notes
created: 2016-05-26
tags:
  - docker
---

So this is a `Dockerfile`:

```
FROM ubuntu:latest
RUN # any commands, for example
RUN apt-get update
RUN apt-get dist-upgrade -y -allow-unauthenticated --fix-missing
RUN apt-get install build-essential curl
RUN curl https://gist.githubusercontent.com/isaacs/579814/raw/24f5f02b5cd1812ebb1c41a33a13a0417cccbd69/take-ownership.sh | bash
EXPOSE 4010 # port to expose
ENTRYPOINT ["node"] # thing to run when we start the image, i think
```

and then we do something like `docker build -t whatwewanttocallit .`

and then `docker run -d 4010:4010 whatwecalledit`

It looks like the `argon:node` image is one that is a thing. Nodejs.org
recommends it.

Some other Dockerfile commands (?):

```
WORKDIR /set/working/directory/to/here/i/guess
COPY thisthing /to/here
CMD ["array", "of", "commands", "like", "npm", "start"]
ADD . . # add files/dirs from cwd to image
```

The `-d` in `docker run -d` means `detach`. And `-p` as in `docker run -p
80:4010` looks obvious.

Some commands:

```
docker ps # get container id
docker logs containerid
docer exec -it containerid /bin/bash # enter the container
```

It's totally fine to test against ports from a container (with eg `cURL`).

There's also a `node:versionnumber` image I think?

To get non-root users: `RUN groupadd -r app && useradd -r -g app app`,
then when the image is run, do it with `-u "app"`.

To limit usage: `-m "256M" --memory-swap "2G"`

An example:

```shell
docker run \
-e "NODE_ENV=production" \
-u "app" \
-m "256M" --memory-swap "2G" \
-w "/web/jane-com/app" \
--name "jane-com" \
node index.js
```

Installing (on nix): `curl https://get.docker.com/ | sh`

Installing test version: `curl https://test.docker.com | sh`

Installing dev version: `curl https://experimental.docker.com | sh`

Compose is like fig, but from Docker.

```
pip install -U docker-compose
docker-compose up -d
docker-compose stop, kill, rm
```

All of these just go off a YAML file, I guess.

Okay, based on Node's official docs we can do:

```
FROM node:6.2.0
EXPOSE 4010

# and then

docker build -t jane-com .
docker run -it --rm -name jane-com-docker-running jane-com
```

To keep Docker running, throw this in your bash rc: `eval $(docker-machine env
default)`

And if you need systemd in the mix, try something like:

```
;; once docker is installed, there should already be
;; a systemd service for it. so you can just systemctl start docker
;; and systemctl enable docker and that SHOULD be it

[Unit]
Description=This is our Node service
Requires=docker.service
After=docker.service

[Service]
Restart=always
ExecStartPre=/usr/bin/docker kill ournodecontainer
ExecStartPre=/usr/bin/docker rm ournodecontainer
ExecStart=/usr/bin/docker run --name=ournodecontainer ournode/container
ExecStop=/usr/bin/docker stop ournodecontainer

[Install]
WantedBy=multi-user.target
```

**TO GET YOUR IMAGE INTO A TARBALL, LOCALLY** (because they don't really tell
you where to look for that):

```shell
docker export <container-hash> > dockerimg.tar

# And then you could just:

mkdir ~/foo
tar -C ~/foo -xvf dockerimg.tar

# (or just use atool's aunpack, much easier to remember!)
```

Docker can take a `.dockerignore`, formatted I guess basically the same as gitignore.

Doing an `export` piped to an `import` essentially works like a squash,
flattening all the layers, so extraneous info (for example, creating files that
later get removed) wouldn't take up extra space.

`docker export` is for _containers_, currently running.

`docker save` is for _images_.
