module('DeletePage')

test("delete_page", function() {
  var pagename = 'test_page_' + new Date().getTime() + Math.random()
  equal(nudgepad.pages.create(pagename), pagename)
  equal(nudgepad.pages.trash(pagename), '')

})

