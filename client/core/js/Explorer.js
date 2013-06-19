/**
 * @special Singleton
 */
var Explorer = {}

Explorer.create = function (path, callback) {
  var req = {}
  req.path = path
  req.content = ''
  $.post('/nudgepad.explorer.save', req, function (err) {
    callback()
  })
}

Explorer.downloadTimelines = function () {
  $.get('/nudgepad.project.timelines', {}, function (data) {
    var space = new Space(data)
    space.delete(Design.stage.activePage) // We already have the open page
    Project.get('timelines').patch(space)
  })
}

/**
 * Sync the clients project with the server.
 *
 * @param {function}
 */
Explorer.getProject = function (callback) {
  var activePage = store.get('activePage') || 'home'
  $.get('/nudgepad.project', { activePage : activePage, id : nudgepad.id }, function (space) {
    Project = new Space(space)
    var online = Project.get('collage').keys.length + 1
    var title = nudgepad.domain + '. ' + online + ' user' + (online > 1 ? 's' : '') + ' online.'
    Blinker.default = title
    document.title = title
    callback()
  })
}

Explorer.quickEdit = function () {
  Explorer.edit(prompt('Enter path to file you want to edit', 'public/project.css'))
}

Explorer.remove = function (path, callback) {
  var req = {}
  req.path = path
  $.post( '/nudgepad.explorer.remove', req, function (data) {
    callback()
  })
}

Explorer.rename = function (oldPath, newPath, callback) {
  var req = {}
  req.oldPath = oldPath
  req.newPath = newPath
  if (!newPath)
    return Flasher.error('No name provided')
  $.post('/nudgepad.explorer.rename', req, function (err) {
    callback()
  })
}

/**
 * Edit a text file
 *
 * @param {string} File you want to edit
 */
Explorer.edit = function (path) {
  var req = {}
  req.path = path
  $.post( '/nudgepad.explorer.get', req, function (data) {
    TextPrompt('Editing ' + path, data, function (val) {
      var req = {}
      req.path = path
      req.content = val + ''
      $.post('/nudgepad.explorer.save', req, function (err) {
        console.log(err)
      })
    })
  })
}



