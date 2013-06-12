nudgepad.notifyTimeout = false
nudgepad.notify = function (message, time) {
  Blinker.change(message)
  clearTimeout(nudgepad.notifyTimeout)
  $('#nudgepadNotify').html(message)
  nudgepad.popup.open('#nudgepadNotify')
  $('#nudgepadNotify').css('left', ($(window).width() - $('#nudgepadNotify').width())/2)
  if (time)
    nudgepad.notifyTimeout = setTimeout("$('#nudgepadNotify').hide()", time)
}
