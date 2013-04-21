// Get file
site.get(/^\/nudgepad\.import\/(.+)$/, nudgepad.checkId, function(req, res, next) {
  
  var url = req.params[0]
  request.get('http://import.nudgepad.com/get/' + url, function (error, response) {
    if (error)
      return res.send(error, 400)
    res.send(response.body)
  })
})
