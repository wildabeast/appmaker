nudgepad.on('disconnect', function () {
  $('#nudgepadConnectionStatus').html('Disconnected from server. Attempting to reconnect...').show()
})
