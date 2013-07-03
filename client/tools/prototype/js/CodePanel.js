Prototype.codePanel = {}

Prototype.codePanel.livePreview = false
Prototype.codePanel.livePreviewTimeout = false
Prototype.codePanel.livePreviewStart = function () {
  clearTimeout(Prototype.codePanel.livePreviewTimeout)
  Prototype.codePanel.livePreviewTimeout = setTimeout('Prototype.codePanel.livePreview()', 500)
}
Prototype.codePanel.livePreview = function () {
  var space = new Space($('#PrototypeCodePanel').val())
  if (Prototype.stage.selection.exists()) {
    Prototype.stage.selection.clear()
  }
//    Prototype.page.patch(Prototype.stage.selection.captured.diff(space))
//    Prototype.stage.render()
//  } else {
    Prototype.page = new Page(space)
    Prototype.stage.render()
//  }
}

Prototype.codePanel.close = function () {
  $('#PrototypeCodePanel').hide()
  $('#PrototypeStage').css('padding-left', Prototype.codePanel.currentPadding)
  Prototype.off('selection', Prototype.codePanel.load)
  Prototype.off('stage', Prototype.codePanel.load)
}

Prototype.codePanel.isOpen = function () {
  return $('#PrototypeCodePanel:visible').length > 0
}

Prototype.codePanel.load = function () {
  var textarea = $('#PrototypeCodePanel')
  // todo: allow for just showing of selection
//  if (Prototype.stage.selection.exists()) {
//    Prototype.stage.selection.clear()
//    Prototype.stage.selection.capture()
//    Prototype.stage.selection.save()
//    textarea.val(Prototype.stage.selection.toSpace().toString())
//  } else
  textarea.val(Prototype.page.toString())
}

Prototype.codePanel.open = function () {
  var textarea = $('#PrototypeCodePanel')
  textarea.show()
  Prototype.codePanel.currentPadding = $('#PrototypeStage').css('padding-left')
  $('#PrototypeStage').css('padding-left', '40%')
  Prototype.codePanel.load()
  textarea.on('keyup', Prototype.codePanel.livePreviewStart)
  textarea.on('blur', Prototype.stage.commit)
  textarea.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })
  Prototype.on('selection', Prototype.codePanel.load)
  Prototype.on('stage', Prototype.codePanel.load)
}

Prototype.codePanel.toggle = function () {
  if (Prototype.codePanel.isOpen())
    Prototype.codePanel.close()
  else
    Prototype.codePanel.open()
}
