var speedcoach = require('speedcoach')
speedcoach('start')

var nudgepad = {},
    http_server,
    io

var fs = require('fs'),
    express = require('express'),
    dns = require('dns'),
    https = require('https'),
    http = require('http'),
    request = require('request'),
    superagent = require('superagent'),
    socketio = require('socket.io'),
    crypto = require('crypto'),
    exec = require('child_process').exec,
    imagemagick = require('imagemagick'),
    spawn = require('child_process').spawn,
    _ = require('underscore'),
    parseCookie = require('cookie').parse,
    moment = require('moment'),
    os = require('os'),
    async = require('async'),
    Space = require('space'),
    File = require('./File'),
    Page = require('scraps')

if (process.argv.length < 3) {
  console.log('Specify a domain when starting')
  process.exit()
}

if (process.argv.length < 4) {
  console.log('Specify a port when starting')
  process.exit()
}

// http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
//first, checks if it isn't implemented yet
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

var app = express()

/*** PATHS ****/

var dataPath = '/nudgepad/'
var sitesPath = dataPath + 'sites/'
var clientPath = __dirname + '/../client/'
var activePath = dataPath + 'active/'
var portsPath = dataPath + 'ports/'

/********* CREATE MAIN NUDGE NAMESPACE SINGLETON OBJECT *********/

/**
 * Nudge is a singleton.
 */

nudgepad.domain = process.argv[2]
nudgepad.port = process.argv[3]
nudgepad.default_types = ['pages', 'posts', 'workers', 'timelines']

// Change the process title for easier debugging & monitoring
process.title = nudgepad.domain

if (!fs.existsSync(sitesPath + nudgepad.domain + '/')) {
  console.log('Site does not exist...')
  process.exit()
}

// Development always occurs on macs
nudgepad.isMac = process.env.HOME.match(/Users/)
nudgepad.development = !!nudgepad.isMac
// Set IP Address.
nudgepad.ip = process.env.IPADDRESS

// Add paths to nudgepad object
require('./paths.js')(nudgepad, sitesPath, clientPath, nudgepad.domain)

// Run install script in case its not installed
require('./install.js')(nudgepad)

nudgepad.site = new Space()
nudgepad.site.set('collage', new Space())

// Load the HTML file and add mtimes as query string so the
// worker always get the latest version of the nudgepad.js and nudgepad.css
// todo: remove this?
nudgepad.nudgepad_css_version = fs.statSync(clientPath + 'min.css').mtime.getTime()
nudgepad.nudgepad_js_version = fs.statSync(clientPath + 'nudgepad.min.js').mtime.getTime()
nudgepad.nudgepad_min_html = fs.readFileSync(clientPath + 'main.html', 'utf8')
  .replace(/JSV/, nudgepad.nudgepad_js_version)
  .replace(/CSSV/, nudgepad.nudgepad_css_version)


// todo: remove this?
nudgepad.version = '2000'
nudgepad.started = new Date().getTime()


nudgepad.loadFolder = function (folder) {
  // Create a Space for every folder
  nudgepad.site.set(folder, new Space())
  // Grab all spaces in a folder
  var files = fs.readdirSync(nudgepad.paths.site + folder)
  for (var j in files) {
    // Dont read non space files
    if (!files[j].match(/\.space/))
      continue
    // Load every file into memory
    var filePath = nudgepad.paths.site + folder + '/' + files[j]
    nudgepad.site.set(folder + ' ' + files[j].replace(/\.space$/,''), new File(filePath).loadSync())
  }
}

/**
 * Load all Spaces into memory.
 */
nudgepad.loadSite = function () {
  
  // Load settings
  nudgepad.site.set('settings', new Space())
  var files = fs.readdirSync(nudgepad.paths.settings)
  for (var j in files) {
    // Space files
    if (files[j].match(/\.space/)) {
      var filename = files[j].replace(/\.space$/, '')
      nudgepad.site.set('settings ' + filename, new Space(fs.readFileSync(nudgepad.paths.settings + files[j], 'utf8')))
    }
    // Text files
    else if (files[j].match(/\.txt/)) {
      var filename = files[j].replace(/\.txt$/, '')
      nudgepad.site.set('settings ' + filename, fs.readFileSync(nudgepad.paths.settings + files[j], 'utf8'))
    }
  }
  
  // Iterate on each folder in default types
  for (var i in nudgepad.default_types) {
    nudgepad.loadFolder(nudgepad.default_types[i])
  }
  
}

/**
 * @param {string}
 * @return {string}
 */
app.hashString = function (string) {
  return crypto.createHash('sha256').update(string).digest("hex")
}

eval(fs.readFileSync('checkId.js', 'utf8'))

//********************** INITIALIZE THE SERVER OBJECT ******************************


if (nudgepad.development)
  console.log('Development mode started...')
else
  console.log('Production mode started...')

/*********** nudgepad.emit ***********/
eval(fs.readFileSync('emit.js', 'utf8'))


nudgepad.loadSite()
speedcoach('spaces loaded into memory')

app.use(express.bodyParser())
app.use(express.cookieParser())
app.use(express.compress())
// server.use(express.staticCache())

// http://www.dmuth.org/node/1401/logging-non-proxy-ip-addresses-heroku-and-express-nodejs
//
// Create an IP token for the logging system that lists the original IP, 
// if there was a proxy involved.
//
express.logger.token("ip", function(request) {
 
   var retval = "";
 
   if (request["headers"] && request["headers"]["x-forwarded-for"]) {
      //
      // Proxied request
      //
      retval = request["headers"]["x-forwarded-for"];
 
   } else if (request["socket"] && request["socket"]["remoteAddress"]) {
      //
      // Direct request
      //
      retval = request["socket"]["remoteAddress"];
 
   } else if (request["socket"] && request["socket"]["socket"]
      && request["socket"]["socket"]["remoteAddress"]) {
      //
      // God only knows what happened here...
      //
      retval = request["socket"]["socket"]["remoteAddress"];
 
   }
 
   return(retval);
 
});

