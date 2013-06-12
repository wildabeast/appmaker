# Download node.js and install it
cd ~
wget -N http://nodejs.org/dist/v0.8.24/node-v0.8.24.tar.gz
tar xzvf node-v0.8.24.tar.gz
cd node-v0.8.24/
./configure
sudo make install
