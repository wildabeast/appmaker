nudgepad.updateRoom = function () {
  $.get('/nudgepad.online', {}, function (data) {
    var space = new Space(data)
    nudgepad.title = nudgepad.domain + '. ' + space.keys.length + ' user' + (space.keys.length > 1 ? 's' : '') + ' online.'
    document.title = nudgepad.title
    blinker.default = nudgepad.title
  })
}
