// Shims for Jquery

/**
 * We parse float in case the element is hidden in which case its top offset will be 0
 *
 * @return {number}
 */
$.fn.top = function () {
  var i
  
  i = Math.floor(parseFloat(this.css('top')) || this.position().top )
  
  return (isNaN(i) ? 0 : i)
}

/**
 * @return {number}
 */
$.fn.middle = function () {
  return Math.round(this.top() + Math.round($(this).outerHeight()/2))
}

/**
 * @return {number}
 */
$.fn.bottom = function () {
  return Math.round(this.top() + this.outerHeight())
}

/**
 * @return {number}
 */
$.fn.right = function () {
  return Math.round(this.left() + this.outerWidth())
}

/**
 * @return {number}
 */
$.fn.center = function () {
  return Math.round(this.left() + Math.round($(this).outerWidth()/2))
}

/**
 * We parse float in case the element is hidden in which case its left offset will be 0
 *
 * @return {number}
 */
$.fn.left = function () {
  var i
  
  // why do we do this?
  i = parseFloat(this.css('left')) || this.position().left
  
  i = Math.floor(i)
    
  return (isNaN(i) ? 0 : i)
}

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

