# Install packages
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git gcc make imagemagick sendmail-bin python-software-properties python g++
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs

# Update system hostname
echo Enter a hostname for this machine:
read newHostname
echo $newHostname | sudo tee /etc/hostname >/dev/null
sudo hostname $newHostname

# Install mon
cd
git clone https://github.com/visionmedia/mon.git
cd mon
sudo make install

# Install nudgepad
npm install nudgepad


# Create sites group
sudo groupadd sites
sudo usermod -a -G sites ubuntu
sudo chgrp -R sites sites


# https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers
# http://askubuntu.com/questions/154255/how-can-i-tell-if-i-am-out-of-inotify-watches
# http://inotify.aiken.cz/?section=inotify&page=faq
# http://unix.stackexchange.com/questions/13751/kernel-inotify-watch-limit-reached
# http://monodevelop.com/Inotify_watches_limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

