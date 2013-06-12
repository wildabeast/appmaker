$.fn.owner = function () {
  return nudgepad.pages.stage.get($(this).attr('value')).element()
}
