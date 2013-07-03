$.fn.owner = function () {
  return Prototype.page.get($(this).attr('value')).element()
}
