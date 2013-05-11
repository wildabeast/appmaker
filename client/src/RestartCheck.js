nudgepad.restartCheck = function () {
  $.get('/nudgepad.started', {}, function (data) {
    if (data !== site.get('started')) {
      nudgepad.reloadMessageOneTime = 'Your site restarted. Please refresh the page.'
      location.reload()
    }
  })
}
