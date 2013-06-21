var Space = require('space'),
    os = require("os")

var ProjectRoute = function (app) {
  
  var nudgepad = app.nudgepad
  
  // Get file
  app.get(/^\/nudgepad\.project\.([a-z0-9_]+)\.([a-z0-9_]+)$/, app.checkId, function(req, res, next) {

    var folder = req.params[0],
        file = req.params[1]

    if (!nudgepad.project.get(folder + ' ' + file))
      return res.send('No file named ' + folder + ' ' + file, 400)

    res.set('Content-Type', 'text/plain')  
    return res.send(nudgepad.project.get(folder + ' ' + file).toString())
  })

  // Get folder
  app.get(/^\/nudgepad\.project\.([a-z0-9_]+)$/, app.checkId, function(req, res, next) {

    var folder = req.params[0]

    if (!nudgepad.project.get(folder))
      return res.send('No folder named ' + folder, 400)

    res.set('Content-Type', 'text/plain')
    return res.send(nudgepad.project.get(folder).toString())
  })

  // Download all project for editing
  app.get('/nudgepad\.project', app.checkId, function (req, res, next) {

    var activePage = req.query.activePage || "home"

    if (!nudgepad.project.get('timelines ' + activePage))
      activePage = "home"

    var copy = new Space()
    copy.set('pages', nudgepad.project.get('pages'))
    copy.set('posts', nudgepad.project.get('posts'))
    copy.set('timelines ' + activePage, nudgepad.project.get('timelines ' + activePage))
    copy.set('started', nudgepad.started)
    var hostname = os.hostname()
    if (nudgepad.development)
      hostname = 'localhost'
    copy.set('hostname', hostname)
    res.set('Content-Type', 'text/plain')
    res.send(copy.toString())
  })
  
}

module.exports = ProjectRoute
