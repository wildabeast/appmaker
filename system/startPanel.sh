startPanel ()
{
  touch $logsPath/panelMon.txt

  if sudo mon --pidfile $tempPath/panelPid --status | grep -q "alive"
    then
      echo Nudgepad Panel already running...
      return 1
  fi
  
  if isMac
    then
      panelDomain=localhost
    else
      panelDomain=$HOSTNAME
  fi

  echo Starting Nudgepad Panel server...

  # Clear the log file
  sudo rm $logsPath/panel.txt
  touch $logsPath/panel.txt
  sudo mon -d -l $logsPath/panel.txt -p $tempPath/panelPid -m $TEMPATH/panelPid "node panel.js $panelDomain"
  echo Started Site Maker
}

