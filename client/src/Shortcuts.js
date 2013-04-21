Events.shortcut.onfire = function (key) {
  nudgepad.feedback.record('used shortcut ' +  key)
}

/**
 * We manually add some shortcuts to certain functions.
 * This clearly could be cleaned up.
 */
nudgepad.bind_shortcuts = function () {
  
  Events.shortcut.shortcuts['meta+shift+p'] = nudgepad.stage.selection.patchPrompt
  
  Events.shortcut.shortcuts['ctrl+a'] = nudgepad.stage.selectAll
  Events.shortcut.shortcuts['meta+a'] = nudgepad.stage.selectAll
  
  Events.shortcut.shortcuts['meta+p'] = function () { window.open(nudgepad.stage.activePage, 'published') }
  

  Events.shortcut.shortcuts['meta+shift+left'] = nudgepad.stage.selection.alignLeft
  Events.shortcut.shortcuts['meta+shift+right'] = nudgepad.stage.selection.alignRight
  Events.shortcut.shortcuts['meta+shift+up'] = nudgepad.stage.selection.alignTop
  Events.shortcut.shortcuts['meta+shift+down'] = nudgepad.stage.selection.alignBottom
  
  Events.shortcut.shortcuts['meta+shift+v'] = nudgepad.stage.selection.distributeVertical
  Events.shortcut.shortcuts['meta+shift+h'] = nudgepad.stage.selection.distributeHorizontal
  Events.shortcut.shortcuts['shift+d'] = nudgepad.stage.selection.distributeHorizontal
  
  Events.shortcut.shortcuts['alt+o'] = nudgepad.explorer.quickEdit
  
  Events.shortcut.shortcuts['meta+shift+s'] = nudgepad.edit_settings
  
  Events.shortcut.shortcuts['delete'] = function () { nudgepad.stage.selection.remove(); nudgepad.stage.commit() }
  Events.shortcut.shortcuts['backspace'] = function () { nudgepad.stage.selection.remove(); nudgepad.stage.commit() }
  Events.shortcut.shortcuts['ctrl+d'] = nudgepad.stage.selection.duplicate
  Events.shortcut.shortcuts['meta+d'] = nudgepad.stage.selection.duplicate
  Events.shortcut.shortcuts['ctrl+u'] = nudgepad.pages.editSource
  Events.shortcut.shortcuts['meta+u'] = nudgepad.pages.editSource
  Events.shortcut.shortcuts['meta+e'] = nudgepad.pages.editProperty
  
  Events.shortcut.shortcuts['meta+i'] = nudgepad.stage.selection.renameScraps
  Events.shortcut.shortcuts['meta+l'] = nudgepad.stage.selection.editLoop
  
  Events.shortcut.shortcuts['ctrl+i'] = nudgepad.importPrompt
  
  Events.shortcut.shortcuts['meta+shift+m'] = function () {nudgepad.explorer.edit('/public/manifest.webapp')}
  
  Events.shortcut.shortcuts['meta+backspace'] = nudgepad.pages.trash
  
  Events.shortcut.shortcuts['meta+o'] = nudgepad.pages.spotlight
  Events.shortcut.shortcuts['ctrl+o'] = nudgepad.pages.spotlight
  
  
  Events.shortcut.shortcuts['ctrl+n'] = nudgepad.pages.blank
  Events.shortcut.shortcuts['meta+n'] = nudgepad.pages.blank
  
  Events.shortcut.shortcuts['shift+n'] = nudgepad.pages.duplicate
  
  Events.shortcut.shortcuts['up'] = function (){nudgepad.stage.selection.move(0, -1)}
  Events.shortcut.shortcuts['left'] = function (){nudgepad.stage.selection.move(-1, 0)}
  Events.shortcut.shortcuts['down'] = function (){nudgepad.stage.selection.move(0, 1)}
  Events.shortcut.shortcuts['right'] = function (){nudgepad.stage.selection.move(1, 0)}
  
  Events.shortcut.shortcuts['shift+t'] = function (){
    $('.nudgepadTimeline').toggle()
  }
  
  Events.shortcut.shortcuts['shift+up'] = function (){nudgepad.stage.selection.move(0, -10)}
  Events.shortcut.shortcuts['shift+left'] = function (){nudgepad.stage.selection.move(-10, 0)}
  Events.shortcut.shortcuts['shift+down'] = function (){nudgepad.stage.selection.move(0, 10)}
  Events.shortcut.shortcuts['shift+right'] = function (){nudgepad.stage.selection.move(10, 0)}
  
  Events.shortcut.shortcuts['meta+right'] = nudgepad.stage.selection.nest
  
  Events.shortcut.shortcuts['alt+left'] = nudgepad.stage.back
  Events.shortcut.shortcuts['alt+right'] = nudgepad.stage.forward
  
  Events.shortcut.shortcuts['ctrl+z'] = nudgepad.stage.undo
  Events.shortcut.shortcuts['meta+z'] = nudgepad.stage.undo
  Events.shortcut.shortcuts['meta+shift+z'] = nudgepad.stage.redo
  Events.shortcut.shortcuts['meta+y'] = nudgepad.stage.redo
  Events.shortcut.shortcuts['ctrl+y'] = nudgepad.stage.redo
  Events.shortcut.shortcuts['meta+shift+c'] = nudgepad.stage.selection.cssPrompt
  
}
