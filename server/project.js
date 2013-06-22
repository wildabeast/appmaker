var Space = require('space'),
    os = require("os")

/**
 * Middleware. Parse the posted space.
 *
 * @param {object}
 * @param {object}
 * @param {object}
 */
parseSpace = function(req, res, next) {
  // No space received
  if (typeof req.body.space != 'string')
    return res.send('No Space received')
  req.space = new Space(req.body.space)
  next()
}

var ProjectRoute = function (app) {
  
  
  
  // Get file
  app.get(/^\/nudgepad\.project\.([a-z0-9_]+)\.([a-z0-9_]+)$/, app.checkId, function(req, res, next) {

    var folder = req.params[0],
        file = req.params[1]

    if (!app.Project.get(folder + ' ' + file))
      return res.send('No file named ' + folder + ' ' + file, 400)

    res.set('Content-Type', 'text/plain')  
    return res.send(app.Project.get(folder + ' ' + file).toString())
  })

  // Get folder
  app.get(/^\/nudgepad\.project\.([a-z0-9_]+)$/, app.checkId, function(req, res, next) {

    var folder = req.params[0]

    if (!app.Project.get(folder))
      return res.send('No folder named ' + folder, 400)

    res.set('Content-Type', 'text/plain')
    return res.send(app.Project.get(folder).toString())
  })

  // Download all project for editing
  app.get('/nudgepad\.project', app.checkId, function (req, res, next) {

    var activePage = req.query.activePage || "home"

    if (!app.Project.get('timelines ' + activePage))
      activePage = "home"

    var copy = new Space()
    copy.set('pages', app.Project.get('pages'))
    copy.set('posts', app.Project.get('posts'))
    copy.set('timelines ' + activePage, app.Project.get('timelines ' + activePage))
    copy.set('started', nudgepad.started)
    var hostname = os.hostname()
    if (app.development)
      hostname = 'localhost'
    copy.set('hostname', hostname)
    res.set('Content-Type', 'text/plain')
    res.send(copy.toString())
  })
  
  // Patch
  app.post(/^\/nudgepad\.project\.patch$/, app.checkId, parseSpace, function(req, res, next) {

    nudgepad.patchProject(req.space, req.email)
    nudgepad.emit('patch', req.space)

    if (req.body.redirect)
      return res.redirect(req.body.redirect)

    return res.send('')
  })

  
}

module.exports = ProjectRoute
