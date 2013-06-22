var exec = require('child_process').exec,
    fs = require('fs'),
    Space = require('space'),
    Email = require('./email.js')

var Survey = function (app) {
  
  
  
  app.get(app.pathPrefix + 'surveys', app.checkId, function (req, res, next) {

    var output = app.paths.temp + 'surveys.space'
    exec('space ' + app.paths.surveys + ' ' + output, function () {
      res.set('Content-Type', 'text/plain')
      res.sendfile(output)
    })

  })

  app.post(app.pathPrefix + 'surveys', function (req, res, next) {

    // Save submission
    var timestamp = new Date().getTime()
    var filename = timestamp + '.space'
    var space = new Space(req.body)
    fs.writeFile(app.paths.surveys + filename, space.toString(), 'utf8', function (error) {
      if (error)
        return res.send('Save Error: ' + error, 500)

      // The following will send the submission to an email address on file for the project
      // if one exists.
      if (app.Project.get('settings email'))
        Email.send(app.Project.get('settings email'), 'surveys@' + app.domain, app.domain + ': New Message', space.toString())

      res.send('')
    })

  })
  
}

module.exports = Survey


