module('parseCookie')

test('parseCookie', function() {
  
  var cookie = parseCookie("redirect=nudgepad; email=breck%40nudgepad.com")
  equal(cookie.redirect, 'nudgepad')
  equal(cookie.email, 'breck@nudgepad.com')

})
