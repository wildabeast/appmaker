/**
 * Handles incoming patches to project
 *
 * @param {Space}
 */
nudgepad.on('patch', function (patch) {
  
  patch = new Space(patch)
  Project._patch(patch)
  Flasher.activity('Change received', 1000)
})



