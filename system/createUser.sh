#!/bin/bash
domain=$1
serverUser=$2
projectsPath=/nudgepad/projects
PW=`echo $RANDOM$RANDOM`
useradd -m -p "$PW" -G projects $domain
usermod -a -G $domain $serverUser
chown -R $domain:$domain $projectsPath/$domain
