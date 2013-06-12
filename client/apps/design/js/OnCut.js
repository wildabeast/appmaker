/**
 */
nudgepad.oncut = function(e) {
  
  // Return true if worker is editing an input
  if ($('input:focus, div:focus, textarea:focus, a:focus').length)
    return true
  
  if (!nudgepad.stage.selection.exists())
    return true
    
  if (e.clipboardData) {
    e.preventDefault()
    e.clipboardData.setData(
        'text/xcustom', nudgepad.stage.selection.toSpace().toString())

    var setStatus = e.clipboardData.setData(
        'text/plain', nudgepad.stage.selection.toSpace().toString())
    console.log('setData: ' + setStatus)
  }
  if (window.clipboardData) {
    e.returnValue = false
    var setStatus = window.clipboardData.setData(
      'Text', nudgepad.stage.selection.toSpace().toString())
    console.log('setData: ' + setStatus)
  }
  nudgepad.stage.selection.remove()
  nudgepad.stage.commit()
  mixpanel.track('I cut something')
}

nudgepad.on('main', function () {
  window.addEventListener('cut', nudgepad.oncut, false)
})
