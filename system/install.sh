if [ ! -d "$dataPath" ]
  then
    sudo mkdir $dataPath
    sudo chown $USER $dataPath
    mkdir $sitesPath
    mkdir $activePath
    mkdir $portsPath
    mkdir $tempPath
    mkdir $logsPath
    mkdir $backupPath
    mkdir $panelPath
    fixPermissions
fi
