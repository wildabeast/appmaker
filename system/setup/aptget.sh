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
