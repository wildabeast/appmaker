#!/bin/bash
sudo rsync -a /home/ubuntu/nudgepadStorage/sites /home/ubuntu/nudgepadStorage/backup --exclude=".git/*" --exclude=".git"
cd /home/ubuntu/nudgepadStorage/backup/
sudo git add .
sudo git commit -am "Backup updated"
sudo git push

