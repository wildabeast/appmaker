
Design.isFirstOpen = true

Design.on('open', function () {

  Design.grid = new Grid()
  
  $('#DesignStage,#DesignBar').show()
  
  nudgepad.on('selection', Design.broadcastSelection)
  Room.on('change', Design.updateSelections)
  Room.on('change', Design.updateTabs)
  
  Lasso.selector = '#DesignStageBody .scrap:visible'
  $(document).on('lasso', '.scrap', function () {
    $(this).selectMe()
    return false
  })
  Lasso.enable()
  
  $(document).on("slidestart", Design.pen.draw)
  
  $('#DesignStage').on('click', Design.pen.insertTextBlock)

  // Prevent Images from dragging on Firefox
  $(document).on('dragstart', 'img', function(event) { event.preventDefault()})
  
  var page = store.get('activePage') || 'home'
  if (!Project.get('pages ' + page))
    page = 'home'
  Design.stage.open(page)
  
  if (!navigator.userAgent.match(/iPad|iPhone|iPod/i)) {
    // iPad fixeds
    $(document).on("touchstart", Design.stopPropagation)
    // Allow someone to drag
    $(document).on("touchmove", Design.preventDefault) 
  }
  
  Design.updateTabs()
  
  
  window.addEventListener('copy', Design.oncopy, false)
  window.addEventListener('cut', Design.oncut, false)
  window.addEventListener('paste', Design.onpaste, false)
  window.addEventListener('resize', Design.onresize, false)
  
  $("body").on("keydown", Design.onkeydown)

  Events.shortcut.shortcuts = Design.shortcuts
  
  


  if ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ) {
    document.addEventListener('touchstart', Design.Mouse.onTouchStart, true)
    document.addEventListener('touchend', Design.Mouse.onTouchEnd, true)
    document.addEventListener('touchmove', Design.Mouse.onTouchMove, true)
  } else {
    document.addEventListener('mousedown', Design.Mouse.onmousedown, true)
    document.addEventListener('mousemove', Design.Mouse.onmousemove, true)
    document.addEventListener('mouseup', Design.Mouse.onmouseup, true)
  }
  
  // temporary fix until we clean this up.
  if (Design.isFirstOpen) {
    Design.isFirstOpen = false
    Design.trigger('firstOpen')
  }
  
  
  
})

Design.on('close', function () {
  
  $(document).off("slidestart", Design.pen.draw)
  
  
  nudgepad.off('selection', Design.broadcastSelection)
  Room.off('change', Design.updateSelections)
  Room.off('change', Design.updateTabs)
  $('#DesignStage').off('click', Design.pen.insertTextBlock)
  
  Design.stage.close()

  if (!navigator.userAgent.match(/iPad|iPhone|iPod/i))
    return null
  
  // iPad fixeds
  $(document).off("touchstart", Design.stopPropagation)
  // Allow someone to drag
  $(document).off("touchmove", Design.preventDefault)
  
  window.removeEventListener('copy', Design.oncopy, false)
  window.removeEventListener('cut', Design.oncut, false)
  window.removeEventListener('paste', Design.onpaste, false)
  window.removeEventListener('resize', Design.onresize, false)
  $("body").off("keydown", Design.onkeydown)
  
  // todo: i think we can remove selection
  nudgepad.trigger('selection')
  Events.shortcut.shortcuts = {}
  
  if ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ) {
    document.removeEventListener('touchstart', Design.Mouse.onTouchStart, true)
    document.removeEventListener('touchend', Design.Mouse.onTouchEnd, true)
    document.removeEventListener('touchmove', Design.Mouse.onTouchMove, true)
  } else {
    document.removeEventListener('mousedown', Design.Mouse.onmousedown, true)
    document.removeEventListener('mousemove', Design.Mouse.onmousemove, true)
    document.removeEventListener('mouseup', Design.Mouse.onmouseup, true)
  }

  
})

Design.on('ready', function () {
  $('#Design').hide()
})


Design.returnFalse = function (){
  return false
}

Design.blurThis = function (){
  $(this).blur()
}

Design.on('open', function () {
  $(document).on('click', 'a.scrap, .scrap a, .scrap div', Scrap.disableLinks)
  $('#DesignStage').on("tap", ".scrap", Scrap.selectOnTap)
  
  $('body').on("hold", ".scrap", Scrap.unlock)
  
  // When editing input blocks, prevent them from taking focus
  $(document).on('mousedown click','input.scrap,textarea.scrap', Design.returnFalse)
  $(document).on('focus', 'input.scrap,textarea.scrap', Design.blurThis)
  
})

Design.on('close', function () {
  $(document).off('click', 'a.scrap, .scrap a, .scrap div', Scrap.disableLinks)
  $('#DesignStage').off("tap", ".scrap", Scrap.selectOnTap)
  
  $('body').off("hold", ".scrap", Scrap.unlock)
  
  // When editing input blocks, prevent them from taking focus
  $(document).off('mousedown click','input.scrap,textarea.scrap', Design.returnFalse)
  $(document).off('focus', 'input.scrap,textarea.scrap', Design.blurThis)

})


/*
onpatch
var behind = Design.stage.isBehind()

// If the page has been deleted, change page
if (patch.get('pages ' + Design.stage.activePage) === '')
  Design.stage.back()
  
  Design.updateTabs()

  // If the active page isnt touched, we are all done
  if (!patch.get('timelines ' + Design.stage.activePage))
    return true    

  if (behind)
    return Design.stage.updateTimeline()

  if ($('input:focus, div:focus, textarea:focus, a:focus').length)
    return Design.stage.updateTimeline()

  // Todo: this breaks if you are in content editable
  Design.stage.redo()

*/
