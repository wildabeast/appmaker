var Email = require('./email.js')

var ForgotPassword = function (app) {
  
  
  
  // Login Post
  app.post(app.pathPrefix + 'forgotPassword', function(req, res, next) {
    // Invalid email address
    var email = req.body.email
    var worker = app.Project.get('workers ' + email)
    if (!worker)
      return res.redirect('/nudgepad/public/error.html?error=EmailNotFound')

    Email.send(
      email,
      'forgotpassword@' + app.domain,
      'Login to ' + app.domain,
      'http://' + app.domain + app.pathPrefix + 'login?email=' + email + '&key=' + worker.get('key'),
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
