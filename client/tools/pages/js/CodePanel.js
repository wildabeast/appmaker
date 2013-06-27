Pages.codePanel = {}

Pages.codePanel.livePreview = false
Pages.codePanel.livePreviewTimeout = false
Pages.codePanel.livePreviewStart = function () {
  clearTimeout(Pages.codePanel.livePreviewTimeout)
  Pages.codePanel.livePreviewTimeout = setTimeout('Pages.codePanel.livePreview()', 500)
}
Pages.codePanel.livePreview = function () {
  var space = new Space($('#PagesCodePanel').val())
  if (Pages.stage.selection.exists()) {
    Pages.stage.selection.clear()
  }
//    Pages.page.patch(Pages.stage.selection.captured.diff(space))
//    Pages.stage.render()
//  } else {
    Pages.page = new Page(space)
    Pages.stage.render()
//  }
}

Pages.codePanel.close = function () {
  $('#PagesCodePanel').hide()
  $('#PagesStage').css('padding-left', Pages.codePanel.currentPadding)
  Pages.off('selection', Pages.codePanel.load)
  Pages.off('stage', Pages.codePanel.load)
}

Pages.codePanel.isOpen = function () {
  return $('#PagesCodePanel:visible').length > 0
}

Pages.codePanel.load = function () {
  var textarea = $('#PagesCodePanel')
  // todo: allow for just showing of selection
//  if (Pages.stage.selection.exists()) {
//    Pages.stage.selection.clear()
//    Pages.stage.selection.capture()
//    Pages.stage.selection.save()
//    textarea.val(Pages.stage.selection.toSpace().toString())
//  } else
  textarea.val(Pages.page.toString())
}

Pages.codePanel.open = function () {
  var textarea = $('#PagesCodePanel')
  textarea.show()
  Pages.codePanel.currentPadding = $('#PagesStage').css('padding-left')
  $('#PagesStage').css('padding-left', '40%')
  Pages.codePanel.load()
  textarea.on('keyup', Pages.codePanel.livePreviewStart)
  textarea.on('blur', Pages.stage.commit)
  textarea.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })
  Pages.on('selection', Pages.codePanel.load)
  Pages.on('stage', Pages.codePanel.load)
}

Pages.codePanel.toggle = function () {
  if (Pages.codePanel.isOpen())
    Pages.codePanel.close()
  else
    Pages.codePanel.open()
}
