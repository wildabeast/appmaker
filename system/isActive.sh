isActive ()
{
  DOMAIN=$1
  if [ ! -f $ACTIVEPATH$DOMAIN ]
    then
      return 1
  fi
}
