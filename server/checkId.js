/**
 * Checks the worker is authorized and loads the worker info.
 *
 * @param {object}
 * @param {object}
 * @param {object}
 */
app.checkId = function(req, res, next) {
  
  var email = req.cookies.email || req.body.email || req.query.email
  var key = req.cookies.key || req.body.key || req.query.key
  
  // Not logged in
  if (!email) {
    // Store the url they were attempting to visit. We will
    // redirect them to that url after login.
    res.cookie('redirect', req.url)
    return res.redirect('/nudgepad/login.html')
  }
  
  // Invalid email addresss
  if (!nudgepad.site.get('workers ' + email)) {
    // If use has invalid cookies set, clear them.
    if (req.cookies.email)
      res.clearCookie('email')
    if (req.cookies.key)
      res.clearCookie('key')
    return res.send('User not found')
  }
  
  // Invalid key
  if (nudgepad.site.get('workers ' + email + ' key') !== key) {
    console.log(nudgepad.site.get('workers ' + email + ' key'))
    // If use has invalid cookies set, clear them.
    if (req.cookies.email)
      res.clearCookie('email')
    if (req.cookies.key)
      res.clearCookie('key')
    return res.send('Invalid key ' + key)
  }
  
  // Invalid role
  var role = nudgepad.site.get('workers ' + email + ' role')
  if (role !== 'owner' && role !== 'worker')
    return res.send('Not authorized')
  
  // Login okay
  req.email = email
  // Resume fulfilling request
  next()
}

app.privateCheck = function (req, res, next) {
  if (nudgepad.site.get('settings is_private') !== 'true')
    return next()
  app.checkId(req, res, next)
}
