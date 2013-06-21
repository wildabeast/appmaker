fixPermissions ()
{
  chmod 710 $dataPath
  chmod 730 $activePath
  chmod 730 $portsPath
  chmod 710 $projectsPath
  chmod 700 $logsPath
  chmod 700 $tempPath
  chmod 700 $panelPath
  chmod 700 $backupPath
  chmod 700 $privatePath
  
  if isMac
    then
      echo Nothing to do on Mac
    else
      sudo chown $USER:projects $dataPath
      sudo chown $USER:projects $activePath
      sudo chown $USER:projects $portsPath
      sudo chown $USER:projects $projectsPath
  fi  
}


