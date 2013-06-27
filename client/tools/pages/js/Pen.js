Pages.pen = {
  on : false
}

Pages.pen.insertTextBlock = function (event) {
  
  if (!event.metaKey)
    return true
  
  var offsetLeft = $('#PagesStageBody').offset().left
  var offsetTop = $('#PagesStageBody').offset().top
  var x = Pages.Mouse.down.pageX - offsetLeft
  var y = Pages.Mouse.down.pageY - offsetTop
  var scraps = new Space().set('text', new Space("tag h2\nstyle\n position absolute\n left " + x + "px\n top " + y + "px\n"))
  var selector = Pages.stage.insert(scraps)[0]
  $(selector).scrap().edit()
  
}

Pages.pen.draw = function (event) {
  
  if (!Pages.pen.on && !Pages.Mouse.down.metaKey)
    return true
  
  if (!Pages.Mouse.isDown)
    return true
  
  if ($.isOnScrollbar(Pages.Mouse.down.clientX, Pages.Mouse.down.clientY))
    return true
  
  var offsetLeft = $('#PagesStageBody').offset().left
  var offsetTop = $('#PagesStageBody').offset().top
  var x = Pages.Mouse.down.pageX - offsetLeft
  var y = Pages.Mouse.down.pageY - offsetTop
  var scraps = new Space().set('container', new Space("style\n position absolute\n left " + x + "px\n top " + y + "px\n width 1px\n height 1px\n"))
  var selector = Pages.stage.insert(scraps)[0]
  var id = $(selector).scrap().id
  console.log(id)
  // Pretend the mousedown was on the stretch handle
  Events.slide.target = $("#stretch_handle_bottomright" + id)
  $("#stretch_handle_bottomright" + id).triggerHandler("mousedown")
  $("#stretch_handle_bottomright" + id).triggerHandler("slidestart")
  mixpanel.track('I used the pen tool')
}

