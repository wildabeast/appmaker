// All Logged in workers
site.get('/nudgepad.online', nudgepad.checkId, function(req, res, next) {
  res.set('Content-Type', 'text/plain')
  return res.send(nudgepad.online.toString())
})
