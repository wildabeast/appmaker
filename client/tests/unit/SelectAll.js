module('SelectAll')

test("select_all", function() {

  ok(nudgepad.stage.insert(), 'Scrap created')
  ok(nudgepad.stage.insert(), 'Scrap created')
  equal(nudgepad.stage.selectAll())
  equal($('.selection').length, 2)
  
})
