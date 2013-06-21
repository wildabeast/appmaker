deleteProject ()
{
  stopProject $1
  if isMac
    then
      sudo rm -rf $projectsPath/$1
    else
      sudo rm -rf $projectsPath/$1
      sudo deluser $1
      sudo delgroup $1
      sudo rm -rf /home/$1
  fi
}

