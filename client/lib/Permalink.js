/**
 * Make a string URL friendly. Turns "$foo Bar%!@$" into "foo_bar"
 *
 * @param {string}
 * @return {object}
 */
var Permalink = function (string) {
  if (!string) return ''
  // strip non alphanumeric characters from string and lowercase it.
  return string.toLowerCase().replace(/[^a-z0-9- _\.]/gi, '').replace(/ /g, '_')
}
