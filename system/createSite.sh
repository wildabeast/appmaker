clone_url ()
{
  # echo creating from CLONE. source is $CLONE
  # http://1.com/blank.nudgepad.com.zip
  mkdir $SITESPATH$DOMAIN
  CLONENAME=$(basename $CLONE)
  curl --silent $CLONE -o $CLONENAME
  if [ ! -f "$CLONENAME" ]
    then
      echo $CLONENAME does not exist
      exit 1
  fi
  unzip -qq $CLONENAME -d $SITESPATH$DOMAIN
  rm $CLONENAME
}

createSite_ubuntu ()
{
  _start_time=`date +%s%N | cut -b1-13`
  
  DOMAIN=$1
  OWNEREMAIL=$2
  CLONE=$3
  PW=`echo $RANDOM$RANDOM`
  sudo useradd -m -p "$PW" $DOMAIN
  sudo usermod -a -G sites $DOMAIN
  sudo usermod -a -G $DOMAIN ubuntu
  
  _end_time=`date +%s%N | cut -b1-13`
  _processing_time=$((_end_time-_start_time))
#  echo Time to user created:
#  echo $_processing_time
  
  
  if [ -n "$CLONE" ]
    then
      clone_url
    else
      # echo NO CLONE provided. Creating blank site from blank.
      sudo cp -R blank $SITESPATH$DOMAIN
      sudo chown -R $DOMAIN:$DOMAIN $SITESPATH$DOMAIN
      sudo -u $DOMAIN mkdir $SITESPATH$DOMAIN/settings
      sudo -u $DOMAIN mkdir $SITESPATH$DOMAIN/workers
      sudo -u $DOMAIN mkdir $SITESPATH$DOMAIN/logs
      sudo -u $DOMAIN mkdir $SITESPATH$DOMAIN/temp
  fi
  createOwnerFile $DOMAIN $OWNEREMAIL
  sudo chown -R $DOMAIN:$DOMAIN $SITESPATH$DOMAIN
  sudo -u $DOMAIN chmod -R 770 $SITESPATH$DOMAIN/
  
  _end_time=`date +%s%N | cut -b1-13`
  _processing_time=$((_end_time-_start_time))
#  echo Time to pre git:
#  echo $_processing_time
  
#  cd $SITESPATH$DOMAIN/
#  sudo -u $DOMAIN git init >/dev/null
#  sudo -u $DOMAIN git add . >/dev/null
#  sudo -u $DOMAIN git commit -am "Initial commit" >/dev/null
  
  _end_time=`date +%s%N | cut -b1-13`
  _processing_time=$((_end_time-_start_time))
#  echo Time to done git:
#  echo $_processing_time
  
}

createSite_mac ()
{
  
  DOMAIN=$1
  OWNEREMAIL=$2
  CLONE=$3
  
  if [ -n "$CLONE" ]
    then
      clone_url
    else
      # echo NO CLONE provided. Creating blank site from blank.
      cp -R blank $SITESPATH$DOMAIN
      mkdir $SITESPATH$DOMAIN/settings
      mkdir $SITESPATH$DOMAIN/workers
      mkdir $SITESPATH$DOMAIN/logs
      mkdir $SITESPATH$DOMAIN/temp
  fi
  
  createOwnerFile $DOMAIN $OWNEREMAIL
  cd $SITESPATH$DOMAIN
  git init >/dev/null
  echo "temp/" > .gitignore
  git add . >/dev/null
  git commit -am "Initial commit" >/dev/null

}

createSite ()
{
  DOMAIN=$1
  OWNEREMAIL=$2
  CLONE=$3
  if [ -z $DOMAIN ]
    then
      echo ERROR. No domain entered. What site do you want to create?
      return 1
  fi
  if [ -z $OWNEREMAIL ]
    then
      echo ERROR. No email entered. Who owns this new site?
      return 1
  fi
  if isSite $DOMAIN
    then
      echo $DOMAIN already exists
      return 1
  fi
  if isUbuntu
    then
      createSite_ubuntu $1 $2 $3
    else
      createSite_mac $1 $2 $3
  fi
  
  echo "127.0.0.1 $DOMAIN" | sudo tee -a /etc/hosts >/dev/null
  return 0
}



