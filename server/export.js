var exec = require('child_process').exec

var Exporter = function (app) {
  
  
  
  app.get(app.pathPrefix + 'export', app.checkId, function (req, res, next) {
    var output = app.paths.temp + app.domain + '.space'
    exec('space ' + app.paths.project + ' ' + output, function () {
      res.set('Content-Type', 'text/plain')
      res.sendfile(output)
    })
  }) 
}

module.exports = Exporter
