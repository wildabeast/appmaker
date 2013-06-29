// Nudgepad Tool navigation
var Launcher = {}

Launcher.open = function (name, dontRecord) {


  if (window[name])
    window[name].open()
  else
    return false

  if (dontRecord)
    return null
  
  if (nudgepad.isTesting)
    return null

  history.pushState(name, 'Nudgepad - ' + name, '/nudgepad?tool=' + name)
}

Launcher.openToolFromQueryString = function () {
  
  // Get query string. If nothing, set default to Home tool
  var name = ParseQueryString().tool || 'Home'
  Launcher.open(name, true)
}
