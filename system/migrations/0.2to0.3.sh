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
sudo chown $USER:projects /nudgepad/ports
sudo chown $USER:projects /nudgepad/
chmod 730 /nudgepad/running
chmod 710 /nudgepad/projects

