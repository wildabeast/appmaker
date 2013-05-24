// Todo: Allow option to fire lasso event during the slide
// Todo: Allow option to fire lasso event on elements that only have a partial match
var Lasso = {
  id : "Lasso",
  container : 'body',
  selector : 'div',
  style : {
    'z-index': 100,
    border: '1px solid #0c79cc',
    position: 'absolute'
  },
  scrollTop : 0
}

Lasso.append = function () {

  if ($('#' + Lasso.id).length > 0)
    return null
  
  var lasso = $('<div></div>')
//  lasso.append('<style>html { -webkit-user-select: none;-moz-user-select: -moz-none;user-select: none;}</style>')
  lasso.attr('id', Lasso.id)
  lasso.css(Lasso.style)
  lasso.css({
    top : Lasso.mousedown.pageY,
    left : Lasso.mousedown.pageX,
  })
  $(Lasso.container).append(lasso)
  
}

Lasso.disable = function () {
  $(document).off("mousedown", Lasso.onmousedown)
  $(document).off("slide", Lasso.slide)
  $(document).off("slideend", Lasso.release)
}

Lasso.enable = function () {
  $(document).on("mousedown", Lasso.onmousedown)
  $(document).on("slide", Lasso.slide)
  $(document).on("slideend", Lasso.release)
}

Lasso.onmousedown = function (event) {
  Lasso.mousedown = event
  Lasso.scrollTop = $(Lasso.container).scrollTop()
  return true
}

Lasso.release = function (event, mouseUpEvent) {

  var lasso = $('#' + Lasso.id)
  if (lasso.length === 0)
    return null
  
  var box = {}
  box.left = lasso.offset().left,
  box.right = lasso.offset().left + lasso.outerWidth(),
  box.top = lasso.offset().top,
  box.bottom = lasso.offset().top + lasso.outerHeight()
  
  // select every visible block thats entirely within the rectangle
  var results = $()
  $(Lasso.selector).each(function () {
    var el = $(this)
    if (el.offset().left < box.left)
      return true
    
    if ((el.offset().left + el.outerWidth()) > box.right)
      return true
    
    if (el.offset().top < box.top)
      return true
    
    if ((el.offset().top + el.outerHeight()) > box.bottom)
      return true
    
    // Yay! The lasso box completely surrounds me.
    $(this).addClass('Lasso')
  })
  // We only want to trigger Lasso event on outermost parent elements
  // Todo: clean this up
  $('.Lasso').each(function () {
    $(this).find('.Lasso').each(function () {
      $(this).removeClass('Lasso')
    })
  })
  $('.Lasso').each(function () {
    $(this).removeClass('Lasso')
    $(this).trigger('lasso')
  })
  lasso.remove()
}

Lasso.slide = function (slideEvent, mouseMoveEvent) {

  Lasso.append()
  var lasso = $('#' + Lasso.id)
  var scrollChange = $(Lasso.container).scrollTop() - Lasso.scrollTop
  var y = Lasso.mousedown.pageY - scrollChange
  var directions = {"vertical" : y, "horizontal" : Lasso.mousedown.pageX}
  for (var i in directions) {
    
    var direction = i,
        origin = directions[i],
        new_value = (direction == "horizontal" ? mouseMoveEvent.pageX : mouseMoveEvent.pageY),
        size = (direction == "horizontal" ? "width" : "height"),
        position = (direction == "horizontal" ? "left" : "top"),
        d = (direction == "horizontal" ? "verticals" : "horizontals"),
        change = new_value - origin
    // if positive change, increase size, keep position
    if (change >= 0)
      lasso.css(size, change).css(position, origin)
    // if negative change, decrease position, increase size.
    else
      lasso.css(position, new_value).css(size, -change)
  }
}




