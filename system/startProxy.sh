startProxy ()
{
  touch $logsPath/proxy.txt
  if isProxyUp
    then
      echo Nudge proxy already running...
      return 1
  fi

  echo Starting Nudge proxy server...

  # Clear the log file
  sudo rm $logsPath/proxy.txt
  touch $logsPath/proxy.txt
  sudo mon -d -l $logsPath/proxy.txt -p $tempPath/proxyPid -m $tempPath/proxyMonPid "node proxy.js $proxyPort"
  echo Started proxy
}

