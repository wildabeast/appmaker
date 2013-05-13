#!/bin/bash
source backup.sh
cd /nudgepad/backup/
sudo git init
sudo git add .
sudo git commit -am "Backup updated"
sudo git push

