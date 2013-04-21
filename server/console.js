site.post('/nudgepad\.console', nudgepad.checkId, function (req, res, next) {
  res.set('Content-Type', 'text/plain')
  res.send(eval(req.body.command) + '')
})

site.post('/nudgepad\.exec', nudgepad.checkId, function (req, res, next) {

  exec(req.body.command, {cwd : nudgepad.paths.site},
    function (error, stdout, stderr) {
      res.set('Content-Type', 'text/plain')
      if (stderr)
        return res.send('stderr: ' + stderr)
      if (error)
        return res.send('error: ' + error)
      if (stdout)
        return res.send(stdout + '')
      }
  )
  
  
})

