// Logout
site.get('/nudgepad.logout', function(req, res, next) {
  res.clearCookie('email')
  res.clearCookie('key')
  return res.redirect('/nudgepad/login.html')
})
