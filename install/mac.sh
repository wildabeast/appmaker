cd ~
# install npm modules
sudo npm install http-proxy@0.10.1
for module in http-proxy@0.10.1 space scraps socket.io express superagent imagemagick underscore cookie moment nodemailer request wrench async marked jquery utile commander mode-to-permissions speedcoach
  do
    npm install $module
done

# Download node.js and install it
cd ~
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



# Download nudgepad
git clone git@github.com:nudgepad/nudgepad.git

# Install npd shortcut
echo "alias npd='~/nudgepad/system/nudgepad.sh'" >> ~/.bash_profile
# Now reload your bash_profile to get the npd command
source ~/.bash_profile
