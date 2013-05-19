// Get file
site.get(/^\/nudgepad\.site\.([a-z0-9_]+)\.([a-z0-9_]+)$/, nudgepad.checkId, function(req, res, next) {

  var folder = req.params[0],
      file = req.params[1]
  
  if (!nudgepad.site.get(folder + ' ' + file))
    return res.send('No file named ' + folder + ' ' + file, 400)
  
  res.set('Content-Type', 'text/plain')  
  return res.send(nudgepad.site.get(folder + ' ' + file).toString())
})

// Get folder
site.get(/^\/nudgepad\.site\.([a-z0-9_]+)$/, nudgepad.checkId, function(req, res, next) {
  
  var folder = req.params[0]
  
  if (!nudgepad.site.get(folder))
    return res.send('No folder named ' + folder, 400)
  
  res.set('Content-Type', 'text/plain')
  return res.send(nudgepad.site.get(folder).toString())
})

// Download all site for editing
site.get('/nudgepad\.site', nudgepad.checkId, function (req, res, next) {
  
  var activePage = req.query.activePage || "home"
  var id = req.query.id
  
  if (!nudgepad.site.get('timelines ' + activePage))
    activePage = "home"
  
  var copy = new Space()
  copy.set('pages', nudgepad.site.get('pages'))
  copy.set('posts', nudgepad.site.get('posts'))
  copy.set('timelines ' + activePage, nudgepad.site.get('timelines ' + activePage))
  copy.set('started', nudgepad.started)
  copy.set('collage', nudgepad.site.get('collage'))
  res.set('Content-Type', 'text/plain')
  res.send(copy.toString())
})


