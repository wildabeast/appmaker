var Inviter = {}

Inviter.prompt = function () {
  var val = prompt('Invite people to edit this project. Add one or more emails, separated by spaces', '')
  if (!val)
    return false
  
  $.post('/nudgepad.invite', {emails : val}, function (result) {
    Flasher.success('Invite Sent')
    mixpanel.track('I invited people')
  })
}
