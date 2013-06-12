nudgepad.getPageDimensions = function (page) {
  page = new Page(page)
  page._static = true
  var iframe = $('<iframe class="deleteMe" style="position: fixed; right: 0px; top: 0px;"></iframe>')
  iframe.attr('frameborder', 0)
  iframe.attr('scrolling', 'no')
  iframe.css('width', 1)
  iframe.css('height', 1)
  $('#nudgepadTemp').append(iframe)
  iframe.contents().find('body').append(page.toHtml())
  var box = {}
  var first = false
  iframe.contents().find('.scrap').each(function () {
    var left
    var right
    var _top
    var bottom
    if (!first) {
      box.left = $(this).position().left
      box.right = box.left + $(this).outerWidth()
      box.top = $(this).position().top
      box.bottom = box.top + $(this).outerHeight()
      first = true
    }
    else {
      left = $(this).position().left
      right = left + $(this).outerWidth()
      _top = $(this).position().top
      bottom = top + $(this).outerHeight()
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
  $('.deleteMe').remove()
  return box
}
