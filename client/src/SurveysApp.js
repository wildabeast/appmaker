nudgepad.apps.surveys = new App('surveys')

nudgepad.apps.surveys.entries = new Space()
nudgepad.apps.surveys.download = function () {


  $.get('/nudgepad.surveys', function (data) {
    nudgepad.apps.surveys.entries = new Space(data)
    
    if (nudgepad.apps.surveys.isOpen()) {
      nudgepad.apps.surveys.onready()
    }
    
  })
  
}

nudgepad.apps.surveys.onmain = nudgepad.apps.surveys.download

nudgepad.apps.surveys.onopen = nudgepad.apps.surveys.download

nudgepad.apps.surveys.onready = function () {
  $('.nudgepad#entriesCount').text(nudgepad.apps.surveys.entries.keys.length)
  $('.nudgepad#entries').text(nudgepad.apps.surveys.entries.toString())
  $('.nudgepad#entries span').each(function () {
    $(this).text(moment(parseInt($(this).text())).fromNow());
  })
}


nudgepad.on('main', nudgepad.apps.surveys.download)


