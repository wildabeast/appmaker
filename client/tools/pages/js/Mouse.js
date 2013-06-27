/**
 * We provide easy access to querying the mouse position and state.
 *
 * @special Singleton.
 */
Pages.Mouse = {}

// Is the mouse down?
Pages.Mouse.isDown = false

/**
 * When a mousedown starts, we keep track of how far the mouse moves. Helpful for
 * drag and drop and drawing stuff.
 */
Pages.Mouse.yChange = 0
Pages.Mouse.xChange = 0
Pages.Mouse.pathDistance = 0

/**
 * Update our Pages.Mouse object
 *
 * @param {object} The mousedown event
 * @return true. Continue propagation.
 */
Pages.Mouse.onmousedown = function (event) {
  //  console.log('mouse down')
  Pages.Mouse.isDown = true
  Pages.Mouse.down = event
  Pages.Mouse.target = event.srcElement || event.originalTarget || event.target
  Pages.Mouse.lastX = event.pageX
  Pages.Mouse.lastY = event.pageY
  Pages.Mouse.pathDistance = 0
  return true
}

/**
 * Update our Pages.Mouse object
 *
 * @param {object} The move event
 * @return true. Continue propagation.
 */
Pages.Mouse.onmousemove = function (event) {
  Pages.Mouse.move = event
//  console.log('mouse move')
  if (!Pages.Mouse.isDown)
    return true
  
  Pages.Mouse.pathDistance += Math.abs(event.pageX - Pages.Mouse.lastX) + Math.abs(event.pageY - Pages.Mouse.lastY)
  Pages.Mouse.lastX = event.pageX
  Pages.Mouse.lastY = event.pageY
  Pages.Mouse.xChange = event.pageX - Pages.Mouse.down.pageX
  Pages.Mouse.yChange = event.pageY - Pages.Mouse.down.pageY
  Pages.Mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(Pages.Mouse.xChange, 2) +
      Math.pow(Pages.Mouse.yChange, 2),
    .5)
  // todo: rotation
  return true
}

/**
 * Update our Pages.Mouse object
 *
 * @param {object} The mouseup event
 * @return true. Continue propagation.
 */
Pages.Mouse.onmouseup = function (event) {
  Pages.Mouse.isDown = false
  Pages.Mouse.xChange = event.pageX - Pages.Mouse.down.pageX
  Pages.Mouse.yChange = event.pageY - Pages.Mouse.down.pageY
  Pages.Mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(Pages.Mouse.xChange, 2) +
      Math.pow(Pages.Mouse.yChange, 2),
    .5)
  return true
}

/**
 * Update our Pages.Mouse object
 *
 * @param {object} The mouseup event
 * @return true. Continue propagation.
 */
Pages.Mouse.onTouchEnd = function (event) {
  Pages.Mouse.isDown = false
  Pages.Mouse.xChange = event.pageX - Pages.Mouse.down.pageX
  Pages.Mouse.yChange = event.pageY - Pages.Mouse.down.pageY
  Pages.Mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(Pages.Mouse.xChange, 2) +
      Math.pow(Pages.Mouse.yChange, 2),
    .5)
  return true
}

/**
 * Update our Pages.Mouse object
 *
 * @param {object} The mousedown event
 * @return true. Continue propagation.
 */
Pages.Mouse.onTouchStart = function (event) {
  //  console.log('mouse down')
  Pages.Mouse.isDown = true
  Pages.Mouse.down = event
  Pages.Mouse.target = event.srcElement || event.originalTarget || event.target
  Pages.Mouse.lastX = event.pageX
  Pages.Mouse.lastY = event.pageY
  Pages.Mouse.pathDistance = 0
  return true
}

/**
 * Update our Pages.Mouse object
 *
 * @param {object} The move event
 * @return true. Continue propagation.
 */
Pages.Mouse.onTouchMove = function (event) {
  Pages.Mouse.move = event
//  console.log('mouse move')
  if (!Pages.Mouse.isDown)
    return true
  
  Pages.Mouse.pathDistance += Math.abs(event.pageX - Pages.Mouse.lastX) + Math.abs(event.pageY - Pages.Mouse.lastY)
  Pages.Mouse.lastX = event.pageX
  Pages.Mouse.lastY = event.pageY
  Pages.Mouse.xChange = event.pageX - Pages.Mouse.down.pageX
  Pages.Mouse.yChange = event.pageY - Pages.Mouse.down.pageY
  Pages.Mouse.distance = // a2 + b2 = c2 solving for c
    Math.pow(
      Math.pow(Pages.Mouse.xChange, 2) +
      Math.pow(Pages.Mouse.yChange, 2),
    .5)
  // todo: rotation
  return true
}

