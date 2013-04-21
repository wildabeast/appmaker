nudgepad.reloadMessageOneTime = ''
nudgepad.reloadMessage = function () {
  var message
  if (message = nudgepad.reloadMessageOneTime) {
    nudgepad.reloadMessageOneTime = ''
    return message
  }
  return 'Are you sure you want to leave Nudgepad?'
}
