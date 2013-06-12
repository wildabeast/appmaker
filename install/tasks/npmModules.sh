cd ~
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