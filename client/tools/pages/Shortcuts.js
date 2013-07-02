
/**
 * We manually add some shortcuts to certain functions.
 * This clearly could be cleaned up.
 */
Pages.shortcuts = {}
Pages.shortcuts['meta+shift+p'] = Pages.stage.selection.patchPrompt

Pages.shortcuts['ctrl+a'] = Pages.stage.selectAll
Pages.shortcuts['meta+a'] = Pages.stage.selectAll

Pages.shortcuts['meta+p'] = function () { window.open(Pages.stage.activePage, 'published') }


Pages.shortcuts['meta+shift+left'] = Pages.stage.selection.alignLeft
Pages.shortcuts['meta+shift+right'] = Pages.stage.selection.alignRight
Pages.shortcuts['meta+shift+up'] = Pages.stage.selection.alignTop
Pages.shortcuts['meta+shift+down'] = Pages.stage.selection.alignBottom

Pages.shortcuts['meta+shift+v'] = Pages.stage.selection.distributeVertical
Pages.shortcuts['meta+shift+h'] = Pages.stage.selection.distributeHorizontal
Pages.shortcuts['shift+d'] = Pages.stage.selection.distributeHorizontal

Pages.shortcuts['alt+o'] = Explorer.quickEdit

Pages.deleteShortcut = function () { Pages.stage.selection.delete(); Pages.stage.commit() }
Pages.shortcuts['delete'] = Pages.deleteShortcut
Pages.shortcuts['backspace'] = Pages.deleteShortcut

Pages.shortcuts['ctrl+d'] = Pages.stage.selection.duplicate
Pages.shortcuts['meta+d'] = Pages.stage.selection.duplicate

Pages.editSourceToggle = function () { ($('.selection').length ? Pages.stage.selection.editSource() : Pages.stage.editSource())}
Pages.shortcuts['ctrl+u'] = Pages.editSourceToggle
Pages.shortcuts['meta+u'] = Pages.editSourceToggle

Pages.shortcuts['meta+shift+u'] = Pages.codePanel.toggle

Pages.shortcuts['meta+e'] = Pages.stage.selection.editProperty


Pages.shortcuts['meta+l'] = Pages.stage.selection.editLoop

Pages.contextMenuToggle = function () {$('#PagesContextMenu').toggle()}
Pages.shortcuts['ctrl+i'] = Pages.contextMenuToggle
Pages.shortcuts['meta+i'] = Pages.contextMenuToggle


Pages.shortcuts['shift+space'] = function () {
  var command = prompt('Enter a command')
  if (!command)
    return false
  if (command.match(/^(w|width) (.*)/)) {
    var match = command.match(/^(w|width) (.*)/)
    Pages.stage.selection.css('width ' + match[2])
  }
}

Pages.shortcuts['meta+backspace'] = Pages.deletePage

Pages.shortcuts['meta+o'] = Pages.spotlight
Pages.shortcuts['ctrl+o'] = Pages.spotlight


Pages.shortcuts['ctrl+n'] = Pages.blank
Pages.shortcuts['meta+n'] = Pages.blank

Pages.shortcuts['esc'] = Pages.stage.selection.clear

Pages.shortcuts['shift+n'] = Pages.duplicatePage

Pages.shortcuts['up'] = function (){Pages.stage.selection.move(0, -1)}
Pages.shortcuts['left'] = function (){Pages.stage.selection.move(-1, 0)}
Pages.shortcuts['down'] = function (){Pages.stage.selection.move(0, 1)}
Pages.shortcuts['right'] = function (){Pages.stage.selection.move(1, 0)}

Pages.shortcuts['shift+t'] = function (){ $('.PagesTimeline').toggle()}

Pages.shortcuts['shift+v'] = Pages.stage.toggleView

Pages.shortcuts['shift+up'] = function (){Pages.stage.selection.move(0, -10)}
Pages.shortcuts['shift+left'] = function (){Pages.stage.selection.move(-10, 0)}
Pages.shortcuts['shift+down'] = function (){Pages.stage.selection.move(0, 10)}
Pages.shortcuts['shift+right'] = function (){Pages.stage.selection.move(10, 0)}

Pages.shortcuts['alt+left'] = Pages.stage.back
Pages.shortcuts['alt+right'] = Pages.stage.forward

Pages.shortcuts['ctrl+z'] = Pages.stage.undo
Pages.shortcuts['meta+z'] = Pages.stage.undo
Pages.shortcuts['meta+shift+z'] = Pages.stage.redo
Pages.shortcuts['meta+y'] = Pages.stage.redo
Pages.shortcuts['ctrl+y'] = Pages.stage.redo
Pages.shortcuts['meta+shift+s'] = Pages.stage.selection.cssPrompt

