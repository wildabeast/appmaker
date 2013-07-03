Prototype.loadComponents = function (components) {
  var options = ''
  for (var i in components) {
    options += '<div class="PrototypeComponentImg"><img src="/nudgepad/tools/prototype/images/'+ components[i] +'.png" title="'+ components[i] +'"></div>'
  }

  $('#PrototypeComponentsList').html($('<div class="PrototypeComponentsList">'+ options +'</div>'))

  $('#PrototypeComponentsList div img').on('slidestart', function() {
    var componentId = $(this).attr('title')
    Prototype.stage.dragAndDrop(Prototype.components.get(componentId))
    mixpanel.track('I dropped a component')
  })

  $('#PrototypeComponentsList div img').on('tap', function() {
    var componentId = $(this).attr('title')
    Prototype.stage.insert(Prototype.components.get(componentId), false, 0, 0, true)
    mixpanel.track('I tapped a component')
  })
}

Prototype.on('firstOpen', function () {
  
  $('#PrototypeBlockComponent').on('click', function () {
    Prototype.loadComponents(['fancyButton', 'input', 'textarea', 'horizontal'])
  })
  
  // 'email_signup', 'meme',
  
  $('#PrototypeTextComponent').on('click', function () {
    Prototype.loadComponents(['text', 'nav', 'paragraph', 'h1', 'h3'])
  })
  
  $('#PrototypeImageComponent').on('click', function () {
    Prototype.loadComponents(['image', 'graph'])
  })
  
  $('#stickyComponent').on('click', function () {
    Prototype.loadComponents(['sticky', 'stickyOrange', 'stickyBlue'])
  })
  
  $(document).on('tap', '.PrototypeImageThumbDrop img', function() {
    var imageY = ($('#PrototypeStage').height() / 2) - 130
    var imageX = 100
    Prototype.stage.insert('images\n style\n  position absolute\n  top ' + imageY +'\n  left ' + imageX + '\n tag img\n src ' + $(this).attr('src'))
  })
  
  $('#PrototypeComponentsBar').on('slidestart', '.PrototypeImageThumbDrop img', function() {
    Prototype.stage.dragAndDrop('images\n style\n  position absolute\n  top 0px\n  left 0px\n tag img\n src ' + $(this).attr('src'))
    mixpanel.track('I dropped a ribbon component')
  })

  // We do this on live, so that it wont interfere with events bound
  // to items inside the ribbon, but it will prevent events from
  // reaching nudgepadbody hopefully
  $('#PrototypeComponentsBar').on('mousedown slide slidestart', function (event) {
    event.stopPropagation()
  })

})

