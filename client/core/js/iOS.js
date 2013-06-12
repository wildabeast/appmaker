/**
 * @return {bool}
 */
nudgepad.isIOS = function () {
  return navigator.userAgent.match(/iPad|iPhone|iPod/i) != null
}

/**
 * Some tweaks to make iOS devices behave how he want.
 */
nudgepad.iosMain = function () {
  if (nudgepad.isIOS()) {
    $(document).on("touchstart", function(event) {
      if (event.originalEvent.touches.length > 1) {
        event.stopPropagation()
      }
    })
    // Allow someone to drag
    $(document).on("touchmove", function(event) {
      if (event.originalEvent.touches.length == 1) {
        event.preventDefault()
      }
    })
  }
}
