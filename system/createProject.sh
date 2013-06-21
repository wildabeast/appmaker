createProjectUbuntu ()
{
  speedcoach "start of createProjectUbuntu"
  
  domain=$1
  ownerEmail=$2
  cloneFile=$3
  PW=`echo $RANDOM$RANDOM`
  sudo useradd -m -p "$PW" $domain
  sudo usermod -a -G sites $domain
  sudo usermod -a -G $domain ubuntu
  
  speedcoach "user created"
  
  
  if [ -n "$cloneFile" ]
    then
      space $cloneFile $projectsPath$domain
    else
      # echo NO cloneFile provided. Creating blank project from blank.
      sudo cp -R blank $projectsPath$domain
      sudo chown -R $domain:$domain $projectsPath$domain
      sudo -u $domain mkdir $projectsPath$domain/settings
      sudo -u $domain mkdir $projectsPath$domain/workers
      sudo -u $domain mkdir $projectsPath$domain/logs
      sudo -u $domain mkdir $projectsPath$domain/temp
  fi
  speedcoach "before createOwnerFile"
  createOwnerFile $domain $ownerEmail
  sudo chown -R $domain:$domain $projectsPath$domain
  sudo -u $domain chmod -R 770 $projectsPath$domain/
  
  speedcoach "end of createProjectUbuntu"
  
#  cd $projectsPath$domain/
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
      space $cloneFile $projectsPath$domain
    else
      # echo NO cloneFile provided. Creating blank project from blank.
      cp -R blank $projectsPath$domain
      mkdir $projectsPath$domain/settings
      mkdir $projectsPath$domain/workers
      mkdir $projectsPath$domain/logs
      mkdir $projectsPath$domain/temp
  fi
  
  createOwnerFile $domain $ownerEmail
  cd $projectsPath$domain
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
      echo ERROR. No domain entered. What project do you want to create?
      return 1
  fi
  if [ -z $ownerEmail ]
    then
      echo ERROR. No email entered. Who owns this new project?
      return 1
  fi
  if isProject $domain
    then
      echo $domain already exists
      return 1
  fi
  if isUbuntu
    then
      createProjectUbuntu $1 $2 $3
    else
      createProjectMac $1 $2 $3
  fi
  
  speedcoach "before tee"
  echo "127.0.0.1 $domain" | sudo tee -a /etc/hosts >/dev/null
  speedcoach "end of tee"
  return 0
}



