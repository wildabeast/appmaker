Pages.on('firstOpen', function () {
  
  $('.PagesBarDroppable').on('click', function () {
    $('.PagesImageDroppableOptions').hide()
    if ($(this).hasClass('selectedDroppable')) {
      $(this).removeClass('selectedDroppable')
      $('.PagesBarDroppable').removeClass('PagesLowlight');
      $('#PagesRibbon').slideUp('fast')
    }
    else {
      $('.PagesBarDroppable').removeClass('selectedDroppable')
      $(this).addClass('selectedDroppable');
      $(this).removeClass('PagesLowlight')
      $('.PagesBarDroppable').not('.selectedDroppable').addClass('PagesLowlight');
      $('#PagesRibbon').slideDown('fast')
    }
  })
  $('.PagesBarDroppable').on('slidestart', function() {
    var dropBlock = $(this).attr('title').toLowerCase()
    Pages.stage.dragAndDrop(Pages.droppables.get('blocks ' + dropBlock))
  })

  $('#PagesImageDroppable').on('click', function () {
    $('.PagesImageDroppableOptions').show()
  })
  
  $('#PagesBarMenuButton').on('mousedown', function (event) {
    if ($('#PagesMenu:visible').length > 0) {
      Popup.hide(event)
      return true
    }
    Popup.open('#PagesMenu')
    mixpanel.track('I opened the designer menu')
  })
  $('#PagesBarMenuButton').on('mouseup', function (event) {
    event.stopPropagation()
    return false
  })

  // We do this on live, so that it wont interfere with events bound
  // to items inside the ribbon, but it will prevent events from
  // reaching nudgepadbody hopefull
  $('#PagesBar').on('slide slidestart', function (event) {
    
    event.stopPropagation()
  })

})



