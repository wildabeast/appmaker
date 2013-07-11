var superagent = require('superagent')

var Persona = function (app) {
  
  
  
  // Persona Login
  app.post(app.pathPrefix + 'persona', function(req, res, next) {

    var assertion = req.body.assertion

    superagent
      .post('https://verifier.login.persona.org/verify')
      .send({ assertion: assertion, audience: 'http://' + app.domain })
      .end(function(error, result){

        if (error)
          return res.send(error)

        var email = result.body.email

        var maker = app.Project.get('team ' + email)

        if (!maker)
          return res.send('No user with email ' + email)

        // Login successful!
        res.cookie('email', email, { expires: new Date(Date.now() + 5184000000)})
        res.cookie('key', maker.get('key'), { expires: new Date(Date.now() + 5184000000)})
        res.cookie('name', maker.get('name'), { expires: new Date(Date.now() + 5184000000)})
        res.redirect('/nudgepad')

      })
  })
  
}

module.exports = Persona
