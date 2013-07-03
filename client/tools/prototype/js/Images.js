/**
 * @special Singleton
 */
Prototype.images = {}

/**
 * given url(http://foobar.com/foob.png) returns foob.png
 *
 * @param {string} 
 * @return {string} 
 */
Prototype.images.getFilename = function (url) {
  var file = Prototype.images.parseBackgroundUrl(url).split(/\//)
  return file[file.length-1]
  
}

/**
 * @param {string} Image name to add
 * @param {bool} Whether to insert it via drag and drop.
 * @return {string} Scrap id
 */
Prototype.images.insertImageScrap = function (filename, drag) {

  if (filename.match(/^url\(/))
    filename = Prototype.images.parseBackgroundUrl(filename)
  
  // Easter Egg: allow swapping of images
  if (!drag && $('.selection').length > 0) {
    Prototype.stage.selection.css('background-image url(' + filename + ')')
    Prototype.stage.selection.css('background-repeat no-repeat')
    Prototype.stage.selection.css('background-position center')
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
    return Prototype.stage.insert(scraps, drag)
  })
}

/**
 * Is it an image?
 *
 * @param {string}
 * @return {bool}
 */
Prototype.images.isImage = function (filename) {
  return filename.match(/\.(png|jpg|jpeg|gif)$/i)
}

/**
 * given url(/foob.png) returns /foob.png
 *
 * @param {string} 
 * @return {string} 
 */
Prototype.images.parseBackgroundUrl = function (url) {
  return url.split(/(\(|\))/).slice(2)[0]
}

/**
 * Downloads the latest list of images from server and stores
 * it in a property which is used to render the components.
 */
Prototype.images.images = new Space()
Prototype.images.updateList = function () {
  $.get('/nudgepad.explorer.public', {}, function (space) {
    var dropImageDiv = ''
    Prototype.images.images = new Space(space)
    Prototype.images.images.each(function (key, value) {
      if (Prototype.images.isImage(key))
        dropImageDiv += '<div class="PrototypeImageThumbDrop">&nbsp;<img src="/'+ key +'">&nbsp;</div>'
    })

    $('#PrototypeImagecomponentsList').html(dropImageDiv)
    
  })
}


Prototype.on('open', function () {
  // When an image is uploaded
  Project.on('uploadComplete', Prototype.images.updateList)
  Project.on('file', Prototype.images.updateList)
})
Prototype.on('close', function () {
  // When an image is uploaded
  Project.off('uploadComplete', Prototype.images.updateList)
  Project.off('file', Prototype.images.updateList)
})

Prototype.on('firstOpen', Prototype.images.updateList)
