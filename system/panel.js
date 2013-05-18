/**
 * Creates new sites.
 */
var express = require('express'),
    exec = require('child_process').exec,
    fs = require('fs')

var hostname = process.argv[2]

var dataPath = '/nudgepad/'
var panelPath = __dirname + '/panel/'
var logsPath = dataPath + 'logs/'
var sitesPath = dataPath + 'sites/'
var activePath = dataPath + 'active/'
var portsPath = dataPath + 'ports/'
var systemPath = __dirname

var Domain = require(panelPath + '/Domain')
Domain.tld = '.' + hostname

process.title = 'nudgepadPanel'

var app = express()
app.use(express.bodyParser())

var logFile = fs.createWriteStream(logsPath + 'panelRequests.txt', {flags: 'a'})
app.use(express.logger({
  stream : logFile
}))

app.use('/', express.static(panelPath, { maxAge: 31557600000 }))

// http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function validateEmail(email) { 
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

app.validateDomain = function (req, res, next) {

  // Warning message if trying to access panel via IP and not hostname
  if (req.headers.host && req.headers.host.match('127.0.0.1'))
    return res.send('Try going to <a href="http://' + hostname + ':' + port + '/">http://' + hostname + ':' + port + '</a> instead of ' + req.headers.host, 400)
  
  var error = Domain.validate(req.body.domain)
  
  if (error) {
    res.set('Content-Type', 'text/plain')
    return res.send(error, 400)
  }
  
  next()
}

app.isDomainAvailable = function (req, res, next) {
  
  var domain = req.body.domain
  fs.exists(sitesPath + domain, function (exists) {
    if (!exists)
      return next()
//    res.set('Content-Type', 'text/plain')
    res.redirect('?taken=true')
//    res.send('Domain already exists. Try another.', 400)
  })
}

app.validateEmail = function (req, res, next) {
  
  var email = req.body.email
  
  if (!email) {
    res.set('Content-Type', 'text/plain')
    return res.send('No email entered', 400)
  }
  
  if (!validateEmail(email)) {
    res.set('Content-Type', 'text/plain')
    return res.send('Invalid email', 400)
  }
  next()
}

app.checkId = function (req, res, next) {
  next()
}

// Create a site
// On success, message is the login link 
app.post('/create', app.checkId, app.validateDomain, app.isDomainAvailable, function(req, res, next){
  
  var domain = req.body.domain
  var email = req.body.email
  var clone = req.body.clone
  
  if (!email)
    email = 'owner@' + domain
  
  console.log('creating site: %s', domain)
  
  clone = (clone ? ' ' + clone : '')
  exec(systemPath + '/nudgepad.sh create ' + domain.toLowerCase() + ' ' + email + clone, function (err, stdout, stderr) {
    if (err) {
      console.log('Error creating site %s: err:%s stderr:%s', domain, err, stderr)
      return res.send('Error creating site: ' + err, 400)
    }
    if (req.body.ajax)
      res.send(stdout)
    else
      res.redirect(stdout + '&app=pages&newSite=true')
  })
})

if (process.argv.length <3) {
  console.log('Enter a hostname to start panel on')
  process.exit(1)
}

var port = 3000
app.listen(port)
fs.writeFileSync(activePath + hostname, port, 'utf8')
fs.writeFileSync(portsPath + port, hostname, 'utf8')

// Write session stats to disk before process closes
process.on('SIGTERM', function () {
  fs.unlinkSync(activePath + hostname)
  fs.unlinkSync(portsPath + port)
  process.exit(0)
})

