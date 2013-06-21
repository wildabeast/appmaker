#!/bin/bash

# Create projects group
sudo groupadd projects
sudo usermod -a -G projects ubuntu
sudo mv /nudgepad/sites /nudgepad/projects
sudo mv /nudgepad/active /nudgepad/running
projects="$(ls /nudgepad/projects/)"
for domain in $projects
do
  sudo usermod -a -G projects $domain
done
sudo chown $USER:projects /nudgepad/projects
sudo chown $USER:projects /nudgepad/running
chmod 730 /nudgepad/running
chmod 710 /nudgepad/projects
# This is not really working for some reason.
# could be that dumb nix group thing
