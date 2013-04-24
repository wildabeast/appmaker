install:
	# add npd shortcut
	echo "alias npd='~/nudgepad/system/nudgepad.sh'" >> ~/.bash_profile
	# install npm modules
	for module in http-proxy@0.10.1 space spacefs scraps socket.io express superagent imagemagick underscore cookie moment nodemailer request wrench async marked jquery utile commander ; do \
	    npm install $$module ;\
	done

.PHONY: install