var logFile = fs.createWriteStream(nudgepad.paths.requests_log, {flags: 'a'})
app.use(express.logger({
  stream : logFile,
  format : ':ip :url :method :status :response-time :res[content-length] ":date" :remote-addr ":referrer" ":user-agent"'
}))



/*********** STATIC FILES **************/
app.use('/nudgepad/', express.static(clientPath.replace(/\/$/,''), { maxAge: 31557600000 }))


/*********** public ***********/
app.use('/', express.static(nudgepad.paths.public, { maxAge: 31557600000 }))

/********** blog *************/
require('./blog.js')(app, nudgepad)

/********** surveys *************/
require('./surveys.js')(app, nudgepad)

/********** email *************/
eval(fs.readFileSync('email.js', 'utf8'))

/********** invite *************/
eval(fs.readFileSync('invite.js', 'utf8'))

/********** images *************/
eval(fs.readFileSync('images.js', 'utf8'))

/*********** nudgepad ***********/
app.get(/^\/nudgepad$/, app.checkId, function(req, res, next) {

  // If production, send minified Nudge.
  if (!nudgepad.development) {
    res.send(nudgepad.nudgepad_min_html)
    return
  }
  
  // Load each javascript file individually if developing.
  fs.readFile(clientPath + 'main.dev.html', 'utf8', function (err, data) {
    res.send(data)
    return 
  })

})

/*********** sendPage method ************/
eval(fs.readFileSync('sendPage.js', 'utf8'))

/*********** patch methods ************/
eval(fs.readFileSync('patch.js', 'utf8'))

/*********** nudgepad.site ************/
eval(fs.readFileSync('site.js', 'utf8'))


/*********** nudgepad.backup ***********/
eval(fs.readFileSync('backup.js', 'utf8'))


/*********** nudgepad.explorer ***********/
eval(fs.readFileSync('explorer.js', 'utf8'))

/*********** nudgepad.restart ***********/
eval(fs.readFileSync('restart.js', 'utf8'))

/*********** nudgepad.domain ***********/
eval(fs.readFileSync('domain.js', 'utf8'))

/*********** nudgepad.status ***********/
eval(fs.readFileSync('status.js', 'utf8'))

/*********** nudgepad.whoami ***********/
eval(fs.readFileSync('whoami.js', 'utf8'))

/*********** serverSession ***********/
eval(fs.readFileSync('started.js', 'utf8'))

/*********** nudgepad.console ***********/
eval(fs.readFileSync('console.js', 'utf8'))

/*********** watches disk ***********/
eval(fs.readFileSync('watchers.js', 'utf8'))

/*********** export site ***********/
eval(fs.readFileSync('export.js', 'utf8'))

/*********** nudgepad.login ***********/
eval(fs.readFileSync('login.js', 'utf8'))

/*********** nudgepad.persona ***********/
eval(fs.readFileSync('persona.js', 'utf8'))

/*********** nudgepad.forgotPassword ***********/
eval(fs.readFileSync('forgotPassword.js', 'utf8'))

/*********** nudgepad.worker.### ************/
eval(fs.readFileSync('updateEmail.js', 'utf8'))


/*********** nudgepad.logout ***********/
eval(fs.readFileSync('logout.js', 'utf8'))


/*********** nudgepad.logs ***********/
eval(fs.readFileSync('logs.js', 'utf8'))

/*********** nudgepad.clear ***********/
eval(fs.readFileSync('clear.js', 'utf8'))


/*********** / ***********/
eval(fs.readFileSync('home.js', 'utf8'))

/*********** stats ***********/
eval(fs.readFileSync('stats.js', 'utf8'))

/*********** proxy ***********/
eval(fs.readFileSync('import.js', 'utf8'))


/*********** {page_name} ***********/
eval(fs.readFileSync('pages.js', 'utf8'))


/*********** Eval any custom code ***********/
try {
  
  var files = fs.readdirSync(nudgepad.paths.includes)
  for (var j in files) {
    eval(fs.readFileSync(nudgepad.paths.includes + files[j], 'utf8'))
  }
} catch (e) {
  if (e instanceof SyntaxError) {
    console.log('Syntax error in ' + files[j] + ': ' + e.message)
    console.log('Includes skipped')
  } else {
    console.log('Error in ' + files[j] + ': ' + e.message)
  }
}


/*********** ! ***********/
eval(fs.readFileSync('notFound.js', 'utf8'))



/********* START SERVER **********/ 

// Start Listening
console.log('Starting %s on port %s', nudgepad.domain, nudgepad.port)
http_server = http.createServer(app).listen(nudgepad.port)


fs.writeFileSync(activePath + nudgepad.domain, nudgepad.port, 'utf8')
fs.chmodSync(activePath + nudgepad.domain, '600')
fs.writeFileSync(portsPath + nudgepad.port, nudgepad.domain, 'utf8')
fs.chmodSync(portsPath + nudgepad.port, '600')

// Write session stats to disk before process closes
process.on('SIGTERM', function () {
  fs.unlinkSync(activePath + nudgepad.domain)
  fs.unlinkSync(portsPath + nudgepad.port)
  process.exit(0)
})


speedcoach('server started')

/********* SOCKET IO STUFF **********/ 
eval(fs.readFileSync('socket.js', 'utf8'))

speedcoach('socket evaled')

console.log('Server started...')
speedcoach('end of nudgepad.js')
