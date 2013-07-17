
/**
 * We manually add some shortcuts to certain functions.
 * This clearly could be cleaned up.
 */
AppMaker.shortcuts = {}

AppMaker.shortcuts['backspace'] = function () {
  $('.ui-selected').remove()
}

AppMaker.shortcuts['delete'] = function () {
  $('.ui-selected').remove()
}

