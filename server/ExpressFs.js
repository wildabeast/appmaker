var fs = require('fs')

function ExpressFs (app) {
  app.post('/nudgepad.fs', app.checkId, function(req, res, next) {
    
    var method = req.body.method
    var filename = app.nudgepad.paths.project + req.body.filename
    var data = req.body.data
    
    fs[method](filename, data, function (err) {
      res.set('Content-Type', 'text/plain')
      if (err)
        return res.send(err)
      else
        return res.send('')
    })
  })
}

module.exports = ExpressFs
