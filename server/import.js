// Test of importing traditional HTML files
site.get(/^\/nudgepad\.import\/(.+)$/, nudgepad.checkId, function(req, res, next) {
  
  var url = req.params[0]
  var output = nudgepad.paths.temp + url.toLowerCase().replace(/[^a-z0-9- _\.]/gi, '').replace(/ /g, '_')
  exec('node ' + nudgepad.paths.server + 'htmltoscraps.js ' + url + ' ' + output, function (err) {
    if (err)
      return res.send(err, 400)
    res.set('Content-Type', 'text/plain')
    res.sendfile(output)
  })
})

// Import a site
site.post('/nudgepad.import', nudgepad.checkId, function (req, res, next) {
  var output = nudgepad.paths.temp + nudgepad.domain + '.space'
  fs.writeFile(output, req.body.space, function (err, data) {
    exec('space ' + output + ' ' + nudgepad.paths.site, function () {
      res.set('Content-Type', 'text/plain')
      res.send('Okay')
    })
  })
})

