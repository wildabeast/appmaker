Space.prototype.autokey = function (prefix) {
  prefix = prefix || ''
  if (!this.get(prefix))
    return prefix
  
  var i = 2
  while (this.get(prefix + i.toString())) {
    i++
  }
  return prefix + i.toString()
}
