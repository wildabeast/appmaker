var Write = new Tool('Write')
Write.color = 'rgba(237, 200, 17, 1)'
Write.description = 'Write and edit blog posts.'

// Default theme
Write.blankTheme = new Space({
 "title": {
  "tag": "title",
  "content": "{{post.title Post Title}}"
 },
 "stylesheet": {
  "tag": "link",
  "rel": "stylesheet",
  "href": "project.css"
 },
 "container": {
  "style": {
   "width": "90%",
   "max-width": "800px",
   "height": "100%",
   "margin": "0 auto"
  },
  "scraps": {
   "block1": {
    "style": {
     "height": "auto",
     "font-family": "Open Sans",
     "width": "auto",
     "font-size": "48px",
     "font-weight": "normal",
     "color": "#333",
     "text-decoration": "none",
     "font-style": "normal",
     "padding" : "10px"
    },
    "content": "{{post.title Post Title}}"
   },
   "block14": {
    "style": {
     "height": "auto",
     "font-family": "Open Sans",
     "width": "auto",
     "font-size": "18px",
     "font-weight": "normal",
     "color": "#333",
     "text-decoration": "none",
     "font-style": "normal",
     "padding": "10px"
    },
    "content": "{{post.content Lorem ipsum foobar }}"
   }
  }
 }
})

Write.createPost = function () {
  $('#WriteContent,#WriteTitle').val('')
  $('#WriteAdvanced').val('timestamp ' + new Date().getTime() + '\ntemplate blog')
  $('#WritePermalink').attr('value', '')
  $('#WriteTitle').focus()
  Write.activePost = null
}

Write.deletePost = function () {
  Write.activePost = null
  var name = Write.permalink($('#WritePermalink').attr('value'))
  if (!name)
    return Flasher.error('No post to delete')
  
  if (!Project.get('posts ' + name))
    return Flasher.error('Post does not exist')

  Project.delete('posts ' + name)
  
  Write.restart()
}

Write.editPost = function (name) {
  Write.activePost = name
  var post = Project.get('posts ' + name)
  $('#WriteContent').val(post.get('content'))
  $('#WriteTitle').val(post.get('title'))
  var postSettings = new Space(post.toString())
  postSettings.delete('title')
  postSettings.delete('content')
  $('#WriteAdvanced').val(postSettings.toString())
  // http://{{nudgepad.domain}}/<a id="permalink" target="_blog"></a>
  $('#WritePermalink').text('http://' + nudgepad.domain + '/' + name).attr('value', name)
  
  Write.updateLinks()
  
  $('#WriteContent').focus()
  
}

// Ensures site has a blog theme before posting
Write.initialize = function () {
  if (Project.get('pages blog'))
    return true
  Project.set('pages blog', Write.blankTheme.clone())
}

Write.activePost = null

Write.onopen = function () {
  Write.initialize()
  $('#WritePosts').html('')
  if (!Project.get('posts'))
    return true
  _.each(Project.get('posts').keys, function (name) {
    var value = Project.get('posts').get(name)
    var div = $('<div >' + value.get('title') + '</div>')
      .css({
      'color' : '#777',
      'margin-bottom' : '9px',
      'font-size' : '13px'
      })
      .on('click', function () {
        Write.editPost($(this).attr('value'))
      })
      .attr('value', name)
      .attr('title', name)
    $('#WritePosts').append(div)
  })
  
}

Write.onready = function () {
  
  // Open the last edited post if there is one
  if (Write.activePost)
    Write.editPost(Write.activePost)
  else
    Write.createPost()
}

/**
 * Make a string URL friendly. Turns "$foo Bar%!@$" into "foo-bar"
 *
 * @param {string}
 * @return {object}
 */
Write.permalink = function (string) {
  if (!string) return ''
  // strip non alphanumeric characters from string and lowercase it.
  return string.toLowerCase().replace(/[^a-z0-9- _\.]/gi, '').replace(/ /g, '-')
}

Write.savePost = function () {

  var name = Write.permalink($('#WritePermalink').attr('value'))
  
  if (!name)
    return Flasher.error('Title cannot be blank')

  mixpanel.track('I saved a blog post')
  var post = Project.get('posts ' + name)
  if (!post)
    post = new Space()

  post.set('content', $('#WriteContent').val())
  post.set('title', $('#WriteTitle').val())
  post.patch($('#WriteAdvanced').val())
  
  Project.set('posts ' + name, post)
  
  // If they are editing a post and the name has changed,
  // make sure to delete old post
  if (Write.activePost && Write.activePost !== name)
    Project.delete('posts ' + Write.activePost)
  
  Write.activePost = name
//  Write.updateLinks()
  Write.restart()
  // Open post in new tab
  window.open(name, 'published')
}

Write.updateLinks = function () {
  $('#WritePosts div').css('color', '#777')
  // todo: improve this
  $('#WritePosts div').each(function () {
    if ($(this).attr('value') == Write.activePost)
      $(this).css('color', '#333')  
  })
}

Write.updatePermalink = function () {
  var permalink = Write.permalink($('#WriteTitle').val())
  $('#WritePermalink').text('http://' + nudgepad.domain + '/' + permalink).attr('value', permalink)
}
