var ParseName = require('./ParseName.js'),
    RandomString = require('./RandomString.js'),
    _ = require('underscore'),
    Email = require('./email.js'),
    File = require('./File.js'),
    Space = require('space')

var Invite = function (app) {
  
  
  
  var createUser = function (email) {
    var maker = new File(app.paths.project + 'makers/' + email + '.space')
    maker.set('name', ParseName(email))
    maker.set('role', 'maker')
    maker.set('key', app.hashString(email + RandomString(8)))
    maker.create(function (error) {
      if (error)
        return console.log(error)

      app.Project.set('makers ' + email, new Space(maker))

      Email.send(
        email,
        'nudgepad@' + app.domain,
        'Your login link to ' + app.domain,
        'http://' + app.domain + app.pathPrefix + 'login?email=' + email + '&key=' + maker.get('key'),
        null,
        function (error) {
          if (error)
            console.log(error)
        })

    })
  }
  
  app.post(app.pathPrefix + 'invite', app.checkId, function (req, res, next) {
    var newUsers = req.body.emails.split(/ /)
    _.each(newUsers, createUser)  
    res.send('Sent')

  })
  
}



module.exports = Invite

