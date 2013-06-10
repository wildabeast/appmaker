/**
 * @param {number}
 * @return {string}
 */
var RandomString = function (length) {
  var str = '',
      chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (var i = 0; i < length; i++) {
    str += chars.substr(Math.round(Math.random() * chars.length), 1)
  }
  return str
}

module.exports = RandomString
