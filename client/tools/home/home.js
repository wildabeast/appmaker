var Home = new Tool('Home')


Home.colNumber = function (i) {
  // 1, 2 or 3
  var menuItems = Tool.tools.length - 1
  if (i < menuItems/3)
    return 1
  else if (i > menuItems * .66)
    return 3
  return 2
}

Home.renderMenu = function () {
  $('.HomeColumn').html('')
  var tools = _.without(Tool.tools, 'Home', 'Prototype', 'Develop', 'Blog', 'AppMaker')
  tools.unshift('Prototype', 'Develop', 'Blog', 'AppMaker')
  for (var i in tools) {
    var tool = window[tools[i]]
    $('#HomeColumn' + Home.colNumber(i)).append(
      Home.toButton(
        tool.get('name'),
        tool.get('description'),
        tool.get('color'),
        tool.get('beta')
    ))
  }
}

Home.toggleAll = function () {
  if (store.get('homeShowAll'))
    store.remove('homeShowAll')
  else
    store.set('homeShowAll', 'true')
  $('.beta').fadeToggle()
}

Home.toButton = function (name, description, color, beta) {
return '<div class="HomeSquare' + (beta ? ' beta' : '') + '" style="background-color : ' + color + '" onclick="Launcher.open(\'' + name + '\')">\
    <div class="HomeTopBlock">' + name + '</div>\
    <div class="HomeSubBlock">' + description + '</div>\
</div>'
}

Home.on('open', function () {
  Home.renderMenu()
  if (store.get('homeShowAll'))
    $('.beta').show()
  $('#Home').on('hold', Home.toggleAll)
})

Home.on('close', function () {
  $('#Home').off('hold', Home.toggleAll)
})
