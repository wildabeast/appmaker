/**
 * Emits an event to all open tabs.
 */
nudgepad.emit = function (event, string, socket) {
  
  // To emit it to all except the sending client
  if (socket)
    socket.broadcast.emit(event, string.toString())
  else
    io.sockets.emit(event, string.toString())
}
