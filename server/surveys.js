site.get('/nudgepad.surveys', nudgepad.checkId, function (req, res, next) {
  
  var output = nudgepad.paths.temp + 'surveys.space'
  exec('space ' + nudgepad.paths.surveys + ' ' + output, function () {
    res.set('Content-Type', 'text/plain')
    res.sendfile(output)
  })
  
})

site.post('/nudgepad.surveys', function (req, res, next) {
  
  // Save submission
  var timestamp = new Date().getTime()
  var filename = timestamp + '.space'
  var space = new Space(req.body)
  fs.writeFile(nudgepad.paths.surveys + timestamp + '.space', space.toString(), 'utf8', function (error) {
    if (error)
      return res.send('Save Error: ' + error, 500)
    // email form
    
    if (nudgepad.site.get('settings catchall'))
      nudgepad.sendEmail('surveys', nudgepad.site.get('settings catchall'), nudgepad.domain + ': New Message', space.toString())
    
    res.send('')
  })

})
