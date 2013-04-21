#!/bin/bash
sudo rsync -a /home/ubuntu/sites /home/ubuntu/nudge1 --exclude=".git/*" --exclude=".git"
cd /home/ubuntu/nudge1/
sudo git add .
sudo git commit -am "Backup updated"
sudo git push

