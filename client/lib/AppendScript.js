/**
 * Insert a script into the DOM
 *
 * @param {string} URL of script
 * @param {function} Optional callback
 */
var AppendScript = function (src, callback) {
  var script = document.createElement( 'script' )
  script.type = 'text/javascript'
  script.src = src
  if (callback)
    script.onload = callback
  document.getElementsByTagName('head')[0].appendChild(script)
}
