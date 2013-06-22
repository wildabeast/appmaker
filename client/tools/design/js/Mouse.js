/**
 * We provide easy access to querying the mouse position and state.
 *
 * @special Singleton.
 */
Design.Mouse = {}

// Is the mouse down?
Design.Mouse.isDown = false

/**
 * When a mousedown starts, we keep track of how far the mouse moves. Helpful for
 * drag and drop and drawing stuff.
 */
Design.Mouse.yChange = 0
Design.Mouse.xChange = 0
Design.Mouse.pathDistance = 0

/**
 * Update our Design.Mouse object
 *
 * @param {object} The mousedown event
 * @return true. Continue propagation.
 */
Design.Mouse.onmousedown = function (event) {
  //  console.log('mouse down')
  Design.Mouse.isDown = true
  Design.Mouse.down = event
  Design.Mouse.target = event.srcElement || event.originalTarget || event.target
  Design.Mouse.lastX = event.pageX
  Design.Mouse.lastY = event.pageY
  Design.Mouse.pathDistance = 0
  return true
}

/**
 * Update our Design.Mouse object
 *
 * @param {object} The move event
 * @return true. Continue propagation.
 */
Design.Mouse.onmousemove = function (event) {
  Design.Mouse.move = event
//  console.log('mouse move')
  if (!Design.Mouse.isDown)
    return true
  
  Design.Mouse.pathDistance += Math.abs(event.pageX - Design.Mouse.lastX) + Math.abs(event.pageY - Design.Mouse.lastY)
  Design.Mouse.lastX = event.pageX
  Design.Mouse.lastY = event.pageY
  Design.Mouse.xChange = event.pageX - Design.Mouse.down.pageX
  Design.Mouse.yChange = event.pageY - Design.Mouse.down.pageY
  Design.Mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(Design.Mouse.xChange, 2) +
      Math.pow(Design.Mouse.yChange, 2),
    .5)
  // todo: rotation
  return true
}

/**
 * Update our Design.Mouse object
 *
 * @param {object} The mouseup event
 * @return true. Continue propagation.
 */
Design.Mouse.onmouseup = function (event) {
  Design.Mouse.isDown = false
  Design.Mouse.xChange = event.pageX - Design.Mouse.down.pageX
  Design.Mouse.yChange = event.pageY - Design.Mouse.down.pageY
  Design.Mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(Design.Mouse.xChange, 2) +
      Math.pow(Design.Mouse.yChange, 2),
    .5)
  return true
}

/**
 * Update our Design.Mouse object
 *
 * @param {object} The mouseup event
 * @return true. Continue propagation.
 */
Design.Mouse.onTouchEnd = function (event) {
  Design.Mouse.isDown = false
  Design.Mouse.xChange = event.pageX - Design.Mouse.down.pageX
  Design.Mouse.yChange = event.pageY - Design.Mouse.down.pageY
  Design.Mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(Design.Mouse.xChange, 2) +
      Math.pow(Design.Mouse.yChange, 2),
    .5)
  return true
}

/**
 * Update our Design.Mouse object
 *
 * @param {object} The mousedown event
 * @return true. Continue propagation.
 */
Design.Mouse.onTouchStart = function (event) {
  //  console.log('mouse down')
  Design.Mouse.isDown = true
  Design.Mouse.down = event
  Design.Mouse.target = event.srcElement || event.originalTarget || event.target
  Design.Mouse.lastX = event.pageX
  Design.Mouse.lastY = event.pageY
  Design.Mouse.pathDistance = 0
  return true
}

/**
 * Update our Design.Mouse object
 *
 * @param {object} The move event
 * @return true. Continue propagation.
 */
Design.Mouse.onTouchMove = function (event) {
  Design.Mouse.move = event
//  console.log('mouse move')
  if (!Design.Mouse.isDown)
    return true
  
  Design.Mouse.pathDistance += Math.abs(event.pageX - Design.Mouse.lastX) + Math.abs(event.pageY - Design.Mouse.lastY)
  Design.Mouse.lastX = event.pageX
  Design.Mouse.lastY = event.pageY
  Design.Mouse.xChange = event.pageX - Design.Mouse.down.pageX
  Design.Mouse.yChange = event.pageY - Design.Mouse.down.pageY
  Design.Mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(Design.Mouse.xChange, 2) +
      Math.pow(Design.Mouse.yChange, 2),
    .5)
  // todo: rotation
  return true
}

