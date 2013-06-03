/**
 * http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript
 *
 * @return {object}
 */
var ParseQueryString = function () {
  var query = {};
  (function () {
      var match,
          pl     = /\+/g,  // Regex for replacing addition symbol with a space
          search = /([^&=]+)=?([^&]*)/g,
          decode = function (s) { return decodeURIComponent(s.replace(pl, " ")) },
          query_string  = window.location.search.substring(1)

      while (match = search.exec(query_string))
         query[decode(match[1])] = decode(match[2])
  })()
  return query
}
var query = ParseQueryString()

var mutex = false
$(document).on('ready', function () {
  if (query.taken)
    $('#error').html('Domain already exists. Try another.')
  $('#domain').focus()
  if (localStorage && localStorage.getItem("email"))
    $('#email').attr('value', localStorage.getItem("email"))
  $('#nudgepadIndexLogo').on('dblclick', function () {
    var email = prompt('Enter your email to save your preference')
    if (!email)
      return false
    if (!localStorage)
      return false
    localStorage.setItem('email', email)
    $('#email').attr('value', localStorage.getItem("email"))
  })
  $('#form').on('submit', function () {
    if (mutex)
      return false
    $('#domain').val(Domain.format($('#domain').val()))
    $('#timestamp').val(new Date().getTime())
    $('#error').html('')
    var error = Domain.validate($('#domain').val())
    if (!error) {
      mutex = true
      return true
    }
    $('#error').html(error)
    return false
  })
})
