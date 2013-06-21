var Launch = new Tool('Launch')


Launch.colNumber = function (i) {
  // 1, 2 or 3
  var menuItems = Tool.tools.length - 1
  if (i < menuItems/3)
    return 1
  else if (i > menuItems * .66)
    return 3
  return 2
}

Launch.renderMenu = function () {
  $('.LaunchColumn').html('')
  var tools = _.without(Tool.tools, 'Launch')
  for (var i in tools) {
    var tool = window[tools[i]]
    $('#LaunchColumn' + Launch.colNumber(i)).append(Launch.toButton(tool.name, tool.description, tool.color))
  }
}

Launch.toButton = function (name, description, color) {
return '<div class="LaunchSquare" style="background-color : ' + color + '" onclick="Launcher.open(\'' + name + '\')">\
    <div class="LaunchTopBlock">' + name + '</div>\
    <div class="LaunchSubBlock">' + description + '</div>\
</div>'
}

Launch.on('open', function () {
  Launch.renderMenu()
})
