nudgepad.paths = {}
nudgepad.paths.server = __dirname + '/'
// Where to store site specific files
nudgepad.paths.site = sitesPath + nudgepad.domain + '/'
// where to store settings
nudgepad.paths.settings = nudgepad.paths.site + 'settings/'
// where to store server side includes
nudgepad.paths.includes = nudgepad.paths.site + 'includes/'
// where to store uploads
nudgepad.paths.public = nudgepad.paths.site + 'public/'
// where to store logs
nudgepad.paths.logs = nudgepad.paths.site + 'logs/'
// where to store requests log
nudgepad.paths.requests_log = nudgepad.paths.logs + 'requests.txt'
// where to store session logs
nudgepad.paths.session_logs = nudgepad.paths.logs + 'sessions/'
// where to store temporary data
nudgepad.paths.temp = nudgepad.paths.site + 'temp/'
nudgepad.paths.surveys = nudgepad.paths.site + 'surveys/'
//nudgepad.paths.certificates = nudgepad.paths.site + 'certificates/'
nudgepad.paths.client = clientPath

