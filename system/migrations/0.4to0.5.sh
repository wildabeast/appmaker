#!/bin/bash

projects="$(ls /nudgepad/projects/)"
#sudo mkdir /nudgepad/backup/0.3/
#sudo cp -R /nudgepad/projects/ /nudgepad/backup/0.3/
for domain in $projects
do
  # rename makers folder to team folder
  mv /nudgepad/projects/$domain/team /nudgepad/projects/$domain/private/team
done
