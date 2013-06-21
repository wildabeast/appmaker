createProjectNix ()
{
  speedcoach "start of createProjectNix"
  
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
  speedcoach "$domain created from template"
  createOwnerFile $domain $ownerEmail
  chmod -R 770 $projectsPath/$domain/
  
  
  sudo ./createUser.sh $domain $USER
  speedcoach "$domain project dir chowned"
  
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
  
  # if on localhost, append to the hosts file to add the domain
  if isMac
    then
      echo "127.0.0.1 $domain" | sudo tee -a /etc/hosts >/dev/null
  fi

  return 0
}



