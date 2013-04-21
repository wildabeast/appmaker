module("StretchHandle")

test("StretchHandle", function() {

  ok(nudgepad.StretchHandle)

})

test("create", function() {
  
  nudgepad.stage.selectAll()
  nudgepad.stage.selection.remove()
  nudgepad.stage.commit()
  var name = nudgepad.stage.insert('scrap\n style\n  top 10px\n  left 10px\n  position absolute')[0]
  equal($('.stretch_handle').length, 8, 'should be 8 stretch handles')
  
  
  var left_edge = parseFloat(Math.round(($(window).width() / 2) - 50) )
  var top_edge = parseFloat(Math.round(($(window).height() / 2) - 50) )
  
  /*
  equal($('#stretch_handle_topleft' + name).left(), left_edge - 4)
  equal($('#stretch_handle_topright' + name).right(), left_edge + 105)
  equal($('#stretch_handle_bottomright' + name).right(), left_edge + 105)
  equal($('#stretch_handle_bottomcenter' + name).right(), left_edge + 55)

  */
})

test("delete", function() {
  nudgepad.stage.selectAll()
  nudgepad.stage.selection.remove()
  nudgepad.stage.commit()
  nudgepad.stage.insert('scrap\n style\n  top 10px\n  left 10px\n  position absolute')
  equal($('.stretch_handle').length, 8, 'should be 8 stretch handles')
  nudgepad.stage.selection.remove()
  nudgepad.stage.commit()
  equal($('.stretch_handle').length, 0, 'should be 0 stretch handles')

})
