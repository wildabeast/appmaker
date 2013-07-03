var fs = require("fs"),
    exec = require('child_process').exec,
    os = require('os'),
    Space = require('space'),
    wrench = require('wrench'),
    util = require('util'),
    _ = require('underscore'),
    async = require('async')

var comps = new Space()
var compFiles = _.without(fs.readdirSync(__dirname + '/components/'), '.DS_Store')
_.each(compFiles, function (filename) {
  comps.set(filename.replace(/\.space$/, ''), new Space(fs.readFileSync(__dirname + '/components/' + filename, 'utf8')))
})
fs.writeFileSync(__dirname + '/components.js', 'Pages.components = ' + comps.toJavascript(), 'utf8')

