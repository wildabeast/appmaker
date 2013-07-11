var Server = new Tool('Server')
Server.set('color', 'rgba(36, 65, 112, 1)')
Server.set('path', '')
Server.set('description', 'Manage your project\'s web server.')
Server.set('beta', 'true')

/**
 * Prompt the maker for input. Pops a modal.
 */
Server.console = function () {
  mixpanel.track('I opened the console')
  var output = $('<pre id="ServerConsole"></pre>')
  var input = $('<input id="ServerConsoleInput" type="text"/>')
  var checkbox = $('<input type="checkbox" id="ServerConsoleCheckbox"/>')
  var label = $('<label for="ServerConsoleCheckbox" id="ServerConsoleLabel">Eval in Node Process</label>')
  var modal_screen = $('<div id="ModalScreen"/>')
  modal_screen.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })
  output.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })

//  if (onkeypress)
//    output.on('keypress', onkeypress)
    
  var send_button = $('<div id="SaveButton">Send</div>')
  var cancel_button = $('<div id="CancelButton">Close</div>')
  
  var button_container = $('<div id="ButtonContainer"></div>')
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
    var endpoint = 'nudgepad.exec'
    if (checkbox.is(':checked'))
      endpoint = 'nudgepad.console'
    
    $.post(endpoint, {command : command}, function (result) {
      output.append('>' + command.replace(/\n/g, '> \n') + '\n')
      output.append(result + '\n')
      output.scrollTop($('#ServerConsole')[0].scrollHeight + '')
      input.val('')
      input.focus()
    }).error(function (error, message) {
      mixpanel.track('I used the console and got an error')
      output.append('>' + command.replace(/\n/g, '> \n') + '\n')
      output.append('ERROR\n')
      output.append(error.responseText + '\n')
      output.scrollTop($('#ServerConsole')[0].scrollHeight + '')
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

Server.refresh = function () {
  
  $.get('/nudgepad.status', {}, function (data) {
    Server.set('status', data)
    $('#ServerStatusArea').text(data)
  })
  $.get('/nudgepad.logs', {}, function (data) {
    Server.set('log', data)
    $('#ServerLogHolder').html(data)
    $('#ServerLogHolder').scrollTop($('#ServerLogHolder').height())
  })
  
}

Server.on('open', function () {
  
  if (!Server.get('log'))
    Server.refresh()
    
    
})
