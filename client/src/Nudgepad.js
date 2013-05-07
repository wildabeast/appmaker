// Shim window.console for IE.
if (!window.console)
 window.console = {log: function() {}}

/**
 * The Editor. The main nudgepad namespace.
 *
 * @special Singleton
 */
nudgepad = {}
nudgepad.apps = {}
nudgepad.pages = {}
nudgepad.stage = {}
nudgepad.isTesting = false

// Nudgepad Events
nudgepad.event_handlers = {
  'selection' : [],
  'page' : [],
  'workerSelection' : [],
  'disconnect' : [],
  'ping' : [],
  'main' : [],
  'patch' : [],
  'ready' : [],
  'arrive' : [],
  'depart' : [],
  'public' : [],
  'uploadComplete' : []
}

/**
 * Requests the data from the server and loads the editor.
 */
nudgepad.main = function (callback) {
  
  nudgepad.domain = document.location.host
  
  // Load plugins
  nudgepad.grid = new Grid()
  nudgepad.cookie = parseCookie(document.cookie)
  nudgepad.name = ParseName(nudgepad.cookie.email)
  
  // In case we open multiple tabs
  window.name = 'nudgepad'
  
  // Can blocks be selected on click
  nudgepad.select = true
  
  // Only allow shortcuts on tools
  Events.shortcut.context = '.nudgepad'
  
  // TODO: on capture phase, capture block clicks, check if shiftkey is held,
  // if shiftkey is not held, prevent any events from firing on click?
  // document.body.addEventListener('mouseup', PopupHider.hide, true)
  
  nudgepad.query = ParseQueryString()
  // Fetch all files in the background.
  nudgepad.explorer.getSite(function () {
    
    
    // SLOW?? maybe not anymore
    // Render icons
    
    nudgepad.bind_shortcuts()
    
    // Open socket
    nudgepad.socket = io.connect('/')

    nudgepad.socket.on('public', function (space) {
      nudgepad.trigger('public', space)
    })

    nudgepad.socket.on('arrive', function (name) {
      nudgepad.trigger('arrive', name)
    })

    nudgepad.socket.on('depart', function (name) {
      nudgepad.trigger('depart', name)
    })

    nudgepad.socket.on('pageChange', function (name) {
      var parts = name.split(/ /)
      var name = ParseName(parts[0])
      nudgepad.openPages[name] = parts[1]
      nudgepad.pages.updateTabs()
    })

    nudgepad.socket.on('uploadComplete', function (file) {
      nudgepad.trigger('uploadComplete', file)
    })

    nudgepad.socket.on('patch', function (space) {
      nudgepad.trigger('patch', space)
    })

    nudgepad.socket.on('connect_failed', function (error) {
      console.log('Connect failed')
      console.log(error)
      $('#nudgepadConnectionStatus').html('Connection to server failed...').show()
    })

    nudgepad.socket.on('workerSelection', function (selection) {
      nudgepad.trigger('workerSelection', selection)
    })

    nudgepad.socket.on('error', function (error) {
      console.log(error)
      $('#nudgepadConnectionStatus').html('Connecting to server...').show()
    })

    nudgepad.socket.on('disconnect', function (message) {
      nudgepad.trigger('disconnect', message)
    })

    nudgepad.socket.on('ack', function (message) {
      nudgepad.trigger('ping', message)
    })

    nudgepad.socket.on('connect', function (message) {
      console.log('connected to server %s', message)
      $('#nudgepadConnectionStatus').html('Connected!').fadeOut()
      nudgepad.restartCheck()
    })
    

    // Do some special stuff for ios
    nudgepad.iosMain()
    
    var activePage = store.get('activePage') || 'home'
    
    if (!nudgepad.site.get('pages ' + activePage))
      activePage = 'home'
    
    nudgepad.stage.open(activePage)
    
    // Update all handles on resize
    $(window).on('resize', function () {
      $('.handle').trigger('update')
    })
    
    nudgepad.warnBeforeReload = true
    
    window.onbeforeunload = function(e) {
      if (nudgepad.warnBeforeReload)
        return nudgepad.reloadMessage()
    }
    
    $('body').scrollTop(0)
    $('body').scrollLeft(0)

    nudgepad.navigation.openAppFromQueryString()
    
    $('#nudgepadLoadingScreen').hide()
    
    // Prevent Images from dragging on Firefox
    $(document).on('dragstart', 'img', function(event) { event.preventDefault()})
    
    // fetch other timelines in background for now
    // SLOW
    nudgepad.explorer.downloadTimelines()
    
    nudgepad.trigger('main')
    
    nudgepad.updateRoom()
    if (callback)
      callback()
    
  })
}

/**
 * Sends an patch to the server via websockets/scoketio.
 *
 * @param {string} Event name
 * @param {Space}
 */
nudgepad.emit = function (event, space) {
  if (nudgepad.isTesting)
    return null
  
  nudgepad.socket.emit(event, space.toString(), function (data) {
    console.log(data)
  })
}

/**
 * Remove an event listener
 *
 * @param {string} Name of the event.
 * @param {function} fn to unbind
 */
nudgepad.off = function (event, fn) {
  
}

/**
 * Bind a fn to a nudgepad event such as "selectionChange, pageChange"
 *
 * @param {string} Name of the event. Need to make some docs for these
 * @param {function}
 */
nudgepad.on = function (event_name, fn) {
  nudgepad.event_handlers[event_name].push(fn)
}

/**
 * Removes all dom elements.
 */
nudgepad.quit = function () {
  $('.scrap,.nudgepad').remove()
}


/**
 * Fire a Nudgepad event.
 *
 * @param {string} Name of the event.
 * @param {space} Object
 */
nudgepad.trigger = function (event_name, space) {
  for (var i in nudgepad.event_handlers[event_name]) {
    nudgepad.event_handlers[event_name][i](space)
  }
}
