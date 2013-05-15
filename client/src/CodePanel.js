nudgepad.codePanel = {}

nudgepad.codePanel.livePreview = false
nudgepad.codePanel.livePreviewTimeout = false
nudgepad.codePanel.livePreviewStart = function () {
  clearTimeout(nudgepad.codePanel.livePreviewTimeout)
  nudgepad.codePanel.livePreviewTimeout = setTimeout('nudgepad.codePanel.livePreview()', 500)
}
nudgepad.codePanel.livePreview = function () {
  var space = new Space($('#nudgepadCodePanel').val())
  if (nudgepad.stage.selection.exists()) {
   
  } else {
    nudgepad.pages.stage = new Page(space)
    nudgepad.stage.render()
  }
}

nudgepad.codePanel.close = function () {
  $('#nudgepadCodePanel').hide()
  $('#nudgepadStage').css({
   'width' : '100%',
   'left' : ''
  })
}

nudgepad.codePanel.open = function () {
  var textarea = $('#nudgepadCodePanel')
  textarea.show()
  $('#nudgepadStage').css({
   'width' : '100%',
   'left' : '40%'
  })
  if (nudgepad.stage.selection.exists())
    textarea.val(nudgepad.stage.selection.toSpace().toString())
  else
    textarea.val(nudgepad.pages.stage.toString())
  textarea.on('keyup', nudgepad.codePanel.livePreviewStart)
  textarea.on('blur', nudgepad.stage.commit)
  textarea.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })
}


nudgepad.codePanel.toggle = function () {
  if ($('#nudgepadCodePanel:visible').length > 0)
    nudgepad.codePanel.close()
  else
    nudgepad.codePanel.open()
}
