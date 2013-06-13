var exec = require('child_process').exec,
    fs = require('fs'),
    Space = require('space'),
    Email = require('./email.js')

var Survey = function (app) {
  
  var nudgepad = app.nudgepad
  
  app.get('/nudgepad.surveys', app.checkId, function (req, res, next) {

    var output = nudgepad.paths.temp + 'surveys.space'
    exec('space ' + nudgepad.paths.surveys + ' ' + output, function () {
      res.set('Content-Type', 'text/plain')
      res.sendfile(output)
    })

  })

  app.post('/nudgepad.surveys', function (req, res, next) {

    // Save submission
    var timestamp = new Date().getTime()
    var filename = timestamp + '.space'
    var space = new Space(req.body)
    fs.writeFile(nudgepad.paths.surveys + filename, space.toString(), 'utf8', function (error) {
      if (error)
        return res.send('Save Error: ' + error, 500)

      // The following will send the submission to an email address on file for the site
      // if one exists.
      if (nudgepad.site.get('settings email'))
        Email.send(nudgepad.site.get('settings email'), 'surveys@' + nudgepad.domain, nudgepad.domain + ': New Message', space.toString())

      res.send('')
    })

  })
  
}

module.exports = Survey


