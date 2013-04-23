#!/bin/bash
sudo rsync -a /var/nudgepad/sites /var/nudgepad/backup --exclude=".git/*" --exclude=".git"
cd /var/nudgepad/backup/
sudo git add .
sudo git commit -am "Backup updated"
sudo git push

