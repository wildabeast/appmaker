nudgepad.on('depart', function (name) {
  // Dont show your own depart message
  if (name == nudgepad.name)
    return true
  nudgepad.notify(name + ' left')
  nudgepad.updateRoom()
})

