module('DuplicatePage')

test("duplicate_page", function() {
  var page_name = nudgepad.stage.activePage + 1
  var name = nudgepad.stage.insert('block1\n content hello')[0]
  ok(name, 'Scrap created')
  var new_name = nudgepad.pages.nextName(nudgepad.stage.activePage)
  equal(nudgepad.pages.duplicate(null, null, true), page_name)
  equal(nudgepad.stage.activePage, new_name, 'New page should be open')
  equal($(name).html(), 'hello', 'New page should have sources block')

})


