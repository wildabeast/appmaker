/**
 * Sync the clients nudgepad.site with the server.
 *
 * @param {function}
 */
nudgepad.getSite = function (callback) {
  var activePage = store.get('activePage') || 'home'
  $.get('/nudgepad.site', { activePage : activePage }, function (space) {
    nudgepad.site = new Space(space)
    callback()
  })
}
