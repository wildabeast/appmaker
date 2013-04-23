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
    chgrp sites ~/nudgepad/sites
    chgrp sites ~/nudgepad/active
    chgrp sites ~/nudgepad/ports
fi
