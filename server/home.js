// Send the home page
site.get(/^\/$/, nudgepad.privateCheck, function (req, res, next) {
  sendPage(req, res, 'home')
})

