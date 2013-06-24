#!/bin/bash
# This script leaves /nudgepad/projects perfectly in place and creates copy
# of it in /nudgepad/backup, excluding sub git repos, logs, and temp for
# efficiency reasons.
sudo rsync -a /nudgepad/projects /nudgepad/backup --exclude=".git/*" --exclude=".git" --exclude="private/logs/*" --exclude="private/temp" --exclude="private/temp/*" --exclude="private/temp"
