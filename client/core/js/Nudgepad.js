// Shim window.console for IE.
if (!window.console)
 window.console = {log: function() {}}

/**
 * The Editor. The main nudgepad namespace.
 *
 * @special Singleton
 */
var nudgepad = {}
nudgepad.isTesting = false
// In case we open multiple tabs
window.name = 'nudgepad'
// Nudgepad Events
nudgepad.events = {
  'selection' : [],
  'stage' : [],
  'commit' : [],
  'page' : [],
  'disconnect' : [],
  'ping' : [],
  'main' : [],
  'patch' : [],
  'ready' : [],
  'public' : [],
  'uploadComplete' : []
}
var Query = ParseQueryString()
var Cookie = parseCookie(document.cookie)

/**
 * Requests the data from the server and loads the editor.
 */
nudgepad.main = function (callback) {
  
  // TODO: on capture phase, capture block clicks, check if shiftkey is held,
  // if shiftkey is not held, prevent any events from firing on click?
  // document.body.addEventListener('mouseup', PopupHider.hide, true)
  
  Events.shortcut.onfire = function (key) {
    mixpanel.track('I used the keyboard shortcut ' +  key)
  }
  
  // Fetch all files in the background.
  Explorer.getProject(function () {
    
    // Open socket
    nudgepad.socket = io.connect('/')

    nudgepad.socket.on('public', function (space) {
      nudgepad.trigger('public', space)
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
      $('#ConnectionStatus').html('Connection to server failed...').show()
    })

    nudgepad.socket.on('error', function (error) {
      console.log(error)
      $('#ConnectionStatus').html('Connecting to server...').show()
    })

    nudgepad.socket.on('disconnect', function (message) {
      nudgepad.trigger('disconnect', message)
    })
    
    nudgepad.socket.on('room.change', function (newRoom) {
      Room._clear()
      Room.patch(newRoom)
    })

    nudgepad.socket.on('ack', function (message) {
      nudgepad.trigger('ping', message)
    })

    nudgepad.socket.on('connect', function (message) {
      console.log('connected to server: %s', document.location.host)
      $('#ConnectionStatus').html('Connected!').fadeOut()
      nudgepad.restartCheck()
    })
    
    nudgepad.warnBeforeReload = true
    
    window.onbeforeunload = function(e) {
      if (nudgepad.warnBeforeReload)
        return nudgepad.reloadMessage()
    }
    
    $('body').scrollTop(0)
    $('body').scrollLeft(0)

    Launcher.openToolFromQueryString()
    
    $('#LoadingScreen').hide()
    
    // fetch other timelines in background for now
    // SLOW
    Explorer.downloadTimelines()
    
    nudgepad.trigger('main')
    
    mixpanel.track('I opened NudgePad')
    
    if (Query.newProject && !store.get('opens')) {
      store.set('opens', 1)
      var howLongItTookToCreateThisProject = new Date().getTime() - Query.timestamp
      mixpanel.track('I created a new project', {
        'time' : howLongItTookToCreateThisProject
      })
      console.log('It took %sms to create this project', howLongItTookToCreateThisProject)
      
    }
      
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
    console.log('%s responded to emission: %s', document.location.host, data)
  })
}

/**
 * Remove an event listener
 *
 * @param {string} Name of the event.
 * @param {function} fn to unbind
 */
nudgepad.off = function (eventName, fn) {
  if (!nudgepad.events[eventName])
    return true
  for (var i in nudgepad.events[eventName]) {
    if (nudgepad.events[eventName][i] === fn)
      nudgepad.events[eventName].splice(i, 1)
  }
}

/**
 * @param {string} Name of the event. Need to make some docs for these
 * @param {function}
 */
nudgepad.on = function (eventName, fn) {
  nudgepad.events[eventName].push(fn)
}

nudgepad.reloadMessageOneTime = ''
nudgepad.reloadMessage = function () {
  var message
  if (message = nudgepad.reloadMessageOneTime) {
    nudgepad.reloadMessageOneTime = ''
    return message
  }
  return 'Are you sure you want to leave Nudgepad?'
}

nudgepad.restartCheck = function () {
  $.get('/nudgepad.started', {}, function (data) {
    if (data !== Project.get('started')) {
      nudgepad.reloadMessageOneTime = 'Your project restarted. Please refresh the page.'
      location.reload()
    }
  })
}

/**
 * Fire a Nudgepad event.
 *
 * @param {string} Name of the event.
 * @param {space} Object
 */
nudgepad.trigger = function (eventName, space) {
  for (var i in nudgepad.events[eventName]) {
    nudgepad.events[eventName][i](space)
  }
}
