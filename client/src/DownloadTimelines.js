nudgepad.downloadTimelines = function () {
  $.get('/nudgepad.site.timelines', {}, function (data) {
    var space = new Space(data)
    space.delete(nudgepad.stage.activePage) // We already have the open page
    nudgepad.site.get('timelines').patch(space)
  })
}
