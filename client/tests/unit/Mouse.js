module('Mouse')

test('Mouse', function() {

  ok(nudgepad.mouse)
  ok(nudgepad.mouse instanceof Object)
  equal(nudgepad.mouse.y_change, 0)
  equal(nudgepad.mouse.x_change, 0)
  equal(nudgepad.mouse.is_down, false)

})
