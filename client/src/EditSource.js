/**
 * Advances position_index, advanced position.
 */
nudgepad.pages.editPageSource = function () {
  nudgepad.textPrompt('Enter code...', nudgepad.pages.stage.toString(), function (val) {
    nudgepad.pages.stage = new Space(val)
    nudgepad.stage.commit()
    nudgepad.stage.open(nudgepad.stage.activePage)
  })
}

/**
 * Advances position_index, advanced position.
 */
nudgepad.pages.editProperty = function () {
  
  var scrap = $('.selection').scrap()
  
  var prop = prompt('What property do you want to edit?', '')
  if (!prop)
    return false
  
  var value = scrap.get(prop)
  nudgepad.textPrompt('Enter new value...', value.toString(), function (val) {
      scrap.set(prop, val)
      nudgepad.stage.commit()
      nudgepad.stage.open(nudgepad.stage.activePage)
  })
}

/**
 * Advances position_index, advanced position.
 */
nudgepad.pages.editSource = function () {
  if ($('.selection').length)
    nudgepad.stage.selection.editSource()
  else
    nudgepad.pages.editPageSource()
}
