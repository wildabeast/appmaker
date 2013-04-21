module('Commit')


test("commit", function() {
  equal(nudgepad.stage.timeline.keys.length, 0)
  var name = nudgepad.stage.insert()[0]
  ok(name, 'Scrap created')
  equal(nudgepad.stage.timeline.keys.length, 1)
  var scrap = $(name).scrap()
  ok(scrap.move(1, 120))
  ok(nudgepad.stage.commit(), 'should be a commit')
  equal(nudgepad.stage.timeline.keys.length, 2, 'timeline should have 2 steps')
  var result = nudgepad.stage.commit()
  console.log(result.toString())
  equal(result, false, 'should not be a commit')
})

