
Prototype.EditHandle = {}

Prototype.EditHandle.create = function (scrap) {
  var element = scrap.element()
  var div = $('<div class="PrototypeEditHandle"></div>')
  div.attr('value', scrap.getPath())
  div.addClass('handle editHandle ' + scrap.id + 'Handle')
  
  var edit = $('<div class="PrototypeEditStyleHandle"></div>')
  edit.on('tap', function () {
    Prototype.styleEditor.edit(scrap)
    div.remove()
    return false
  })
  div.append(edit)
  
  element.parent().append(div)
  div.on("update", Prototype.EditHandle.update)
  div.trigger("update")
}

Prototype.EditHandle.update = function () {
  var owner = $(this).owner()
  $(this).css({
  "left" : owner.position().left + 2 + "px",
  "top" : owner.position().top + owner.outerHeight(true) + 4 + "px"
  })
}

