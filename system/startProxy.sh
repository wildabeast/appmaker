startProxy ()
{
  touch $LOGSPATH/proxy_mon.txt
  if isProxyUp
    then
      echo Nudge proxy already running...
      return 1
  fi

  echo Starting Nudge proxy server...

  # Clear the log file
  sudo rm $LOGSPATH/proxy_mon.txt
  touch $LOGSPATH/proxy_mon.txt
  sudo mon -d -l $LOGSPATH/proxy_mon.txt -p $TEMPPATH/proxyPid -m $TEMPPATH/proxyMonPid "node proxy.js"
  echo Started proxy
}

