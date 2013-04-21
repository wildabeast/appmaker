module("ContentEditor")

test("ContentEditor", function() {

  ok(nudgepad.contentEditor)

})

test("blur", function() {
  nudgepad.stage.erase()
  var selector = nudgepad.stage.insert()[0]
  var scrap = $(selector).scrap()
  ok(selector, 'Scrap created')
  equal($(selector).html(), 'Hello world', 'Default text in block')
  nudgepad.contentEditor.focus(selector)
  equal($(selector).attr('contenteditable'), 'true', 'block should be editable')
  $(selector).html('hello')
  $(selector).trigger('blur')
  notEqual($(selector).attr('contenteditable'), 'true', 'block should not be editable')
  equal(scrap.get('content'), 'hello', 'Text was saved')

})

test("focus", function() {
  nudgepad.stage.erase()
  var selector = nudgepad.stage.insert()[0]
  ok(selector, 'Scrap created')
  nudgepad.contentEditor.focus(selector)
//  equal($('.scrap:focus').length, 1, 'block should be focused')
  equal($(selector).attr('contenteditable'), 'true', 'block should be editable')
  equal($('.move_handle,.order_handle,.stretch_handle').length, 0, 'all handles should be closed')
  $('.scrap:focus').trigger('blur')
  nudgepad.stage.selection.remove()
  nudgepad.stage.commit()

})



