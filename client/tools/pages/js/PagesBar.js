Pages.on('firstOpen', function () {
  
  $('.PagesBarComponent').on('click', function () {
    $('.PagesImageComponentOptions').hide()
    if ($(this).hasClass('selectedComponent')) {
      $(this).removeClass('selectedComponent')
      $('.PagesBarComponent').removeClass('PagesLowlight');
      $('#PagesComponentsBar').slideUp('fast')
    }
    else {
      $('.PagesBarComponent').removeClass('selectedComponent')
      $(this).addClass('selectedComponent');
      $(this).removeClass('PagesLowlight')
      $('.PagesBarComponent').not('.selectedComponent').addClass('PagesLowlight');
      $('#PagesComponentsBar').slideDown('fast')
    }
  })
  $('.PagesBarComponent').on('slidestart', function() {
    var componentId = $(this).attr('title').toLowerCase()
    Pages.stage.dragAndDrop(Pages.components.get(componentId))
  })

  $('#PagesImageComponent').on('click', function () {
    $('.PagesImageComponentOptions').show()
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



