// Extends an object by adding a paths property containing all paths
function Paths (obj, sitesPath, clientPath, domain) {
  var paths = {}
  paths.server = __dirname + '/'
  // Where to store site specific files
  paths.site = sitesPath + domain + '/'
  // where to store settings
  paths.settings = paths.site + 'settings/'
  // where to store server side includes
  paths.includes = paths.site + 'includes/'
  // where to store uploads
  paths.public = paths.site + 'public/'
  // where to store logs
  paths.logs = paths.site + 'logs/'
  // where to store requests log
  paths.requests_log = paths.logs + 'requests.txt'
  // where to store session logs
  paths.session_logs = paths.logs + 'sessions/'
  // where to store temporary data
  paths.temp = paths.site + 'temp/'
  paths.surveys = paths.site + 'surveys/'
  //paths.certificates = paths.site + 'certificates/'
  paths.client = clientPath
  obj.paths = paths
}

module.exports = Paths
