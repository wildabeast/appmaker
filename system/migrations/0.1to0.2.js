var fs = require('fs'),
    Space = require('space')

var file = process.argv[2]
var space = new Space(fs.readFileSync(file, 'utf8'))
space.every(function (key, value) {
  if (key === 'type')
    this.rename('type', 'tag')
})
fs.writeFileSync(space.toString(), 'utf8')
