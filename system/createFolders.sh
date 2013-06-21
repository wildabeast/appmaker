if [ ! -d "$dataPath" ]
  then
    sudo mkdir $dataPath
    sudo chown $USER $dataPath
    mkdir $projectsPath
    mkdir $runningPath
    mkdir $portsPath
    mkdir $tempPath
    mkdir $logsPath
    mkdir $backupPath
    mkdir $panelPath
    mkdir $privatePath
    fixPermissions
fi
