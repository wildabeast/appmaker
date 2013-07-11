var Files = new Tool('Files')
Files.set('color', 'rgba(36, 65, 112, 1)')
Files.set('path', '')
Files.set('description', 'View and edit the files of your project.')

Files.createFile = function () {
  var name = prompt('Name your file')
  if (!name)
    return false
  Explorer.create(Files.get('path') + ' ' + name, Files.refresh)
}

Files.import = function () {
  TextPrompt('Import a Project ', '', function (val) {
    $.post('/nudgepad.import', {space : val}, function (err) {
      Flasher.success('Imported files.')
      Files.refresh()
    })
  })
}

// Files.on('change', 'path', Files.RenderExplorer())

Files.on('open', function () {
  
  $('#FilesDownload').attr('href', '/nudgepad.backup/' + document.location.host + '.zip')
  Files.refresh()  
    
})

Files.on('set', function (key) {
  if (key === 'path')
    Files.renderExplorer()
})

Files.renderExplorer = function () {
  
  var files = Files.get('files')
  if (Files.get('path'))
    files = files.get(Files.get('path'))
  
  var explorer = '<table id="FilesExplorer">'
  explorer += '<tr class="FilesExplorerHeader"><td>Filename</td><td></td><td></td><td>Size</td><td>Age</td></tr>'
  
  var path = (Files.get('path') ? Files.get('path') + ' ' : '')
  files.each(function (filename, file) {
    var row = '<tr'
    // if is file
    if (file.get('timeSinceLastChange')) {
      row += ' class="FilesExplorerFile" value="' + filename + '" path="' + path + filename + '">'
      row += '<td class="FilesExplorerEdit">' + filename + '</td>'
      row += '<td class="FilesExplorerRename">Rename</td>'
      row += '<td class="FilesExplorerRemove">Delete</td>'
      row += '<td>' + (file.get('size')) + '</td>'
      row += '<td>' + moment(file.get('mtime')).fromNow() + '</td>'
    } else {
      row += ' class="FilesExplorerFolder" value="' + filename + '" path="' + path + filename + '">'
      row += '<td class="FilesExplorerFolderName" colspan=5>' + filename + '</td>'
    }
    row += '</tr>'
    explorer += row
  })
  explorer += '</table>'
  var breadcrumb = '<span onclick="Files.set(\'path\', \'\')">' + document.location.host + '</span>'
  if (path) {
    var parent = ''
    path.split(/ /g).forEach(function (v, i) {
      breadcrumb += ' <span onclick="Files.set(\'path\', \'' + parent + v + '\')">' + v + '</span>'
      parent += v + ' '
    })
    
  }
  $('#FilesExplorerPath').html(breadcrumb)
  $('#FilesExplorerHolder').html(explorer)
}

Files.refresh = function () {
  $.get('/nudgepad.explorer.list', {}, function (data) {
    Files.set('files', new Space(data))
    Files.renderExplorer()
  })
}

$(document).on('click', 'td.FilesExplorerEdit', function () {
  var filepath = $(this).parent().attr('path')
  Explorer.edit(filepath)
})

$(document).on('click', 'td.FilesExplorerRename', function () {
  var newName = prompt('Rename this file', $(this).parent().attr('value'))
  if (!newName)
    return false
  var path = (Files.get('path') ? Files.get('path') + ' ' : '')
  Explorer.rename($(this).parent().attr('path'), path + newName, Files.refresh)
})

$(document).on('click', 'td.FilesExplorerRemove', function () {
  var name = $(this).parent().attr('value')
  if (!confirm('Are you sure you want to delete ' + name + '?'))
    return false
  Explorer.remove($(this).parent().attr('path'), Files.refresh)
})

$(document).on('click', 'td.FilesExplorerFolderName', function () {
  Files.set('path', $(this).parent().attr('path'))
})


