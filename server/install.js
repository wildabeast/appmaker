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

  // Create makers folder
  if (!fs.existsSync(app.paths.makers))
    fs.mkdirSync(app.paths.makers)

  // Create timeliens folder
  if (!fs.existsSync(app.paths.timelines))
    fs.mkdirSync(app.paths.timelines)

  // Create pages folder
  if (!fs.existsSync(app.paths.pages))
    fs.mkdirSync(app.paths.pages)  
  
  // Create default home page
  if (!fs.existsSync(app.paths.pages + 'home.space'))
    fs.writeFileSync(app.paths.pages + 'home.space', '', 'utf8')
  
  // Create default home timeline
  if (!fs.existsSync(app.paths.timelines + 'home.space'))
    fs.writeFileSync(app.paths.timelines + 'home.space', '', 'utf8')
  

}

module.exports = Install
