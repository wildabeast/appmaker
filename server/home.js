// Send the home page
app.get(/^\/$/, app.privateCheck, function (req, res, next) {
  sendPage(req, res, 'home')
})

