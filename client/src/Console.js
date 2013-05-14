// todo: add console history

/**
 * Prompt the worker for input. Pops a modal.
 */
nudgepad.console = function () {
  mixpanel.track('launched console')
  var output = $('<pre id="nudgepadEditorConsole"></pre>')
  var input = $('<input id="nudgepadEditorInput" type="text"/>')
  var checkbox = $('<input type="checkbox" id="nudgepadEditorCheckbox"/>')
  var label = $('<label for="nudgepadEditorCheckbox" id="nudgepadEditorLabel">Shell</label>')
  var modal_screen = $('<div id="nudgepadEditorModalScreen"/>')
  modal_screen.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })
  output.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })

//  if (onkeypress)
//    output.on('keypress', onkeypress)
    
  var send_button = $('<div id="nudgepadEditorSaveButton">Send</div>')
  var cancel_button = $('<div id="nudgepadEditorCancelButton">Close</div>')
  
  var button_container = $('<div id="nudgepadEditorButtonContainer"></div>')
  modal_screen.on('click', function () {
    cancel_button.trigger('click')
  })
  
  cancel_button.on('click', function () {
    send_button.remove()
    output.remove()
    modal_screen.remove()
    button_container.remove()
    cancel_button.remove()
    label.remove()
    checkbox.remove()
    input.remove()
  })
  
  send_button.on('click', function () {
    
    var command = input.val()
    var endpoint = 'nudgepad.console'
    if (checkbox.is(':checked'))
      endpoint = 'nudgepad.exec'
    
    $.post(endpoint, {command : command}, function (result) {
      output.append('>' + command.replace(/\n/g, '> \n') + '\n')
      output.append(result + '\n')
      output.scrollTop($('pre')[0].scrollHeight + '')
      input.val('')
      input.focus()
    }, null, function (error, message) {
      mixpanel.track('used console. got error')
      output.append('>' + command.replace(/\n/g, '> \n') + '\n')
      output.append('ERROR\n')
      output.append(error.responseText + '\n')
      output.scrollTop($('pre')[0].scrollHeight + '')
      input.val('')
      input.focus()
    })
    
  })
  
  input.on('enterkey', function () {
    send_button.click()
  })
  
  $('body').append(modal_screen)
  $('body').append(checkbox)
  $('body').append(label)
  $('body').append(output)
  $('body').append(input)
  $('body').append(send_button)
  $('body').append(cancel_button)
  $('body').append(button_container)
  input.focus()
}
