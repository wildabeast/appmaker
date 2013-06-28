var socketio = require('socket.io'),
    Space = require('space'),
    Marking = require('markings'),
    parseCookie = require('cookie').parse

module.exports = function (app, http_server) {
  
  /********* SOCKET IO STUFF **********/ 
  app.SocketIO = socketio.listen(http_server)
  
  app.SocketIO.set('log level', 3)
  
  /********* SOCKET EVENTS **********/ 
  
  app.SocketIO.set('authorization', function (data, accept) {
  
    if (!data.headers.cookie)
      return accept('No cookie transmitted.', false)
    
    var cookie = parseCookie(data.headers.cookie)
  
    var maker = app.Project.get('makers ' + cookie.email)
    if (!maker)
      return accept('Invalid maker "' + cookie.email + '" transmitted. Headers:' + data.headers.cookie, false)
  
    // Wrong key
    if (maker.get('key') !== cookie.key)
      return accept('Invalid key transmitted.', false)
    
    data.cookie = cookie
    data.screenId = new Date().getTime()
    app.Room.set(data.screenId, new Space())
      
    // todo: broadcast maker
    return accept(null, true)  
    
  })
  
  app.SocketIO.sockets.on('connection', function (socket) {
    
    socket.on('room', function (space) {
      if (socket.handshake.screenId) {
        app.Room.set(socket.handshake.screenId, space)
        socket.broadcast.emit('room', app.Room.toString())
      }
    })
    
    socket.on('disconnect', function () {
      if (socket.handshake.screenId) {
        app.Room.delete(socket.handshake.screenId)
        socket.broadcast.emit('room', app.Room.toString())
      }
    })
    
    socket.on('project.append', function (space, fn) {
      var change = new Space(space)
      
      var key = change.get('key')
      var value = new Space(change.get('value'))
      var filename = key.split(/ /g)[0] + ' ' + key.split(/ /g)[1]
      
      app.Project.set(key, value)
      var file = app.Project.get(filename)
      file.save(function (error) {
        if (error) {
          console.log('Error: %s', error)
          return error
        }
      })
      
      fn('append received')
      // Broadcast to everyone else
      socket.broadcast.emit('project.append', space)      
    })
    
    socket.on('project.create', function (space, fn) {
      var change = new Space(space)
      
      var key = change.get('key')
      var value = new Space(change.get('value'))
      var filepath = app.paths['private'] + key.replace(' ', '/') + '.space'
      
      console.log('creating %s', file)
      var file = new Marking(filepath, value)
      file.create(function (error) {
        if (error) {
          console.log('Error: %s', error)
          return error
        }
      })
      app.Project.set(key, file)
      
      
      fn('create received')
      // Broadcast to everyone else
      socket.broadcast.emit('project.create', space)      
    })
    
    socket.on('project.set', function (space, fn) {
      var change = new Space(space)
      
      var key = change.get('key')
      var value = change.get('value')
      
      // we know this will be like pages filename
      var levels = key.split(/ /g)
      var folder = app.Project.get(levels[0])
      var path = levels[0] + ' ' + levels[1]
      var file = app.Project.get(path)
      var filepath = app.paths['private'] + levels[0] + '/' + levels[1] + '.space'
      
  
      console.log('updating %s', path)
      app.Project.set(key, value)
      file.save(function (error) {
        if (error) {
          console.log('Error: %s', error)
          return error
        }
      })
      
      
      fn('patch received')
      // Broadcast to everyone else
      socket.broadcast.emit('project.set', space.toString())      
    })
    
    socket.on('project.delete', function (key, fn) {
      // Delete File
      var file = app.Project.get(key)
      file.trash(function (error) {
        if (error) {
          console.log('Error: %s', error)
          return fn('error')
        }
        fn('patch received')
        // Broadcast to everyone else
        socket.broadcast.emit('project.delete', key)
      })
  
    })
  
  })
}
