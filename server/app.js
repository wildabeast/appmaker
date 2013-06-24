var speedcoach = require('speedcoach')
speedcoach('start')

if (process.argv.length < 3) {
  console.log('Specify a domain when starting')
  process.exit()
}

if (process.argv.length < 4) {
  console.log('Specify a port when starting')
  process.exit()
}

var http_server,
    io

var fs = require('fs'),
    express = require('express'),
    dns = require('dns'),
    https = require('https'),
    http = require('http'),
    request = require('request'),
    socketio = require('socket.io'),
    crypto = require('crypto'),
    exec = require('child_process').exec,
    _ = require('underscore'),
    parseCookie = require('cookie').parse,
    async = require('async'),
    Space = require('space'),
    File = require('./File'),
    Page = require('scraps'),
    Email = require('./email.js')

var app = express()
app.pathPrefix = '/nudgepad.'

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

/*** PATHS ****/

var dataPath = '/nudgepad/'
var projectsPath = dataPath + 'projects/'
var clientPath = __dirname + '/../client/'
var runningPath = dataPath + 'running/'
var portsPath = dataPath + 'ports/'

/********* CREATE MAIN NUDGE NAMESPACE SINGLETON OBJECT *********/

/**
 * Nudge is a singleton.
 */

app.domain = process.argv[2]
app.port = process.argv[3]
app.defaultTypes = ['pages', 'posts', 'makers', 'timelines']

// Change the process title for easier debugging & monitoring
process.title = app.domain

if (!fs.existsSync(projectsPath + app.domain + '/')) {
  console.log('Project does not exist...')
  process.exit()
}

// Development always occurs on macs
app.isMac = process.env.HOME.match(/Users/)
app.development = !!app.isMac
// Set IP Address.
app.ip = process.env.IPADDRESS

require('./paths.js')(app, projectsPath, clientPath)

// Run install script in case its not installed
require('./install.js')(app)

app.Project = new Space()
var Room = new Space()

// Load the HTML file and add mtimes as query string so the
// maker always get the latest version of the nudgepad.js and nudgepad.css
// todo: remove this?
app.nudgepadCssVersion = fs.statSync(clientPath + 'production/nudgepad.min.css').mtime.getTime()
app.nudgepadJsVersion = fs.statSync(clientPath + 'production/nudgepad.min.js').mtime.getTime()
app.nudgepadHtmlVersion = fs.readFileSync(clientPath + 'production/nudgepad.min.html', 'utf8')
  .replace(/JSV/, app.nudgepadJsVersion)
  .replace(/CSSV/, app.nudgepadCssVersion)


// todo: remove this?
app.started = new Date().getTime()


app.Project.loadFolder = function (folder) {
  // Create a Space for every folder
  app.Project.set(folder, new Space())
  // Grab all spaces in a folder
  var files = fs.readdirSync(app.paths['private'] + folder)
  for (var j in files) {
    // Dont read non space files
    if (!files[j].match(/\.space/))
      continue
    // Load every file into memory
    var filePath = app.paths['private'] + folder + '/' + files[j]
    app.Project.set(folder + ' ' + files[j].replace(/\.space$/,''), new File(filePath).loadSync())
  }
}

/**
 * Load all Spaces into memory.
 */
app.Project.loadFromDisk = function () {
  
  // Load settings
  app.Project.set('settings', new Space())
  var files = fs.readdirSync(app.paths.settings)
  for (var j in files) {
    // Space files
    if (files[j].match(/\.space/)) {
      var filename = files[j].replace(/\.space$/, '')
      app.Project.set('settings ' + filename, new Space(fs.readFileSync(app.paths.settings + files[j], 'utf8')))
    }
    // Text files
    else if (files[j].match(/\.txt/)) {
      var filename = files[j].replace(/\.txt$/, '')
      app.Project.set('settings ' + filename, fs.readFileSync(app.paths.settings + files[j], 'utf8'))
    }
  }
  
  // Iterate on each folder in default types
  for (var i in app.defaultTypes) {
    app.Project.loadFolder(app.defaultTypes[i])
  }
  
}

/**
 * @param {string}
 * @return {string}
 */
app.hashString = function (string) {
  return crypto.createHash('sha256').update(string).digest("hex")
}

require('./checkId.js')(app)

//********************** INITIALIZE THE SERVER OBJECT ******************************


if (app.development)
  console.log('Development mode started...')
else
  console.log('Production mode started...')

