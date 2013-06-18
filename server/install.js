var fs = require('fs')

function Install (app) {
  
  var nudgepad = app.nudgepad

  console.log('Installing necessary files and objects...')
  
  // Main project path
  // Create the project folder. All worker data and apps go here.
  // It is a good idea to make this folder a git repo to version all
  // a workers project data.
  if (!fs.existsSync(nudgepad.paths.project))
    fs.mkdirSync(nudgepad.paths.project)
    
  // Create the public folder for storing uploads and other static assets.
  if (!fs.existsSync(nudgepad.paths.public))
    fs.mkdirSync(nudgepad.paths.public)
  
  // Create the settings folder for storing settings files.
  if (!fs.existsSync(nudgepad.paths.settings))
    fs.mkdirSync(nudgepad.paths.settings)
  
  // Create the packages folder for storing server side packages.
  if (!fs.existsSync(nudgepad.paths.packages))
    fs.mkdirSync(nudgepad.paths.packages)
  
  // Create the logs folder for storing log data, other ops data.
  if (!fs.existsSync(nudgepad.paths.logs))
    fs.mkdirSync(nudgepad.paths.logs)
  
  // Create the logs folder for storing log data, other ops data.
  if (!fs.existsSync(nudgepad.paths.session_logs))
    fs.mkdirSync(nudgepad.paths.session_logs)
  
  // Create the logs folder for storing log data, other ops data.
  if (!fs.existsSync(nudgepad.paths.session_logs + 'archive/'))
    fs.mkdirSync(nudgepad.paths.session_logs + 'archive/')
  
  // Create the temp folder for storing temporary stuff
  if (!fs.existsSync(nudgepad.paths.temp))
    fs.mkdirSync(nudgepad.paths.temp)
  
  // Create certificates folder
  //if (!fs.existsSync(nudgepad.paths.certificates))
  //  fs.mkdirSync(nudgepad.paths.certificates)
  
  // Create db folder
  if (!fs.existsSync(nudgepad.paths.surveys))
    fs.mkdirSync(nudgepad.paths.surveys)
  
  for (var i in nudgepad.default_types) {
    if (!fs.existsSync(nudgepad.paths.project + nudgepad.default_types[i]))
      fs.mkdirSync(nudgepad.paths.project + nudgepad.default_types[i])
  }
  
  if (!fs.existsSync(nudgepad.paths.settings + 'is_open_source.txt'))
    fs.writeFileSync(nudgepad.paths.settings + 'is_open_source.txt', 'true', 'utf8')
  
  if (!fs.existsSync(nudgepad.paths.settings + 'is_private.txt'))
    fs.writeFileSync(nudgepad.paths.settings + 'is_private.txt', 'false', 'utf8')
  
  // Create the example.js file
  if (!fs.existsSync(nudgepad.paths.packages + 'example.js')) {
    fs.writeFileSync(nudgepad.paths.packages + 'example.js', "var Example = function (app) {\n\
  app.get('/say_hello', function(req, res, next) {\n\
    res.send('Hello world!')\n\
  })\n\
}\n\
module.exports = Example\n", 'utf8')
  }
  
  // Create default home page
  if (!fs.existsSync(nudgepad.paths.project + 'pages/home.space'))
    fs.writeFileSync(nudgepad.paths.project + 'pages/home.space', '', 'utf8')
  
  // Create default home timeline
  if (!fs.existsSync(nudgepad.paths.project + 'timelines/home.space'))
    fs.writeFileSync(nudgepad.paths.project + 'timelines/home.space', '', 'utf8')
  

}

module.exports = Install
