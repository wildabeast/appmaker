Pages.loadComponents = function (components) {
  var options = ''
  for (var i in components) {
    options += '<div class="PagesComponentImg"><img src="/nudgepad/tools/pages/images/'+ components[i] +'.png" title="'+ components[i] +'"></div>'
  }

  $('#PagesComponentsList').html($('<div class="PagesComponentsList">'+ options +'</div>'))

  $('#PagesComponentsList div img').on('slidestart', function() {
    var componentId = $(this).attr('title')
    Pages.stage.dragAndDrop(Pages.components.get(componentId))
    mixpanel.track('I dropped a component')
  })

  $('.PagesComponentsList div img').on('tap', function() {
    var componentId = $(this).attr('title')
    Pages.stage.insert(Pages.components.get(componentId), false, 0, 0, true)
    mixpanel.track('I tapped a component')
  })
}

Pages.on('firstOpen', function () {
  
  $('#PagesBlockComponent').on('click', function () {
    Pages.loadComponents(['block', 'rounded', 'button2'])
  })
  
  $('#PagesTextComponent').on('click', function () {
    Pages.loadComponents(['text', 'nav', 'paragraph'])
  })
  
  $('#PagesImageComponent').on('click', function () {
    Pages.loadComponents(['image', 'graph'])
  })
  
  $('#stickyComponent').on('click', function () {
    Pages.loadComponents(['sticky', 'stickyOrange', 'stickyBlue'])
  })
  
  $(document).on('tap', '.PagesImageThumbDrop img', function() {
    var imageY = ($('#PagesStage').height() / 2) - 130
    var imageX = 100
    Pages.stage.insert('images\n style\n  position absolute\n  top ' + imageY +'\n  left ' + imageX + '\n tag img\n src ' + $(this).attr('src'))
  })
  
  $('#PagesComponentsBar').on('slidestart', '.PagesImageThumbDrop img', function() {
    Pages.stage.dragAndDrop('images\n style\n  position absolute\n  top 0px\n  left 0px\n tag img\n src ' + $(this).attr('src'))
    mixpanel.track('I dropped a ribbon component')
  })

  // We do this on live, so that it wont interfere with events bound
  // to items inside the ribbon, but it will prevent events from
  // reaching nudgepadbody hopefully
  $('#PagesComponentsBar').on('mousedown slide slidestart', function (event) {
    event.stopPropagation()
  })

})

