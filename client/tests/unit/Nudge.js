module("Nudgepad", {setup: function() {

  this.pagename = 'test_page_' + new Date().getTime() + Math.random()
  nudgepad.pages.create(this.pagename)
  },
  teardown: function() {
    
    nudgepad.pages.trash(this.pagename)
  }
})

test("Nudgepad", function() {

  ok(nudgepad)

})

test("clear", function() {

  nudgepad.stage.insert()
  nudgepad.stage.erase()
  equal($('.scrap').length, 0)

})

test("nextPageName", function() {
  ok(nudgepad.pages.nextName().match(/untitled/))

})


