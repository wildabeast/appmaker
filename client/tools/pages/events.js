
Pages.isFirstOpen = true

Pages.on('page', Pages.updateTabs)

Pages.on('open', function () {

  Pages.grid = new Grid()
  
  $('#PagesStage,#PagesBar').show()
  
  Screens.on('change', Pages.updateSelections)
  Screens.on('change', Pages.updateTabs)
  
  Lasso.selector = '#PagesStageBody .scrap:visible'
  $(document).on('lasso', '.scrap', function () {
    $(this).selectMe()
    return false
  })
  Lasso.enable()
  
  $(document).on("slidestart", Pages.pen.draw)
  
  $('#PagesStage').on('click', Pages.pen.insertTextBlock)

  // Prevent Images from dragging on Firefox
  $(document).on('dragstart', 'img', function(event) { event.preventDefault()})
  
  var page = store.get('activePage') || 'home'
  if (!Project.get('pages ' + page))
    page = 'home'
  Pages.stage.open(page)
  
  if (!navigator.userAgent.match(/iPad|iPhone|iPod/i)) {
    // iPad fixeds
    $(document).on("touchstart", Pages.stopPropagation)
    // Allow someone to drag
    $(document).on("touchmove", Pages.preventDefault) 
  }
  
  
  window.addEventListener('copy', Pages.oncopy, false)
  window.addEventListener('cut', Pages.oncut, false)
  window.addEventListener('paste', Pages.onpaste, false)
  window.addEventListener('resize', Pages.onresize, false)
  
  $("body").on("keydown", Pages.onkeydown)

  Events.shortcut.shortcuts = Pages.shortcuts
  
  


  if ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ) {
    document.addEventListener('touchstart', Pages.Mouse.onTouchStart, true)
    document.addEventListener('touchend', Pages.Mouse.onTouchEnd, true)
    document.addEventListener('touchmove', Pages.Mouse.onTouchMove, true)
  } else {
    document.addEventListener('mousedown', Pages.Mouse.onmousedown, true)
    document.addEventListener('mousemove', Pages.Mouse.onmousemove, true)
    document.addEventListener('mouseup', Pages.Mouse.onmouseup, true)
  }
  
  // temporary fix until we clean this up.
  if (Pages.isFirstOpen) {
    Pages.isFirstOpen = false
    Pages.trigger('firstOpen')
  }
  
  
  
})

Pages.on('close', function () {
  
  $(document).off("slidestart", Pages.pen.draw)
  
  
  Pages.off('selection', Pages.broadcastSelection)
  Screens.off('change', Pages.updateSelections)
  Screens.off('change', Pages.updateTabs)
  $('#PagesStage').off('click', Pages.pen.insertTextBlock)
  
  Pages.stage.close()

  if (!navigator.userAgent.match(/iPad|iPhone|iPod/i))
    return null
  
  // iPad fixeds
  $(document).off("touchstart", Pages.stopPropagation)
  // Allow someone to drag
  $(document).off("touchmove", Pages.preventDefault)
  
  window.removeEventListener('copy', Pages.oncopy, false)
  window.removeEventListener('cut', Pages.oncut, false)
  window.removeEventListener('paste', Pages.onpaste, false)
  window.removeEventListener('resize', Pages.onresize, false)
  $("body").off("keydown", Pages.onkeydown)
  
  Events.shortcut.shortcuts = {}
  
  if ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ) {
    document.removeEventListener('touchstart', Pages.Mouse.onTouchStart, true)
    document.removeEventListener('touchend', Pages.Mouse.onTouchEnd, true)
    document.removeEventListener('touchmove', Pages.Mouse.onTouchMove, true)
  } else {
    document.removeEventListener('mousedown', Pages.Mouse.onmousedown, true)
    document.removeEventListener('mousemove', Pages.Mouse.onmousemove, true)
    document.removeEventListener('mouseup', Pages.Mouse.onmouseup, true)
  }

  
})

Pages.on('ready', function () {
  $('#Pages').hide()
})


Pages.returnFalse = function (){
  return false
}

Pages.blurThis = function (){
  $(this).blur()
}

Pages.on('open', function () {
  
  // Todo: refactor
  Events.shortcut.onfire = Pages.trackShortcuts
  
  $(document).on('click', 'a.scrap, .scrap a, .scrap div', Scrap.disableLinks)
  $('#PagesStage').on("tap", ".scrap", Scrap.selectOnTap)
  
  $('body').on("hold", ".scrap", Scrap.unlock)
  
  // When editing input blocks, prevent them from taking focus
  $(document).on('mousedown click','input.scrap,textarea.scrap', Pages.returnFalse)
  $(document).on('focus', 'input.scrap,textarea.scrap', Pages.blurThis)
  
})

Pages.on('selection', Pages.broadcastSelection)

Pages.on('close', function () {
  $(document).off('click', 'a.scrap, .scrap a, .scrap div', Scrap.disableLinks)
  $('#PagesStage').off("tap", ".scrap", Scrap.selectOnTap)
  
  $('body').off("hold", ".scrap", Scrap.unlock)
  
  // When editing input blocks, prevent them from taking focus
  $(document).off('mousedown click','input.scrap,textarea.scrap', Pages.returnFalse)
  $(document).off('focus', 'input.scrap,textarea.scrap', Pages.blurThis)

})

Pages.trackShortcuts  = function (key) {
  mixpanel.track('I used the Pages keyboard shortcut ' +  key)
}


/*
onpatch
var behind = Pages.stage.isBehind()

// If the page has been deleted, change page
if (patch.get('pages ' + Pages.stage.activePage) === '')
  Pages.stage.back()
  
  Pages.updateTabs()

  // If the active page isnt touched, we are all done
  if (!patch.get('timelines ' + Pages.stage.activePage))
    return true    

  if (behind)
    return Pages.stage.updateTimeline()

  if ($('input:focus, div:focus, textarea:focus, a:focus').length)
    return Pages.stage.updateTimeline()

  // Todo: this breaks if you are in content editable
  Pages.stage.redo()

*/
