function Tool(name) {
  this.name = name
  this._open = false
  Tool.tools.push(name)
}

Tool.tools = []

Tool.openTool = null

Tool.prototype = new Space()

Tool.prototype.close = function (name) {

  // Return false if already closed
  if (!this._open)
    return false
  
  this.trigger('close')

  this._open = false
  Tool.openTool = null
  
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
