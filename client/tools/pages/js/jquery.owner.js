$.fn.owner = function () {
  return Pages.page.get($(this).attr('value')).element()
}
