// http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
var ValidateEmail = function (email) { 
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}
