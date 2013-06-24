set_port () {
  # Pick a port between 3002 and 8000
  portRange=$(($maxProjectPort-$minProjectPort))
  PORT=$(($RANDOM%$portRange+$minProjectPort))
  while [ -f $portsPath/$PORT ]
  do
    PORT=$(($RANDOM%$portRange+$minProjectPort))
  done
}

startProject () {
  
  if isNotProject $1
    then
      echo $domain does not exist. Create it first
      return 1
  fi
  
  # check if project is already running
  if isActive $1
    then
      echo $domain already running
      return 1
  fi

  set_port

  cd $serverPath
  
  if isMac
    then
      touch $projectsPath/$domain/private/logs/mon.txt
      mon -d -l $projectsPath/$domain/private/logs/mon.txt -p $projectsPath/$domain/private/temp/projectPid -m $projectsPath/$domain/private/temp/monPid "node app.js $domain $PORT"
    else
      # todo: fix this so mon isnt launching 2 processes.
#      sudo -u $domain touch $projectsPath/$domain/private/logs/mon.txt
      # todo: how can we start this without sudo? sudo cause a 400ms delay
      sudo -u $domain mon -d -l $projectsPath/$domain/private/logs/mon.txt -p $projectsPath/$domain/private/temp/projectPid -m $projectsPath/$domain/private/temp/monPid "node app.js $domain $PORT"
  fi
  return 0
}

