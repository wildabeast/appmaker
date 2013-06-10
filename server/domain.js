// We use this to communicate with proxy.js so it knows what
// domain this process serves
app.get('/nudgepad.domain', function(req, res, next) {
  res.set('Content-Type', 'text/plain')
  return res.send(nudgepad.domain)
})
