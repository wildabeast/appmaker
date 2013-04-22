# Create sites group
sudo groupadd sites
sudo usermod -a -G sites ubuntu
sudo chgrp -R sites ~/nudgepad/sites
sudo chgrp -R sites ~/nudgepad/ports
sudo chgrp -R sites ~/nudgepad/active
