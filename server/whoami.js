nudgepad.whoami = function(req, res, next) {
  res.set('Content-Type', 'text/plain')
  return res.send(req.email)
}

// Logged in worker
app.get('/nudgepad.whoami', app.checkId, nudgepad.whoami)

