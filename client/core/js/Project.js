var Project = new Space()

Project.on('delete', function (key) {
  
  // Send Commit to Server
  var patch = new Space()
  patch.set(key, '')
  nudgepad.emit('patch', patch.toString())
})

Project.on('set', function (key, value) {
  var patch = new Space()
  patch.set(key, value.toString())
  nudgepad.emit('patch', patch.toString())
})


nudgepad.on('patch', function (patch) {
  
  patch = new Space(patch)
  Project._patch(patch)
  Flasher.activity('Change received', 1000)
})





