/**
 * Show an alert message
 *
 * @param {string} Message
 */
nudgepad.alert = function (message) {
  
  var div = $('<textarea id="nudgepadEditorTextarea" readonly></textarea>')
  div.text(message)
  var modal_screen = $('<div id="nudgepadEditorModalScreen"/>')
  modal_screen.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })
  div.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })
    
  var save_button = $('<div id="nudgepadEditorSaveButton">Ok</div>')
  
  var button_container = $('<div id="nudgepadEditorButtonContainer"></div>')
  modal_screen.on('click', function () {
    save_button.trigger('click')
  })
  
  save_button.on('click', function () {
    save_button.remove()
    div.remove()
    modal_screen.remove()
    button_container.remove()
  })
  
  $('body').append(modal_screen)
  $('body').append(div)
  $('body').append(save_button)
  $('body').append(button_container)
  
}
