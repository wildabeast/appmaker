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
    
  
  if (this.oncopy)
    window.removeEventListener('copy', this.oncopy, false)
    
  if (this.oncut)
    window.removeEventListener('cut', this.oncut, false)
  
  if (this.onpaste)
    window.removeEventListener('paste', this.onpaste, false)

  if (this.ondrop)
    window.removeEventListener('drop', this.ondrop, false)

  if (this.onresize)
    window.removeEventListener('resize', this.onresize, false)

  if (this.onkeydown)
    $("body").off("keydown", this.onkeydown)

  Events.shortcut.shortcuts = {}
  
  if (this.onclose)
    this.onclose()

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
  
  if (Tool.openTool)
    return Tool.openTool.close(this.name)
  
  // On open event
  if (this.onopen)
    this.onopen()
  
  $('.Tool#' + this.name).show()
  
  Tool.openTool = this
  this._open = true
  
  // todo: i think we can remove selection
  nudgepad.trigger('selection')
  
  if (this.oncopy)
    window.addEventListener('copy', this.oncopy, false)
  
  if (this.oncut)
    window.addEventListener('cut', this.oncut, false)

  if (this.onpaste)
    window.addEventListener('paste', this.onpaste, false)

  if (this.ondrop)
    window.addEventListener('drop', this.ondrop, false)

  if (this.onresize)
    window.addEventListener('resize', this.onresize, false)
    
  if (this.onkeydown)
    $("body").on("keydown", this.onkeydown)  
  
  if (this.shortcuts)
    Events.shortcut.shortcuts = this.shortcuts
  

  // On ready event
  if (this.onready)
    this.onready()

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
