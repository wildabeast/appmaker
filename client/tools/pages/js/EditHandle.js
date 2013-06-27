
Pages.EditHandle = {}

Pages.EditHandle.create = function (scrap) {
  var element = scrap.element()
  var div = $('<div class="PagesEditHandle"></div>')
  div.attr('value', scrap.getPath())
  div.addClass('handle edit_handle ' + scrap.id + '_handle')
  
  var edit = $('<div class="PagesEditStyleHandle"></div>')
  edit.on('tap', function () {
    Pages.styleEditor.edit(scrap)
    div.remove()
    return false
  })
  div.append(edit)
  
  element.parent().append(div)
  div.on("update", Pages.EditHandle.update)
  div.trigger("update")
}

Pages.EditHandle.update = function () {
  var owner = $(this).owner()
  $(this).css({
  "left" : owner.position().left + 2 + "px",
  "top" : owner.position().top + owner.outerHeight(true) + 4 + "px"
  })
}

