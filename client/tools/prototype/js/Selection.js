/**
 * @special Singleton
 */

Prototype.stage.selection.saved = []

Prototype.stage.selection.alignLeft = function () {
  var edge
  $('.selection').each(function () {
    if (!edge || $(this).position().left < edge)
      edge = $(this).position().left
  })
  Prototype.stage.selection.css('left ' + edge + 'px')
}

Prototype.stage.selection.alignRight = function () {
  var edge
  $('.selection').each(function () {
    if (!edge || $(this).position().left > edge)
      edge = $(this).position().left
  })
  Prototype.stage.selection.css('left ' + edge + 'px')
}

Prototype.stage.selection.alignTop = function () {
  var edge
  $('.selection').each(function () {
    if (!edge || $(this).position().top < edge)
      edge = $(this).position().top
  })
  Prototype.stage.selection.css('top ' + edge + 'px')
}

Prototype.stage.selection.alignBottom = function () {
  var edge
  $('.selection').each(function () {
    if (!edge || $(this).position().top > edge)
      edge = $(this).position().top
  })
  Prototype.stage.selection.css('top ' + edge + 'px')
}

/**
 * Change the box shadow of selected blocks.
 *
 * @param {number}
 */
Prototype.stage.selection.boxShadow = function (blur) {
  $('.selection').each(function () {
    var scrap = $(this).scrap()
    if(blur < 1){
      scrap.set('style box-shadow', 'none')
      $(this).css( 'box-shadow', 'none')
    }
    else{
      scrap.set('style box-shadow', '0px 1px ' + blur + 'px' + ' #888')
      $(this).css( 'box-shadow', '0px 1px ' + blur + 'px' + ' #888')
    }
  })
}

Prototype.stage.selection.capture = function () {
  Prototype.stage.selection.captured = Prototype.stage.selection.toSpace()
}


/**
 * Deselect all blocks
 */
Prototype.stage.selection.clear = function () {
  if (!$('.selection').length)
    return true
  $('.selection').each(function () {
    $(this).deselect(true)
  })
  Prototype.trigger('selection')
}

/**
 * Execute a CSS command against the selected blocks such as color red.
 * Commits the change.
 *
 * @param {string}
 */
Prototype.stage.selection.css = function (command) {
  Prototype.stage.selection.cssPreview(command)
  Prototype.stage.commit()
  $('.handle').trigger('update')
}

/**
 * Execute a CSS command against the selected blocks such as color red
 *
 * @param {string}
 */
Prototype.stage.selection.cssPreview = function (command) {
  if (!command)
    return false
  command = new Space(command)
  // command like: background blue

//  command = command.split(/ /)
//  var property = command.shift()
//  var value = command.join(' ')
  $('.selection').each(function () {
    var style = $(this).scrap().get('style')
    if (!style) {
      $(this).scrap().set('style', new Space())
      style = $(this).scrap().get('style')
    }
    style.patch(command)
    $(this).css(command.values)
  })
}

Prototype.stage.selection.cssPrompt = function () {
  var val = prompt('Enter a CSS command like font-family Arial', '')
  if (val)
    Prototype.stage.selection.css(val)
}

/**
 * Delete the selected blocks
 */
Prototype.stage.selection.delete = function () {
  $('.selection').each(function () {
    // order probably matters here
    // should we move deselect and select to jquery level? i think we probably should
    var scrap = $(this).scrap()
    $(this).deselect(true).remove()
    if (scrap)
      Prototype.page.delete(scrap.getPath())
  })
}

Prototype.stage.selection.distributeVertical = function () {
  
  var elements = _.sortBy($('.selection'), function(element){ return $(element).position().top })
  
  // calculate total whitespace.
  var whitespace = 0
  var count = 0
  _.each(elements, function (element, index, list) {
    if (index === 0)
      return true
    var last = list[index - 1]
    var id = $(element).attr('id')
    // The space betweein
    whitespace += $(element).position().top - ($(last).position().top + $(last).outerHeight())
    count++
  })
  var theSpaceBetween = Math.floor(whitespace/count)
  if (theSpaceBetween < 0) theSpaceBetween = 0
  
  _.each(elements, function (element, index, list) {
    if (index === 0)
      return true
    var last = list[index - 1]
    var scrap = $(element).scrap()
    scrap.set('style top', (($(last).position().top + $(last).outerHeight()) + theSpaceBetween) + 'px')
    $(element).css('top', scrap.get('style top'))
  })
  $('.handle').trigger('update')
  Prototype.stage.commit()
}

