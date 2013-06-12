/**
 * topdiv
 *
 * Is there a div at a certain point? Get the top div at a given point
 *
 * Source http://github.com/breck7/topdiv
 * License MIT
 * Author Breck Yunits
 *
 * @param {string} A Selector to use to narrow search.
 * @param {number}
 * @param {number}
 * @return {jQuery object|null}
 */
$.topDiv = function (selector, x, y) {
  
  var match = null
  $(selector).each(function() {
    var div = $(this)
    // Return if the block is
    var left = div.position().left
    if (left > x)
      return true
    var right = div.position().left + div.outerWidth()
    if (right < x)
      return true
    var _top = div.position().top
    if (_top > y)
      return true
    var bottom = _top + div.outerHeight()
    if (bottom < y)
      return true
    
    // If we dont have a block yet, set it
    if (!match)
      return match = div
    
    // Else only change the match if z-index or element index is greater.
    var divZIndex = parseFloat(div.css('z-index'))
    var matchZIndex = parseFloat(match.css('z-index'))
  
    
    if (divZIndex > matchZIndex)
      return match = div
    if (divZIndex < matchZIndex)
      return true
    
    if (div.index() > match.index())
      return match = div
  
  })
  return match
}
