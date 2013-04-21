// We use this so we can tell if the server has been
// restarted since the clients session started
site.get('/nudgepad.started', nudgepad.checkId, function (req, res, next) {
  res.set('Content-Type', 'text/plain')
  return res.send(nudgepad.started + '')
})

