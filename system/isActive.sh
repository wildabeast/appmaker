isActive ()
{
  domain=$1
  if [ ! -f $activePath$domain ]
    then
      return 1
  fi
}
