/**
 * @special Singleton
 */
Pages.images = {}

/**
 * given url(http://foobar.com/foob.png) returns foob.png
 *
 * @param {string} 
 * @return {string} 
 */
Pages.images.getFilename = function (url) {
  var file = Pages.images.parseBackgroundUrl(url).split(/\//)
  return file[file.length-1]
  
}

/**
 * @param {string} Image name to add
 * @param {bool} Whether to insert it via drag and drop.
 * @return {string} Scrap id
 */
Pages.images.insertImageScrap = function (filename, drag) {

  if (filename.match(/^url\(/))
    filename = Pages.images.parseBackgroundUrl(filename)
  
  // Easter Egg: allow swapping of images
  if (!drag && $('.selection').length > 0) {
    Pages.stage.selection.css('background-image url(' + filename + ')')
    Pages.stage.selection.css('background-repeat no-repeat')
    Pages.stage.selection.css('background-position center')
    return false
  }

  $('<img/>').attr("src", filename).load(function() {
     
    var space = new Space(
      "style" +
      "\n background-image " + 'url(' + filename + ')' +
      "\n background-repeat no-repeat" + 
      "\n background-color transparent" +
      "\n background-position center" +
      "\n background-size contain" +
      "\n width " + this.width + 'px' +
      "\n height " + this.height + 'px')
    var scraps = new Space().set('scrap', space)
    return Pages.stage.insert(scraps, drag)
  })
}

/**
 * Is it an image?
 *
 * @param {string}
 * @return {bool}
 */
Pages.images.isImage = function (filename) {
  return filename.match(/\.(png|jpg|jpeg|gif)$/i)
}

/**
 * given url(/foob.png) returns /foob.png
 *
 * @param {string} 
 * @return {string} 
 */
Pages.images.parseBackgroundUrl = function (url) {
  return url.split(/(\(|\))/).slice(2)[0]
}

/**
 * Downloads the latest list of images from server and stores
 * it in a property which is used to render the droppables.
 */
Pages.images.images = new Space()
Pages.images.updateList = function () {
  $.get('/nudgepad.explorer.public', {}, function (space) {
    var dropImageDiv = ''
    Pages.images.images = new Space(space)
    Pages.images.images.each(function (key, value) {
      if (Pages.images.isImage(key))
        dropImageDiv += '<div class="PagesImageThumbDrop">&nbsp;<img src="/'+ key +'">&nbsp;</div>'
    })

    $('#PagesImageDroppablesList').html(dropImageDiv)
    
  })
}


Pages.on('open', function () {
  // When an image is uploaded
  Project.on('uploadComplete', Pages.images.updateList)
  Project.on('file', Pages.images.updateList)
})
Pages.on('close', function () {
  // When an image is uploaded
  Project.off('uploadComplete', Pages.images.updateList)
  Project.off('file', Pages.images.updateList)
})

Pages.on('firstOpen', Pages.images.updateList)
