var Project = new Space()

Project.append = function (key, value) {
  this._set(key, value)
  this.trigger('append', key, value)
  return this
}

Project.create = function (key, value) {
  this._set(key, value)
  this.trigger('create', key, value)
  return this
}

Project.on('append', function (key, filename, value) {
  
  if (nudgepad.isTesting)
    return null
  
  var change = new Space()
  change.set('key', key)
  change.set('key', filename)
  change.set('value', value.toString())
  
  Socket.emit('project.append', change.toString(), function (data) {
    console.log('%s responded to Socket.emit project.append: %s', document.location.host, data)
  })
  
})

Project.on('create', function (key, value) {
  var change = new Space()
  change.set('key', key)
  change.set('value', value.toString())
  
  if (nudgepad.isTesting)
    return null
  
  Socket.emit('project.create', change.toString(), function (data) {
    console.log('%s responded to Socket.emit project.create: %s', document.location.host, data)
  })
})

Project.on('delete', function (key) {
  
  if (nudgepad.isTesting)
    return null
  
  Socket.emit('project.delete', key, function (data) {
    console.log('%s responded to Socket.emit project.delete: %s', document.location.host, data)
  })
  
})

Project.on('set', function (key, value) {
  var change = new Space()
  change.set('key', key)
  change.set('value', value.toString())
  
  if (nudgepad.isTesting)
    return null
  
  Socket.emit('project.set', change.toString(), function (data) {
    console.log('%s responded to Socket.emit project.set: %s', document.location.host, data)
  })
})




