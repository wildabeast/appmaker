Pages.updateTabs = function () {
  $('#PagesTabs').html('')
  var keys = Project.get('pages').keys
  _.each(keys, function (name) {
    var div = $('<span>' + name + '</span>')
    
    // Make active page white
    if (name === Pages.stage.activePage)
      div.css('color', 'white')
      
    var title = ''
    
    /*
    Room.each(function (key, value) {
      if (value.get('page') !== name)
        return true
      title += value.get('name') + '(' + value.get('device') + ')' + ' '
      // if (thisScreen)
      // div.addClass('PagesOpenPage')
    })
    */
    
    div.attr('title', title)
    
    div.on('click', function () {
      mixpanel.track('I clicked a page tab')
      Pages.stage.open($(this).text())
      return true
    })
    div.attr('value', name)
    $('#PagesTabs').append(div)
    
  })
  
}


