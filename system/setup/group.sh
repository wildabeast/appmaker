# Create sites group
sudo groupadd sites
sudo usermod -a -G sites ubuntu
sudo chgrp -R sites sites
