/**
 */
Design.onpaste = function(event) {

  // Return true if worker is editing an input
  if ($('input:focus, div:focus, textarea:focus, a:focus').length)
    return true
  
  var pastedText = undefined
  
  if (event.clipboardData && event.clipboardData.getData)
    pastedText = event.clipboardData.getData('text/plain')
  
  var type = 'scraps'
  if (pastedText.match(/^\s*\</))
    type = 'html'
  
  if (type === 'scraps')
    Design.pasteScraps(pastedText)
  
  else if (type === 'html')
    Design.pasteScraps($.htmlToScraps(pastedText))
  
  else if (type === 'css')
    Design.pasteCss(pastedText)
  
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
      if (Design.isScraps(event.target.result))
        Design.pasteScraps()
    }
    reader.readAsDataURL(blob)
  }
  */
  
  mixpanel.track('I pasted something')
}

Design.pasteScraps = function(pastedText) {

  Design.stage.insert(pastedText)
  Design.stage.selection.save()
  Design.stage.open(Design.stage.activePage)
  Design.stage.selection.restore()
}

