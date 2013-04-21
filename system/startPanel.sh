startPanel ()
{
  touch $LOGSPATH/panelMon.txt

  if sudo mon --pidfile $TEMPPATH/panelPid --status | grep -q "alive"
    then
      echo Nudgepad Panel already running...
      return 1
  fi
  
  if isMac
    then
      PANELDOMAIN=localhost
    else
      PANELDOMAIN=$HOSTNAME
  fi

  echo Starting Nudgepad Panel server...

  # Clear the log file
  sudo rm $LOGSPATH/panel.txt
  touch $LOGSPATH/panel.txt
  sudo mon -d -l $LOGSPATH/panel.txt -p $TEMPPATH/panelPid -m $TEMPATH/panelPid "node panel.js $PANELDOMAIN"
  echo Started Site Maker
}

