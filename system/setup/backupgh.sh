#!/bin/bash
sudo rsync -a /home/ubuntu/sites /home/ubuntu/backup --exclude=".git/*" --exclude=".git"
cd /home/ubuntu/backup/
sudo git add .
sudo git commit -am "Backup updated"
sudo git push

