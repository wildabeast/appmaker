# https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers
# http://askubuntu.com/questions/154255/how-can-i-tell-if-i-am-out-of-inotify-watches
# http://inotify.aiken.cz/?section=inotify&page=faq
# http://unix.stackexchange.com/questions/13751/kernel-inotify-watch-limit-reached
# http://monodevelop.com/Inotify_watches_limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
