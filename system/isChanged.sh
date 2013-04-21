isChanged ()
{
  cd $SITESPATH/$1
  if sudo -u $1 git status | grep -q "nothing to commit"
     then
       return 1
     else
       return 0
   fi
}

is_not_changed ()
{
  if isChanged $1
    then
      return 1
    else
      return 0
  fi
}

