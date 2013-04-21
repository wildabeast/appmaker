module("Scrap")
test("Scrap", function() {

  ok(Scrap)

})

test("clone", function() {

  var name = nudgepad.stage.insert()[0]
  ok(name, 'Scrap created')
  var scrap = $(name).scrap()
  ok(scrap instanceof Scrap)
  

})

test("deselect", function() {

  var name = nudgepad.stage.insert()[0]
  ok(name, 'Scrap created')
  nudgepad.stage.selection.clear()
  var scrap = $(name).scrap()
  ok($(name).selectMe())
  equal($('.selection').length, 1)
  ok(scrap.element().deselect())
  equal($('.selection').length, 0)

})

test("remove", function() {

  var name = nudgepad.stage.insert()[0]
  ok(name, 'Scrap created')
  equal($('.selection').length, 1)
  equal($(name).length, 1)
  $(name).deselect().remove()
  equal($('.selection').length, 0)
  equal($(name).length, 0)

})

test("select", function() {

  var name = nudgepad.stage.insert()[0]
  ok(name, 'Scrap created')
  nudgepad.stage.selection.clear()
  ok($(name).selectMe())
  equal($('.selection').length, 1)

})

test("move", function() {

  var name = nudgepad.stage.insert()[0]
  ok(name, 'Scrap created')
  
  // Create it in the center of page
  var left_edge = $(name).left()
  var top_edge = $(name).top()
  var scrap = $(name).scrap()
  
  equal($('.selection').left(), left_edge, 'left should be in center')
  equal($('.selection').top(), top_edge, 'top should be in center')
  ok(scrap.move(3, 12), 'move should be ok')
  equal($('.selection').left(), left_edge + 3, 'should be moved by 3')
  equal($('.selection').top(), top_edge + 12, 'should be moved by 12')
  ok(scrap.move(1, 120), 'move shuold be ok')
  equal($('.selection').left(), left_edge + 4, 'should be moved by 4')
  equal($('.selection').top(), top_edge + 132, 'top should be moved')
  

})






