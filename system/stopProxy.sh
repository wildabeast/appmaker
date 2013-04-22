stopProxy ()
{
  if sudo mon --pidfile $tempPath/proxyMonPid --status | grep -q "alive"
    then
      PID=$(sudo cat $tempPath/proxyMonPid)
      sudo kill -SIGTERM $PID
      echo Stopped proxy.
      return 0
    else
      echo Nudge proxy not running.
      return 1
  fi
}
