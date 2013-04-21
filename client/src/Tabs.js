nudgepad.openPages = {}

nudgepad.pages.updateTabs = function () {
  $('#nudgepadTabs').html('')
  var keys = nudgepad.site.get('pages').keys
  _.each(keys, function (name) {
    var div = $('<span>' + name + '</span>')
    if (name === nudgepad.stage.activePage)
      div.css('color', 'white')
    _.each(nudgepad.openPages, function (openPage) {
      if (name === openPage)
        div.addClass('openPage')
    })
    div.on('hold', function () {
      window.open($(this).text(), 'published')
      return true
    })
    div.on('click', function () {
      nudgepad.stage.open($(this).text())
      return true
    })
    div.attr('value', name)
    $('#nudgepadTabs').append(div)
    
  })
  
}

