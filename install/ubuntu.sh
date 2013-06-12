# Script for installing NudgePad on a fresh Ubuntu instance from
# something like instantserver.io

# Install packages
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git gcc make imagemagick sendmail-bin python-software-properties python g++

# Download node.js and install it
wget -N http://nodejs.org/dist/v0.8.24/node-v0.8.24.tar.gz
tar xzvf node-v0.8.24.tar.gz
cd node-v0.8.24/
./configure
sudo make install

# Install mon
cd ~
git clone https://github.com/visionmedia/mon.git
cd mon
sudo make install

# Create sites group
sudo groupadd sites
sudo usermod -a -G sites ubuntu

# Update system hostname
echo Enter a hostname for this machine:
read newHostname
echo $newHostname | sudo tee /etc/hostname >/dev/null
sudo hostname $newHostname

# https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers
# http://askubuntu.com/questions/154255/how-can-i-tell-if-i-am-out-of-inotify-watches
# http://inotify.aiken.cz/?section=inotify&page=faq
# http://unix.stackexchange.com/questions/13751/kernel-inotify-watch-limit-reached
# http://monodevelop.com/Inotify_watches_limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p


# Install npm modules
for module in http-proxy@0.10.1 marked express speedcoach
  do
    sudo npm install $module
    sudo npm install -g $module
done
# sudo chown -R $USER ~/.npm
for module in space scraps socket.io superagent imagemagick underscore cookie moment nodemailer request wrench async jquery utile commander mode-to-permissions
  do
    npm install $module
done


# Download nudgepad
git clone https://github.com/nudgepad/nudgepad.git

# Install npd shortcut
echo "alias npd='~/nudgepad/system/nudgepad.sh'" >> ~/.bash_profile
# Now reload your bash_profile to get the npd command
source ~/.bash_profile

