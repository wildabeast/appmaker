nudgepad.apps.account = new App('account')

nudgepad.apps.account.onopen = function () {
  $('.nudgepad#email').val(nudgepad.cookie.email)
}

nudgepad.apps.account.save = function () {
  var email = $('.nudgepad#email').val()
  
  if (!ValidateEmail(email))
    return nudgepad.error('Invalid Email')
  
  if (email === nudgepad.cookie.email)
    return nudgepad.apps.home.open()
  
  $.post('/nudgepad.updateEmail', {email : email}, function () {
    nudgepad.warnBeforeReload = false
    document.location = '/nudgepad?app=home'
  })
}

