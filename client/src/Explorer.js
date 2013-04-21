/**
 * @special Singleton
 */
nudgepad.explorer = {}

nudgepad.explorer.create = function (path, callback) {
  var req = {}
  req.path = path
  req.content = ''
  $.post('/nudgepad.explorer.save', req, function (err) {
    callback()
  })
}

nudgepad.explorer.quickEdit = function () {
  nudgepad.explorer.edit(prompt('Enter path to file you want to edit', 'public/site.css'))
}

nudgepad.explorer.remove = function (path, callback) {
  var req = {}
  req.path = path
  $.post( 'nudgepad.explorer.remove', req, function (data) {
    callback()
  })
}

nudgepad.explorer.rename = function (oldPath, newPath, callback) {
  var req = {}
  req.oldPath = oldPath
  req.newPath = newPath
  if (!newPath)
    return nudgepad.error('No name provided')
  $.post('/nudgepad.explorer.rename', req, function (err) {
    callback()
  })
}

/**
 * Edit a text file
 *
 * @param {string} File you want to edit
 */
nudgepad.explorer.edit = function (path) {
  var req = {}
  req.path = path
  $.post( 'nudgepad.explorer.get', req, function (data) {
    nudgepad.textPrompt('Editing ' + path, data, function (val) {
      var req = {}
      req.path = path
      req.content = val + ''
      $.post('/nudgepad.explorer.save', req, function (err) {
        console.log(err)
      })
    })
  })
}



