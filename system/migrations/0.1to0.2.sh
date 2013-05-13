#!/bin/bash
sites="$(ls /nudgepad/sites/)"
for domain in $sites
do
  domainPath=/nudgepad/sites/$domain
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
