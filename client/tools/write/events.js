Write.on('close', function () {
  Project.off('change', Write.refresh)
})

Write.on('open', function () {
  Project.on('change', Write.refresh)
  Write.createTheme()
  Write.refresh()
})

