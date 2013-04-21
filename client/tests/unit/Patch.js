module("Patch")

test("patch.page", function() {

  
  equal($('.scrap').length, 0, 'Should be no blocks')
  equal(nudgepad.stage.timeline.keys.length, 0, 'should be no commits')
  
  // Create an external commit
  var now = new Date().getTime()
  var page = nudgepad.stage.activePage
  var patch = "timelines\n"
  + " " + page + "\n"
  + "  " + now + "\n"
  + "   " + "scrap1" + "\n"
  + "    " + "content hello world"
  
  patch = new Space(patch)
  equal(nudgepad.patch.receive(patch), undefined, 'should return undefined for now.')
  equal(nudgepad.stage.timeline.keys.length, 1, 'should be 1 commit')
  equal($('.scrap').length, 1, 'Should be 1 block')
  equal($('.scrap#scrap1').html(), 'hello world')
  
  // Scenario: worker edits a block I have selected
  // should deselect mine, and update the dom
  nudgepad.stage.selectAll()
  equal($('.selection').length, 1, 'should be 1 block selected')
  
  now = new Date().getTime()
  patch = "timelines\n"
  + " " + page + "\n"
  + "  " + now + "\n"
  + "   " + "scrap1" + "\n"
  + "    " + "content hello mom"
  
  patch = new Space(patch)
  equal(nudgepad.patch.receive(patch), undefined, 'should return undefined for now.')
  
  
  
  equal($('.selection').length, 1, 'should be 1 block selected')
  equal($('.scrap#scrap1').html(), 'hello mom')
  equal($('.scrap').scrap().get('content'), 'hello mom', 'stage should be updated')

// need to update this test. edge is patched separately than ehad and stage now.
//  equal(nudgepad.pages.edge['block123'].content, 'foobar', 'and edge')


  
  
  
  /*
  Scenario:
  No selection. At edge.
  Selection. At edge. Unrelated block.
  Selection. At edge. Delete my block.
  Selection. At edge. Update my block.
  Text editing. At edge. Unrelated block.
  Text editing. At edge. Delete My block.
  Text editing. At edge. Update my block.
  
  No selection. Back. 
  Selection. Back. Unrelated block.
  Selection. Back. Delete my block.
  Selection. Back. Update my block.
  Text editing. Back. Unrelated block.
  Text editing. Back. Delete My block.
  Text editing. Back. Update my block.
  
  
  
  
  */
  
  
  // Undo scenario
  
  
  // Other page scenario
  
  
  // Other page undo scenario

})
