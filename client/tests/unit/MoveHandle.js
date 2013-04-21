module("MoveHandle")

test("MoveHandle", function() {

  ok(nudgepad.MoveHandle)

})

test("create", function() {
  nudgepad.stage.insert()
  equal($('.move_handle').length, 1, 'should have a move handle')

})

test("dblclick", function() {
  nudgepad.stage.insert()
  equal($('.scrap[contenteditable=true]').length, 0, 'should be no contenteditables')
  $('.move_handle').trigger("dblclick")
  equal($('.scrap[contenteditable=true]').length, 1, 'should be 1 contenteditables')
})

test("delete", function() {

  nudgepad.stage.insert()
  equal($('.move_handle').length, 1, 'should have a move handle')
  nudgepad.stage.selection.remove()
  nudgepad.stage.commit()
  equal($('.move_handle').length, 0, 'should not be a move handle')

})




