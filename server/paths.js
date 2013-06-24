// Extends an object by adding a paths property containing all paths
function Paths (app, projectsPath, clientPath) {
  domain = app.domain
  var paths = {}
  paths.server = __dirname + '/'
  // Where to store project specific files
  paths.project = projectsPath + domain + '/'
  // where to store settings
  paths.settings = paths.project + 'nudgepad/settings/'
  // where to store server side packages
  paths.packages = paths.project + 'nudgepad/packages/'
  // where to store pages
  paths.pages = paths.project + 'nudgepad/pages/'
  // where to store timelines
  paths.timelines = paths.project + 'nudgepad/timelines/'
  // where to store logs
  paths.logs = paths.project + 'nudgepad/logs/'
  // where to store requests log
  paths.requests_log = paths.logs + 'requests.txt'
  // where to store session logs
  paths.session_logs = paths.logs + 'sessions/'
  // where to store temporary data
  paths.temp = paths.project + 'nudgepad/temp/'
  paths.surveys = paths.project + 'nudgepad/surveys/'
  //paths.certificates = paths.project + 'certificates/'
  paths.client = clientPath
  app.paths = paths
}

module.exports = Paths
