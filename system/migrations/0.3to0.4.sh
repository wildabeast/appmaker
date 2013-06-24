#!/bin/bash

projects="$(ls /nudgepad/projects/)"
for domain in $projects
do
  # rename workers folder to makers folder
  sudo mv /nudgepad/projects/$domain/workers /nudgepad/projects/$domain/makers
  # move all public files to root level
  sudo mv /nudgepad/projects/$domain/public/*.* /nudgepad/projects/$domain/
  # remove .gitignore
  sudo rm /nudgepad/projects/$domain/.gitignore
  # move all folders to nudgepad sub folder
  folders="includes logs pages posts settings surveys temp timelines workers"
  for folder in $folders
  do
    sudo mv /nudgepad/projects/$domain/$folder /nudgepad/projects/$domain/nudgepad/$folder
  done
done
