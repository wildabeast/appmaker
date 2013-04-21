nudgepad.whoami = function(req, res, next) {
  res.set('Content-Type', 'text/plain')
  return res.send(req.email)
}

// Logged in worker
site.get('/nudgepad.whoami', nudgepad.checkId, nudgepad.whoami)

