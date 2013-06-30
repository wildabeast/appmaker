Blog.on('close', function () {
  Project.off('change', Blog.refresh)
})

Blog.on('open', function () {
  Project.on('change', Blog.refresh)
  Blog.createTheme()
  Blog.refresh()
})

