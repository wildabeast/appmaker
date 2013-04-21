nudgepad.error = function (message) {
  $('#nudgepadWorkerError').html(message)
  nudgepad.popup.open('#nudgepadWorkerError')
  return false
}

