nudgepad.on('main', function () {
  
  $('#nudgepadPagesBar #menuButton').on('mousedown', function (event) {
    if ($('#nudgepadPageMenu:visible').length > 0) {
      nudgepad.popup.hide(event)
      return true
    }
    nudgepad.popup.open('#nudgepadPageMenu')
    mixpanel.track('I opened the designer menu')
  })
  $('#nudgepadPagesBar #menuButton').on('mouseup', function (event) {
    event.stopPropagation()
    return false
  })

  // We do this on live, so that it wont interfere with events bound
  // to items inside the ribbon, but it will prevent events from
  // reaching nudgepadbody hopefull
  $('#nudgepadPagesBar').on('slide slidestart', function (event) {
    
    event.stopPropagation()
  })

})



