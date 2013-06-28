// Open socket
var Socket = io.connect('/')

Socket.on('file', function (space) {
  Project.trigger('file', space)
})

Socket.on('uploadComplete', function (file) {
  Project.trigger('uploadComplete', file)
})

Socket.on('project.set', function (space) {
  
  patch = new Space(patch)
  Project._set(patch.get('key'), patch.get('value'))
  Flasher.activity('Change received', 1000)
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

