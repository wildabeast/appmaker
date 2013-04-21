nudgepad.pen = {
  on : false
}

nudgepad.pen.draw = function (event) {
  
  if (!nudgepad.pen.on && !nudgepad.mouse.down.metaKey)
    return true
  
  if (!nudgepad.mouse.is_down)
    return true
  
  if ($.isOnScrollbar(nudgepad.mouse.down.clientX, nudgepad.mouse.down.clientY))
    return true
  
  var offsetLeft = 0 // Math.round($('#container').offset().left)
  var x = nudgepad.mouse.down.pageX - offsetLeft
  var scraps = new Space().set('container', new Space("style\n position absolute\n left " + x + "px\n top " + nudgepad.mouse.down.pageY + "px\n width 1px\n height 1px\n"))
  var selector = nudgepad.stage.insert(scraps)[0]
  var id = $(selector).scrap().id
  console.log(id)
  // Pretend the mousedown was on the stretch handle
  Events.slide.target = $("#stretch_handle_bottomright" + id)
  $("#stretch_handle_bottomright" + id).triggerHandler("mousedown")
  $("#stretch_handle_bottomright" + id).triggerHandler("slidestart")
  
}

nudgepad.on('main', function () {
  // Bind
  $(document).on("slidestart", nudgepad.pen.draw)
})



