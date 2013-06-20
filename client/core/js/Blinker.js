// Simple object for updating the document.title
var Blinker = {}
Blinker['default'] = 'NudgePad'
Blinker.blinking = Blinker.default
Blinker.interval = null
Blinker.change = function (title) {
  Blinker.blinking = title
}
Blinker.blink = function () {
  if (document.hasFocus())
    return Blinker.stop()
  document.title = (document.title == Blinker.default ? Blinker.blinking : Blinker.default)
}
Blinker.start = function () {
  clearInterval(Blinker.interval)
  Blinker.blinking = Blinker.default
  Blinker.interval = setInterval(Blinker.blink, 2000)
}
Blinker.stop = function () {
  clearInterval(Blinker.interval)
  document.title = Blinker.blinking = Blinker.default
}
$(window).on('blur', Blinker.start)
$(window).on('focus', Blinker.stop)

