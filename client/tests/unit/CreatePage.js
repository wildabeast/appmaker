module('CreatePage')


test("createPage", function() {
  var pagename = 'test_page_' + new Date().getTime() + Math.random()
  equal(nudgepad.pages.create(pagename), pagename)
  ok(nudgepad.pages.edge instanceof Space)
  ok(nudgepad.pages.stage instanceof Page)
  equal(nudgepad.pages.trash(pagename), '')

})


