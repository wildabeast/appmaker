Write.on('close', function () {
  Project.off('create', Write.refresh)
})

Write.on('open', function () {
  Project.on('create', Write.refresh)
  Write.refresh()
  Write.initialize()
})

Write.on('ready', function () {
  
  // Open the last edited post if there is one
  if (Write.activePost)
    Write.editPost(Write.activePost)
  else
    Write.createPost()
})
