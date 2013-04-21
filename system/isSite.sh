isSite ()
{
  DOMAIN=$1
  if [ -d "$SITESPATH/$DOMAIN" ]
    then
      return 0
    else
      return 1
  fi
}

isNoteSite ()
{
  if isSite $1
    then
      return 1
    else
      return 0
  fi
}
