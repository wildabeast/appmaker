fixPermissions ()
{
  chmod 710 /nudgepad/
  chmod 710 /nudgepad/active
  chmod 710 /nudgepad/ports
  chmod 710 /nudgepad/sites
  chmod 700 /nudgepad/logs
  chmod 700 /nudgepad/temp
  chmod 700 /nudgepad/panel
  chmod 700 /nudgepad/backup
  
  if isMac
    then
      echo Nothing to do on Mac
    else
      sudo chown $USER:sites /nudgepad/
      sudo chown $USER:sites /nudgepad/active
      sudo chown $USER:sites /nudgepad/ports
      sudo chown $USER:sites /nudgepad/sites
  fi  
}


