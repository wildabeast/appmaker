var spawn = require('child_process').spawn

var Backup = function (app, nudgepad) {
  
  
  // http://stackoverflow.com/questions/5754153/zip-archives-in-node-js
  app.get('/nudgepad.backup/' + nudgepad.domain + '.zip', app.checkId, function(req, res) {
    var path = nudgepad.paths.site
    
    //find ' + nudgepad.paths.site + ' -name '*.DS_Store' -type f -delete

    // Options -r recursive - redirect to stdout
    var zip = spawn('zip', ['-r', '-', '.'], {cwd : path})

    res.contentType('zip')

    // Keep writing stdout to res
    zip.stdout.on('data', function (data) {
      res.write(data)
    })

    zip.stderr.on('data', function (data) {
      // Uncomment to see the files being added
  //    console.log('zip stderr: ' + data)
    })

    // End the response on zip exit
    zip.on('exit', function (code) {
      if(code !== 0) {
        res.statusCode = 500
        res.end()
      } else {
        res.end()
      }
    })

  })
  
}

module.exports = Backup
