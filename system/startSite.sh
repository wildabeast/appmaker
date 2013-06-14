set_port () {
  # Pick a port between 3002 and 8000
  portRange=$(($maxSitePort-$minSitePort))
  PORT=$(($RANDOM%$portRange+$minSitePort))
  while [ -f $portsPath/$PORT ]
  do
    PORT=$(($RANDOM%$portRange+$minSitePort))
  done
}

startSite () {
  
  if isNoteSite $1
    then
      echo $domain does not exist. Create it first
      return 1
  fi
  
  # check if site is already running
  if isActive $1
    then
      echo $domain already running
      return 1
  fi

  set_port

  cd $serverPath
  
  if isMac
    then
      touch $sitesPath/$domain/logs/mon.txt
      mon -d -l $sitesPath/$domain/logs/mon.txt -p $sitesPath/$domain/temp/sitePid -m $sitesPath/$domain/temp/monPid "node app.js $domain $PORT"
    else
      # todo: fix this so mon isnt launching 2 processes.
      sudo -u $domain touch $sitesPath/$domain/logs/mon.txt
      sudo -u $domain mon -d -l $sitesPath/$domain/logs/mon.txt -p $sitesPath/$domain/temp/sitePid -m $sitesPath/$domain/temp/monPid "node app.js $domain $PORT"
  fi
  return 0
}

