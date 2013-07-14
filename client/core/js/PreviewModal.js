var PreviewModal = function (html) {
  var modalScreen = $('<div id="ModalScreen"/>')
  modalScreen.on('tap mousedown click slide slidestart slideend mouseup', function (event) {
    event.stopPropagation()
  })
  
  var content = $('<div id="ModalContent"></div>')
  content.append(html)
  modalScreen.on('click', function () {
    content.remove()
    modalScreen.remove()
  })
  
  content.on('click', function () {
    content.remove()
    modalScreen.remove()
  })
  
  $('body').append(modalScreen)
  $('body').append(content)
}
