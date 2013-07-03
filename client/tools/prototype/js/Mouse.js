/**
 * We provide easy access to querying the mouse position and state.
 *
 * @special Singleton.
 */
Prototype.Mouse = {}

// Is the mouse down?
Prototype.Mouse.isDown = false

/**
 * When a mousedown starts, we keep track of how far the mouse moves. Helpful for
 * drag and drop and drawing stuff.
 */
Prototype.Mouse.yChange = 0
Prototype.Mouse.xChange = 0
Prototype.Mouse.pathDistance = 0

/**
 * Update our Prototype.Mouse object
 *
 * @param {object} The mousedown event
 * @return true. Continue propagation.
 */
Prototype.Mouse.onmousedown = function (event) {
  //  console.log('mouse down')
  Prototype.Mouse.isDown = true
  Prototype.Mouse.down = event
  Prototype.Mouse.target = event.srcElement || event.originalTarget || event.target
  Prototype.Mouse.lastX = event.pageX
  Prototype.Mouse.lastY = event.pageY
  Prototype.Mouse.pathDistance = 0
  return true
}

/**
 * Update our Prototype.Mouse object
 *
 * @param {object} The move event
 * @return true. Continue propagation.
 */
Prototype.Mouse.onmousemove = function (event) {
  Prototype.Mouse.move = event
//  console.log('mouse move')
  if (!Prototype.Mouse.isDown)
    return true
  
  Prototype.Mouse.pathDistance += Math.abs(event.pageX - Prototype.Mouse.lastX) + Math.abs(event.pageY - Prototype.Mouse.lastY)
  Prototype.Mouse.lastX = event.pageX
  Prototype.Mouse.lastY = event.pageY
  Prototype.Mouse.xChange = event.pageX - Prototype.Mouse.down.pageX
  Prototype.Mouse.yChange = event.pageY - Prototype.Mouse.down.pageY
  Prototype.Mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(Prototype.Mouse.xChange, 2) +
      Math.pow(Prototype.Mouse.yChange, 2),
    .5)
  // todo: rotation
  return true
}

/**
 * Update our Prototype.Mouse object
 *
 * @param {object} The mouseup event
 * @return true. Continue propagation.
 */
Prototype.Mouse.onmouseup = function (event) {
  Prototype.Mouse.isDown = false
  Prototype.Mouse.xChange = event.pageX - Prototype.Mouse.down.pageX
  Prototype.Mouse.yChange = event.pageY - Prototype.Mouse.down.pageY
  Prototype.Mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(Prototype.Mouse.xChange, 2) +
      Math.pow(Prototype.Mouse.yChange, 2),
    .5)
  return true
}

/**
 * Update our Prototype.Mouse object
 *
 * @param {object} The mouseup event
 * @return true. Continue propagation.
 */
Prototype.Mouse.onTouchEnd = function (event) {
  Prototype.Mouse.isDown = false
  Prototype.Mouse.xChange = event.pageX - Prototype.Mouse.down.pageX
  Prototype.Mouse.yChange = event.pageY - Prototype.Mouse.down.pageY
  Prototype.Mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(Prototype.Mouse.xChange, 2) +
      Math.pow(Prototype.Mouse.yChange, 2),
    .5)
  return true
}

/**
 * Update our Prototype.Mouse object
 *
 * @param {object} The mousedown event
 * @return true. Continue propagation.
 */
Prototype.Mouse.onTouchStart = function (event) {
  //  console.log('mouse down')
  Prototype.Mouse.isDown = true
  Prototype.Mouse.down = event
  Prototype.Mouse.target = event.srcElement || event.originalTarget || event.target
  Prototype.Mouse.lastX = event.pageX
  Prototype.Mouse.lastY = event.pageY
  Prototype.Mouse.pathDistance = 0
  return true
}

/**
 * Update our Prototype.Mouse object
 *
 * @param {object} The move event
 * @return true. Continue propagation.
 */
Prototype.Mouse.onTouchMove = function (event) {
  Prototype.Mouse.move = event
//  console.log('mouse move')
  if (!Prototype.Mouse.isDown)
    return true
  
  Prototype.Mouse.pathDistance += Math.abs(event.pageX - Prototype.Mouse.lastX) + Math.abs(event.pageY - Prototype.Mouse.lastY)
  Prototype.Mouse.lastX = event.pageX
  Prototype.Mouse.lastY = event.pageY
  Prototype.Mouse.xChange = event.pageX - Prototype.Mouse.down.pageX
  Prototype.Mouse.yChange = event.pageY - Prototype.Mouse.down.pageY
  Prototype.Mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(Prototype.Mouse.xChange, 2) +
      Math.pow(Prototype.Mouse.yChange, 2),
    .5)
  // todo: rotation
  return true
}