app.Project.loadFromDisk()
speedcoach('spaces loaded into memory')


app.patchFile = function (path, patch, email) {
  var filepath = app.paths['private'] + path.replace(/ /g, '/') + '.space'
  var file = app.Project.get(path)
  var patchFile = patch.get(path)
  
   // Create File
   if (typeof file === 'undefined') {
     console.log('creating %s', path)
     file = new File(filepath, patchFile)
     file.create(function (error) {
       if (error) {
         console.log('Error: %s', error)
         return error
       }
     })
     app.Project.set(path, file)
   }

   // Delete File
   else if (typeof file !== 'undefined' && patchFile.toString() === '') {
     console.log('deleting %s', path)
     file.trash(function (error) {
       if (error) {
         console.log('Error: %s', error)
         return error
       }
     })
     app.Project.delete(path)
   }

   // Update File
   else {
     console.log('updating %s', path)
     file.patch(patchFile).save(function (error) {
       if (error) {
         console.log('Error: %s', error)
         return error
       }
     })

   }
  
}

app.patchProject = function (patch, email) {
  
  console.log('receiving patch')
  
  // now, modify file system.
   for (var i in patch.keys) {
     var folder = patch.keys[i]
     // For every file in folder
     for (var j in patch.values[folder].keys) {
       var name =  patch.values[folder].keys[j]
       app.patchFile(folder + ' ' + name, patch, email)
     }
   }
}


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

var logFile = fs.createWriteStream(app.paths.requests_log, {flags: 'a'})
app.use(express.logger({
  stream : logFile,
  format : ':ip :url :method :status :response-time :res[content-length] ":date" :remote-addr ":referrer" ":user-agent"'
}))



/*********** STATIC FILES **************/
app.use('/nudgepad/', express.static(clientPath.replace(/\/$/,''), { maxAge: 31557600000 }))


/*********** public ***********/
// Make sure this is first so an index.html will take precedence
// over a private/pages/home
app.use('/', express.static(app.paths.project, { maxAge: 31557600000 }))

/********** blog *************/
require('./blog.js')(app)

/********** surveys *************/
require('./surveys.js')(app)

/********** email *************/
app.post(app.pathPrefix + 'email', app.checkId, function (req, res, next) {

  var to = req.body.to
  var subject = req.body.subject
  var message = req.body.message
  var from = 'nudgepad@' + app.domain
  
  Email.send(to, from, subject, message, null, function (error) {
    if (error)
      res.send(error, 500)
    else
      res.send('Sent')
  })  

})


/********** invite *************/
require('./invite.js')(app)

/********** images *************/
require('./images.js')(app)

/*********** nudgepad ***********/
app.get(/^\/nudgepad$/, app.checkId, function(req, res, next) {

  // If production, send html that pulls minified NudgePad
  if (!app.development) {
    res.send(app.nudgepadHtmlVersion)
    return
  }
  
  // If development, send html that pulls verbose NudgePad
  fs.readFile(clientPath + 'production/nudgepad.dev.html', 'utf8', function (err, data) {
    res.send(data)
    return 
  })

})

// If development, watch client folder and trigger rebuilds.
// NudgePad app developer should never have to manually run build.js
// Watch core and tools folder recursively.
app.rebuild = function () {
  exec('node ' + clientPath + 'build.js')
  console.log('Rebuilding...')
}

app.watchDir = function (dir) {
  console.log('watching %s', dir)
  fs.watch(dir, app.rebuild)
  var files = fs.readdirSync(dir)
  _.each(files, function (file) {
    var path = dir + '/' + file
    var stat = fs.statSync(path)
    if (stat.isDirectory())
      app.watchDir(path)
    else
      fs.watch(path, app.rebuild)
  })
}

if (app.development) {
  app.watchDir(clientPath + 'tools')
  app.watchDir(clientPath + 'core')
}

/*********** sendPage method ************/
app.pageOptions = {
  beautify : true
}

app.sendPage = function(req, res, name) {
  
  var scraps = app.Project.get('pages ' + name)
  var page = new Page(scraps)
  var context = {}
  context.project = app.Project
  context.request = req
  return res.send(page.toHtml(context, app.pageOptions))
}


require('./project.js')(app)
require('./backup.js')(app)
require('./explorer.js')(app)
require('./restart.js')(app)
// We use this to communicate with proxy.js so it knows what
// domain this process serves
app.get(app.pathPrefix + 'domain', function(req, res, next) {
  res.set('Content-Type', 'text/plain')
  return res.send(app.domain)
})

