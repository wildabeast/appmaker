var Screen = new Space()
Screen.set('device', platform.name + (platform.product ? '/' + platform.product : ''))
Screen.set('email', Cookie.email)
Screen.set('name', ParseName(Cookie.email))

Screen.setColor = function () {
  if (Screen.get('color'))
    return true
  var colors = ['red', 'green', 'violet', 'yellow', 'blue', 'orange', 'indigo']
  var used = []
  Room.each(function (key, value) {
    if (value.get('color'))
      used.push(value.get('color'))
  })
  var freeColors = _.difference(colors, used)
  if (freeColors.length < 1)
    freeColors.push('black')
  Screen.set('color', freeColors[0])
}
//   Screen.setColor()

Screen.on('change', function () {
  
  if (nudgepad.isTesting)
    return null
  
  Socket.emit('screen', this.toString(), function (data) {
    console.log('%s responded to Socket.emit room: %s', document.location.host, data)
  })

})

