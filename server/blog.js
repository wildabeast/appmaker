var Page = require('scraps')

var Blog = function (app) {
  
  var nudgepad = app.nudgepad
  
  app.get('/feed.space', function (req, res, next) {
    res.set('Content-Type', 'text/plain')
    return res.send(nudgepad.site.get('posts').toString())
  })

  app.get('*', function (req, res, next) {

    var permalink = req.params[0].substr(1)
    var post = nudgepad.site.get('posts ' + permalink)
    if (!post)
      return next()

    var template = post.get('template')

    // We could easily cache this for speed if need be.
    var view = nudgepad.site.get('pages ' + template)
    if (!view)
      return next()

    view = new Page(view)

    // Create a context for the page with pointers to the relevant objects
    // This should be fast and not resource intensive as we are just creating
    // pointers by reference. We could speed it up if its a bottleneck.
    var context = {}
    context.site = nudgepad.site
    context.request = req
    context.post = post.values

    return res.send(view.toHtml(context))


  })
  
}


module.exports = Blog
