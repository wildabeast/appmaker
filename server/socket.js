io = socketio.listen(http_server)

io.set('log level', 3)

/********* SOCKET EVENTS **********/ 

io.set('authorization', function (data, accept) {

  if (!data.headers.cookie)
    return accept('No cookie transmitted.', false)
  
  var cookie = parseCookie(data.headers.cookie)

  var worker = nudgepad.site.get('workers ' + cookie.email)
  if (!worker)
    return accept('Invalid worker "' + cookie.email + '" transmitted. Headers:' + data.headers.cookie, false)

  // Wrong key
  if (worker.get('key') !== cookie.key)
    return accept('Invalid key transmitted.', false)
  
  data.cookie = cookie
    
  // todo: broadcast worker
  return accept(null, true)  
  
})

io.sockets.on('connection', function (socket) {
  
  socket.on('collage.update', function (patch) {
    patch = new Space(patch)
    var id = patch.get('id')
    var fullPatch = new Space().set(id, patch)
    // new tab
    if (!nudgepad.site.get('collage ' + id)) {
      nudgepad.emit('collage.create', fullPatch, socket)
      socket.handshake.tabId = id
    }
    else
      nudgepad.emit('collage.update', fullPatch, socket)
    
    nudgepad.site.get('collage').patch(fullPatch)
  })
  
  socket.on('disconnect', function () {
    if (socket.handshake.tabId) {
      nudgepad.site.values.collage.delete(socket.handshake.tabId)
      nudgepad.emit('collage.delete', socket.handshake.tabId, socket)
    }
  })
  
  socket.on('patch', function (space, fn) {
    var patch = new Space(space)
    nudgepad.patchSite(patch, socket.handshake.cookie.email)
    
    fn('patch received')
    
    // Broadcast to everyone else
    nudgepad.emit('patch', space, socket)
  })
  
  socket.on('commit', function (space, fn) {
    var patch = new Space(space)
    nudgepad.patchSite(patch, socket.handshake.cookie.email)
    // Also patch the page
    var pageName = patch.values.timelines.keys[0]
    var page = nudgepad.site.get('pages ' + pageName)
    var commitTime = patch.get('timelines ' + pageName).keys[0]
    patch = new Space(patch.get('timelines ' + pageName + ' ' + commitTime).toString())
    if (patch.get('values')) {
      page.patch(patch.get('values'))
      console.log('pathcing values')
    }
    if (patch.get('order')) {
      page.patchOrder(patch.get('order'))
      console.log('pathcing order')
    }
    fn('commit received')
    page.save()
    // Broadcast to everyone else
    nudgepad.emit('patch', space, socket)
  })
  
  socket.on('workerSelection', function (ids) {
    nudgepad.emit('workerSelection', ids, socket)
  })

})
