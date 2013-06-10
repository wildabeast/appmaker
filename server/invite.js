var ParseName = require('./ParseName.js'),
    RandomString = require('./RandomString.js'),
    _ = require('underscore'),
    Email = require('./email.js'),
    File = require('./File.js'),
    Space = require('space')

var Invite = function (app, nudgepad) {
  
  var createUser = function (email) {
    var worker = new File(nudgepad.paths.site + 'workers/' + email + '.space')
    worker.set('name', ParseName(email))
    worker.set('role', 'worker')
    worker.set('key', app.hashString(email + RandomString(8)))
    worker.create(function (error) {
      if (error)
        return console.log(error)

      nudgepad.site.set('workers ' + email, new Space(worker))

      Email.send(
        email,
        'nudgepad@' + nudgepad.domain,
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
    var newUsers = req.body.emails.split(/ /)
    _.each(newUsers, createUser)  
    res.send('Sent')

  })
  
}



module.exports = Invite

