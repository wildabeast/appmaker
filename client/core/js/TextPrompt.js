var TextPrompt = {}

TextPrompt.callback = function () {}

TextPrompt.load = function () {
  var textArea = $('#TextPromptTextarea')
  var saveButton = $('#TextPromptSaveButton')
  var cancelButton = $('#TextPromptCancelButton')
  var dimmer = $('#TextPromptDimmer')
  
  dimmer.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })
  
  textArea.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })
  
  dimmer.on('click', TextPrompt.close)
  
  cancelButton.on('click', TextPrompt.close)
  
  saveButton.on('click', function () {
    // allow to save without closing
    if (TextPrompt.callback(textArea.val()) === false)
      return true
    TextPrompt.close()
  })
  
}

TextPrompt.close = function () {
  $('.TextPrompt').hide()
  // temporary
  if (!TextPrompt.onclose)
    return null
  
  TextPrompt.onclose()
  TextPrompt.onclose = null
}

TextPrompt.open = function (message, default_value, callback) {
  
  TextPrompt.callback = callback
  $('.TextPrompt').show()
  $('#TextPromptTextarea').val(default_value).focus()
}

$(document).on('ready', TextPrompt.load)
