cloneUrl ()
{
  # echo creating from CLONE. source is $CLONE
  # http://1.com/blank.nudgepad.com.zip
  mkdir $sitesPath$domain
  CLONENAME=$(basename $CLONE)
  curl --silent $CLONE -o $CLONENAME
  if [ ! -f "$CLONENAME" ]
    then
      echo $CLONENAME does not exist
      exit 1
  fi
  unzip -qq $CLONENAME -d $sitesPath$domain
  rm $CLONENAME
}

createSiteUbuntu ()
{
  _start_time=`date +%s%N | cut -b1-13`
  
  domain=$1
  OWNEREMAIL=$2
  CLONE=$3
  PW=`echo $RANDOM$RANDOM`
  sudo useradd -m -p "$PW" $domain
  sudo usermod -a -G sites $domain
  sudo usermod -a -G $domain ubuntu
  
  _end_time=`date +%s%N | cut -b1-13`
  _processing_time=$((_end_time-_start_time))
#  echo Time to user created:
#  echo $_processing_time
  
  
  if [ -n "$CLONE" ]
    then
      cloneUrl
    else
      # echo NO CLONE provided. Creating blank site from blank.
      sudo cp -R blank $sitesPath$domain
      sudo chown -R $domain:$domain $sitesPath$domain
      sudo -u $domain mkdir $sitesPath$domain/settings
      sudo -u $domain mkdir $sitesPath$domain/workers
      sudo -u $domain mkdir $sitesPath$domain/logs
      sudo -u $domain mkdir $sitesPath$domain/temp
  fi
  createOwnerFile $domain $OWNEREMAIL
  sudo chown -R $domain:$domain $sitesPath$domain
  sudo -u $domain chmod -R 770 $sitesPath$domain/
  
  _end_time=`date +%s%N | cut -b1-13`
  _processing_time=$((_end_time-_start_time))
#  echo Time to pre git:
#  echo $_processing_time
  
#  cd $sitesPath$domain/
#  sudo -u $domain git init >/dev/null
#  sudo -u $domain git add . >/dev/null
#  sudo -u $domain git commit -am "Initial commit" >/dev/null
  
  _end_time=`date +%s%N | cut -b1-13`
  _processing_time=$((_end_time-_start_time))
#  echo Time to done git:
#  echo $_processing_time
  
}

createSiteMac ()
{
  
  domain=$1
  OWNEREMAIL=$2
  CLONE=$3
  
  if [ -n "$CLONE" ]
    then
      cloneUrl
    else
      # echo NO CLONE provided. Creating blank site from blank.
      cp -R blank $sitesPath$domain
      mkdir $sitesPath$domain/settings
      mkdir $sitesPath$domain/workers
      mkdir $sitesPath$domain/logs
      mkdir $sitesPath$domain/temp
  fi
  
  createOwnerFile $domain $OWNEREMAIL
  cd $sitesPath$domain
  git init >/dev/null
  echo "temp/" > .gitignore
  git add . >/dev/null
  git commit -am "Initial commit" >/dev/null

}

createSite ()
{
  domain=$1
  OWNEREMAIL=$2
  CLONE=$3
  if [ -z $domain ]
    then
      echo ERROR. No domain entered. What site do you want to create?
      return 1
  fi
  if [ -z $OWNEREMAIL ]
    then
      echo ERROR. No email entered. Who owns this new site?
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
  
  echo "127.0.0.1 $domain" | sudo tee -a /etc/hosts >/dev/null
  return 0
}



