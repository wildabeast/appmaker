/*
Pain: when multiple workers are editing same page, it hurts not to know what other workers
have selected
*/

nudgepad.on('workerSelection', function (selector) {
  var parts = selector.split(/ /)
  var page = parts.shift()
  var email = parts.shift()
  // If im not on the same page, i dont care.
  if (page != nudgepad.stage.activePage) return false
  $('#nudgepadWorkerSelectionStyles').html(parts.join(' '))
  // Add CSS that adds outline to that users selected scraps
  /*
  *
  * .scrap#scrap1,.scrap#scrap2 { box-shadow: 0 0 1px blue; }
  *
  *
  *
  */
})
