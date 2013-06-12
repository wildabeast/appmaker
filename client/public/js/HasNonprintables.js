var HasNonprintables = function (string) {
  return ( string.match(/[\xA0]/) ? true : false)
}
