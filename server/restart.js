var Restart = function (app) {
  app.get(app.pathPrefix + 'restart', app.checkId, function(req, res, next) {
    // We rely on mon to restart
    res.send('Restarting Nudge')
    process.exit(0)
  })
}

module.exports = Restart