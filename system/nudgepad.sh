#!/bin/bash
# http://stackoverflow.com/questions/59895/can-a-bash-script-tell-what-directory-its-stored-in
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
systemPath="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
cd $systemPath
source paths.sh
source isMac.sh
source install.sh

# get all sites 1 per line filter out hidden dirs
sites="$(ls $sitesPath)"

# get all sites 1 per line filter out hidden dirs
active="$(ls $activePath)"

# Include our BASH functions
source fixPermissions.sh
source isSite.sh
source isActive.sh
source isProxyUp.sh
source startSite.sh
source stopSite.sh
source stopProxy.sh
source startProxy.sh
source startPanel.sh
source stopPanel.sh
source isChanged.sh
source commit.sh
source deleteSite.sh
source waitUntilServing.sh
source createOwnerFile.sh
source createSite.sh

case "$1" in

'active')
  echo activeSites
;;

'commit')
  commit $2
;;

'commitAll')
  for domain in $sites
  do
    commit $domain
  done
;;

'create')
  if createSite $2 $3 $4
    then
      if startSite $2
        then
          # Get owner link
          waitUntilServing $2
          echo $OWNERLINK
          # exit 0
      else
        echo Failed starting $2
        exit 1
      fi
    else
      echo Failed to create $2
      exit 1
  fi
;;

'delete')
  deleteSite $2
;;

'deleteAll')
  for D in $sites
  do
    deleteSite $D
  done
;;

'fixPermissions')
  fixPermissions
;;

'gitBackup')
  sudo rsync -a $sitesPath $backupPath --exclude=".git/*" --exclude=".git"
  cd $backupPath
  sudo git add .
  sudo git commit -am "Backup updated"
  sudo git push
;;

'host')
  sudo python $systemPath/hosts.py $2
;;

'isChanged')
  if isChanged $2
    then
      echo $2 is changed
    else
      echo $2 is NOT changed
  fi
;;

'isSite')
  isSite $2
;;

'isActive')
  if isActive $2
    then
      echo $2 is up
    else
      echo $2 is down
  fi
;;

'log')
  if [ -n "$2" ]
    then
      sudo cat $sitesPath$2/logs/mon.txt
    else
      # Proxy log
      sudo cat $logsPath/domain.txt
  fi
;;

'logs')
  sudo cat $sitesPath$2/logs/mon.txt
;;

'permit')
  # i hate you file permissions
  if isMac
    then
      sudo chmod -R 777 $sitesPath
  fi
;;

'restart')
  if [ -z $2 ]
    then    
      stopProxy
      stopPanel
      startPanel
      startProxy
      exit 0
  fi
  stopSite $2
  startSite $2
;;

'restartAll')
  for domain in activeSites
  do
    stopSite $domain
    startSite $domain
  done
;;

'sites')
  for domain in $sites
  do
    echo $domain
  done
;;

'start')
  if [ -z $2 ]
    then
      startProxy
      startPanel
      exit 2
  fi
  if startSite $2
    then
      exit 0
    else
      exit 1
  fi
;;

'stop')
  if [ -n "$2" ]
    then
      stopSite $2
    else
      stopProxy
      stopPanel
      for domain in activeSites
      do
        stopSite $domain
      done
  fi
;;

'tail')
  if [ -n "$2" ]
    then
      sudo tail -n 30 -f $sitesPath/$2/logs/mon.txt
    else
      # Proxy log
      sudo tail -n 30 -f $logsPath/domain.txt
  fi
;;

'traffic')
  if [ -n "$2" ]
    then
      sudo tail -n 30 -f $sitesPath/$2/logs/requests.txt
    else
      # Proxy log
      echo No domain provided
  fi
;;

'uninstall')
  rm -rf /var/nudgepad/
  npm uninstall nudgepad
  rm -rf ~/nudgepad/
;;

'zip')
  cd $sitesPath
  zip -r ~/sites.zip .
;;

*)


echo "*** Nudgepad Commands ***"
echo "nudgepad start - Start proxy and panel"
echo "nudgepad create domain email@domain.com http://clone - Creates a new site"
echo "nudgepad stop - Stop all"
;;
esac


