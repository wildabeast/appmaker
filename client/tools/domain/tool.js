var Domain = new Tool('Domain')
Domain.set('color', 'rgba(36, 65, 112, 1)')
Domain.set('path', '')
Domain.set('description', 'Change your project\'s domain.')

Domain.import = function () {
  TextPrompt.open('Import a Project to this Domain', '', function (val) {
    $.post('/nudgepad.import', {space : val}, function (err) {
      Flasher.success('Imported files.')
    })
  })
}

Domain.on('open', function () {
  var domain = $('#DomainDomain').val('copyof' + document.location.host)
})

Domain.cloneProject = function () {
  var domain = $('#DomainDomain').val()
  
  // Allow for moving of domains
  if (domain.match(/ /)) {
    var parts = domain.split(/ /)
    domain = parts[0]
    var panel = parts[1]
  }
  // Panel is the domain running the nudgepad panel server
  else
    var panel = Project.get('hostname')
  
  $.get('/nudgepad.export', {}, function (data) {
    
    
    var newForm = $('<form>', {
        'action': 'http://' + panel + '/create',
//        'target': '_blank',
        'method' : 'post'
    })
    .append($('<input>', {
        'name': 'domain',
        'value': domain,
        'type': 'hidden'
    }))
    .append($('<input>', {
        'name': 'email',
        'value': Cookie.email,
        'type': 'hidden'
    }))
    .append($('<input>', {
        'name': 'timestamp',
        'value': new Date().getTime(),
        'type': 'hidden'
    }))
    .append($('<input>', {
        'name': 'relaxed',
        'value': 'true',
        'type': 'hidden'
    }))
    .append($('<input>', {
        'name': 'clone',
        'value': data,
        'type': 'hidden'
    }))
    newForm.submit()
    
  })
  
}
