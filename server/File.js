var fs = require('fs'),
    Space = require('space')

/**
 * File constructor
 * @param {string}
 * @param {string}
 */
function File(path, space) {
  this.clear()
  this.path = path
  if (space)
    this.patch(space)
  return this
}

/**
 * @param {string}
 * @return {string}
 */
File.permalink = function(string) {
  return string.toLowerCase().replace(/[^a-z0-9- _\.\@]/gi, '').replace(/ /g, '_')
}

File.prototype = new Space()

/**
 * Append to a file
 * @param {space}
 * @param {function}
 */
File.prototype.append = function (space, callback) {
  fs.appendFile(this.path, space.toString(), 'utf8', callback)
}

/**
 * Create a file
 * @param {function}
 */
File.prototype.create = function (callback) {
  var path = this.path
  fs.writeFile(this.path, this.toString(), 'utf8', function (err) {
    if (err)
      return callback(err)
    callback()
//    fs.chmod(path, 0555, callback)
  })
}

/**
 * Load a file
 */
File.prototype.loadSync = function () {
  return this.patch(fs.readFileSync(this.path,'utf8'))
}

/**
 * Save a file
 * @param {function}
 */
File.prototype.save = function (callback) {
  fs.writeFile(this.path, this.toString(), 'utf8', callback)
}

/**
 * Delete a file
 * @param {function}
 */
File.prototype.trash = function (callback) {
  fs.unlink(this.path, callback)
}

module.exports = File

