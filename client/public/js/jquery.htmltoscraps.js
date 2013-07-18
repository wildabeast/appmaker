$.fn.toSpace = function () {
  var space = new Space()
  var el = $(this)
  var tag = $(this).get(0).tagName.toLowerCase()
  space.set('tag', tag)
  $($(this).get(0).attributes).each(function() {
    space.set(this.nodeName, this.nodeValue)
  })
  
  // if leaf node
  if (!$(this).children().length) {
    
    // Meta is a special case. :(
    if (tag !== 'meta')
      space.set('content', $(this).html())
    else
      space.set('content', $(this).attr('content'))
  
  }
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
