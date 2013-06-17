var htmlProperties = 'checked class disabled draggable dropzone end for height href max maxlength min name onblur onchange onclick oncontextmenu onenterkey onfocus onhold onkeydown onkeypress onkeyup onmousedown onmouseout onmouseover onmouseup onorientationchange onsubmit ontouchend ontouchmove ontouchstart origin pattern placeholder readonly rel required selected spellcheck src tabindex target title width value'.split(/ /)

$.fn.toSpace = function () {
  var space = new Space()
  var el = $(this)
  for (var i in htmlProperties) {
    var name = htmlProperties[i]
    if (el.attr(name))
      space.set(name, el.attr(name))    
  }
  
  space.set('tag', $(this).get(0).tagName.toLowerCase())
  // if leaf node
  if (!$(this).children().length)
    space.set('content', $(this).html())
  else {
    var scraps = new Space()
    $(this).children().each(function () {
      var id = $(this).attr('id') || $(this).get(0).tagName.toLowerCase()
      var num = 1
      var nextId = id
      while (scraps.values[nextId]) {
        num++
        nextId = id + num.toString()
      }
      scraps.set(nextId, $(this).toSpace())
    })
    space.set('scraps', scraps)
  }
  return space
}

$.htmlToScraps = function (html) {
  var page = $(html)
  var space = new Space()
  $(page).each(function () {
    // Skip whitespace
    if (!$(this).get(0).tagName)
      return true
    var id = $(this).attr('id') || $(this).get(0).tagName.toLowerCase()
    var tag = $(this).get(0).tagName.toLowerCase()
    // Skip br tags
//    if (tag === 'br')
//      return true
    var num = 1
    var nextId = id
    while (space.values[nextId]) {
      num++
      nextId = id + num.toString()
    }
    var scrap = $(this).toSpace()
    space.set(nextId, scrap)
  })
  return space
}
