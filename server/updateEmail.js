var ParseName = require('./ParseName.js'),
    RandomString = require('./RandomString.js'),
    Email = require('./email.js'),
    File = require('./File.js'),
    Space = require('space')

// http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
var ValidateEmail = function (email) { 
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

var UpdateEmail = function (app) {
  
  
  
  // Update account
  app.post(app.pathPrefix + 'updateEmail', app.checkId, function (req, res, next) {

    var email = req.body.email
    if (!ValidateEmail(email))
      return res.send('Invalid email', 400)

    // Same email
    if (email == req.email)
      return res.send('Same email', 400)

    var role = app.Project.get('workers').get(req.email + ' role')  
    // Generate new password
    var worker = new File(app.paths.project + 'workers/' + email + '.space')
    worker.set('name', ParseName(email))
    worker.set('role', role)
    worker.set('key', app.hashString(email + RandomString(8)))
    worker.create(function (error) {
      if (error) {
        console.log(error)
        return res.send('Error updating account', 500)
      }

      // change cookies
      res.cookie('email', email, { expires: new Date(Date.now() + 5184000000)})
      res.cookie('key', worker.get('key'), { expires: new Date(Date.now() + 5184000000)})
      res.cookie('name', worker.get('name'), { expires: new Date(Date.now() + 5184000000)})
      app.Project.set('workers ' + email, new Space(worker))

      // Delete old account
      app.Project.delete('workers ' + req.email)
      new File(app.paths.project + 'workers/' + req.email + '.space').trash()
      if (req.body.sendWelcomeEmail === 'true') {

        var message = 'Thanks for using NudgePad to build your project!' + '\n\n' +
                      'View your project here: http://' + app.domain + '\n\n' +
                      'Edit your project here: http://' + app.domain + '/nudgepad' + '\n\n' +
                      'If you have any questions, please contact us at support@nudgepad.com' + '\n\n' +
                      'Thanks,' + '\n' +
                      'Ben & Breck\n'

        Email.send(email, 'nudgepad@' + app.domain, app.domain, message)

      }

      return res.send('Email changed')
    })

  })
  
}



module.exports = UpdateEmail
