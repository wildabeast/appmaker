var Write = new Tool('Write')
Write.set('color', 'rgba(237, 200, 17, 1)')
Write.set('description', 'Write and edit blog posts.')
Write.activePost = null

// Default theme
Write.blankTheme = new Space('title\n tag title\n content {{post.title Post Title}}\nstylesheet\n tag link\n rel stylesheet\n href project.css\ncontainer\n style\n  width 90%\n  max-width 800px\n  height 100%\n  margin 0 auto\n scraps\n  block1\n   style\n    height auto\n    font-family Open Sans\n    width auto\n    font-size 48px\n    font-weight normal\n    color #333\n    text-decoration none\n    font-style normal\n    padding 10px\n   content {{post.title Post Title}}\n  block14\n   style\n    height auto\n    font-family Open Sans\n    width auto\n    font-size 18px\n    font-weight normal\n    color #333\n    text-decoration none\n    font-style normal\n    padding 10px\n   content {{post.content Lorem ipsum foobar }}\n')

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
  // http://{{document.location.host}}/<a id="permalink" target="_blog"></a>
  $('#WritePermalink').text('http://' + document.location.host + '/' + name).attr('value', name)
  
  
  $('#WritePosts div').css('color', '#777')
  // todo: improve this
  $('#WritePosts div').each(function () {
    if ($(this).attr('value') == Write.activePost)
      $(this).css('color', '#333')  
  })
  
  $('#WriteContent').focus()
  
}

// Ensures project has a blog theme before posting
Write.initialize = function () {
  if (Project.get('pages blog'))
    return true
  Project.create('pages blog', Write.blankTheme.clone())
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

Write.refresh = function () {
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
  
  if (Project.get('posts ' + name))
    Project.set('posts ' + name, post)
  else
    Project.create('posts ' + name, post)
  
  // If they are editing a post and the name has changed,
  // make sure to delete old post
  // Todo: change this! Just make permalink editable.
  if (Write.activePost && Write.activePost !== name)
    Project.delete('posts ' + Write.activePost)
  
  Write.activePost = name
  
  // Open post in new tab
  window.open(name, 'published')
}

Write.updatePermalink = function () {
  var permalink = Write.permalink($('#WriteTitle').val())
  $('#WritePermalink').text('http://' + document.location.host + '/' + permalink).attr('value', permalink)
}


