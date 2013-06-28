// Open socket
var Socket = io.connect('/')

Socket.on('file', function (space) {
  Project.trigger('file', space)
})

Socket.on('uploadComplete', function (file) {
  Project.trigger('uploadComplete', file)
})

Socket.on('project.append', function (space) {
  
  space = new Space(space)
  var key = space.get('key')
  console.log('project.append received on %s', key)
  ProjectReceiving = true
  Project.append(key, new Space(space.get('value')))
  ProjectReceiving = false
  Flasher.activity('File ' + key + ' appended', 1000)
})

Socket.on('project.create', function (space) {
  
  space = new Space(space)
  var key = space.get('key')
  console.log('project.create received on %s', key)
  ProjectReceiving = true
  Project.create(key, new Space(space.get('value')))
  ProjectReceiving = false
  Flasher.activity('New file ' + key + ' received', 1000)
})

Socket.on('project.delete', function (key) {
  
  console.log('project.delete received on %s', key)
  ProjectReceiving = true
  Project.delete(key)
  ProjectReceiving = false
  Flasher.activity('File ' + key + ' deleted', 1000)
})

Socket.on('project.set', function (space) {
  
  space = new Space(space)
  var key = space.get('key')
  console.log('project.set received on %s', key)
  ProjectReceiving = true
  Project.set(key, new Space(space.get('value')))
  ProjectReceiving = false
  Flasher.activity('File ' + key + ' updated', 1000)
})

Socket.on('project.rename', function (space) {
  
  space = new Space(space)
  var oldName = space.get('oldName')
  var newName = space.get('newName')
  console.log('project.rename received on %s', oldName)
  ProjectReceiving = true
  Project.rename(oldName, newName)
  ProjectReceiving = false
  Flasher.activity('File ' + oldName + ' renamed to ' + newName, 1000)
})

Socket.on('connect_failed', function (error) {
  console.log('Connect failed')
  console.log(error)
  $('#ConnectionStatus').html('Connection to server failed...').show()
})

Socket.on('error', function (error) {
  console.log(error)
  $('#ConnectionStatus').html('Connecting to server...').show()
})

Socket.on('disconnect', function (message) {
  $('#ConnectionStatus').html('Disconnected from server. Attempting to reconnect...').show()
})

Socket.on('room', function (newRoom) {
  Room._clear()
  Room.patch(newRoom)
})

Socket.on('ack', function (message) {
  $('#ConnectionStatus').hide()
})

Socket.on('connect', function (message) {
  console.log('connected to server: %s', document.location.host)
  $('#ConnectionStatus').html('Connected!').fadeOut()
  nudgepad.restartCheck()
})

