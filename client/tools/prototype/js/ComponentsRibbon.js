Prototype.on('firstOpen', function () {
  
  Prototype.components = new Space()
  var list = $('#PrototypeComponentsList')
  $('.ComponentSet').each(function () {
    var path = $(this).attr('path')
    var component = new Space($(this).text())
    var thumb = $(new Scrap(path, component.get('thumb')).toHtml())
    thumb.attr('path', path)
    thumb.addClass('Component')
    component.delete('thumb')
    Prototype.components.set(path, component)
    list.append(thumb)
  })
  
  $('#PrototypeComponentsList').on('tap', '.Component', function() {
    var path = $(this).attr('path')
    Prototype.stage.insert(Prototype.components.get(path), false, 0, 0, true)
    mixpanel.track('I tapped a component')
  })
  
  $('#PrototypeComponentsList').on('slidestart', '.Component', function() {
    var path = $(this).attr('path')
    Prototype.stage.dragAndDrop(Prototype.components.get(path))
    mixpanel.track('I dragged a component')
  })

  $('#PrototypeComponentsRibbon').on('mousedown slide slidestart', function (event) {
    event.stopPropagation()
  })

})

