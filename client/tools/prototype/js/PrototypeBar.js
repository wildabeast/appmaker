Prototype.on('firstOpen', function () {
  
  $('.PrototypeBarComponent').on('click', function () {
    $('.PrototypeImageComponentOptions').hide()
    if ($(this).hasClass('selectedComponent')) {
      $(this).removeClass('selectedComponent')
      $('.PrototypeBarComponent').removeClass('PrototypeLowlight');
      $('#PrototypeComponentsBar').slideUp('fast')
    }
    else {
      $('.PrototypeBarComponent').removeClass('selectedComponent')
      $(this).addClass('selectedComponent');
      $(this).removeClass('PrototypeLowlight')
      $('.PrototypeBarComponent').not('.selectedComponent').addClass('PrototypeLowlight');
      $('#PrototypeComponentsBar').slideDown('fast')
    }
  })
  $('.PrototypeBarComponent').on('slidestart', function() {
    var componentId = $(this).attr('title').toLowerCase()
    Prototype.stage.dragAndDrop(Prototype.components.get(componentId))
  })

  $('#PrototypeImageComponent').on('click', function () {
    $('.PrototypeImageComponentOptions').show()
  })
  
  $('#PrototypeBarMenuButton').on('mousedown', function (event) {
    if ($('#PrototypeMenu:visible').length > 0) {
      Popup.hide(event)
      return true
    }
    Popup.open('#PrototypeMenu')
    mixpanel.track('I opened the designer menu')
  })
  $('#PrototypeBarMenuButton').on('mouseup', function (event) {
    event.stopPropagation()
    return false
  })

  // We do this on live, so that it wont interfere with events bound
  // to items inside the ribbon, but it will prevent events from
  // reaching nudgepadbody hopefull
  $('#PrototypeBar').on('slide slidestart', function (event) {
    
    event.stopPropagation()
  })

})



