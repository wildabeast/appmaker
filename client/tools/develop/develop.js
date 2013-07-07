var Develop = new Tool('Develop')
Develop.set('color', 'rgba(36, 65, 112, 1)')
Develop.set('path', '')
Develop.set('description', 'Edit the backend and files of your project.')

Develop.cloneProject = function () {
  var domain = prompt('Enter a domain name', 'copyof' + document.location.host)
  if (!domain)
    return false
  
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

/**
 * Prompt the maker for input. Pops a modal.
 */
Develop.console = function () {
  mixpanel.track('I opened the console')
  var output = $('<pre id="DevelopConsole"></pre>')
  var input = $('<input id="DevelopConsoleInput" type="text"/>')
  var checkbox = $('<input type="checkbox" id="DevelopConsoleCheckbox"/>')
  var label = $('<label for="DevelopConsoleCheckbox" id="DevelopConsoleLabel">Eval in Node Process</label>')
  var modal_screen = $('<div id="ModalScreen"/>')
  modal_screen.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })
  output.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })

//  if (onkeypress)
//    output.on('keypress', onkeypress)
    
  var send_button = $('<div id="SaveButton">Send</div>')
  var cancel_button = $('<div id="CancelButton">Close</div>')
  
  var button_container = $('<div id="ButtonContainer"></div>')
  modal_screen.on('click', function () {
    cancel_button.trigger('click')
  })
  
  cancel_button.on('click', function () {
    send_button.remove()
    output.remove()
    modal_screen.remove()
    button_container.remove()
    cancel_button.remove()
    label.remove()
    checkbox.remove()
    input.remove()
  })
  
  send_button.on('click', function () {
    
    var command = input.val()
    var endpoint = 'nudgepad.exec'
    if (checkbox.is(':checked'))
      endpoint = 'nudgepad.console'
    
    $.post(endpoint, {command : command}, function (result) {
      output.append('>' + command.replace(/\n/g, '> \n') + '\n')
      output.append(result + '\n')
      output.scrollTop($('#DevelopConsole')[0].scrollHeight + '')
      input.val('')
      input.focus()
    }).error(function (error, message) {
      mixpanel.track('I used the console and got an error')
      output.append('>' + command.replace(/\n/g, '> \n') + '\n')
      output.append('ERROR\n')
      output.append(error.responseText + '\n')
      output.scrollTop($('#DevelopConsole')[0].scrollHeight + '')
      input.val('')
      input.focus()
    })
    
  })
  
  input.on('enterkey', function () {
    send_button.click()
  })
  
  $('body').append(modal_screen)
  $('body').append(checkbox)
  $('body').append(label)
  $('body').append(output)
  $('body').append(input)
  $('body').append(send_button)
  $('body').append(cancel_button)
  $('body').append(button_container)
  input.focus()
}

Develop.createFile = function () {
  var name = prompt('Name your file')
  if (!name)
    return false
  Explorer.create(Develop.get('path') + ' ' + name, Develop.refresh)
}

Develop.import = function () {
  TextPrompt('Import a Project ', '', function (val) {
    $.post('/nudgepad.import', {space : val}, function (err) {
      Flasher.success('Imported files.')
      Develop.refresh()
    })
  })
}

// Develop.on('change', 'path', Develop.RenderExplorer())

Develop.on('open', function () {
//  $('.nudgepad#zip').attr('href', '/nudgepad.backup/' + document.location.host + '.zip')
  if (!Develop.get('log'))
    Develop.refresh()
})

Develop.on('set', function (key) {
  if (key === 'path')
    Develop.renderExplorer()
})

Develop.renderExplorer = function () {
  
  var files = Develop.get('files')
  if (Develop.get('path'))
    files = files.get(Develop.get('path'))
  
  var explorer = '<table id="DevelopExplorer">'
  explorer += '<tr class="DevelopExplorerHeader"><td>Filename</td><td></td><td></td><td>Size</td><td>Age</td></tr>'
  
  var path = (Develop.get('path') ? Develop.get('path') + ' ' : '')
  files.each(function (filename, file) {
    var row = '<tr'
    // if is file
    if (file.get('timeSinceLastChange')) {
      row += ' class="DevelopExplorerFile" value="' + filename + '" path="' + path + filename + '">'
      row += '<td class="DevelopExplorerEdit">' + filename + '</td>'
      row += '<td class="DevelopExplorerRename">Rename</td>'
      row += '<td class="DevelopExplorerRemove">Delete</td>'
      row += '<td>' + (file.get('size')) + 'KB</td>'
      row += '<td>' + moment(file.get('mtime')).fromNow() + '</td>'
    } else {
      row += ' class="DevelopExplorerFolder" value="' + filename + '" path="' + path + filename + '">'
      row += '<td class="DevelopExplorerFolderName" colspan=5>' + filename + '</td>'
    }
    row += '</tr>'
    explorer += row
  })
  explorer += '</table>'
  var breadcrumb = '<span onclick="Develop.set(\'path\', \'\')">' + document.location.host + '</span>'
  if (path) {
    var parent = ''
    path.split(/ /g).forEach(function (v, i) {
      breadcrumb += ' <span onclick="Develop.set(\'path\', \'' + parent + v + '\')">' + v + '</span>'
      parent += v + ' '
    })
    
  }
  $('#DevelopExplorerPath').html(breadcrumb)
  $('#DevelopExplorerHolder').html(explorer)
}

Develop.refresh = function () {
  $.get('/nudgepad.status', {}, function (data) {
    Develop.set('status', data)
    $('#DevelopStatusArea').text(data)
  })
  $.get('/nudgepad.logs', {}, function (data) {
    Develop.set('log', data)
    $('#DevelopLogHolder').html(data)
    $('#DevelopLogHolder').scrollTop($('#DevelopLogHolder').height())
  })
  Develop.refreshFiles()
}

Develop.refreshFiles = function () {
  $.get('/nudgepad.explorer.list', {}, function (data) {
    Develop.set('files', new Space(data))
    Develop.renderExplorer()
  })
}

$(document).on('click', 'td.DevelopExplorerEdit', function () {
  var filepath = $(this).parent().attr('path')
  Explorer.edit(filepath)
})

$(document).on('click', 'td.DevelopExplorerRename', function () {
  var newName = prompt('Rename this file', $(this).parent().attr('value'))
  if (!newName)
    return false
  var path = (Develop.get('path') ? Develop.get('path') + ' ' : '')
  Explorer.rename($(this).parent().attr('path'), path + newName, Develop.refresh)
})

$(document).on('click', 'td.DevelopExplorerRemove', function () {
  var name = $(this).parent().attr('value')
  if (!confirm('Are you sure you want to delete ' + name + '?'))
    return false
  Explorer.remove($(this).parent().attr('path'), Develop.refresh)
})

$(document).on('click', 'td.DevelopExplorerFolderName', function () {
  Develop.set('path', $(this).parent().attr('path'))
})

$(document).on('click', '.DevelopToggleOption', function () {
  if(!$(this).hasClass('DevelopSelect')) {
    $('.DevelopSelect').removeClass('DevelopSelect');
    $(this).addClass('DevelopSelect')
    $('.DevelopContent').hide()
    $('#' + $(this).attr('value')).show()
  }
})


