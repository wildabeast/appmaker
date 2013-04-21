/**
 * @param {object} Context
 * @return null
 */
Page.prototype.request = function (context) {
  // Compile any dynamic code
  // Execute any scraps of type server
  return false
  if (!this.get('head onrequest'))
    return null
  try {
    eval(this.get('head onrequest'))
  } catch (e) {
    if (e instanceof SyntaxError)
      console.log('Syntax error rendering onrequest %s', e.message)
    else
      console.log('Error rendering onrequest %s', e.message)
  }
}
