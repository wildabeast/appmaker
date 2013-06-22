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
  'patch' : [],
  'ready' : [],
  'public' : [],
  'uploadComplete' : []
}
var Query = ParseQueryString()
var Cookie = parseCookie(document.cookie)
var Socket = null

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
    Socket = io.connect('/')

    Socket.on('public', function (space) {
      nudgepad.trigger('public', space)
    })

    Socket.on('uploadComplete', function (file) {
      nudgepad.trigger('uploadComplete', file)
    })

    Socket.on('patch', function (space) {
      nudgepad.trigger('patch', space)
    })

    Socket.on('connect_failed', function (error) {
      console.log('Connect failed')
      console.log(error)
      $('#ConnectionStatus').html('Connection to server failed...').show()
    })

    Socket.on('error', function (error) {
      console.log(error)
      $('#ConnectionStatus').html('Connecting to server...').show()
    })

    Socket.on('disconnect', function (message) {
      nudgepad.trigger('disconnect', message)
    })
    
    Socket.on('room.change', function (newRoom) {
      Room._clear()
      Room.patch(newRoom)
    })

    Socket.on('ack', function (message) {
      nudgepad.trigger('ping', message)
    })

    Socket.on('connect', function (message) {
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
    
    // Ask them to register the project if they haven't
    // We assume owner@projectname is the default name for now.
    // In the future we'll want to update that
    if (Cookie.email === ('owner@' + document.location.host))
      RegisterForm.open()
    
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
  
  Socket.emit(event, space.toString(), function (data) {
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

nudgepad.on('ping', function (data) {
  $('#ConnectionStatus').hide()
})

window.onerror = function(message, url, lineNumber) {
  mixpanel.track('I got a javascript error')
  $('.nudgepad#JavascriptError').prepend('<div>Javascript Error: '+message+'</div>').show()
  //save error and send to server for example.
  return false
}

nudgepad.on('disconnect', function () {
  $('#ConnectionStatus').html('Disconnected from server. Attempting to reconnect...').show()
})


