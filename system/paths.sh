homePath=/home/ubuntu/
if isMac
  then
    cd ~
    macUser="$(pwd)"
    macUser="$(basename $macUser)"
    homePath=/Users/$macUser
    cd $systemPath
fi

codePath=$systemPath/../
serverPath=$codePath/server/
clientPath=$codePath/client/


# Where to store operational and user data
dataPath=$homePath/nudgepadStorage
sitesPath=$dataPath/sites/
activePath=$dataPath/active/
portsPath=$dataPath/ports/
tempPath=$dataPath/temp/
logsPath=$dataPath/logs/
backupPath=$dataPath/backup/
panelPath=$dataPath/panel/


