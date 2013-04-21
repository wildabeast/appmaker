module('Stage')

test('Stage', function() {
  
  ok($('#nudgepadStage').length, 'nudgepad Stage exists')
  
  ok($('#nudgepadStageBottomPadding').length, 'nudgepad Stage exists')
  
  
})


module('Stage open')

test("open", function() {

  var current_name = nudgepad.stage.activePage
  var pagename = 'test_page_' + new Date().getTime() + Math.random()
  equal(nudgepad.pages.create(pagename), pagename)
  equal(nudgepad.stage.percentElapsed, 100, 'Timeline should be at end')
  equal(nudgepad.stage.activePage, pagename)
  equal(nudgepad.stage.open(current_name), '')
  equal(nudgepad.stage.activePage, current_name)
  equal(nudgepad.stage.open(pagename), '')
  equal(nudgepad.stage.activePage, pagename)
  equal(nudgepad.pages.trash(pagename), '')
  
})


module('InsertScraps')

test("insertScrap", function() {
  equal($('.selection').length, 0)
  ok(nudgepad.stage.insert(), 'Scrap created')
  equal($('.selection').length, 1)
})


test("redo", function() {
  nudgepad.stage.erase()
  var name = nudgepad.stage.insert()[0]
  ok(name, 'Scrap created')
  equal($(name).length, 1, 'block created')
  name = nudgepad.stage.insert()[0]
  equal($('.scrap').length, 2, 'block created. now two blocks')
  nudgepad.stage.undo()
  equal($('.scrap').length, 1, 'block undone. now one block')
  nudgepad.stage.redo()
  equal($('.scrap').length, 2, 'block redone. now 2.')
  nudgepad.stage.redo()
  equal($('.scrap').length, 2, 'nothing chnaged')
})

test("undo", function() {
  var name = nudgepad.stage.insert()[0]
  ok(name, 'Scrap created')
  equal(nudgepad.stage.percentElapsed, 100, 'Rewind should be at 100%')
  equal($(name).length, 1, 'block created')
  name = nudgepad.stage.insert()[0]
  nudgepad.stage.undo()
  notEqual(nudgepad.stage.percentElapsed, 100, 'Rewind should not be at 100%')
  equal($(name).length, 0, 'block gone')
  nudgepad.stage.undo()
  equal($(name).length, 0, 'block gone')
  
})


