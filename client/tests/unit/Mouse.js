module('Mouse')

test('Mouse', function() {

  ok(nudgepad.mouse)
  ok(nudgepad.mouse instanceof Object)
  equal(nudgepad.mouse.yChange, 0)
  equal(nudgepad.mouse.xChange, 0)
  equal(nudgepad.mouse.isDown, false)

})
