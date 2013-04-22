stopSite () {
  # check if site is already running
  if isActive $1
    then
      PID=$(sudo cat $sitesPath/$1/temp/monPid)
      sudo kill $PID
      echo stopped $1
      return 0
    else
      echo $1 not running
      return 1
  fi
}
