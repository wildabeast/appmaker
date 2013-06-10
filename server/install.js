var fs = require('fs')

function Install (nudgepad) {

  console.log('Installing necessary files and objects...')
  
  // Main site path
  // Create the site folder. All worker data and apps go here.
  // It is a good idea to make this folder a git repo to version all
  // a workers site data.
  if (!fs.existsSync(nudgepad.paths.site))
    fs.mkdirSync(nudgepad.paths.site)
    
  // Create the public folder for storing uploads and other static assets.
  if (!fs.existsSync(nudgepad.paths.public))
    fs.mkdirSync(nudgepad.paths.public)
  
  // Create the settings folder for storing settings files.
  if (!fs.existsSync(nudgepad.paths.settings))
    fs.mkdirSync(nudgepad.paths.settings)
  
  // Create the includes folder for storing server side includes.
  if (!fs.existsSync(nudgepad.paths.includes))
    fs.mkdirSync(nudgepad.paths.includes)
  
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
    if (!fs.existsSync(nudgepad.paths.site + nudgepad.default_types[i]))
      fs.mkdirSync(nudgepad.paths.site + nudgepad.default_types[i])
  }
  
  if (!fs.existsSync(nudgepad.paths.settings + 'is_open_source.txt'))
    fs.writeFileSync(nudgepad.paths.settings + 'is_open_source.txt', 'true', 'utf8')
  
  if (!fs.existsSync(nudgepad.paths.settings + 'is_private.txt'))
    fs.writeFileSync(nudgepad.paths.settings + 'is_private.txt', 'false', 'utf8')
  
  // Create the example.js file
  if (!fs.existsSync(nudgepad.paths.includes + 'example.js'))
    fs.writeFileSync(nudgepad.paths.includes + 'example.js', "/**\napp.get('/my_route', function(req, res, next) {\n  res.send('Hello world!')\n})\n*/", 'utf8')
  
  // Create default home page
  if (!fs.existsSync(nudgepad.paths.site + 'pages/home.space'))
    fs.writeFileSync(nudgepad.paths.site + 'pages/home.space', '', 'utf8')
  
  // Create default home timeline
  if (!fs.existsSync(nudgepad.paths.site + 'timelines/home.space'))
    fs.writeFileSync(nudgepad.paths.site + 'timelines/home.space', '', 'utf8')
  
  // Create default site wide stylesheet
  if (!fs.existsSync(nudgepad.paths.public + 'site.css'))
    fs.writeFileSync(nudgepad.paths.public + 'site.css', '', 'utf8')
  
  // Create default site wide js file
  if (!fs.existsSync(nudgepad.paths.public + 'site.js'))
    fs.writeFileSync(nudgepad.paths.public + 'site.js', '', 'utf8')

}

module.exports = Install
