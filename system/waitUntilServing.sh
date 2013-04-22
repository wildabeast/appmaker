waitUntilServing ()
{
  x=1
  while [ $x -le 9 ]
  do
    if isActive $domain
      then
        return 0
    fi
    x=$(( $x + 1 ))
    # ubuntu supports floating point in sleep
    if isUbuntu
      then
        sleep 0.25
      else
        sleep 1
    fi
  done
#  echo "Error"
  return 1
}
