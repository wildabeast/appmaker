var randomColor = function () {
  var colors = ['red', 'green', 'violet', 'yellow', 'blue', 'orange', 'indigo']
  var max = colors.length - 1
  var min = 0
  var random = Math.floor(Math.random() * (max - min + 1)) + min
  return colors[random]
}

var Screen = new Space()
Screen.set('id', 'screen' + new Date().getTime())
Screen.set('device', platform.name + (platform.product ? '/' + platform.product : ''))
Screen.set('email', Cookie.email)
Screen.set('name', ParseName(Cookie.email))
Screen.set('color', randomColor())

Screen.on('set', function (key, value) {
  
  if (nudgepad.isTesting)
    return null
  
  var change = new Space()
  change.set('key', Screen.get('id') + ' ' + key)
  change.set('value', value)
  
  Socket.emit('screens.set', change.toString(), function (data) {
    console.log('%s responded to Screens.set: %s', document.location.host, data)
  })

})

var Screens = new Space()
