set_port () {
  # Pick a port between 3002 and 8000
  PORT=$(($RANDOM%5000+3002))
  while [ -f ../ports/$PORT ]
  do
    PORT=$(($RANDOM%5000+3002))
  done
}

startSite () {
  
  if isNoteSite $1
    then
      echo $DOMAIN does not exist. Create it first
      return 1
  fi
  
  # check if site is already running
  if isActive $1
    then
      echo $DOMAIN already running
      return 1
  fi

  set_port

  cd $SERVERPATH
  
  if isMac
    then
      touch $SITESPATH/$DOMAIN/logs/mon.txt
      mon -d -l $SITESPATH/$DOMAIN/logs/mon.txt -p $SITESPATH/$DOMAIN/temp/sitePid -m $SITESPATH/$DOMAIN/temp/monPid "node app.js $DOMAIN $PORT"
    else
      # todo: fix this so mon isnt launching 2 processes.
      sudo -u $DOMAIN touch $SITESPATH/$DOMAIN/logs/mon.txt
      sudo -u $DOMAIN mon -d -l $SITESPATH/$DOMAIN/logs/mon.txt -p $SITESPATH/$DOMAIN/temp/sitePid -m $SITESPATH/$DOMAIN/temp/monPid "node app.js $DOMAIN $PORT"
  fi
  return 0
}

