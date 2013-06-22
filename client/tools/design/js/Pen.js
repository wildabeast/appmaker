Design.pen = {
  on : false
}

Design.pen.insertTextBlock = function (event) {
  
  if (!event.metaKey)
    return true
  
  var offsetLeft = $('#DesignStageBody').offset().left
  var offsetTop = $('#DesignStageBody').offset().top
  var x = Design.Mouse.down.pageX - offsetLeft
  var y = Design.Mouse.down.pageY - offsetTop
  var scraps = new Space().set('text', new Space("tag h2\nstyle\n position absolute\n left " + x + "px\n top " + y + "px\n"))
  var selector = Design.stage.insert(scraps)[0]
  $(selector).scrap().edit()
  
}

Design.pen.draw = function (event) {
  
  if (!Design.pen.on && !Design.Mouse.down.metaKey)
    return true
  
  if (!Design.Mouse.isDown)
    return true
  
  if ($.isOnScrollbar(Design.Mouse.down.clientX, Design.Mouse.down.clientY))
    return true
  
  var offsetLeft = $('#DesignStageBody').offset().left
  var offsetTop = $('#DesignStageBody').offset().top
  var x = Design.Mouse.down.pageX - offsetLeft
  var y = Design.Mouse.down.pageY - offsetTop
  var scraps = new Space().set('container', new Space("style\n position absolute\n left " + x + "px\n top " + y + "px\n width 1px\n height 1px\n"))
  var selector = Design.stage.insert(scraps)[0]
  var id = $(selector).scrap().id
  console.log(id)
  // Pretend the mousedown was on the stretch handle
  Events.slide.target = $("#stretch_handle_bottomright" + id)
  $("#stretch_handle_bottomright" + id).triggerHandler("mousedown")
  $("#stretch_handle_bottomright" + id).triggerHandler("slidestart")
  mixpanel.track('I used the pen tool')
}

