// adapted from http://stackoverflow.com/questions/4217962/scroll-to-an-element-using-jquery
$.fn.scrollMinimal = function(smooth) {
  var cTop = this.position().top
  var cHeight = this.outerHeight(true)
  var windowTop = $('#PagesStage').scrollTop()
  var visibleHeight = $('#PagesStage').height()

  if (cTop < windowTop) {
    if (smooth) {
      $('#PagesStage').animate({'scrollTop': cTop}, 'slow', 'swing')
    } else {
      $('#PagesStage').scrollTop(cTop)
    }
  } else if (cTop + cHeight > windowTop + visibleHeight) {
    if (smooth) {
      $('#PagesStage').animate({'scrollTop': cTop - visibleHeight + cHeight}, 'slow', 'swing')
    } else {
      $('#PagesStage').scrollTop(cTop - visibleHeight + cHeight)
    }
  }
};

