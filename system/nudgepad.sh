#!/bin/bash
cd ~/node_modules/nudgepad/system/
source isMac.sh

# Set env variables
HOMEPATH=/home/ubuntu/
if isMac
  then
    cd ~
    MACUSER="$(pwd)"
    MACUSER="$(basename $MACUSER)"
    HOMEPATH=/Users/$MACUSER
    cd -
fi

DATAPATH=$HOMEPATH/nudgepad
SITESPATH=$DATAPATH/sites/
ACTIVEPATH=$DATAPATH/sites/
PORTHSPATH=$DATAPATH/ports/
CODEPATH=$HOMEPATH/node_modules/nudgepad
PROXYPATH=$CODEPATH/system/
SERVERPATH=$CODEPATH/server/
CLIENTPATH=$CODEPATH/client/
TEMPPATH=$CODEPATH/temp/
LOGSPATH=$CODEPATH/logs/
BACKUPPATH=$CODEPATH/backup/

cd $PROXYPATH

# get all sites 1 per line filter out hidden dirs
SITES="$(ls $SITESPATH)"

# get all sites 1 per line filter out hidden dirs
ACTIVE="$(ls $ACTIVEPATH)"

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
  echo $ACTIVE
;;

'commit')
  commit $2
;;

'commit_all')
  for DOMAIN in $SITES
  do
    commit $DOMAIN
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

'delete_all')
  for D in $SITES
  do
    deleteSite $D
  done
;;

'fixPermissions')
  fixPermissions
;;

'git_backup')
  sudo rsync -a $SITESPATH $BACKUPPATH --exclude=".git/*" --exclude=".git"
  cd $BACKUPPATH
  sudo git add .
  sudo git commit -am "Backup updated"
  sudo git push
;;

'host')
  sudo python $PROXYPATH/hosts.py $2
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
      sudo cat $SITESPATH$2/logs/mon.txt
    else
      # Proxy log
      sudo cat $LOGSPATH/proxy_mon.txt
  fi
;;

'logs')
  sudo cat $SITESPATH$2/logs/mon.txt
;;

'permit')
  # i hate you file permissions
  if isMac
    then
      sudo chmod -R 777 $SITESPATH
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

'restart_all')
  for DOMAIN in $ACTIVE
  do
    stopSite $DOMAIN
    startSite $DOMAIN
  done
;;

'sites')
  for DOMAIN in $SITES
  do
    echo $DOMAIN
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
      for DOMAIN in $ACTIVE
      do
        stopSite $DOMAIN
      done
  fi
;;

'tail')
  if [ -n "$2" ]
    then
      sudo tail -n 30 -f $SITESPATH/$2/logs/mon.txt
    else
      # Proxy log
      sudo tail -n 30 -f $LOGSPATH/proxy_mon.txt
  fi
;;

'traffic')
  if [ -n "$2" ]
    then
      sudo tail -n 30 -f $SITESPATH/$2/logs/requests.txt
    else
      # Proxy log
      echo No domain provided
  fi
;;

'zip')
  cd $SITESPATH
  zip -r ~/sites.zip .
;;

*)


echo "*** Nudgepad Commands ***"
echo "nudgepad start - Start proxy and panel"
echo "nudgepad create domain email@domain.com http://clone - Creates a new site"
echo "nudgepad stop - Stop all"
;;
esac


