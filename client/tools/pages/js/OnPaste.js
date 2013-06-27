/**
 */
Pages.onpaste = function(event) {

  // Return true if maker is editing an input
  if ($('input:focus, div:focus, textarea:focus, a:focus').length)
    return true
  
  var pastedText = undefined
  
  if (event.clipboardData && event.clipboardData.getData)
    pastedText = event.clipboardData.getData('text/plain')
  
  var type = 'scraps'
  if (pastedText.match(/^\s*\</))
    type = 'html'
  
  if (type === 'scraps')
    Pages.pasteScraps(pastedText)
  
  else if (type === 'html')
    Pages.pasteScraps($.htmlToScraps(pastedText))
  
  else if (type === 'css')
    Pages.pasteCss(pastedText)
  
  // paste image
  
  /*
  var items = event.clipboardData.items
  console.log(JSON.stringify(items)) // will give you the mime types
  for (var i in items) {
    debugger
    var blob = items[0].getAsFile()
    var reader = new FileReader()
    reader.onload = function(event){
      console.log(event.target.result)
      if (Pages.isScraps(event.target.result))
        Pages.pasteScraps()
    }
    reader.readAsDataURL(blob)
  }
  */
  
  mixpanel.track('I pasted something')
}

Pages.pasteScraps = function(pastedText) {

  Pages.stage.insert(pastedText)
  Pages.stage.selection.save()
  Pages.stage.open(Pages.stage.activePage)
  Pages.stage.selection.restore()
}

