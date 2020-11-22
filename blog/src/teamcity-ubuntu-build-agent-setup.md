---
title: script to set up ec2 build agent for tc
created: 2016-07-06
tags:
  - ubuntu
  - docker
  - aws
  - teamcity
---

This is a shell script to run on a new Ubuntu EC2 instance to get it
set up as a build agent for TeamCity, running stuff in Docker.

```shell
#!/usr/bin/env bash

# start with a t2.large (or maybe medium) ec2 instance
# ubuntu, preferably 16.x
# needs to have semi-open network access and public IP
# to be able to update packages and talk to docker and your
# build server
# after running this and registering the agent on the TC
# server, just use the agent push
# or, download the zip and scp it up

# new ubuntu instances won't have pw on default user (ubuntu)
sudo su

apt-get update

apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

mkdir -p /etc/apt/sources.list.d/
touch /etc/apt/sources.list.d/docker.list
echo 'deb https://apt.dockerproject.org/repo ubuntu-xenial main' >> /etc/apt/sources.list.d/docker.list
echo 'apt_preserve_sources_list: true' >> /etc/cloud/cloud.cfg

if [ command -v lxc-docker ] ; then
  apt-get purge lxc-docker -y
fi

echo "
## Note, this file is written by cloud-init on first boot of an instance
## modifications made here will not survive a re-bundle.
## if you wish to make changes you can:
## a.) add 'apt_preserve_sources_list: true' to /etc/cloud/cloud.cfg
##     or do the same in user-data
## b.) add sources in /etc/apt/sources.list.d
## c.) make changes to template file /etc/cloud/templates/sources.list.tmpl
#

# See http://help.ubuntu.com/community/UpgradeNotes for how to upgrade to
# newer versions of the distribution.
deb http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial main restricted
deb-src http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial main restricted

## Major bug fix updates produced after the final release of the
## distribution.
deb http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial-updates main restricted
deb-src http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial-updates main restricted

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team. Also, please note that software in universe WILL NOT receive any
## review or updates from the Ubuntu security team.
deb http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial universe
deb-src http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial universe
deb http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial-updates universe
deb-src http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial-updates universe

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team, and may not be under a free licence. Please satisfy yourself as to
## your rights to use the software. Also, please note that software in
## multiverse WILL NOT receive any review or updates from the Ubuntu
## security team.
deb http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial multiverse
deb-src http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial multiverse
deb http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial-updates multiverse
deb-src http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial-updates multiverse

## Uncomment the following two lines to add software from the 'backports'
## repository.
## N.B. software from this repository may not have been tested as
## extensively as that contained in the main release, although it includes
## newer versions of some applications which may provide useful features.
## Also, please note that software in backports WILL NOT receive any review
## or updates from the Ubuntu security team.
deb http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial-backports main restricted universe multiverse
deb-src http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ xenial-backports main restricted universe multiverse

## Uncomment the following two lines to add software from Canonical's
## 'partner' repository.
## This software is not part of Ubuntu, but is offered by Canonical and the
## respective vendors as a service to Ubuntu users.
# deb http://archive.canonical.com/ubuntu xenial partner
# deb-src http://archive.canonical.com/ubuntu xenial partner

deb http://security.ubuntu.com/ubuntu xenial-security main
deb-src http://security.ubuntu.com/ubuntu xenial-security main
deb http://security.ubuntu.com/ubuntu xenial-security universe
deb-src http://security.ubuntu.com/ubuntu xenial-security universe
# deb http://security.ubuntu.com/ubuntu xenial-security multiverse
# deb-src http://security.ubuntu.com/ubuntu xenial-security multiverse
" > /etc/apt/sources.list

apt-get install -y apt-transport-https ca-certificates
apt-get install -y linux-image-extra-$(uname -r) --fix-missing --allow-unauthenticated
apt-get install -y default-jdk unzip docker-engine --fix-missing --allow-unauthenticated
apt-get dist-upgrade -y --allow-unauthenticated --fix-missing
apt-get autoremove
apt-get purge

systemctl daemon-reload
systemctl enable docker
systemctl start docker

echo "
#!/usr/bin/env bash

while true
do
  sleep 86400
  docker rmi `docker images -aq`
done
" > ~/docker-cleanup.sh

chmod +x ~/docker-cleanup.sh
nohup ~/docker-cleanup.sh &
```
