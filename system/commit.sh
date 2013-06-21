commit ()
{
  cd $projectsPath/$1
  sudo -u $1 git add .
  sudo -u $1 git commit --author="Nudgepad Backup <autobackup@$1>" -am "Auto backup..."
}
