var fs = {}

fs.writeFile = function (filename, data, callback) {
  var params = {}
  params.method = 'writeFile'
  params.data = data
  params.filename = filename
  $.post('/nudgepad.fs', params, callback)
}


