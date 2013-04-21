nudgepad.on('arrive', function (name) {
  // Dont show your own arrival message
  if (name == nudgepad.name)
    return true
  nudgepad.notify(name + ' arrived')
  nudgepad.updateRoom()
})

