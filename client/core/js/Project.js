var Project = new Space()

Project.on('delete', function (key) {
  
  if (nudgepad.isTesting)
    return null
  
  Socket.emit('delete', key, function (data) {
    console.log('%s responded to emission: %s', document.location.host, data)
  })
  
})

Project.on('set', function (key, value) {
  var patch = new Space()
  patch.set(key, value.toString())
  
  if (nudgepad.isTesting)
    return null
  
  Socket.emit('patch', patch.toString(), function (data) {
    console.log('%s responded to emission: %s', document.location.host, data)
  })
})




