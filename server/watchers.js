fs.watch(nudgepad.paths.public, function (event, filename) {
  
  // Trigger public changed event
  // mac on old node wont emit filename
  if (!filename)
    filename = ''
  nudgepad.emit('public', filename)
  
})

/*
todo: experiment with watching this folder for all updates.
fs.watch(nudgepad.paths.site + 'pages/', function (event, filename) {
  
  // Trigger public changed event
  nudgepad.loadFolder('pages')
})
*/
