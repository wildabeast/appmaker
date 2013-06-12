# Update system hostname
echo Enter a hostname for this machine:
read newHostname
echo $newHostname | sudo tee /etc/hostname >/dev/null
sudo hostname $newHostname
