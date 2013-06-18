var Manage = new Tool('Manage')
Manage.color = 'rgba(171, 193, 199, 1)'
Manage.description = 'Update your email address and logout.'

Manage.onopen = function () {
  $('#ManageEmail').val(nudgepad.cookie.email)
}

Manage.save = function () {
  var email = $('#ManageEmail').val()
  
  if (!ValidateEmail(email))
    return nudgepad.error('Invalid Email')
  
  if (email === nudgepad.cookie.email)
    return Launch.open()
  
  $.post('/nudgepad.updateEmail', {email : email}, function () {
    nudgepad.warnBeforeReload = false
    document.location = '/nudgepad?tool=Launch'
  })
}

