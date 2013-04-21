/**
 */
function EditHandle() {  
}

EditHandle.create = function (scrap) {
  var element = scrap.element()
  var div = $('<div class="nudgepadEditHandle"></div>')
  div.attr('value', scrap.getPath())
  div.addClass('handle edit_handle ' + scrap.id + '_handle')
  
  var edit = $('<div class="nudgepadEditStyleHandle"></div>')
  edit.on('tap', function () {
    nudgepad.styleEditor(scrap)
    div.remove()
    return false
  })
  div.append(edit)
  
  element.parent().append(div)
  div.on("update", EditHandle.update)
  div.trigger("update")
}

EditHandle.update = function () {
  var element = $(this).owner()
  $(this).css({
  "left" : element.left() + 2 + "px",
  "top" : element.bottom() + 4 + "px"
  })
}

