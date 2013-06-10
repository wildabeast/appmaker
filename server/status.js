/**
 * Responds with server status.
 */
nudgepad.status = function(req, res, next) {
  
  var mem = process.memoryUsage()
  var load = os.loadavg()
  space = new Space()
  space.set('domain', nudgepad.domain)
  space.set('ip', nudgepad.ip)
  space.set('uptime', (process.uptime()) + 's')
  space.set('os_release', os.release())
  space.set('platform', os.platform())
  space.set('hostname', os.hostname())
  space.set('speedcoach', speedcoach.times())
  space.set('title', process.title)
  space.set('pid', process.pid)
  space.set('node_version', process.version)
  space.set('arch', process.arch)
  space.set('freemem', (os.freemem()/1000000).toFixed(1) + 'MB')
  space.set('totalmem', (os.totalmem()/1000000).toFixed(1) + 'MB')
  space.set('machine_uptime', (os.uptime()/86400).toFixed(2) + ' days')
  space.set('process_memory.rss', (mem.rss/1000000).toFixed(1) + 'MB')
  space.set('process_memory.heapTotal', (mem.heapTotal/1000000).toFixed(1) + 'MB')
  space.set('process_memory.heapUsed', (mem.heapUsed/1000000).toFixed(1) + 'MB')
  space.set('load-1-min', load[0].toFixed(2))
  space.set('load-5-min', load[1].toFixed(2))
  space.set('load-15-min', load[2].toFixed(2))
  res.set('Content-Type', 'text/plain')
  return res.send(space.toString())
}

app.get('/nudgepad.status', app.checkId, nudgepad.status)
