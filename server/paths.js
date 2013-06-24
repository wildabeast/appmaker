// Extends an object by adding a paths property containing all paths
function Paths (app, projectsPath, clientPath) {
  domain = app.domain
  var paths = {}
  paths.server = __dirname + '/'
  // Where to store project specific files
  paths.project = projectsPath + domain + '/'
  // Where to store private files
  paths['private'] = paths.project + 'private/'
  // where to store settings
  paths.settings = paths['private'] + 'settings/'
  // where to store server side packages
  paths.packages = paths['private'] + 'packages/'
  // where to store pages
  paths.pages = paths['private'] + 'pages/'
  // where to store timelines
  paths.timelines = paths['private'] + 'timelines/'
  // where to store logs
  paths.logs = paths['private'] + 'logs/'
  // where to store requests log
  paths.requests_log = paths.logs + 'requests.txt'
  // where to store temporary data
  paths.temp = paths['private'] + 'temp/'
  paths.surveys = paths['private' + 'surveys/'
  paths.client = clientPath
  app.paths = paths
}

module.exports = Paths
