/**
 * @param {string}
 * @return {object}
 */
$.fn.dimensions = function () {
  var box = {}
  $(this).each(function () {
    if (box.left === undefined) {
      box.left = $(this).position().left
      box.right = box.left + $(this).outerWidth()
      box.top = $(this).position().top
      box.bottom = box.top + $(this).outerHeight()
    }
    else {
      var left = $(this).position().left
      var right = left + $(this).outerWidth()
      var _top = $(this).position().top
      var bottom = _top + $(this).outerHeight()
      if (left < box.left)
        box.left = left
      if (right > box.right)
        box.right = right
      if (_top < box.top)
        box.top = _top
      if (bottom > box.bottom)
        box.bottom = bottom
    }
  })
  box.height = box.bottom - box.top
  box.width = box.right - box.left
  box.center = box.left + Math.floor(box.width/2)
  box.middle = box.top + Math.floor(box.height/2)
  return box
}

