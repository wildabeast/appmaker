nudgepad.on('main', function () {
  

  // We do this on live, so that it wont interfere with events bound
  // to items inside the ribbon, but it will prevent events from
  // reaching nudgepadbody hopefull
  $('#nudgepadPagesBar').on('slide slidestart', function (event) {
    
    event.stopPropagation()
  })

})



