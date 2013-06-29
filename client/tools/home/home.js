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
  var tools = _.without(Tool.tools, 'Home')
  for (var i in tools) {
    var tool = window[tools[i]]
    $('#HomeColumn' + Home.colNumber(i)).append(Home.toButton(tool.get('name'), tool.get('description'), tool.get('color')))
  }
}

Home.toButton = function (name, description, color) {
return '<div class="HomeSquare" style="background-color : ' + color + '" onclick="Launcher.open(\'' + name + '\')">\
    <div class="HomeTopBlock">' + name + '</div>\
    <div class="HomeSubBlock">' + description + '</div>\
</div>'
}

Home.on('open', function () {
  Home.renderMenu()
})
