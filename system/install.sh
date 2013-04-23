if [ ! -d "$dataPath" ]
  then
    mkdir $dataPath
    mkdir $sitesPath
    mkdir $activePath
    mkdir $portsPath
    mkdir $tempPath
    mkdir $logsPath
    mkdir $backupPath
    mkdir $panelPath
    if isUbuntu
      then
        chgrp sites $sitesPath
        chgrp sites $activePath
        chgrp sites $portsPath
    fi
fi
