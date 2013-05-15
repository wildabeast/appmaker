nudgepad.on('arrive', function (name) {
  // Dont show your own arrival message
  if (name == nudgepad.name)
    return true
  nudgepad.notify(name + ' arrived')
  mixpanel.track('I collaborated in realtime')
  nudgepad.updateRoom()
})

