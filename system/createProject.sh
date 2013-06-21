createProjectNix ()
{
  speedcoach "start of createProjectNix"
  
  domain=$1
  ownerEmail=$2
  cloneFile=$3
  PW=`echo $RANDOM$RANDOM`
  speedcoach "password generated"
  sudo useradd -m -p "$PW" -G projects $domain
  speedcoach "$domain user created"
  # sudo usermod -a -G projects $domain
  # speedcoach "$domain user added to projects group"
  sudo usermod -a -G $domain $USER
  speedcoach "$USER user added to $domain group"
  
  if [ -n "$cloneFile" ]
    then
      space $cloneFile $projectsPath/$domain
      speedcoach "$domain created from $cloneFile template"
    else
      # echo NO cloneFile provided. Creating blank project from blank.
      sudo cp -R blank $projectsPath/$domain
      sudo chown -R $domain:$domain $projectsPath/$domain
      sudo -u $domain mkdir $projectsPath/$domain/settings
      sudo -u $domain mkdir $projectsPath/$domain/workers
      sudo -u $domain mkdir $projectsPath/$domain/logs
      sudo -u $domain mkdir $projectsPath/$domain/temp
      speedcoach "$domain created from blank template"
  fi
  createOwnerFile $domain $ownerEmail
  speedcoach "$domain owner file for $ownerEmail created"
  sudo chown -R $domain:$domain $projectsPath/$domain
  speedcoach "$domain project dir chowned"
  sudo -u $domain chmod -R 770 $projectsPath/$domain/
  speedcoach "$domain project dir chmodded"
  
#  cd $projectsPath/$domain/
#  sudo -u $domain git init >/dev/null
#  sudo -u $domain git add . >/dev/null
#  sudo -u $domain git commit -am "Initial commit" >/dev/null
  
  
}

createProjectMac ()
{
  
  domain=$1
  ownerEmail=$2
  cloneFile=$3
  
  if [ -n "$cloneFile" ]
    then
      space $cloneFile $projectsPath/$domain
    else
      # echo NO cloneFile provided. Creating blank project from blank.
      cp -R blank $projectsPath/$domain
      mkdir $projectsPath/$domain/settings
      mkdir $projectsPath/$domain/workers
      mkdir $projectsPath/$domain/logs
      mkdir $projectsPath/$domain/temp
  fi
  
  createOwnerFile $domain $ownerEmail
  cd $projectsPath/$domain
#  git init >/dev/null
  echo "temp/" > .gitignore
#  git add . >/dev/null
#  git commit -am "Initial commit" >/dev/null

}

createProject ()
{
  domain=$1
  ownerEmail=$2
  cloneFile=$3
  if [ -z $domain ]
    then
      echo ERROR. No domain entered. Your project needs a name. Usage: create domain owner@owner.com template.space
      return 1
  fi
  if [ -z $ownerEmail ]
    then
      echo ERROR. No email entered. Your project needs an owner. Usage: create domain owner@owner.com template.space
      return 1
  fi
  if isProject $domain
    then
      echo $domain already exists
      return 1
  fi
  # this could be better
  if isNix
    then
      createProjectNix $1 $2 $3
    else
      createProjectMac $1 $2 $3
  fi
  
  speedcoach "before tee"
  echo "127.0.0.1 $domain" | sudo tee -a /etc/hosts >/dev/null
  speedcoach "end of tee"
  return 0
}