require('./status.js')(app, speedcoach)
require('./whoami.js')(app)
// We use this so we can tell if the server has been
// restarted since the clients session started
app.get(app.pathPrefix + 'started', app.checkId, function (req, res, next) {
  res.set('Content-Type', 'text/plain')
  return res.send(app.started + '')
})

require('./console.js')(app)
fs.watch(app.paths.project, function (event, filename) {
  
  // Trigger public changed event
  // mac on old node wont emit filename
  if (!filename)
    filename = ''
  app.SocketIO.sockets.emit('file', filename.toString())
  
})

/*
todo: experiment with watching this folder for all updates.
fs.watch(app.paths.project + 'pages/', function (event, filename) {
  
  // Trigger public changed event
  app.Project.loadFolder('pages')
})
*/

require('./export.js')(app)
require('./login.js')(app)
require('./persona.js')(app)
require('./forgotPassword.js')(app)
require('./updateEmail.js')(app)
require('./logout.js')(app)
require('./logs.js')(app)
require('./clear.js')(app)
require('./home.js')(app)
require('./stats.js')(app)
require('./ExpressFs.js')(app)
require('./import.js')(app)
require('./pages.js')(app)


/*********** Eval any custom code ***********/
try {
  
  var files = fs.readdirSync(app.paths.packages)
  for (var j in files) {
    require(app.paths.packages + files[j])(app)
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
app.use('/', function (req, res, next) {
  

  var page = app.Project.get('pages').get('notFound')
  if (!page)
    return res.send('Not found', 404)
  
  page = new Page(page.values)
  return res.send(page.toHtml(), 404)
  
  
})




/********* START SERVER **********/ 

// Start Listening
console.log('Starting %s on port %s', app.domain, app.port)
http_server = http.createServer(app).listen(app.port)


fs.writeFileSync(runningPath + app.domain, app.port, 'utf8')
fs.chmodSync(runningPath + app.domain, '600')
fs.writeFileSync(portsPath + app.port, app.domain, 'utf8')
fs.chmodSync(portsPath + app.port, '600')

// Write session stats to disk before process closes
process.on('SIGTERM', function () {
  fs.unlinkSync(runningPath + app.domain)
  fs.unlinkSync(portsPath + app.port)
  process.exit(0)
})


speedcoach('server started')

/********* SOCKET IO STUFF **********/ 
app.SocketIO = socketio.listen(http_server)

//app.SocketIO.set('log level', 3)

/********* SOCKET EVENTS **********/ 

app.SocketIO.set('authorization', function (data, accept) {

  if (!data.headers.cookie)
    return accept('No cookie transmitted.', false)
  
  var cookie = parseCookie(data.headers.cookie)

  var maker = app.Project.get('makers ' + cookie.email)
  if (!maker)
    return accept('Invalid maker "' + cookie.email + '" transmitted. Headers:' + data.headers.cookie, false)

  // Wrong key
  if (maker.get('key') !== cookie.key)
    return accept('Invalid key transmitted.', false)
  
  data.cookie = cookie
  data.screenId = new Date().getTime()
  Room.set(data.screenId, new Space())
    
  // todo: broadcast maker
  return accept(null, true)  
  
})

app.SocketIO.sockets.on('connection', function (socket) {
  
  socket.on('room.change', function (space) {
    if (socket.handshake.screenId) {
      Room.set(socket.handshake.screenId, space)
      socket.broadcast.emit('room.change', Room.toString())
    }
  })
  
  socket.on('disconnect', function () {
    if (socket.handshake.screenId) {
      Room.delete(socket.handshake.screenId)
      socket.broadcast.emit('room.change', Room.toString())
    }
  })
  
  socket.on('patch', function (space, fn) {
    var patch = new Space(space)
    app.patchProject(patch, socket.handshake.cookie.email)
    
    fn('patch received')
    
    // Broadcast to everyone else
    socket.broadcast.emit('patch', space.toString())
  })
  
  socket.on('delete', function (key, fn) {
    // Delete File
    var file = app.Project.get(key)
    file.trash(function (error) {
      if (error) {
        console.log('Error: %s', error)
        return fn('error')
      }
      fn('patch received')
      // Broadcast to everyone else
      socket.broadcast.emit('delete', key)
    })

  })

})


speedcoach('socket loaded')

console.log('Server started...')
speedcoach('end of nudgepad.js')
