var Home = function (app) {

  // Send the home page
  app.get(/^\/$/, app.privateCheck, function (req, res, next) {
    app.sendPage(req, res, 'home')
  })

}

module.exports = Home
