isActive ()
{
  domain=$1
  if [ ! -f $runningPath$domain ]
    then
      return 1
  fi
}
