/**
 * MoveHandle changes the (x, y) coordinates of selected Scraps 
 */
Prototype.MoveHandle = function () {
}

Prototype.MoveHandle.create = function (scrap) {
  
  var element = scrap.element()
  
  
  var div = $('<div></div>')
  div.attr('value', scrap.getPath())
  div.addClass('handle ' + scrap.id + 'Handle moveHandle')
  div.attr('id', 'moveHandle' + scrap.id)
  div.attr('title', scrap.id)
  
  var position = element.css('position')
  if (position === 'fixed' || position === 'absolute') {
    div.on("mousedown", Prototype.MoveHandle.mousedown)
    div.on("slide", Prototype.MoveHandle.slide)
    div.on("slidestart", Prototype.MoveHandle.slidestart)
    div.on("slideend", Prototype.MoveHandle.slideend)
    div.css('cursor', 'move')
  }
  div.css({
    "position" : (position === 'fixed' ? 'fixed' : 'absolute'),
    "z-index" : "50"
  })
  element.parent().append(div)
  div.on("tap", Prototype.MoveHandle.tap)
  div.on("update", Prototype.MoveHandle.update)
  div.on("dblclick", function (event) {
    if (event.metaKey) {
      element.togglePosition()
      Prototype.stage.commit()
      element.deselect().selectMe()
    } else
      scrap.edit(true)
  })
  
  div.trigger("update")
}

// We cache the start dimensions
Prototype.MoveHandle.dimensions = {}

//If small block is on top of (higher z-index) a bigger block, selects small block
Prototype.MoveHandle.mousedown = function () {
//  Prototype.MoveHandle.selectTopScrap()
  Prototype.MoveHandle.dimensions = $(this).owner().dimensions()
  Prototype.grid.create()
  Prototype.MoveHandle.last_x_change = 0
  Prototype.MoveHandle.last_y_change = 0
  
  Prototype.MoveHandle.scrollTop = Prototype.stage.scrollTop()
  return true
}

/**
 * if the click is on another smaller div select that one instead of move.
 *
 * @param true. Allow propogation
 */
Prototype.MoveHandle.selectTopScrap = function () {

  // get element at point
  var offsetLeft = $('#PrototypeStageBody').offset().left
  var offsetTop = $('#PrototypeStageBody').offset().top
  var element = $.topDiv('.scrap:visible', Prototype.Mouse.down.pageX - offsetLeft, Prototype.Mouse.down.pageY - offsetTop + Prototype.stage.scrollTop())
  // if a narrow div and no element underneath, return
  if (!element)
    return true
  // Its the selection block
  if (element.hasClass("selection"))
    return true
  var scrap = element.scrap()
  // Dont select block if locked
  if (scrap.get('locked'))
    return true
  Prototype.stage.selection.clear()
  element.selectMe()
  return true
}

/**
 * Changes top and/or left and/or bottom and/or right and/or margin
 */
Prototype.MoveHandle.slide = function (event, mouseEvent) {

  var owner = $(this).owner()
  var scrap = owner.scrap()
  var dimensions = Prototype.MoveHandle.dimensions
  
  var scrollChange = Prototype.stage.scrollTop() - Prototype.MoveHandle.scrollTop

  var grid_change = {y : 0, x : 0}

  if (!mouseEvent.shiftKey) {
    grid_change = Prototype.grid.getDelta([
      {x : dimensions.left + Prototype.Mouse.xChange, y : dimensions.top + Prototype.Mouse.yChange + scrollChange},
      {x : dimensions.right + Prototype.Mouse.xChange, y : dimensions.bottom + Prototype.Mouse.yChange + scrollChange},
      {x :  dimensions.center + Prototype.Mouse.xChange, y : dimensions.middle + Prototype.Mouse.yChange + scrollChange}
    ])
  }
  var y_change = Prototype.Mouse.yChange + scrollChange + grid_change.y
  var x_change = Prototype.Mouse.xChange + grid_change.x
  

  $('.selection').each(function (){
    $(this).scrap().move(x_change - Prototype.MoveHandle.last_x_change, y_change - Prototype.MoveHandle.last_y_change)
  })
  
  var position = 'X ' + parseFloat(owner.css('left')) + '<br>Y ' + parseFloat(owner.css('top'))
  $('#PrototypeDimensions').css({
    left : 10 + owner.offset().left + owner.outerWidth(),
    top : -10 + owner.offset().top + Math.round(owner.outerHeight(true)/2)
    }).html(position)
  
  Prototype.MoveHandle.last_x_change = x_change
  Prototype.MoveHandle.last_y_change = y_change
  
  return false
  
}

Prototype.MoveHandle.slideend = function () {
  
  $('.handle').trigger('update').show()
  Prototype.grid.removeSnaplines()
  $('#PrototypeDimensions').hide()
  Prototype.stage.commit()
}

Prototype.MoveHandle.slidestart = function () {
  
  $('.handle').not(this).hide()
  var owner = $(this).owner()
  var position = 'X ' + parseFloat(owner.css('left')) + '<br>Y ' + parseFloat(owner.css('top'))
  $('#PrototypeDimensions').css({
    left : 10 + owner.offset().left + owner.outerWidth(),
    top : -10 + owner.offset().top + Math.round(owner.outerHeight(true)/2)
    }).html(position).show()
  return false
}

// Dont propogate tap events
Prototype.MoveHandle.tap = function () {
  // If shift key is down, remove from selection
  if (Prototype.Mouse.down && Prototype.Mouse.down.shiftKey)
    $(this).owner().deselect()
  return false
}

Prototype.MoveHandle.update = function () {
  var owner = $(this).owner()
  if (!owner.position())
    debugger
  // make it easy to move narrow divs
  var top_padding  = Math.min(10, owner.outerHeight(true) - 20)
  var left_padding = Math.min(10, owner.outerWidth() - 20)
  var style = {
    "left" : owner.position().left + left_padding  + 'px',
    "top" : (owner.position().top + top_padding) + 'px',
    "height" : (owner.outerHeight(true) - top_padding * 2) + 'px',
    "width" : (owner.outerWidth() - left_padding * 2)  + 'px'}
  $(this).css(style)
}
