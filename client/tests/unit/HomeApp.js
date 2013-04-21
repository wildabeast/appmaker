module('HomeApp')

test('HomeApp', function() {
  
  ok(nudgepad.apps.home, 'Home app exists')
  nudgepad.apps.home.open()
  ok(nudgepad.apps.home.isOpen(), 'Home app is open')
  nudgepad.apps.home.close()
  ok(!nudgepad.apps.home.isOpen(), 'Home app is closed')
  
})
