/**
 * @param {number}
 * @return {string}
 */
var generateSalt = function (length) {
  var salt = '',
      chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (var i = 0; i < length; i++) {
    salt += chars.substr(Math.round(Math.random() * chars.length), 1)
  }
  return salt
}

/**
 * @param {string}
 * @return {string}
 */
var hashString = function (string) {
  return crypto.createHash('sha256').update(string).digest("hex")
}

// http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
var toProperCase = function (string) {
  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
}

var parseName = function (email) {
  return toProperCase(
        email
        .replace(/\@.*/, '')
        .replace(/[0-9]/g, '')
        .replace(/\./, ' ')
      )
}

// http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
var validateEmail = function (email) { 
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

