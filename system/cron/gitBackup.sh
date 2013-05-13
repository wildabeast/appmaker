#!/bin/bash
# This script leaves /nudgepad/sites perfectly in place and creates copy
# of it in /nudgepad/backup, excluding sub git repos, logs, and temp for
# efficiency reasons. It then adds all new files, commits the changes,
# and pushes them to a remote backup server if setup.
sudo rsync -a /nudgepad/sites /nudgepad/backup --exclude=".git/*" --exclude=".git" --exclude="logs/*" --exclude="temp" --exclude="temp/*" --exclude="temp"
cd /nudgepad/backup/
sudo git init
sudo git add .
sudo git commit -am "Backup updated"
sudo git push

