var Login = function (app) {
  
  
  
  
  // Login Page
  app.get(app.pathPrefix + 'login', function(req, res, next) {

    if (req.query.email && req.query.key) {
      var maker = app.Project.get('makers ' + req.query.email)

      if (!maker)
        return res.redirect('/nudgepad/public/login.html')

      // Wrong key
      if (maker.get('key') !== req.query.key)
        return res.send('Invalid key')

      // Login successful!
      res.cookie('email', req.query.email, { expires: new Date(Date.now() + 5184000000)})
      res.cookie('key', req.query.key, { expires: new Date(Date.now() + 5184000000)})
      res.cookie('name', maker.name, { expires: new Date(Date.now() + 5184000000)})

      // temp fix
      var appString = '?login=true'
      if (req.query.tool)
        appString += '&tool=' + req.query.tool
      if (req.query.newProject)
        appString += '&newProject=' + req.query.newProject
      if (req.query.timestamp)
        appString += '&timestamp=' + req.query.timestamp

      return res.redirect('/nudgepad' + appString)
    }

    return res.redirect('/nudgepad/public/login.html')
  })

  // Login Post
  app.post(app.pathPrefix + 'login', function(req, res, next) {
    // Invalid email addresss
    if (!app.Project.get('makers ' + req.body.email))
      return res.redirect('/nudgepad/public/login.html?error=User_not_found')

    var maker = app.Project.get('makers ' + req.body.email)

    // Wrong key
    if (maker.get('key') != req.body.key)
        return res.redirect('/nudgepad/public/login.html?error=Wrong_key')

    // Login successful!
    res.cookie('email', req.body.email, { expires: new Date(Date.now() + 5184000000)})
    res.cookie('key', maker.get('key'), { expires: new Date(Date.now() + 5184000000)})
    res.cookie('name', maker.name, { expires: new Date(Date.now() + 5184000000)})



    if (req.body.redirect)
      return res.redirect(req.body.redirect)

    if (req.cookies.redirect)
      return res.redirect(req.cookies.redirect)

    return res.redirect('/nudgepad')
  })
  
}



module.exports = Login
