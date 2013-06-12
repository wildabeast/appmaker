var ParseName = function (email) {
  if (!email) return ''
  return ToProperCase(
        email
        .replace(/\@.*/, '')
        .replace(/[0-9]/g, '')
        .replace(/\./, ' ')
      )
}
