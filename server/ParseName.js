// http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
var toProperCase = function (string) {
  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
}

var ParseName = function (email) {
  return toProperCase(
        email
        .replace(/\@.*/, '')
        .replace(/[0-9]/g, '')
        .replace(/\./, ' ')
      )
}

module.exports = ParseName
