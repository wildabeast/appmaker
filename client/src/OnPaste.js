nudgepad.isScraps = function (text) {
  return text.match(/\n/)
}

/**
 */
nudgepad.onpaste = function(e) {

  // Return true if worker is editing an input
  if ($('input:focus, div:focus, textarea:focus, a:focus').length)
    return true
  
  var pastedText = undefined
  if (window.clipboardData && window.clipboardData.getData) // IE
    pastedText = window.clipboardData.getData('Text')
  else if (e.clipboardData && e.clipboardData.getData)
    pastedText = e.clipboardData.getData('text/plain')
  
  if (nudgepad.isScraps(pastedText)) {
    
    nudgepad.stage.insert(pastedText)
    nudgepad.stage.selection.save()
    nudgepad.stage.open(nudgepad.stage.activePage)
    nudgepad.stage.selection.restore()
  }
  mixpanel.track('I pasted something')
}

nudgepad.on('main', function () {
  window.addEventListener('paste', nudgepad.onpaste, false)
})
