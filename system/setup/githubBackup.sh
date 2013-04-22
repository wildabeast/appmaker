#!/bin/bash
sudo rsync -a /home/ubuntu/nudgepad/sites /home/ubuntu/nudgepad/backup --exclude=".git/*" --exclude=".git"
cd /home/ubuntu/nudgepad/backup/
sudo git add .
sudo git commit -am "Backup updated"
sudo git push

