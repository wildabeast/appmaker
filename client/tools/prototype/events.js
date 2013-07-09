
Prototype.isFirstOpen = true

Prototype.on('page', Prototype.updateTabs)

Prototype.on('open', function () {

  Prototype.grid = new Grid()
  
  $('#PrototypeStage,#PrototypeBar').show()
  
  Screens.on('change', Prototype.updateSelections)
  Screens.on('change', Prototype.updateTabs)
  
  Lasso.selector = '#PrototypeStageBody .scrap:visible'
  $(document).on('lasso', '.scrap', function () {
    $(this).selectMe(true)
    return false
  })
  Lasso.enable()
  
  $(document).on("slidestart", Prototype.pen.draw)
  
  $('#PrototypeStage').on('click', Prototype.pen.insertTextBlock)

  // Prevent Images from dragging on Firefox
  $(document).on('dragstart', 'img', function(event) { event.preventDefault()})
  
  var page = store.get('activePage') || 'home'
  if (!Project.get('pages ' + page))
    page = 'home'
  Prototype.stage.open(page)
  
  if (!navigator.userAgent.match(/iPad|iPhone|iPod/i)) {
    // iPad fixeds
    $(document).on("touchstart", Prototype.stopPropagation)
    // Allow someone to drag
    $(document).on("touchmove", Prototype.preventDefault) 
  }
  
  
  window.addEventListener('copy', Prototype.oncopy, false)
  window.addEventListener('cut', Prototype.oncut, false)
  window.addEventListener('paste', Prototype.onpaste, false)
  window.addEventListener('resize', Prototype.onresize, false)
  
  $("body").on("keydown", Prototype.onkeydown)

  Events.shortcut.shortcuts = Prototype.shortcuts
  
  


  if ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ) {
    document.addEventListener('touchstart', Prototype.Mouse.onTouchStart, true)
    document.addEventListener('touchend', Prototype.Mouse.onTouchEnd, true)
    document.addEventListener('touchmove', Prototype.Mouse.onTouchMove, true)
  } else {
    document.addEventListener('mousedown', Prototype.Mouse.onmousedown, true)
    document.addEventListener('mousemove', Prototype.Mouse.onmousemove, true)
    document.addEventListener('mouseup', Prototype.Mouse.onmouseup, true)
  }
  
  // temporary fix until we clean this up.
  if (Prototype.isFirstOpen) {
    Prototype.isFirstOpen = false
    Prototype.trigger('firstOpen')
  }
  
  
  
})

Prototype.on('close', function () {
  
  $(document).off("slidestart", Prototype.pen.draw)
  
  $('#PrototypeStage,#PrototypeBar').hide()
  
  Prototype.off('selection', Prototype.broadcastSelection)
  Screens.off('change', Prototype.updateSelections)
  Screens.off('change', Prototype.updateTabs)
  $('#PrototypeStage').off('click', Prototype.pen.insertTextBlock)
  
  Prototype.stage.close()

  if (!navigator.userAgent.match(/iPad|iPhone|iPod/i))
    return null
  
  // iPad fixeds
  $(document).off("touchstart", Prototype.stopPropagation)
  // Allow someone to drag
  $(document).off("touchmove", Prototype.preventDefault)
  
  window.removeEventListener('copy', Prototype.oncopy, false)
  window.removeEventListener('cut', Prototype.oncut, false)
  window.removeEventListener('paste', Prototype.onpaste, false)
  window.removeEventListener('resize', Prototype.onresize, false)
  $("body").off("keydown", Prototype.onkeydown)
  
  Events.shortcut.shortcuts = {}
  
  if ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ) {
    document.removeEventListener('touchstart', Prototype.Mouse.onTouchStart, true)
    document.removeEventListener('touchend', Prototype.Mouse.onTouchEnd, true)
    document.removeEventListener('touchmove', Prototype.Mouse.onTouchMove, true)
  } else {
    document.removeEventListener('mousedown', Prototype.Mouse.onmousedown, true)
    document.removeEventListener('mousemove', Prototype.Mouse.onmousemove, true)
    document.removeEventListener('mouseup', Prototype.Mouse.onmouseup, true)
  }

  
})

Prototype.on('ready', function () {
  $('#Prototype').hide()
})


Prototype.returnFalse = function (){
  return false
}

Prototype.blurThis = function (){
  $(this).blur()
}

Prototype.on('open', function () {
  
  // Todo: refactor
  Events.shortcut.onfire = Prototype.trackShortcuts
  
  $(document).on('click', 'a.scrap, .scrap a, .scrap div', Scrap.disableLinks)
  $('#PrototypeStage').on("tap", ".scrap", Scrap.selectOnTap)
  
  $('body').on("hold", ".scrap", Scrap.unlock)
  
  // When editing input blocks, prevent them from taking focus
  $(document).on('mousedown click','input.scrap,textarea.scrap', Prototype.returnFalse)
  $(document).on('focus', 'input.scrap,textarea.scrap', Prototype.blurThis)
  
})

Prototype.on('selection', Prototype.broadcastSelection)

Prototype.on('close', function () {
  $(document).off('click', 'a.scrap, .scrap a, .scrap div', Scrap.disableLinks)
  $('#PrototypeStage').off("tap", ".scrap", Scrap.selectOnTap)
  
  $('body').off("hold", ".scrap", Scrap.unlock)
  
  // When editing input blocks, prevent them from taking focus
  $(document).off('mousedown click','input.scrap,textarea.scrap', Prototype.returnFalse)
  $(document).off('focus', 'input.scrap,textarea.scrap', Prototype.blurThis)

})

Prototype.trackShortcuts  = function (key) {
  mixpanel.track('I used the Prototype keyboard shortcut ' +  key)
}



