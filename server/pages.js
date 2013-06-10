var Pages = function (app, nudgepad) {
  app.get('*', app.privateCheck, function (req, res, next) {

    var name = req.params[0].substr(1)

    if (name === 'home')
      return res.redirect('/')

    if (!nudgepad.site.get('pages ' + name))
      return next()

    app.sendPage(req, res, name)

  }) 
}

module.exports = Pages
