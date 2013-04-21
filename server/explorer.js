/**
 * Get a file API.
 * path
 */
site.get('/nudgepad.explorer.list', nudgepad.checkId, function(req, res, next) {
  spacefs.folderToStatsConcise(nudgepad.paths.site, function (err, space) {
    res.set('Content-Type', 'text/plain')
    return res.send(space.toString())    
  })
})

/**
 * Get a file API.
 * path
 */
site.get('/nudgepad.explorer.public', nudgepad.checkId, function(req, res, next) {
  spacefs.folderToStatsConcise(nudgepad.paths.public, function (err, space) {
    res.set('Content-Type', 'text/plain')
    return res.send(space.toString())    
  })
})

/**
 * Get a file API.
 * path
 */
site.post('/nudgepad.explorer.get', nudgepad.checkId, function(req, res, next) {
  fs.readFile(nudgepad.paths.site + req.body.path, 'utf8', function (err, contents) {
    res.send(contents)
  })
})

/**
 * Remove a file API.
 * path
 */
site.post('/nudgepad.explorer.remove', nudgepad.checkId, function(req, res, next) {
  
  fs.unlink(nudgepad.paths.site + req.body.path, function (err) {
    if (err) return res.send(err)
    res.send('')
  })
  
})

/**
 * Rename a file API.
 * path
 */
site.post('/nudgepad.explorer.rename', nudgepad.checkId, function(req, res, next) {
  
  fs.rename(nudgepad.paths.site + req.body.oldPath, nudgepad.paths.site + req.body.newPath, function (err) {
    if (err) return res.send(err)
    res.send('')
  })
  
})


/**
 * Save a file API.
 * path
 * content
 */
site.post('/nudgepad.explorer.save', nudgepad.checkId, function(req, res, next) {
  
  fs.writeFile(nudgepad.paths.site + req.body.path, req.body.content, 'utf8', function (err) {
    if (err) return res.send(err)
    res.send('')
  })
  
})
