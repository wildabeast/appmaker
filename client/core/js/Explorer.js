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
    Project.get('timelines').patch(space)
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

Explorer.quickEdit = function () {
  Explorer.edit(prompt('Enter path to file you want to edit', 'project.css'))
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


