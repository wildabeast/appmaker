nudgepad.popup = {}

/**
 * @param {object} mouseup event
 */
nudgepad.popup.hide = function (event) {

  if (event.which !== 1)
    return true
  console.log('hide')
  $('.nudgepadPopup').hide()
  console.log(event)
  $('body').off('mouseup touchend', nudgepad.popup.hide)
  nudgepad.popup.isOpen = false
  return true
}

nudgepad.popup.isOpen = false

nudgepad.popup.open = function (element) {
  $(element).addClass('nudgepadPopup').show()
  if (!nudgepad.popup.isOpen) {
    $('body').on('mouseup touchend', nudgepad.popup.hide)
    nudgepad.popup.isOpen = true
  }
  
  return true
}

