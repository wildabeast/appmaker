$.fn.scrap = function () {
  return nudgepad.pages.stage.get($(this).attr('path'))
}

$.fn.deselect = function () {
  var id = $(this).attr('id')
  $(this).removeClass('selection')
  $('.' + id + '_handle').remove()
  nudgepad.trigger('selection')
  return $(this)
}


/**
 * @param {string}
 * @return {Scrap} this
 */
$.fn.selectMe = function () {
  
  var scrap = $(this).scrap()
  
  if (scrap.get('locked'))
    return false
  
  // Dont double select things
  if ($(this).hasClass('selection'))
    return this
  $(this).addClass('selection')
  
  var position = $(this).css('position')
  if (position === 'absolute' || position === 'fixed')
    nudgepad.MoveHandle.create(scrap)
  
  nudgepad.trigger('selection')

  EditHandle.create(scrap)
  
  var style = scrap.get('style')
  // If no width, return
  if (!style)
    return this
  
  // Set Fixed proportions or not
  var fixed = (style.get('background-image') && style.get('background-size') === 'contain')
  
  if (fixed) {
    nudgepad.StretchHandle.create(scrap, "middle", "left", fixed)
    nudgepad.StretchHandle.create(scrap, "middle", "right", fixed)
    return this
  }
  
  // Everything can be resized
  nudgepad.StretchHandle.create(scrap, "top", "left")
  nudgepad.StretchHandle.create(scrap, "top", "center")
  nudgepad.StretchHandle.create(scrap, "top", "right")
  nudgepad.StretchHandle.create(scrap, "middle", "left")
  nudgepad.StretchHandle.create(scrap, "middle", "right")
  nudgepad.StretchHandle.create(scrap, "bottom", "left")
  nudgepad.StretchHandle.create(scrap, "bottom", "center")
  nudgepad.StretchHandle.create(scrap, "bottom", "right")
  
  return $(this)
}
