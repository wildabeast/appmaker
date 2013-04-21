var blinker = {}
blinker.default = 'Nudgepad'
blinker.blinking = blinker.default
blinker.interval = null
blinker.change = function (title) {
  blinker.blinking = title
}
blinker.blink = function () {
  if (document.hasFocus())
    return blinker.stop()
  document.title = (document.title == blinker.default ? blinker.blinking : blinker.default)
}
blinker.start = function () {
  clearInterval(blinker.interval)
  blinker.blinking = blinker.default
  blinker.interval = setInterval(blinker.blink, 2000)
}
blinker.stop = function () {
  clearInterval(blinker.interval)
  document.title = blinker.blinking = blinker.default
}
$(window).on('blur', blinker.start)
$(window).on('focus', blinker.stop)