Prototype.stage.selection.distributeHorizontal = function () {
  // this function is currently 3N ish. But that should be fine. But we
  // could clearly make it faster if it feels slow.
  
  var elements = _.sortBy($('.selection'), function(element){ return $(element).position().left })
  
  // calculate total whitespace.
  var whitespace = 0
  var count = 0
  _.each(elements, function (element, index, list) {
    if (index === 0)
      return true
    var last = list[index - 1]
    var id = $(element).attr('id')
    // The space betweein
    whitespace += $(element).position().left - ($(last).position().left + $(last).outerWidth())
    count++
  })
  var theSpaceBetween = Math.floor(whitespace/count)
  if (theSpaceBetween < 0) theSpaceBetween = 0
  
  _.each(elements, function (element, index, list) {
    if (index === 0)
      return true
    var last = list[index - 1]
    var scrap = $(element).scrap()
    scrap.set('style left', ($(last).position().left + $(last).outerWidth() + theSpaceBetween) + 'px')
    $(element).css('left', scrap.get('style left'))
  })
  $('.handle').trigger('update')
  Prototype.stage.commit()
  Flasher.success('Distributed', 1000)
}

/**
 * Duplicate the selected blocks. Offset them to the right.
 */
Prototype.stage.selection.duplicate = function () {
  $('.selection').each(function () {
    $(this).duplicate()
  })
  Prototype.stage.commit()
//  return Prototype.stage.insert(Prototype.stage.selection.toSpace(), false, 10, 10, false)
}

Prototype.stage.selection.editLoop = function () {
  
  var property = prompt('What property do you want to edit?')
  if (!property)
    return false
  
  var todo = $('.selection').length
  $('.selection').each(function (index) {
    
    var scrap = $(this).scrap()
    $(this).addClass('PrototypeHighlightedScrap')
    // If its offscreen, scroll to bring it fully on screen.
    $(this).scrollMinimal()
    var value = scrap.get(property)
  
    var newValue = prompt('Set ' + property + ' of ' + id + ' to', value)
    
    
    if (!newValue) {
      return true
    }
    
    // If they didnt change name continue
    if (newValue == value) {
      $(this).removeClass('PrototypeHighlightedScrap')
      return true
    } 
    $(this).removeClass('PrototypeHighlightedScrap')
    
    scrap.set(property, newValue)
    scrap.render()
    
  })
  Prototype.stage.commit()
}

Prototype.stage.selection.editProperty = function () {
  
  var scrap = $('.selection').scrap()
  
  var prop = prompt('What property do you want to edit?', '')
  if (!prop)
    return false
  
  var value = scrap.get(prop)
  TextPrompt('Enter new value...', value.toString(), function (val) {
      scrap.set(prop, val)
      Prototype.stage.commit()
      Prototype.stage.open(Prototype.stage.activePage)
  })
}

/**
 * Advances position_index, advanced position.
 */
Prototype.stage.selection.editSource = function () {
  Prototype.stage.selection.capture()
  Prototype.stage.selection.save()
  TextPrompt('Enter code...', Prototype.stage.selection.captured.toString(), Prototype.stage.selection.modify)
}

/**
 * Return boolean
 */
Prototype.stage.selection.exists = function () {
  return $('.selection').length
}

Prototype.stage.selection.modify = function (val) {
  var space = new Space(val)
  Prototype.page.patch(Prototype.stage.selection.captured.diff(space))
  Prototype.stage.commit()
  Prototype.stage.open(Prototype.stage.activePage)
  Prototype.stage.selection.restore()
}

/**
 * Move the selected blocks.
 *
 * @param {number} Number of pixels to move x (positive is right)
 * @param {number} Number of pixels to move y (positive is down)
 */
Prototype.stage.selection.move = function (x, y) {
  
  if (!$('.selection').length)
    return false
  
  $('.selection').each(function () {
    $(this).scrap().move(x, y)
  })
  
  // Show dimensions
  var el = $($('.selection')[0])
  var position = 'X ' + parseFloat(el.css('left')) + '<br>Y ' + parseFloat(el.css('top'))
  $('#PrototypeDimensions').css({
    left : 10 + el.offset().left + el.outerWidth(),
    top : -10 + el.offset().top + Math.round(el.outerHeight()/2)
    }).html(position)
  Popup.open('#PrototypeDimensions')
  
  $('.handle').trigger("update")
  Prototype.stage.commit()
}

