// Extends an object by adding a paths property containing all paths
function Paths (app, projectsPath, clientPath) {
  domain = app.domain
  var paths = {}
  paths.server = __dirname + '/'
  // Where to store project specific files
  paths.project = projectsPath + domain + '/'
  // where to store settings
  paths.settings = paths.project + 'settings/'
  // where to store server side packages
  paths.packages = paths.project + 'packages/'
  // where to store uploads
  paths.public = paths.project + 'public/'
  // where to store logs
  paths.logs = paths.project + 'logs/'
  // where to store requests log
  paths.requests_log = paths.logs + 'requests.txt'
  // where to store session logs
  paths.session_logs = paths.logs + 'sessions/'
  // where to store temporary data
  paths.temp = paths.project + 'temp/'
  paths.surveys = paths.project + 'surveys/'
  //paths.certificates = paths.project + 'certificates/'
  paths.client = clientPath
  app.paths = paths
}

module.exports = Paths
