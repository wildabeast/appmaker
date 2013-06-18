var exec = require('child_process').exec

var Clear = function (app) {
  
  var nudgepad = app.nudgepad
  
  app.get('/nudgepad.clear', app.checkId, function(req, res, next) {

    res.set('Content-Type', 'text/plain')
    // We clear timelines
    exec('rm -f ' + nudgepad.paths.project + 'timelines/*.space',
      function (error, stdout, stderr) {

        if (stderr)
          return res.send('stderr: ' + stderr)
        if (error)
          return res.send('error: ' + error)

        return res.send('Restarting Nudge')
          process.exit(0)
    })


  })
}

module.exports = Clear

