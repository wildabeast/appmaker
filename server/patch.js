var Space = require('space')

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

var Patch = function (app) {
  
  var nudgepad = app.nudgepad
  
  // Patch
  app.post(/^\/nudgepad\.site\.patch$/, app.checkId, parseSpace, function(req, res, next) {
    
    nudgepad.patchSite(req.space, req.email)
    nudgepad.emit('patch', req.space)
    
    if (req.body.redirect)
      return res.redirect(req.body.redirect)
      
    return res.send('')
  })

}

module.exports = Patch
