var pageOptions = {
  beautify : true
}

function sendPage(req, res, name) {
  
  var scraps = nudgepad.site.get('pages ' + name)
  var page = new Page(scraps)
  var context = {}
  context.site = nudgepad.site
  context.request = req
  return res.send(page.toHtml(context, pageOptions))
}

