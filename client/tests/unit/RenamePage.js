module('RenamePage')


test("rename_page", function() {
 var current_name = nudgepad.stage.activePage
 var new_name = new Date().getTime() + 'foo'
 ok(nudgepad.site.get('pages ' + current_name) instanceof Space)
 equal(nudgepad.pages.rename(new_name), '')
 ok(!nudgepad.site.get('pages ' + current_name), 'Old page should be deleted')
 equal(new_name, nudgepad.stage.activePage, 'Current page should have new name')
 ok(nudgepad.site.get('pages ' + new_name) instanceof Space, 'New page should be instance of space')
 equal(nudgepad.pages.trash(nudgepad.stage.activePage), '')
 
})
