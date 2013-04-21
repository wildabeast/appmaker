stopProxy ()
{
  if sudo mon --pidfile $TEMPPATH/proxyMonPid --status | grep -q "alive"
    then
      PID=$(sudo cat $TEMPPATH/proxyMonPid)
      sudo kill -SIGTERM $PID
      echo Stopped proxy.
      return 0
    else
      echo Nudge proxy not running.
      return 1
  fi
}
