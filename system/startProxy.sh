startProxy ()
{
  touch $logsPath/domain.txt
  if isProxyUp
    then
      echo Nudge proxy already running...
      return 1
  fi

  echo Starting Nudge proxy server...

  # Clear the log file
  sudo rm $logsPath/domain.txt
  touch $logsPath/domain.txt
  sudo mon -d -l $logsPath/domain.txt -p $tempPath/proxyPid -m $tempPath/proxyMonPid "node proxy.js"
  echo Started proxy
}

