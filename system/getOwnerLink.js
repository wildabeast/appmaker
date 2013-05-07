var domain = process.argv[2]
var Space = require('space')
var fs = require('fs')
var email = 'owner@' + domain

var space = new Space(fs.readFileSync('/nudgepad/sites/' + domain + '/workers/' + email + '.space', 'utf8'))

console.log('http://' + domain + '/nudgepad.login?email=' + email + '&key=' + space.get('key'))

