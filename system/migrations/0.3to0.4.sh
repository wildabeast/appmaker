#!/bin/bash

projects="$(ls /nudgepad/projects/)"
#sudo mkdir /nudgepad/backup/0.3/
#sudo cp -R /nudgepad/projects/ /nudgepad/backup/0.3/
for domain in $projects
do
  # rename workers folder to makers folder
  mv /nudgepad/projects/$domain/workers /nudgepad/projects/$domain/makers
  # move all public files to root level
  mv /nudgepad/projects/$domain/public/*.* /nudgepad/projects/$domain/
  # remove .gitignore
  rm /nudgepad/projects/$domain/.gitignore
  # move all folders to private sub folder
  mkdir /nudgepad/projects/$domain/private/
  chown $domain:$domain /nudgepad/projects/$domain/private/
  folders="logs packages pages posts settings surveys temp timelines makers"
  for folder in $folders
  do
    mv /nudgepad/projects/$domain/$folder /nudgepad/projects/$domain/private/$folder
  done
  # remove public folder
  rm -rf /nudgepad/projects/$domain/public
done
