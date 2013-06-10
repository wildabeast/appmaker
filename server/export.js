app.get('/nudgepad.export', app.checkId, function (req, res, next) {
  var output = nudgepad.paths.temp + nudgepad.domain + '.space'
  exec('space ' + nudgepad.paths.site + ' ' + output, function () {
    res.set('Content-Type', 'text/plain')
    res.sendfile(output)
  })
})

