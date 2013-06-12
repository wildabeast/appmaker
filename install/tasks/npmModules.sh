cd ~
# Install npm modules
sudo npm install http-proxy@0.10.1
for module in http-proxy@0.10.1 space scraps socket.io express superagent imagemagick underscore cookie moment nodemailer request wrench async marked jquery utile commander mode-to-permissions speedcoach
  do
    npm install $module
done
