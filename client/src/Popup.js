nudgepad.popup = {}
nudgepad.popup.openPopup = false

/**
 * @param {object} mouseup event
 */
nudgepad.popup.hide = function (event) {

  if (event.which != 1)
    return true

  $('.nudgepad_popup').hide()
  
  if (!nudgepad.popup.openPopup) {
    nudgepad.popup.closedPopup = false
    return true
  }
    
  $(nudgepad.popup.openPopup).hide()
  nudgepad.popup.closedPopup = nudgepad.popup.openPopup
  nudgepad.popup.openPopup = false
  
  return true
}

nudgepad.popup.open = function (element) {
  if (nudgepad.popup.closedPopup == element) {
    nudgepad.popup.closedPopup = false
    return true
  }
  nudgepad.popup.openPopup = element
  $(element).show()
  
}

nudgepad.on('main', function () {
  // Bind the listeners
  // add event listener to capture phase
  if (navigator.userAgent.match(/iPad|iPhone|iPod/i) === null)
    document.body.addEventListener('mouseup', nudgepad.popup.hide, true)
  else
    document.body.addEventListener('touchend', nudgepad.popup.hide, true)
})



