var exec = require('child_process').exec,
    fs = require('fs')

function Importer (app) {
  
  
  // Test of importing traditional HTML files
  app.get(/^\/nudgepad\.import\/(.+)$/, app.checkId, function(req, res, next) {

    var url = req.params[0]
    var output = app.paths['private'] + url.toLowerCase().replace(/[^a-z0-9- _\.]/gi, '').replace(/ /g, '_')
    exec('node ' + app.paths.server + 'htmltoscraps.js ' + url + ' ' + output, function (err) {
      if (err)
        return res.send(err, 400)
      res.set('Content-Type', 'text/plain')
      res.sendfile(output, function () {
        fs.unlink(output)
      })
    })
  })

  // Import a project
  app.post(app.pathPrefix + 'import', app.checkId, function (req, res, next) {
    var output = app.paths['private'] + app.domain + '.space'
    fs.writeFile(output, req.body.space, function (err, data) {
      exec('space ' + output + ' ' + app.paths.project, function () {
        res.set('Content-Type', 'text/plain')
        fs.unlink(output)
        res.send('Okay')
      })
    })
  })
}


module.exports = Importer
