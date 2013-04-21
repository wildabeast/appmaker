site.use('/', function (req, res, next) {
  

  var page = nudgepad.site.get('pages').get('notFound')
  if (!page)
    return res.send('Not found', 404)
  
  page = new Page(page.values)
  return res.send(page.toHtml(), 404)
  
  
})
