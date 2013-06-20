var Screen = new Space()
Screen.set('device', platform.name + (platform.product ? '/' + platform.product : ''))
Screen.set('email', Cookie.email)
Screen.set('name', ParseName(Cookie.email))

nudgepad.setScreenColor = function () {
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

Screen.on('change', function () {
  nudgepad.emit('room.change', this)
})

