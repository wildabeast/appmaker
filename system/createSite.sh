createSiteUbuntu ()
{
  speedcoach "start of createSiteUbuntu"
  
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
      space $cloneFile $sitesPath$domain
    else
      # echo NO cloneFile provided. Creating blank project from blank.
      sudo cp -R blank $sitesPath$domain
      sudo chown -R $domain:$domain $sitesPath$domain
      sudo -u $domain mkdir $sitesPath$domain/settings
      sudo -u $domain mkdir $sitesPath$domain/workers
      sudo -u $domain mkdir $sitesPath$domain/logs
      sudo -u $domain mkdir $sitesPath$domain/temp
  fi
  speedcoach "before createOwnerFile"
  createOwnerFile $domain $ownerEmail
  sudo chown -R $domain:$domain $sitesPath$domain
  sudo -u $domain chmod -R 770 $sitesPath$domain/
  
  speedcoach "end of createSiteUbuntu"
  
#  cd $sitesPath$domain/
#  sudo -u $domain git init >/dev/null
#  sudo -u $domain git add . >/dev/null
#  sudo -u $domain git commit -am "Initial commit" >/dev/null
  
  
}

createSiteMac ()
{
  
  domain=$1
  ownerEmail=$2
  cloneFile=$3
  
  if [ -n "$cloneFile" ]
    then
      space $cloneFile $sitesPath$domain
    else
      # echo NO cloneFile provided. Creating blank project from blank.
      cp -R blank $sitesPath$domain
      mkdir $sitesPath$domain/settings
      mkdir $sitesPath$domain/workers
      mkdir $sitesPath$domain/logs
      mkdir $sitesPath$domain/temp
  fi
  
  createOwnerFile $domain $ownerEmail
  cd $sitesPath$domain
#  git init >/dev/null
  echo "temp/" > .gitignore
#  git add . >/dev/null
#  git commit -am "Initial commit" >/dev/null

}

createSite ()
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
  if isSite $domain
    then
      echo $domain already exists
      return 1
  fi
  if isUbuntu
    then
      createSiteUbuntu $1 $2 $3
    else
      createSiteMac $1 $2 $3
  fi
  
  speedcoach "before tee"
  echo "127.0.0.1 $domain" | sudo tee -a /etc/hosts >/dev/null
  speedcoach "end of tee"
  return 0
}



