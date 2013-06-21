function Tool(name) {
  this.name = name
  this._open = false
  this.events = {}
  Tool.tools.push(name)
}

Tool.tools = []

Tool.openTool = null

Tool.prototype.close = function (name) {

  // Return false if already closed
  if (!this._open)
    return false
  
  this.trigger('close')

  this._open = false
  Tool.openTool = false
  
  $('.Tool').hide()
  
  if (name)
    window[name].open()
  
}

/**
 * @return {bool}
 */
Tool.prototype.isOpen = function () {
  return this._open
}

Tool.prototype.open = function () {

  // Return false if already open
  if (this._open)
    return false
  
  // Close any open Tool
  if (Tool.openTool)
    return Tool.openTool.close(this.name)
  
  // On open event
  this.trigger('open')
  
  // We could probably remove this.
  $('.Tool#' + this.name).show()
  
  
  Tool.openTool = this
  this._open = true

  // On ready event
  this.trigger('ready')

  mixpanel.track('I opened the ' + this.name + ' tool')

}

Tool.prototype.off = function (eventName, fn) {
  if (!this.events[eventName])
    return true
  for (var i in this.events[eventName]) {
    if (this.events[eventName][i] === fn)
      this.events[eventName].splice(i, 1)
  }
}

Tool.prototype.on = function (eventName, fn) {
  if (!this.events[eventName])
    this.events[eventName] = []
  this.events[eventName].push(fn)
}

Tool.prototype.restart = function () {
  this.close()
  this.open()
}

Tool.prototype.toggle = function () {
  if (this._open)
    this.close()
  else
    this.open()
}

Tool.prototype.trigger = function (eventName, space) {
  for (var i in this.events[eventName]) {
    this.events[eventName][i](space)
  }
}
