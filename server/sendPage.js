function sendPage(req, res, name) {
  
  var scraps = nudgepad.site.get('pages ' + name)
  var page = new Page(scraps)
  var context = {}
  context.nudgepad = {}
  context.nudgepad.site = nudgepad.site
  context.nudgepad.request = req
  

  return res.send(page.toHtml(context))
}

