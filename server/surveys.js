site.get('/nudgepad.surveys', nudgepad.checkId, function (req, res, next) {
  spacefs.folderToSpace(nudgepad.paths.surveys, function (err, space) {
    if (err)
      return res.send('Error', 500)
    res.set('Content-Type', 'text/plain')  
    return res.send(space.toString())  
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
