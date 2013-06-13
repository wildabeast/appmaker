var fs = require('fs'),
    _ = require('underscore'),
    moment = require('moment')

/**
 * 127.0.0.1 /nudgepad GET 200 14 75917 "Wed, 20 Mar 2013 01:33:05 GMT" 127.0.0.1 - "curl/7.21.4 (universal-apple-darwin11.0) libcurl/7.21.4 OpenSSL/0.9.8r zlib/1.2.5"
 * format : ':ip :url :method :status :response-time :res[content-length] ":date" :remote-addr ":referrer" ":user-agent"'
 * @param {string}
 * @return {object}
 */
parseLineNames = 'ip url method responseCode responseTime responseLength time proxyIp referrer userAgent'.split(/ /)
parseLineRegex = /([^ ]+) ([^ ]+) ([^ ]+) ([^ ]+) ([^ ]+) ([^ ]+) "([^"]+)" ([^ ]+) "([^"]+)" "([^"]+)"/
parseLine = function (line) {
  var request = {}
  var parts = line.match(parseLineRegex)
  if (!parts)
    return null
  _.each(parseLineNames, function (name, index) {
    request[name] = parts[index + 1]
  })
  request.date = moment(request.time).format("MM/DD/YYYY")
  return request
}

function Stats (app) {
  
  var nudgepad = app.nudgepad
  
  parseStats = function (callback) {
    fs.readFile(nudgepad.paths.requests_log, 'utf8', function (error, data) {
      var requests = data.split(/\n/g)
      var days = {}
      _.each(requests, function (line) {
        var request = parseLine(line)
        if (!request)
          return true
        if (!days[request.date])
          days[request.date] = { requests : 0, ips : {}}
        days[request.date].requests++
        if (days[request.date].ips[request.ip] === undefined)
          days[request.date].ips[request.ip] = 0
        days[request.date].ips[request.ip]++
        if (days[request.date][request.url] === undefined)
          days[request.date][request.url] = 0
        days[request.date][request.url]++
      })
      callback(days)
    })
  }

  app.get('/nudgepad.stats', app.checkId, function(req, res, next) {
    res.set('Content-Type', 'text/plain')
    parseStats(function (days) {
      return res.send(new Space(days).toString())  
    })

  })
  
}

module.exports = Stats

