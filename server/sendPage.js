function sendPage(req, res, name) {
  
  var scraps = nudgepad.site.get('pages ' + name)
  var page = new Page(scraps)
  var context = {}
  context.site = nudgepad.site
  context.request = req
  var options = {
    beautify : true
  }
  return res.send(page.toHtml(context, options))
}

