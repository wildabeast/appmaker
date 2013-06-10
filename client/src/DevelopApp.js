nudgepad.apps.develop = new App('develop')

nudgepad.apps.develop.files = ''
nudgepad.apps.develop.log = ''
nudgepad.apps.develop.path = ''
nudgepad.apps.develop.pathPretty = ''
nudgepad.apps.develop.status = ''

nudgepad.apps.develop.clone = function () {
  var domain = prompt('Enter a domain name', 'copyof' + nudgepad.domain)
  if (!domain)
    return false
  // TODO: make tld come from server and dont compute it here, which
  // is incorrect
  // tld equals the part that domain and nudgepad.domain have in common
  var newDomainReversed = domain.split("").reverse().join("")
  var currentDomainReversed = nudgepad.domain.split("").reverse().join("")
  var tld = ''
  for (var i = 0 ; i < currentDomainReversed.length ; i++) {
    if (newDomainReversed.substr(i, 1) === currentDomainReversed.substr(i, 1))
      tld = newDomainReversed.substr(i, 1) + tld
  }
  // chop common domain part
  tld = tld.replace(/^[^\.]*\./, '')
  // Panel is the domain running the nudgepad panel server
  var panel = site.get('hostname')
  
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
        'value': nudgepad.cookie.email,
        'type': 'hidden'
    }))
    .append($('<input>', {
        'name': 'timestamp',
        'value': new Date().getTime(),
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

nudgepad.apps.develop.createFile = function () {
  var name = prompt('Name your file')
  if (!name)
    return false
  nudgepad.explorer.create(nudgepad.apps.develop.pathPretty + name, nudgepad.apps.develop.refresh)
}

nudgepad.apps.develop.home = function () {
  nudgepad.apps.develop.path = ''
  nudgepad.apps.develop.pathPretty = ''
  nudgepad.apps.develop.renderExplorer()
}

nudgepad.apps.develop.import = function () {
  nudgepad.textPrompt('Import a Site ', '', function (val) {
    $.post('/nudgepad.import', {space : val}, function (err) {
      nudgepad.notify('Imported. Please restart')
    })
  })
}

nudgepad.apps.develop.onopen = function () {
//  $('.nudgepad#zip').attr('href', '/nudgepad.backup/' + nudgepad.domain + '.zip')
  if (!nudgepad.apps.develop.log)
    nudgepad.apps.develop.refresh()
}

nudgepad.apps.develop.renderExplorer = function () {
  
  var files = nudgepad.apps.develop.files
  if (nudgepad.apps.develop.path)
    files = files.get(nudgepad.apps.develop.path)
  
  var explorer = '<table id="nudgepadExplorer">'
  explorer += '<tr class="explorerHeader"><td>Filename</td><td></td><td></td><td>Size</td><td>Age</td></tr>'
  
  var filenames = files.keys
  for (var i in filenames) {
    // its a folder
    var name = filenames[i]
    var item = files.values[name]
    var row = '<tr'
    if (item.get('timeSinceLastChange')) {
      row += ' class="explorerFile" value="' + name + '">'
      row += '<td class="explorerEdit standardCell">' + name + '</td>'
      row += '<td class="explorerRename standardCell">Rename</td>'
      row += '<td class="explorerRemove standardCell">Delete</td>'
      row += '<td class="standardCell">' + (item.get('size')) + 'KB</td>'
      row += '<td class="standardCell">' + moment(item.get('mtime')).fromNow() + '</td>'
    } else {
      row += ' class="explorerFolder" value="' + name + '">'
      row += '<td class="explorerFolderName standardCell" colspan=5>' + name + '</td>'
    }
    row += '</tr>'
    explorer += row
  }
  explorer += '</table>'
  nudgepad.apps.develop.explorer = explorer
  $('.nudgepad#explorerPath').text(nudgepad.domain + '/' + nudgepad.apps.develop.pathPretty)
  $('.nudgepad#explorerHolder').html(nudgepad.apps.develop.explorer)
}

nudgepad.apps.develop.refresh = function () {
  $.get('/nudgepad.status', {}, function (data) {
    nudgepad.apps.develop.status = data
    $('.nudgepad#statusArea').text(nudgepad.apps.develop.status)
  })
  $.get('/nudgepad.logs', {}, function (data) {
    nudgepad.apps.develop.log = data
    $('.nudgepad#logHolder').html(data)
    $('#logHolder').scrollTop($('#logHolder').height())
  })
  $.get('/nudgepad.explorer.list', {}, function (data) {
    nudgepad.apps.develop.files = new Space(data)
    nudgepad.apps.develop.renderExplorer()
    
  })
}

$(document).on('click', 'td.explorerEdit', function () {
  nudgepad.explorer.edit(nudgepad.apps.develop.pathPretty + $(this).parent().attr('value'))
})

$(document).on('click', 'td.explorerRename', function () {
  var newName = prompt('Rename this file', $(this).parent().attr('value'))
  if (!newName)
    return false
  nudgepad.explorer.rename(nudgepad.apps.develop.pathPretty + $(this).parent().attr('value'),
    nudgepad.apps.develop.pathPretty + newName, nudgepad.apps.develop.refreshFiles)
})

$(document).on('click', 'td.explorerRemove', function () {
  var name = $(this).parent().attr('value')
  if (!confirm('Are you sure you want to delete ' + name + '?'))
    return false
  nudgepad.explorer.remove(nudgepad.apps.develop.pathPretty + name, nudgepad.apps.develop.refresh)
})

$(document).on('click', 'td.explorerFolderName', function () {
  if (nudgepad.apps.develop.path)
    nudgepad.apps.develop.path += ' ' + $(this).parent().attr('value')
  else
    nudgepad.apps.develop.path = $(this).parent().attr('value')
  nudgepad.apps.develop.pathPretty = nudgepad.apps.develop.path.replace(' ', '/') + '/'
  nudgepad.apps.develop.renderExplorer()
})

var visibleContent;

$(document).on('click', '.devToggleOption', function () {
  visibleContent = $(this).text().toLowerCase() + 'Content'
  if(!$(this).hasClass('devSelect')) {
    $('div').removeClass('devSelect');
    $(this).addClass('devSelect')
    $('.devAppContent').hide()
    $('#' + visibleContent).show()
  }
})


