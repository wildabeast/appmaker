// Update account
site.post('/nudgepad.updateEmail', nudgepad.checkId, function (req, res, next) {
  
  var email = req.body.email
  if (!validateEmail(email))
    return res.send('Invalid email', 400)
  
  // Same email
  if (email == req.email)
    return res.send('Same email', 400)
  
  

  var role = nudgepad.site.get('workers').get(req.email + ' role')  
  // Generate new password
  var worker = new File(nudgepad.paths.site + 'workers/' + email + '.space')
  worker.set('name', parseName(email))
  worker.set('role', role)
  worker.set('key', hashString(email + generateSalt(8)))
  worker.create(function (error) {
    if (error) {
      console.log(error)
      return res.send('Error updating account', 500)
    }
    
    // change cookies
    res.cookie('email', email, { expires: new Date(Date.now() + 5184000000)})
    res.cookie('key', worker.get('key'), { expires: new Date(Date.now() + 5184000000)})
    res.cookie('name', worker.get('name'), { expires: new Date(Date.now() + 5184000000)})
    nudgepad.site.set('workers ' + email, new Space(worker))

    // Delete old account
    nudgepad.site.delete('workers ' + req.email)
    new File(nudgepad.paths.site + 'workers/' + req.email + '.space').trash()
    if (req.body.sendWelcomeEmail === 'true') {
      
      var message = 'Thanks for using Nudge to build your site!' + '\n\n' +
                    'View your site here: http://' + nudgepad.domain + '\n\n' +
                    'Edit your site here: http://' + nudgepad.domain + '/nudgepad' + '\n\n' +
                    'If you have any questions, please contact us at support@nudgepad.com' + '\n\n' +
                    'Thanks,' + '\n' +
                    'Ben & Breck\n'
      
      nudgepad.sendEmail('nudgepad', email, nudgepad.domain, message)
      
    }
    
    return res.send('Email changed')
  })

})
