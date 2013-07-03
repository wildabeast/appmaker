/**
 * Appends scraps to DOM.
 *
 * @param {bool} Whether to render them with javascript or just html+css.
 */
Page.prototype.render = function (context) {
  
  for (var i in this.keys) {
    var id = this.keys[i]
    this.values[id].render(context)
  }
  return this
}
