var Thumbs = {}

Thumbs.getDimensions = function (target) {
  var box = {}
  var first = false
  $(target).contents().find('.scrap').each(function () {
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
  return box
}

/**
 * Generates a scaled down version of a page in an iframe
 *
 * @param {Space}
 * @param {object}
 * @return {jquery object}
 */
Thumbs.insert = function (page, destination, val, options) {
  var width = options.width
  var height = options.height

  var iframe = $('<iframe></iframe>')
  iframe.attr('frameborder', 0)
  iframe.attr('scrolling', 'no')
  iframe.css('width', width)
  iframe.css('height', height)
  

  destination.append(iframe)
  page._static = true
  
  iframe.contents().find('body').append(page.toHtml()).css('background-color', 'transparent')
  
  var clipbox = Thumbs.getDimensions(iframe)
//  console.log(clipbox)
  
  var body = iframe.contents().find('body')
  
  var ratio = 1
  
  // No transform needed, just center it
  if (clipbox.height <= height && clipbox.width <= width) {
    body.css({
      '-webkit-translate' : '0px ' + Math.round((height - clipbox.height)/2) + 'px'
    })
    return iframe
  }
  
  /*
  height : (scale * old_height) + 'px',
  width : (scale * old_width) + 'px',
  */
  var origin = '0 0'
  
  // Scale by height
  if (clipbox.width < width) {
    // height must be bigger
    var scale = 1.0 * height / clipbox.height
    var scaleString = 'scale(' + scale + ')'
    body.css({
      '-webkit-transform' : scaleString,
      'transform' : scaleString,
      '-moz-transform' : scaleString,
      'transform-origin' : origin
    })
    return iframe
  }
  
  // Scale by width
  if (clipbox.height < height) {
    // width must be bigger
    var scale = 1.0 * width / clipbox.width
    var scaleString = 'scale(' + scale + ')'
    var x = (clipbox.width - width)/2
    body.css({
      '-webkit-transform' : scaleString,
      'transform' : scaleString,
      '-moz-transform' : scaleString,
      'transform-origin' : origin
    })
    return iframe
  }
  
  // Scale by width
  if (clipbox.height < clipbox.width) {
    // width must be bigger
    var scale = 1.0 * width / clipbox.width
    var scaleString = 'scale(' + scale + ')'
    var x = (clipbox.width - width)/2
    body.css({
      '-webkit-transform' : scaleString,
      'transform' : scaleString,
      '-moz-transform' : scaleString,
      'transform-origin' : origin
    })
    return iframe
  }
  
  // height must be bigger
  var scale = 1.0 * height / clipbox.height
  var scaleString = 'scale(' + scale + ')'
  body.css({
    '-webkit-transform' : scaleString,
    'transform' : scaleString,
    '-moz-transform' : scaleString,
    'transform-origin' : origin
  })
  
  return iframe
}
