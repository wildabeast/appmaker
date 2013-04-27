stopPanel ()
{
  if sudo mon --pidfile $tempPath/panelMonPid --status | grep -q "alive"
    then
      PID=$(sudo cat $tempPath/panelMonPid)
      sudo kill -SIGTERM $PID
      echo Stopped Panel.
      return 0
    else
      echo Nudgepad Panel not running.
      return 1
  fi
}
