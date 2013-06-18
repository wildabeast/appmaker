var Email = require('./email.js')

var ForgotPassword = function (app) {
  
  var nudgepad = app.nudgepad
  
  // Login Post
  app.post('/nudgepad.forgotPassword', function(req, res, next) {
    // Invalid email address
    var email = req.body.email
    var worker = nudgepad.project.get('workers ' + email)
    if (!worker)
      return res.redirect('/nudgepad/public/error.html?error=EmailNotFound')

    Email.send(
      email,
      'forgotpassword@' + nudgepad.domain,
      'Login to ' + nudgepad.domain,
      'http://' + nudgepad.domain + '/nudgepad.login?email=' + email + '&key=' + worker.get('key'),
      null,
      function (error) {
        if (error)
          return res.redirect('/nudgepad/public/error.html?error=UnknownError')
        else
          return res.redirect('/nudgepad/public/linkSent.html')
      })

  })
  
}

module.exports = ForgotPassword
