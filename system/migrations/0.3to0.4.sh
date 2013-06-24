#!/bin/bash

projects="$(ls /nudgepad/projects/)"
sudo mkdir /nudgepad/backup/0.3/
sudo cp -R /nudgepad/projects/ /nudgepad/backup/0.3/
for domain in $projects
do
  # rename workers folder to makers folder
  sudo mv /nudgepad/projects/$domain/workers /nudgepad/projects/$domain/makers
  # move all public files to root level
  sudo mv /nudgepad/projects/$domain/public/*.* /nudgepad/projects/$domain/
  # remove .gitignore
  sudo rm /nudgepad/projects/$domain/.gitignore
  # move all folders to private sub folder
  sudo mkdir /nudgepad/projects/$domain/private/
  sudo chown $domain:$domain /nudgepad/projects/$domain/private/
  folders="includes logs pages posts settings surveys temp timelines workers"
  for folder in $folders
  do
    sudo mv /nudgepad/projects/$domain/$folder /nudgepad/projects/$domain/private/$folder
  done
done
