fixPermissions ()
{
  chmod 710 $dataPath
  chmod 730 $activePath
  chmod 730 $portsPath
  chmod 710 $sitesPath
  chmod 700 $logsPath
  chmod 700 $tempPath
  chmod 700 $panelPath
  chmod 700 $backupPath
  
  if isMac
    then
      echo Nothing to do on Mac
    else
      sudo chown $USER:sites $dataPath
      sudo chown $USER:sites $activePath
      sudo chown $USER:sites $portsPath
      sudo chown $USER:sites $sitesPath
  fi  
}


