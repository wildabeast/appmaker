var exec = require('child_process').exec

var Console = function (app) {
  
  
  
  app.post('/nudgepad\.console', app.checkId, function (req, res, next) {
    res.set('Content-Type', 'text/plain')
    res.send(eval(req.body.command) + '')
  })

  app.post('/nudgepad\.exec', app.checkId, function (req, res, next) {

    exec(req.body.command, {cwd : app.paths.project},
      function (error, stdout, stderr) {
        res.set('Content-Type', 'text/plain')
        if (stderr)
          return res.send('stderr: ' + stderr)
        if (error)
          return res.send('error: ' + error)
        return res.send(stdout + '')
    })

  })
  
}

module.exports = Console
