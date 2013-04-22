# Generate owner user file
createOwnerFile ()
{
  domain=$1
  OWNEREMAIL=$2
  OWNERKEY=$(echo $OWNEREMAIL$RANDOM$RANDOM | shasum -a 256 | sed "s/  -//g")
  OWNERNAME=$(echo $OWNEREMAIL | sed "s/@.*//g" | sed "s/[0-9]//g" | sed "s/\./ /g")
  OWNERLINK=$(echo "http://$domain/nudgepad.login?email=$OWNEREMAIL&key=$OWNERKEY")
  if isMac
    then
      printf "name $OWNERNAME\nkey $OWNERKEY\nrole owner\n" | tee -a $sitesPath$domain/workers/$OWNEREMAIL.space >/dev/null
    else
      printf "name $OWNERNAME\nkey $OWNERKEY\nrole owner\n" | sudo tee -a $sitesPath$domain/workers/$OWNEREMAIL.space >/dev/null
  fi
  
}
