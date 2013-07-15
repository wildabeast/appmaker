var ImagePreview = function (html) {
  
  $('#ImagePreviewContainer').html(html)
  $('.ImagePreview').show().css('display', '-webkit-flex')
  $('.ImagePreview').on('click', function (event) {
    $('.ImagePreview').hide()
    $(this).off( event )
  })
  
}
