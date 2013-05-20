module("Selection")

test("Selection", function() {

  ok(nudgepad.stage.selection)

})

test("clear", function() {
  equal($('.selection').length, 0)
  ok(nudgepad.stage.insert(), 'Scrap created')
  equal($('.selection').length, 1)
  nudgepad.stage.selection.clear()
  equal($('.selection').length, 0)

})

test("css", function() {
  equal($('.selection').length, 0)
  ok(nudgepad.stage.insert(), 'Scrap created')
  nudgepad.stage.selection.css('width 121px')
  equal($('.selection').width(), 121)
  nudgepad.stage.selectAll()
  nudgepad.stage.selection.remove()
  nudgepad.stage.commit()
})


test("delete", function() {
  
  nudgepad.stage.selectAll()
  nudgepad.stage.selection.remove()
  nudgepad.stage.commit()
  
  ok(nudgepad.stage.insert(), 'Scrap created')
  equal($('.selection').length, 1)
  equal(nudgepad.pages.stage.keys.length, 1)
  nudgepad.stage.selection.remove()
  nudgepad.stage.commit()
  equal($('.selection').length, 0)
  equal(nudgepad.pages.stage.keys.length, 0)

})

test("duplicate", function() {
  
  nudgepad.stage.selectAll()
  nudgepad.stage.selection.remove()
  nudgepad.stage.commit()
  
  var name = nudgepad.stage.insert()[0]
  ok(name, 'Scrap created')
  equal(nudgepad.pages.stage.keys.length, 1)
  
  var dupe = nudgepad.stage.selection.duplicate()[0]
  equal(nudgepad.pages.stage.keys.length, 2)
  ok(!$(name).hasClass('selection'), 'source block should not be selected')
  ok($(dupe).hasClass('selection'), 'new block should be selected')
  
  
  // Test for block
  nudgepad.stage.erase()
  var source = nudgepad.stage.insert()[0]
  nudgepad.stage.selectAll()
  nudgepad.stage.selection.duplicate()
  var left = $(source).offset().left
  equal(nudgepad.pages.stage.keys.length, 2)
  ok($('.selection').offset().left > left, 'duplicated block should be to the right')
  equal($('.selection').length, 1, 'duplicated block should be selected')
  

})


test("move", function() {
  var selector = nudgepad.stage.insert('scrap\n style\n  top 10px\n  left 10px\n  position absolute')[0]
  ok(selector, 'Scrap created')
  
  var top_edge = $(selector).position().top
  
  equal($('.selection').position().top, top_edge)
  nudgepad.stage.selection.move(0, 1)
  
  equal($('.selection').position().top, top_edge + 1, 'should be moved down one')
})

test("patch", function() {
  nudgepad.stage.erase()
  ok(nudgepad.stage.insert(), 'Scrap created')
  ok(nudgepad.stage.insert(), 'Scrap created')
  nudgepad.stage.selection.patch('content hello mom')
  $('.selection').each(function (){
    equal($(this).html(), 'hello mom')  
  })
})


test("toSpace", function() {
  ok(nudgepad.stage.insert(), 'Scrap created')
  ok(nudgepad.stage.selection.toSpace() instanceof Space)
  equal(nudgepad.stage.selection.toSpace().keys.length, 1)
})


