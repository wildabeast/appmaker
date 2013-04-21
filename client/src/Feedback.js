nudgepad.feedback = {}

nudgepad.feedback.opted_in = false
nudgepad.feedback.session = {}
nudgepad.feedback.session.user_agent = navigator.userAgent
nudgepad.feedback.session.id = moment().format('MM.DD.YYYY_hh.mm.ssa')
nudgepad.feedback.session.start = new Date().getTime()
nudgepad.feedback.record = function (message) {
  var key = Permalink(message)
  nudgepad.feedback.session[key] = (nudgepad.feedback.session[key] ? parseFloat(nudgepad.feedback.session[key]) + 1 : 1)
  // todo: add GA
}