Prototype.stage.selection.nest = function (path) {
  var parent = Prototype.page.get(path)
  if (!parent)
    return false
  if (!parent.get('scraps'))
    parent.set('scraps', new Space())
  parent = parent.get('scraps')
  var patch = Prototype.stage.selection.toSpace()
  Prototype.stage.selection.delete()
  
  // update the patch so there is no overwriting
  patch.each(function (key, value) {
    if (parent.get(key)) {
      this.rename(key, Prototype.autokey(parent, key))
    }
  })
  
  parent.patch(patch)
  Prototype.stage.commit()
  Prototype.stage.open(Prototype.stage.activePage)
}

/**
 * Apply a patch to all selected scraps
 *
 * @param {Space} The patch
 */
Prototype.stage.selection.patch = function (space) {

  if (typeof space === 'string')
    space = new Space(space)

  $('.selection').each(function () {
    var scrap = $(this).scrap()
    $(this).deselect()
    scrap.patch(space)
    $(this).replaceWith(scrap.toHtml())
    scrap.element().selectMe()
  })
  Prototype.stage.commit()
}

Prototype.stage.selection.patchPrompt = function () {
  var val = prompt('Enter a patch like content hi', '')
  if (val)
    Prototype.stage.selection.patch(val)
}

Prototype.stage.selection.renameScraps = function () {
  var todo = $('.selection').length
  $('.selection').each(function (index) {
    var scrap = $(this).scrap()
    $(this).addClass('PrototypeHighlightedScrap')
    
    // If its offscreen, scroll to bring it fully on screen.
    $(this).scrollMinimal()
    
    var newId = prompt('Renaming block ' + (index + 1) + '/' + todo + '. Enter a new ID', scrap.id)
    
    // If they didnt change name continue
    if (newId == scrap.id) {
      $(this).removeClass('PrototypeHighlightedScrap')
      return true
    }
      
    
    if (!newId) {
      return true
    }
    
    var newScrap = new Scrap(newId, scrap.toString())
    Prototype.page.set(newId, newScrap)
    
    $(this).deselect().remove()
    Prototype.page.delete(scrap.getPath())
    
    
    newScrap.render()
    newScrap.element().selectMe()
    
  })
  Prototype.stage.commit()
}

/**
 * Restore the saved selection
 */
Prototype.stage.selection.restore = function () {
  for (var i in Prototype.stage.selection.saved) {
    var selector = Prototype.stage.selection.saved[i]
    if ($(selector).length)
      $(selector).selectMe(true)
  }
  Prototype.trigger('selection')
}

/**
 * Save the current selection
 */
Prototype.stage.selection.save = function () {
  Prototype.stage.selection.saved = []
  $('.selection').each(function () {
    Prototype.stage.selection.saved.push($(this).scrap().selector())
  })
}

/**
 * Get all selected blocks as a Space.
 *
 * @return {string}
 */
Prototype.stage.selection.toSpace = function () {
  var space = new Space()
  $('.selection').each(function () {
    var scrap = $(this).scrap()
    space.set(scrap.getPath(), new Space(scrap.toString()))
  })
  return space
}

Prototype.broadcastSelection = function (extra) {
  var selection = extra || ''
  var first = ''
  $('.selection').each(function () {
    if ($(this).scrap()) {
      selection += first + $(this).scrap().selector()
      first = ','
    }
  })
  selection += '{box-shadow: 0 0 4px ' + Screen.get('color') + ';cursor: not-allowed;}'
  Screen.set('selection', selection)
}

Prototype.updateSelections = function () {
  $('#PrototypeRemoteSelections').html('')
  
  Screens.each(function (key, value) {
    if (value.get('tool') !== 'Prototype')
      return true
    if (value.get('id') === Screen.get('id'))
      return true
    // check if its this screen. todo.
    // if this screen
    // return true
    if (value.get('page') !== Prototype.stage.activePage)
      return true
    var style = value.get('selection')
    if (style)
      $('#PrototypeRemoteSelections').append(style)
  })
}




