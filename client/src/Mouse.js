/**
 * We provide easy access to querying the mouse position and state.
 *
 * @special Singleton.
 */
nudgepad.mouse = {}

// Is the mouse down?
nudgepad.mouse.is_down = false

/**
 * When a mousedown starts, we keep track of how far the mouse moves. Helpful for
 * drag and drop and drawing stuff.
 */
nudgepad.mouse.y_change = 0
nudgepad.mouse.x_change = 0
nudgepad.mouse.path_distance = 0

/**
 * Update our Mouse object
 *
 * @param {object} The mousedown event
 * @return true. Continue propagation.
 */
nudgepad.mouse.onmousedown = function (event) {
  //  console.log('mouse down')
  nudgepad.mouse.is_down = true
  nudgepad.mouse.down = event
  nudgepad.mouse.target = event.srcElement || event.originalTarget || event.target
  nudgepad.mouse.last_x = event.pageX
  nudgepad.mouse.last_y = event.pageY
  nudgepad.mouse.path_distance = 0
  return true
}

/**
 * Update our Mouse object
 *
 * @param {object} The move event
 * @return true. Continue propagation.
 */
nudgepad.mouse.onmousemove = function (event) {
  nudgepad.mouse.move = event
//  console.log('mouse move')
  if (!nudgepad.mouse.is_down)
    return true
  
  nudgepad.mouse.path_distance += Math.abs(event.pageX - nudgepad.mouse.last_x) + Math.abs(event.pageY - nudgepad.mouse.last_y)
  nudgepad.mouse.last_x = event.pageX
  nudgepad.mouse.last_y = event.pageY
  nudgepad.mouse.x_change = event.pageX - nudgepad.mouse.down.pageX
  nudgepad.mouse.y_change = event.pageY - nudgepad.mouse.down.pageY
  nudgepad.mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(nudgepad.mouse.x_change, 2) +
      Math.pow(nudgepad.mouse.y_change, 2),
    .5)
  // todo: rotation
  return true
}

/**
 * Update our Mouse object
 *
 * @param {object} The mouseup event
 * @return true. Continue propagation.
 */
nudgepad.mouse.onmouseup = function (event) {
  nudgepad.mouse.is_down = false
  nudgepad.mouse.x_change = event.pageX - nudgepad.mouse.down.pageX
  nudgepad.mouse.y_change = event.pageY - nudgepad.mouse.down.pageY
  nudgepad.mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(nudgepad.mouse.x_change, 2) +
      Math.pow(nudgepad.mouse.y_change, 2),
    .5)
  return true
}

/**
 * Update our Mouse object
 *
 * @param {object} The mouseup event
 * @return true. Continue propagation.
 */
nudgepad.mouse.onTouchEnd = function (event) {
  nudgepad.mouse.is_down = false
  nudgepad.mouse.x_change = event.pageX - nudgepad.mouse.down.pageX
  nudgepad.mouse.y_change = event.pageY - nudgepad.mouse.down.pageY
  nudgepad.mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(nudgepad.mouse.x_change, 2) +
      Math.pow(nudgepad.mouse.y_change, 2),
    .5)
  return true
}

/**
 * Update our Mouse object
 *
 * @param {object} The mousedown event
 * @return true. Continue propagation.
 */
nudgepad.mouse.onTouchStart = function (event) {
  //  console.log('mouse down')
  nudgepad.mouse.is_down = true
  nudgepad.mouse.down = event
  nudgepad.mouse.target = event.srcElement || event.originalTarget || event.target
  nudgepad.mouse.last_x = event.pageX
  nudgepad.mouse.last_y = event.pageY
  nudgepad.mouse.path_distance = 0
  return true
}

/**
 * Update our Mouse object
 *
 * @param {object} The move event
 * @return true. Continue propagation.
 */
nudgepad.mouse.onTouchMove = function (event) {
  nudgepad.mouse.move = event
//  console.log('mouse move')
  if (!nudgepad.mouse.is_down)
    return true
  
  nudgepad.mouse.path_distance += Math.abs(event.pageX - nudgepad.mouse.last_x) + Math.abs(event.pageY - nudgepad.mouse.last_y)
  nudgepad.mouse.last_x = event.pageX
  nudgepad.mouse.last_y = event.pageY
  nudgepad.mouse.x_change = event.pageX - nudgepad.mouse.down.pageX
  nudgepad.mouse.y_change = event.pageY - nudgepad.mouse.down.pageY
  nudgepad.mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(nudgepad.mouse.x_change, 2) +
      Math.pow(nudgepad.mouse.y_change, 2),
    .5)
  // todo: rotation
  return true
}

nudgepad.on('main', function () {

  if ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ) {
    document.addEventListener('touchstart', nudgepad.mouse.onTouchStart, true)
    document.addEventListener('touchend', nudgepad.mouse.onTouchEnd, true)
    document.addEventListener('touchmove', nudgepad.mouse.onTouchMove, true)
  } else {
    document.addEventListener('mousedown', nudgepad.mouse.onmousedown, true)
    document.addEventListener('mousemove', nudgepad.mouse.onmousemove, true)
    document.addEventListener('mouseup', nudgepad.mouse.onmouseup, true)
  }
})
