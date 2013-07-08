var Team = new Tool('Team')
Team.set('color', 'rgba(171, 193, 199, 1)')
Team.set('description', 'Invite people to work on your project.')

Team.on('open', function () {
  $('#TeamEmail').val(Cookie.email)
})

Team.save = function () {
  var email = $('#TeamEmail').val()
  
  if (!Team.validateEmail(email))
    return Flasher.error('Invalid Email')
  
  if (email === Cookie.email)
    return Launcher.open('Home')
  
  $.post('/nudgepad.updateEmail', {email : email}, function () {
    nudgepad.warnBeforeReload = false
    document.location = '/nudgepad?tool=Home'
  })
}

Team.validateEmail = function (email) { 
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

