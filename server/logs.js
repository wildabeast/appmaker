var exec = require('child_process').exec

var Logs = function (app) {
  
  var nudgepad = app.nudgepad
  
  app.get('/nudgepad.logs', app.checkId, function(req, res, next) {

    exec('tail ' + nudgepad.paths.site + 'logs/mon.txt', function (error, stdout, stderr) {
      res.set('Content-Type', 'text/plain')
      res.send(stdout)
    })

  })
}

module.exports = Logs
