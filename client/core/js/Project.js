var Project = new Space()

var ProjectReceiving = false

var ProjectAppend = function (key, value) {
  
  if (ProjectReceiving)
    return true
  
  if (nudgepad.isTesting)
    return true
  
  var change = new Space()
  change.set('key', key)
  change.set('value', value.toString())
  
  Socket.emit('project.append', change.toString(), function (data) {
    console.log('%s responded to Socket.emit project.append: %s', document.location.host, data)
  })
  
}

var ProjectCreate = function (key, value) {
  
  if (ProjectReceiving)
    return true
  
  var change = new Space()
  change.set('key', key)
  change.set('value', value.toString())
  
  if (nudgepad.isTesting)
    return null
  
  Socket.emit('project.create', change.toString(), function (data) {
    console.log('%s responded to Socket.emit project.create: %s', document.location.host, data)
  })
}

var ProjectDelete = function (key) {
  
  if (ProjectReceiving)
    return true
  
  if (nudgepad.isTesting)
    return null
  
  Socket.emit('project.delete', key, function (data) {
    console.log('%s responded to Socket.emit project.delete: %s', document.location.host, data)
  })
  
}

var ProjectRename = function (oldName, newName) {
  if (ProjectReceiving)
    return true
  
  if (nudgepad.isTesting)
    return null
  
  var change = new Space()
  change.set('oldName', oldName)
  change.set('newName', newName)

  Socket.emit('project.rename', change.toString(), function (data) {
    console.log('%s responded to Socket.emit project.rename: %s', document.location.host, data)
  })
}

var ProjectSet = function (key, value) {
  
  if (ProjectReceiving)
    return true
  
  var change = new Space()
  change.set('key', key)
  change.set('value', value.toString())
  
  if (nudgepad.isTesting)
    return null
  
  Socket.emit('project.set', change.toString(), function (data) {
    console.log('%s responded to Socket.emit project.set: %s', document.location.host, data)
  })
}

Project.on('append', ProjectAppend)
Project.on('create', ProjectCreate)
Project.on('delete', ProjectDelete)
Project.on('rename', ProjectRename)
Project.on('set', ProjectSet)




