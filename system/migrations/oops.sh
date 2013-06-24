#!/bin/bash

projects="$(ls /nudgepad/projects/)"
#sudo mkdir /nudgepad/backup/0.3/
#sudo cp -R /nudgepad/projects/ /nudgepad/backup/0.3/
for domain in $projects
do
  # rename workers folder to makers folder
  mv /nudgepad/projects/$domain/makers /nudgepad/projects/$domain/private/makers
done
