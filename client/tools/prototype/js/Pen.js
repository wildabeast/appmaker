Prototype.pen = {
  on : false
}

Prototype.pen.insertTextBlock = function (event) {
  
  if (!event.metaKey)
    return true
  
  var offsetLeft = $('#PrototypeStageBody').offset().left
  var offsetTop = $('#PrototypeStageBody').offset().top
  var x = Prototype.Mouse.down.pageX - offsetLeft
  var y = Prototype.Mouse.down.pageY - offsetTop
  var scraps = new Space().set('text', new Space("tag h2\nstyle\n position absolute\n left " + x + "px\n top " + y + "px\n"))
  var selector = Prototype.stage.insert(scraps)[0]
  $(selector).scrap().edit()
  
}

Prototype.pen.draw = function (event) {
  
  if (!Prototype.pen.on && !Prototype.Mouse.down.metaKey)
    return true
  
  if (!Prototype.Mouse.isDown)
    return true
  
  if ($.isOnScrollbar(Prototype.Mouse.down.clientX, Prototype.Mouse.down.clientY))
    return true
  
  var offsetLeft = $('#PrototypeStageBody').offset().left
  var offsetTop = $('#PrototypeStageBody').offset().top
  var x = Prototype.Mouse.down.pageX - offsetLeft
  var y = Prototype.Mouse.down.pageY - offsetTop
  var scraps = new Space().set('container', new Space("style\n position absolute\n left " + x + "px\n top " + y + "px\n width 1px\n height 1px\n"))
  var selector = Prototype.stage.insert(scraps)[0]
  var id = $(selector).scrap().id
  console.log(id)
  // Pretend the mousedown was on the stretch handle
  Events.slide.target = $("#stretchHandleBottomRight" + id)
  $("#stretchHandleBottomRight" + id).triggerHandler("mousedown")
  $("#stretchHandleBottomRight" + id).triggerHandler("slidestart")
  mixpanel.track('I used the pen tool')
}

