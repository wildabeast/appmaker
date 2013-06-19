var Manage = new Tool('Manage')
Manage.color = 'rgba(171, 193, 199, 1)'
Manage.description = 'Update your email address and logout.'

Manage.onopen = function () {
  $('#ManageEmail').val(nudgepad.cookie.email)
}

Manage.save = function () {
  var email = $('#ManageEmail').val()
  
  if (!Manage.validateEmail(email))
    return Flasher.error('Invalid Email')
  
  if (email === nudgepad.cookie.email)
    return Launcher.open('Launch')
  
  $.post('/nudgepad.updateEmail', {email : email}, function () {
    nudgepad.warnBeforeReload = false
    document.location = '/nudgepad?tool=Launch'
  })
}

Manage.validateEmail = function (email) { 
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

