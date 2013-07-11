var fs = require('fs')

function Install (app) {

  console.log('Installing necessary files and objects...')
  
  // Main project path
  // Create the project folder. All maker data and apps go here.
  // It is a good idea to make this folder a git repo to version all
  // a makers project data.
  if (!fs.existsSync(app.paths.project))
    fs.mkdirSync(app.paths.project)

  if (!fs.existsSync(app.paths['private']))
    fs.mkdirSync(app.paths['private'])
  
  // Create the settings folder for storing settings files.
  if (!fs.existsSync(app.paths.settings))
    fs.mkdirSync(app.paths.settings)
  
  // Create the logs folder for storing log data, other ops data.
  if (!fs.existsSync(app.paths.logs))
    fs.mkdirSync(app.paths.logs)
  
  // Create the temp folder for storing temporary stuff
  if (!fs.existsSync(app.paths.temp))
    fs.mkdirSync(app.paths.temp)
  
  // Create certificates folder
  //if (!fs.existsSync(app.paths.certificates))
  //  fs.mkdirSync(app.paths.certificates)
  
  // Create db folder
  if (!fs.existsSync(app.paths.surveys))
    fs.mkdirSync(app.paths.surveys)
  
  for (var i in app.defaultTypes) {
    if (!fs.existsSync(app.paths['private'] + app.defaultTypes[i]))
      fs.mkdirSync(app.paths['private'] + app.defaultTypes[i])
  }
  
  if (!fs.existsSync(app.paths.settings + 'is_open_source.txt'))
    fs.writeFileSync(app.paths.settings + 'is_open_source.txt', 'true', 'utf8')
  
  if (!fs.existsSync(app.paths.settings + 'is_private.txt'))
    fs.writeFileSync(app.paths.settings + 'is_private.txt', 'false', 'utf8')
  
  // Create default home page
  if (!fs.existsSync(app.paths.pages + 'home.space'))
    fs.writeFileSync(app.paths.pages + 'home.space', '', 'utf8')
  
  // Create default home timeline
  if (!fs.existsSync(app.paths.timelines + 'home.space'))
    fs.writeFileSync(app.paths.timelines + 'home.space', '', 'utf8')
  

}

module.exports = Install
