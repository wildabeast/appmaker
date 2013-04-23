#!/bin/bash
sudo rsync -a /nudgepad/sites /nudgepad/backup --exclude=".git/*" --exclude=".git"
cd /nudgepad/backup/
sudo git add .
sudo git commit -am "Backup updated"
sudo git push

