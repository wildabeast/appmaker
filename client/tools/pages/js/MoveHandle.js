/**
 * MoveHandle changes the (x, y) coordinates of selected Scraps 
 */
Pages.MoveHandle = function () {
}

Pages.MoveHandle.create = function (scrap) {
  
  var element = scrap.element()
  
  
  var div = $('<div></div>')
  div.attr('value', scrap.getPath())
  div.addClass('handle ' + scrap.id + '_handle move_handle')
  div.attr('id', 'move_handle_' + scrap.id)
  div.attr('title', scrap.id)
  
  var position = element.css('position')
  if (position === 'fixed' || position === 'absolute') {
    div.on("mousedown", Pages.MoveHandle.mousedown)
    div.on("slide", Pages.MoveHandle.slide)
    div.on("slidestart", Pages.MoveHandle.slidestart)
    div.on("slideend", Pages.MoveHandle.slideend)
    div.css('cursor', 'move')
  }
  div.css({
    "position" : (position === 'fixed' ? 'fixed' : 'absolute'),
    "z-index" : "50"
  })
  element.parent().append(div)
  div.on("tap", Pages.MoveHandle.tap)
  div.on("update", Pages.MoveHandle.update)
  div.on("dblclick", function (event) {
    if (event.metaKey) {
      element.togglePosition()
      Pages.stage.commit()
      element.deselect().selectMe()
    } else
      scrap.edit(true)
  })
  
  div.trigger("update")
}

// We cache the start dimensions
Pages.MoveHandle.dimensions = {}

//If small block is on top of (higher z-index) a bigger block, selects small block
Pages.MoveHandle.mousedown = function () {
//  Pages.MoveHandle.selectTopScrap()
  Pages.MoveHandle.dimensions = $(this).owner().dimensions()
  Pages.grid.create()
  Pages.MoveHandle.last_x_change = 0
  Pages.MoveHandle.last_y_change = 0
  
  Pages.MoveHandle.scrollTop = Pages.stage.scrollTop()
  return true
}

/**
 * if the click is on another smaller div select that one instead of move.
 *
 * @param true. Allow propogation
 */
Pages.MoveHandle.selectTopScrap = function () {

  // get element at point
  var offsetLeft = $('#PagesStageBody').offset().left
  var offsetTop = $('#PagesStageBody').offset().top
  var element = $.topDiv('.scrap:visible', Pages.Mouse.down.pageX - offsetLeft, Pages.Mouse.down.pageY - offsetTop + Pages.stage.scrollTop())
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
  Pages.stage.selection.clear()
  element.selectMe()
  return true
}

/**
 * Changes top and/or left and/or bottom and/or right and/or margin
 */
Pages.MoveHandle.slide = function (event, mouseEvent) {

  var owner = $(this).owner()
  var scrap = owner.scrap()
  var dimensions = Pages.MoveHandle.dimensions
  
  var scrollChange = Pages.stage.scrollTop() - Pages.MoveHandle.scrollTop

  var grid_change = {y : 0, x : 0}

  if (!mouseEvent.shiftKey) {
    grid_change = Pages.grid.getDelta([
      {x : dimensions.left + Pages.Mouse.xChange, y : dimensions.top + Pages.Mouse.yChange + scrollChange},
      {x : dimensions.right + Pages.Mouse.xChange, y : dimensions.bottom + Pages.Mouse.yChange + scrollChange},
      {x :  dimensions.center + Pages.Mouse.xChange, y : dimensions.middle + Pages.Mouse.yChange + scrollChange}
    ])
  }
  var y_change = Pages.Mouse.yChange + scrollChange + grid_change.y
  var x_change = Pages.Mouse.xChange + grid_change.x
  

  $('.selection').each(function (){
    $(this).scrap().move(x_change - Pages.MoveHandle.last_x_change, y_change - Pages.MoveHandle.last_y_change)
  })
  
  var position = 'X ' + parseFloat(owner.css('left')) + '<br>Y ' + parseFloat(owner.css('top'))
  $('#PagesDimensions').css({
    left : 10 + owner.offset().left + owner.outerWidth(),
    top : -10 + owner.offset().top + Math.round(owner.outerHeight(true)/2)
    }).html(position)
  
  Pages.MoveHandle.last_x_change = x_change
  Pages.MoveHandle.last_y_change = y_change
  
  return false
  
}

Pages.MoveHandle.slideend = function () {
  
  $('.handle').trigger('update').show()
  Pages.grid.removeSnaplines()
  $('#PagesDimensions').hide()
  Pages.stage.commit()
}

Pages.MoveHandle.slidestart = function () {
  
  $('.handle').not(this).hide()
  var owner = $(this).owner()
  var position = 'X ' + parseFloat(owner.css('left')) + '<br>Y ' + parseFloat(owner.css('top'))
  $('#PagesDimensions').css({
    left : 10 + owner.offset().left + owner.outerWidth(),
    top : -10 + owner.offset().top + Math.round(owner.outerHeight(true)/2)
    }).html(position).show()
  return false
}

// Dont propogate tap events
Pages.MoveHandle.tap = function () {
  // If shift key is down, remove from selection
  if (Pages.Mouse.down && Pages.Mouse.down.shiftKey)
    $(this).owner().deselect()
  return false
}

Pages.MoveHandle.update = function () {
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
