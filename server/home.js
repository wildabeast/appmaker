var Home = function (app) {

  // Send the home page
  app.get(/^\/$/, function (req, res, next) {
    app.sendPage(req, res, 'home')
  })

}

module.exports = Home
