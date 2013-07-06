var Page = require('scraps'),
    _ = require('underscore')

var Blog = function (app) {
  
  
  var sortBlog = function () {
    var posts = app.Project.get('posts')
    if (!posts)
      return null

    posts.each(function (key, value) {
      value.set('permalink', key)
    })

    app.Project.sorted = _.sortBy(posts.values, function(value){ return -parseFloat(value.get('timestamp')) })
  }
  sortBlog()
  
  app.post('/nudgepad.blog.sort', function (req,res,next) {
    sortBlog()
    res.send('')
  })
  
  app.get('/feed.space', function (req, res, next) {
    res.set('Content-Type', 'text/plain')
    return res.send(app.Project.get('posts').toString())
  })

  app.get('*', function (req, res, next) {

    var permalink = req.params[0].substr(1)
    var post = app.Project.get('posts ' + permalink)
    if (!post)
      return next()

    var template = post.get('template')

    // We could easily cache this for speed if need be.
    var view = app.Project.get('pages ' + template)
    if (!view)
      return next()

    view = new Page(view)

    // Create a context for the page with pointers to the relevant objects
    // This should be fast and not resource intensive as we are just creating
    // pointers by reference. We could speed it up if its a bottleneck.
    var context = {}
    context.project = app.Project
    context.request = req
    context.post = post.values

    return res.send(view.toHtml(context))


  })
  
}


module.exports = Blog
