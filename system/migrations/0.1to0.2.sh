#!/bin/bash
projects="$(ls /nudgepad/projects/)"
for domain in $projects
do
  domainPath=/nudgepad/projects/$domain
  pages="$(ls $domainPath/pages/)"
  for page in $pages
  do
    node 0.1to0.2.js $domainPath/pages/$page
  done
  timelines="$(ls $domainPath/timelines/)"
  for page in $timelines
  do
    node 0.1to0.2.js $domainPath/timelines/$page
  done
done
