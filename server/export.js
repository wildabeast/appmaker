var exec = require('child_process').exec

var Exporter = function (app) {
  
  var nudgepad = app.nudgepad
  
  app.get('/nudgepad.export', app.checkId, function (req, res, next) {
    var output = nudgepad.paths.temp + nudgepad.domain + '.space'
    exec('space ' + nudgepad.paths.project + ' ' + output, function () {
      res.set('Content-Type', 'text/plain')
      res.sendfile(output)
    })
  }) 
}

module.exports = Exporter
