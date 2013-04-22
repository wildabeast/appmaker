isProxyUp ()
{
  
  if sudo mon --pidfile $tempPath/proxyMonPid --status | grep -q "alive"
    then
      return 0
    else      
      return 1
  fi
}

is_proxy_down ()
{
  if isProxyUp $1
    then
      return 1
    else
      return 0
  fi
}
