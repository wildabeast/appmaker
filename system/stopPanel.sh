stopPanel ()
{
  if sudo mon --pidfile $TEMPPATH/panelPid --status | grep -q "alive"
    then
      PID=$(sudo cat $TEMPPATH/panelPid)
      sudo kill -SIGTERM $PID
      echo Stopped Panel.
      return 0
    else
      echo Nudgepad Panel not running.
      return 1
  fi
}
