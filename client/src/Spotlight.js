/**
 * Launches the spotlight page picker
 */
nudgepad.pages.spotlight = function () {
  
  var name = prompt('Enter the name of the page to open...', '')
  if (name)
    nudgepad.stage.open(name)
}
