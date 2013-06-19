var Flasher = {}

Flasher.timeout = false

Flasher.error = function (message) {
  $('#FlasherError').html(message)
  Popup.open('#FlasherError')
  return false
}

Flasher.success = function (message, time) {
  Blinker.change(message)
  clearTimeout(Flasher.timeout)
  $('#Flasher').html(message)
  Popup.open('#Flasher')
  $('#Flasher').css('left', ($(window).width() - $('#Flasher').width())/2)
  if (time)
    Flasher.timeout = setTimeout("$('#Flasher').hide()", time)
}

