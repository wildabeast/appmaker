Prototype.updateTabs = function () {
  $('#PrototypeTabs').html('')
  var keys = Project.get('pages').keys
  _.each(keys, function (name) {
    var div = $('<span>' + name + '</span>')
    
    // Make active page white
    if (name === Prototype.stage.activePage)
      div.css('color', 'white')
      
    var title = ''
    
    Screens.each(function (key, value) {
      if (value.get('id') === Screen.get('id'))
        return true
      if (value.get('tool') !== 'Prototype')
        return true
      if (value.get('page') !== name)
        return true
      title += value.get('name') + '(' + value.get('device') + ')' + ' '
      // if (thisScreen)
      div.addClass('PrototypeOpenPage')
    })
    
    div.attr('title', title)
    
    div.on('click', function () {
      mixpanel.track('I clicked a page tab')
      Prototype.stage.open($(this).text())
      return true
    })
    div.attr('value', name)
    $('#PrototypeTabs').append(div)
    
  })
  
}


