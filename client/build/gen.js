var fs = require("fs"),
    exec = require('child_process').exec,
    os = require('os'),
    Space = require('space'),
    wrench = require('wrench'),
    util = require('util'),
    _ = require('underscore'),
    async = require('async')

/**

Generates 4 files:
main.html (for production)
main.dev.html (for development)
unit/main.html (for production test)
unit/main.dev.html (for development)
*/
var path = __dirname + '/../'
var srcPath = path + 'src/'
var cssPath = path + 'css/'
var unitsPath = path + 'tests/unit/'
var htmlPath = path + 'html/'
var buildPath = path + 'build/'
var jsPath = path + 'js/'

/** GENERATE DROPPABLES.NOTE **/
var dropPath = path + 'droppables/'
var dropCats = fs.readdirSync(dropPath)
dropCats = _.filter(dropCats, function (folder) { return fs.statSync(dropPath + folder).isDirectory() })
var droppables = new Space()
_.each(dropCats, function (folder) {
  droppables.set(folder, new Space())
  var dropFiles = fs.readdirSync(dropPath + folder + '/')
  dropFiles = _.filter(dropFiles, function (file) { return file.match(/\.space$/) })
  _.each(dropFiles, function (file) {
    droppables.values[folder].set(file.replace(/\.space$/, ''), new Space(fs.readFileSync(dropPath + folder + '/' + file, 'utf8')))
  })
  
})

fs.writeFileSync(srcPath + 'Droppables.js', 'nudgepad.droppables = ' + droppables.toJavascript(), 'utf8')
//fs.writeFileSync(path + 'droppables.space', droppables.toString(), 'utf8')

/*** CSS FILES ***/
var css_includes = fs.readdirSync(cssPath)
// Remove nudgepad.css and insert it at the beginning.
css_includes = _.without(css_includes, 'reset.css', '.DS_store', 'document.css')
css_includes.unshift('document.css')
css_includes.unshift('reset.css')
var CSS = ''
var MAKECSS = ''
var first = ''
_.each(css_includes, function (value) {
  CSS += '    <link rel="stylesheet" href="/nudgepad/css/' + value + '" type="text/css"/>\n'
  MAKECSS +=	first + 'css/' + value
  first = ' '
})
fs.writeFileSync(buildPath + 'CSS', CSS, 'utf8')
fs.writeFileSync(buildPath + 'css.make', MAKECSS, 'utf8')

/*** HTML FILES ***/
var html_includes = fs.readdirSync(htmlPath)
// Remove early ones and insert it at the beginning.
html_includes = _.without(html_includes, 'loadingScreen.html', '.DS_store')
html_includes.unshift('loadingScreen.html')
var HTML = '  '
var first = ''
_.each(html_includes, function (value) {
  var content = fs.readFileSync(htmlPath + '/' + value, 'utf8')
  HTML += content.replace(/\n/g, '\n  ')
  first = ' '
})
fs.writeFileSync(buildPath + 'BODY', HTML, 'utf8')

/*** LIB FILES ***/
var libs = 'lib/jquery-1.9.1.min.js lib/jquery.dimensions.js lib/Lasso.js lib/validateEmail.js lib/ParseQueryString.js lib/Permalink.js lib/jquery.scrollbar.js lib/ToProperCase.js lib/ParseName.js lib/jquery.topdiv.js lib/blinker.js lib/Spectrum.js lib/underscore.js lib/marked.js lib/natural_sort.js lib/store.js lib/goog.js lib/events.js lib/parseCookie.js lib/MoveCursorToEnd.js lib/socket.io.js lib/moment.min.js lib/jquery.sha256.min.js lib/space.js lib/scraps.js lib/thumbs.js lib/platform.js'
var lib_includes = libs.split(/ /)
var LIB = ''
_.each(lib_includes, function (value) {
  LIB += '    <script type="text/javascript" src="/nudgepad/' + value + '"></script>\n'
})
fs.writeFileSync(buildPath + 'LIBS', LIB, 'utf8')
fs.writeFileSync(buildPath + 'lib.make', libs.replace(/ /g, ' build/blank.js '), 'utf8')

/*** SRC FILES ***/
var src_includes = fs.readdirSync(srcPath)
// Remove Nudgepad.js and insert it at the beginning.
src_includes = _.without(src_includes, 'Nudgepad.js', 'App.js', '.DS_store')
src_includes.unshift('Nudgepad.js')
src_includes.unshift('App.js')
var SRC = ''
var MAKESRC = ''
first = ''
_.each(src_includes, function (value) {
  SRC += '    <script type="text/javascript" src="/nudgepad/src/' + value + '"></script>\n'
  MAKESRC +=	first + 'src/' + value
  first = ' '
})
fs.writeFileSync(buildPath + 'SRC', SRC, 'utf8')
fs.writeFileSync(buildPath + 'src.make', MAKESRC, 'utf8')

/*** UNITS FILES ***/
var unit_includes = fs.readdirSync(unitsPath)
unit_includes = _.without(unit_includes, '.DS_store')
var UNITS = ''
_.each(unit_includes, function (value) {
  UNITS += '    <script type="text/javascript" src="/nudgepad/tests/unit/' + value + '"></script>\n'
})
fs.writeFileSync(buildPath + 'UNITS', UNITS, 'utf8')

var QUNITBODY = fs.readFileSync(buildPath + 'QUNITBODY')
var BODY = fs.readFileSync(buildPath + 'BODY')

// BUILD TEMPLATES
var buildTemplate = function (destination, source) {
  var file = fs.readFileSync(source, 'utf8')
  file = file.replace(/\nUNITS\n/, '\n' + UNITS + '\n')
  file = file.replace(/\nLIB\n/, '\n' + LIB + '\n')
  file = file.replace(/\nCSS\n/, '\n' + CSS + '\n')
  file = file.replace(/\nSRC\n/, '\n' + SRC + '\n')
  file = file.replace(/\nBODY\n/, '\n' + BODY + '\n')
  file = file.replace(/\nQUNITBODY\n/, '\n' + QUNITBODY + '\n')
  fs.writeFileSync(destination, file, 'utf8')  
}

buildTemplate(path + 'main.html', buildPath + 'main.html')
buildTemplate(path + 'main.dev.html', buildPath + 'main.dev.html')
buildTemplate(path + 'tests/main.html', buildPath + 'test.main.html')
buildTemplate(path + 'tests/main.dev.html', buildPath + 'test.main.dev.html')


// http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
var ToProperCase = function (string) {
  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
}



