module("Pen")

test("pen", function() {

  ok(nudgepad.pen)

})


test("on", function() {

  ok(!nudgepad.pen.on, 'should not be on')

})
