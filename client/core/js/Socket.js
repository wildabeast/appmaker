// Open socket
var Socket = io.connect('/')

Socket.on('file', function (space) {
  Socket.trigger('file', space)
})

Socket.on('uploadComplete', function (file) {
  Project.trigger('uploadComplete', file)
})

Socket.on('patch', function (space) {
  
  patch = new Space(patch)
  Project._patch(patch)
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

Socket.on('room.change', function (newRoom) {
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

