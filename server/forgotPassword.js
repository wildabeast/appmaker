// Login Post
site.post('/nudgepad.forgotPassword', function(req, res, next) {
  // Invalid email address
  var email = req.body.email
  var worker = nudgepad.site.get('workers ' + email)
  if (!worker)
    return res.redirect('/nudgepad/error.html?error=EmailNotFound')

  nudgepad.sendEmail(
    'forgotpassword',
    email,
    'Login to ' + nudgepad.domain,
    'http://' + nudgepad.domain + '/nudgepad.login?email=' + email + '&key=' + worker.get('key'),
    null,
    function (error) {
      if (error)
        return res.redirect('/nudgepad/error.html?error=UnknownError')
      else
        return res.redirect('/nudgepad/link_sent.html')
    })
    
})
