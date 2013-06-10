var ParseName = require('./parseName.js'),
    RandomString = require('./RandomString.js')

var createUser = function (email) {
  var worker = new File(nudgepad.paths.site + 'workers/' + email + '.space')
  worker.set('name', ParseName(email))
  worker.set('role', 'worker')
  worker.set('key', app.hashString(email + RandomString(8)))
  worker.create(function (error) {
    if (error)
      return console.log(error)

    nudgepad.site.set('workers ' + email, new Space(worker))
    
    nudgepad.sendEmail(
      'nudgepad',
      email,
      'Your login link to ' + nudgepad.domain,
      'http://' + nudgepad.domain + '/nudgepad.login?email=' + email + '&key=' + worker.get('key'),
      null,
      function (error) {
        if (error)
          console.log(error)
      })
    
  })
}

app.post('/nudgepad.invite', app.checkId, function (req, res, next) {
  var username = 'nudgepad'
  var newUsers = req.body.emails.split(/ /)
  _.each(newUsers, createUser)  
  res.send('Sent')

})
