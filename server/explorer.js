function fileStats (path, callback) {
  
  fs.stat(path, function (err, stat) {

    // Quit on error
    if (err)
      return callback(err)

    if (stat.isDirectory())
      return folderStats(path + '/', callback)

    var space = new Space()
    space.set('mtime', stat.mtime.getTime())
    space.set('size', (stat.size/1000000).toFixed(1) + 'MB')
    space.set('bytes', stat.size)
    space.set('age', ((new Date().getTime() - stat.ctime.getTime())/86400000).toFixed(1) + 'D')
    space.set('freshness', ((new Date().getTime() - stat.mtime.getTime())/1000).toFixed(0) + 'S')
    space.set('timeSinceLastChange', ((new Date().getTime() - stat.mtime.getTime())/86400000).toFixed(1) + 'D')
    space.set('oneliner', space.get('bytes') + ' ' + space.get('mtime'))

    callback(false, space)
  })
  
}

function folderStats (path, callback) {
  
  fs.readdir(path, function (err, files) {
    
    if (err)
      return callback(err)
    
    var space = new Space()
    var paths = _.map(files, function (value){return path + value})
    
    async.mapSeries(paths, fileStats, function(err, stats){

      if (err)
        return callback(err)
      
      // stats is now an array of stats for each file
      for (var i in files) {
        space.set(files[i], stats[i])
      }
      
      callback(false, space)
    })    
  
  })
 
}

/**
 * Get a file API.
 * path
 */
site.get('/nudgepad.explorer.list', nudgepad.checkId, function(req, res, next) {
  folderStats(nudgepad.paths.site, function (err, space) {
    res.set('Content-Type', 'text/plain')
    return res.send(space.toString())    
  })
})

/**
 * Get a file API.
 * path
 */
site.get('/nudgepad.explorer.public', nudgepad.checkId, function(req, res, next) {
  folderStats(nudgepad.paths.public, function (err, space) {
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
