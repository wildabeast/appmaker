/**
 * Get the width of the horizontal and vertical scrollbars.
 *
 * @return {number}
 */
$.scrollbarWidth = function () {
  // potentially always return 10
  if (navigator.userAgent.match(/Mac OS X 10_7/))
    return 10
  
  var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"> </div>')
  // Append our div, do our calculation and then remove it 
  $('body').append(div)
  var w1 = $('div', div).innerWidth()
  div.css('overflow-y', 'scroll')
  var w2 = $('div', div).innerWidth()
  div.remove()
  return (w1 - w2)
}

/**
 * Is the given coordinate on a scrollbar? Necessary to make resize and select
 * behave properly when a person clicks scrollbar.
 *
 * todo: look into using Google Closure's code for this.
 *
 * @param {number}
 * @param {number}
 * @return {bool}
 */
$.isOnScrollbar = function (x, y) {
  var scrollbar_size = $.scrollbarWidth()
  var window_width = $(window).width()
  var window_height = $(window).height()
  var body_width = $('body').width()
  var body_height = $('body').height()
  var vertical_bar = body_height > window_height
  var horizontal_bar = body_width > window_width
  var distance_right = window_width - x
  var distance_bottom = window_height - y
  if (vertical_bar && distance_right < scrollbar_size)
    return true
  if (horizontal_bar && distance_bottom < scrollbar_size)
    return true
  return false
}


