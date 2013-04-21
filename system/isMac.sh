isMac ()
{
  if [ $OSTYPE == "darwin11" ]
    then
      return 0
    else
      return 1
  fi
}

isUbuntu ()
{
  if isMac
    then
    return 1
  else
    return 0
  fi
}
