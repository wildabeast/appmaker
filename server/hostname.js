var os = require("os")

function Hostname (app) {
  app.get('/nudgepad.hostname', app.checkId, function(req, res, next) {
    res.set('Content-Type', 'text/plain')
    return res.send(os.hostname())
  })
}

module.exports = Hostname
