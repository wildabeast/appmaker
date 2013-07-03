// adapted from http://stackoverflow.com/questions/4217962/scroll-to-an-element-using-jquery
$.fn.scrollMinimal = function(smooth) {
  var cTop = this.position().top
  var cHeight = this.outerHeight(true)
  var windowTop = $('#PrototypeStage').scrollTop()
  var visibleHeight = $('#PrototypeStage').height()

  if (cTop < windowTop) {
    if (smooth) {
      $('#PrototypeStage').animate({'scrollTop': cTop}, 'slow', 'swing')
    } else {
      $('#PrototypeStage').scrollTop(cTop)
    }
  } else if (cTop + cHeight > windowTop + visibleHeight) {
    if (smooth) {
      $('#PrototypeStage').animate({'scrollTop': cTop - visibleHeight + cHeight}, 'slow', 'swing')
    } else {
      $('#PrototypeStage').scrollTop(cTop - visibleHeight + cHeight)
    }
  }
};

