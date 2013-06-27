/**
 * @special Singleton
 */

Pages.stage.selection.saved = []

Pages.stage.selection.alignLeft = function () {
  var edge
  $('.selection').each(function () {
    if (!edge || $(this).position().left < edge)
      edge = $(this).position().left
  })
  Pages.stage.selection.css('left ' + edge + 'px')
}

Pages.stage.selection.alignRight = function () {
  var edge
  $('.selection').each(function () {
    if (!edge || $(this).position().left > edge)
      edge = $(this).position().left
  })
  Pages.stage.selection.css('left ' + edge + 'px')
}

Pages.stage.selection.alignTop = function () {
  var edge
  $('.selection').each(function () {
    if (!edge || $(this).position().top < edge)
      edge = $(this).position().top
  })
  Pages.stage.selection.css('top ' + edge + 'px')
}

Pages.stage.selection.alignBottom = function () {
  var edge
  $('.selection').each(function () {
    if (!edge || $(this).position().top > edge)
      edge = $(this).position().top
  })
  Pages.stage.selection.css('top ' + edge + 'px')
}

/**
 * Change the box shadow of selected blocks.
 *
 * @param {number}
 */
Pages.stage.selection.boxShadow = function (blur) {
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

Pages.stage.selection.capture = function () {
  Pages.stage.selection.captured = Pages.stage.selection.toSpace()
}


/**
 * Deselect all blocks
 */
Pages.stage.selection.clear = function () {
  $('.selection').each(function () {
    $(this).deselect()
  })
  
}

/**
 * Execute a CSS command against the selected blocks such as color red.
 * Commits the change.
 *
 * @param {string}
 */
Pages.stage.selection.css = function (command) {
  Pages.stage.selection.cssPreview(command)
  Pages.stage.commit()
  $('.handle').trigger('update')
}

/**
 * Execute a CSS command against the selected blocks such as color red
 *
 * @param {string}
 */
Pages.stage.selection.cssPreview = function (command) {
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

Pages.stage.selection.cssPrompt = function () {
  var val = prompt('Enter a CSS command like font-family Arial', '')
  if (val)
    Pages.stage.selection.css(val)
}

/**
 * Delete the selected blocks
 */
Pages.stage.selection.delete = function () {
  $('.selection').each(function () {
    // order probably matters here
    // should we move deselect and select to jquery level? i think we probably should
    var scrap = $(this).scrap()
    $(this).deselect().remove()
    if (scrap)
      Pages.page.delete(scrap.getPath())
  })
}

Pages.stage.selection.distributeVertical = function () {
  
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
  Pages.stage.commit()
}

Pages.stage.selection.distributeHorizontal = function () {
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
  Pages.stage.commit()
  Flasher.success('Distributed', 1000)
}

/**
 * Duplicate the selected blocks. Offset them to the right.
 */
Pages.stage.selection.duplicate = function () {
  $('.selection').each(function () {
    $(this).duplicate()
  })
  Pages.stage.commit()
//  return Pages.stage.insert(Pages.stage.selection.toSpace(), false, 10, 10, false)
}

Pages.stage.selection.editLoop = function () {
  
  var property = prompt('What property do you want to edit?')
  if (!property)
    return false
  
  var todo = $('.selection').length
  $('.selection').each(function (index) {
    
    var scrap = $(this).scrap()
    $(this).addClass('PagesHighlightedScrap')
    // If its offscreen, scroll to bring it fully on screen.
    $(this).scrollMinimal()
    var value = scrap.get(property)
  
    var newValue = prompt('Set ' + property + ' of ' + id + ' to', value)
    
    
    if (!newValue) {
      return true
    }
    
    // If they didnt change name continue
    if (newValue == value) {
      $(this).removeClass('PagesHighlightedScrap')
      return true
    } 
    $(this).removeClass('PagesHighlightedScrap')
    
    scrap.set(property, newValue)
    scrap.render()
    
  })
  Pages.stage.commit()
}

Pages.stage.selection.editProperty = function () {
  
  var scrap = $('.selection').scrap()
  
  var prop = prompt('What property do you want to edit?', '')
  if (!prop)
    return false
  
  var value = scrap.get(prop)
  TextPrompt('Enter new value...', value.toString(), function (val) {
      scrap.set(prop, val)
      Pages.stage.commit()
      Pages.stage.open(Pages.stage.activePage)
  })
}

/**
 * Advances position_index, advanced position.
 */
Pages.stage.selection.editSource = function () {
  Pages.stage.selection.capture()
  Pages.stage.selection.save()
  TextPrompt('Enter code...', Pages.stage.selection.captured.toString(), Pages.stage.selection.modify)
}

/**
 * Return boolean
 */
Pages.stage.selection.exists = function () {
  return $('.selection').length
}

Pages.stage.selection.modify = function (val) {
  var space = new Space(val)
  Pages.page.patch(Pages.stage.selection.captured.diff(space))
  Pages.stage.commit()
  Pages.stage.open(Pages.stage.activePage)
  Pages.stage.selection.restore()
}

/**
 * Move the selected blocks.
 *
 * @param {number} Number of pixels to move x (positive is right)
 * @param {number} Number of pixels to move y (positive is down)
 */
Pages.stage.selection.move = function (x, y) {
  
  if (!$('.selection').length)
    return false
  
  $('.selection').each(function () {
    $(this).scrap().move(x, y)
  })
  
  // Show dimensions
  var el = $($('.selection')[0])
  var position = 'X ' + parseFloat(el.css('left')) + '<br>Y ' + parseFloat(el.css('top'))
  $('#PagesDimensions').css({
    left : 10 + el.offset().left + el.outerWidth(),
    top : -10 + el.offset().top + Math.round(el.outerHeight()/2)
    }).html(position)
  Popup.open('#PagesDimensions')
  
  $('.handle').trigger("update")
  Pages.stage.commit()
}

Pages.stage.selection.nest = function (path) {
  var parent = Pages.page.get(path)
  if (!parent)
    return false
  if (!parent.get('scraps'))
    parent.set('scraps', new Space())
  parent = parent.get('scraps')
  var patch = Pages.stage.selection.toSpace()
  Pages.stage.selection.delete()
  
  // update the patch so there is no overwriting
  patch.each(function (key, value) {
    if (parent.get(key)) {
      this.rename(key, parent.autokey(key))
    }
  })
  
  parent.patch(patch)
  Pages.stage.commit()
  Pages.stage.open(Pages.stage.activePage)
}

/**
 * Apply a patch to all selected scraps
 *
 * @param {Space} The patch
 */
Pages.stage.selection.patch = function (space) {

  if (typeof space === 'string')
    space = new Space(space)

  $('.selection').each(function () {
    var scrap = $(this).scrap()
    $(this).deselect()
    scrap.patch(space)
    $(this).replaceWith(scrap.toHtml())
    scrap.element().selectMe()
  })
  Pages.stage.commit()
}

Pages.stage.selection.patchPrompt = function () {
  var val = prompt('Enter a patch like content hi', '')
  if (val)
    Pages.stage.selection.patch(val)
}

Pages.stage.selection.renameScraps = function () {
  var todo = $('.selection').length
  $('.selection').each(function (index) {
    var scrap = $(this).scrap()
    $(this).addClass('PagesHighlightedScrap')
    
    // If its offscreen, scroll to bring it fully on screen.
    $(this).scrollMinimal()
    
    var newId = prompt('Renaming block ' + (index + 1) + '/' + todo + '. Enter a new ID', scrap.id)
    
    // If they didnt change name continue
    if (newId == scrap.id) {
      $(this).removeClass('PagesHighlightedScrap')
      return true
    }
      
    
    if (!newId) {
      return true
    }
    
    var newScrap = new Scrap(newId, scrap.toString())
    Pages.page.set(newId, newScrap)
    
    $(this).deselect().remove()
    Pages.page.delete(scrap.getPath())
    
    
    newScrap.render()
    newScrap.element().selectMe()
    
  })
  Pages.stage.commit()
}

/**
 * Restore the saved selection
 */
Pages.stage.selection.restore = function () {
  for (var i in Pages.stage.selection.saved) {
    var selector = Pages.stage.selection.saved[i]
    if ($(selector).length)
      $(selector).selectMe()
  }
}

/**
 * Save the current selection
 */
Pages.stage.selection.save = function () {
  Pages.stage.selection.saved = []
  $('.selection').each(function () {
    Pages.stage.selection.saved.push($(this).scrap().selector())
  })
}

/**
 * Get all selected blocks as a Space.
 *
 * @return {string}
 */
Pages.stage.selection.toSpace = function () {
  var space = new Space()
  $('.selection').each(function () {
    var scrap = $(this).scrap()
    space.set(scrap.getPath(), new Space(scrap.toString()))
  })
  return space
}

Pages.broadcastSelection = function (extra) {
  var selection = extra || ''
  var first = ''
  $('.selection').each(function () {
    if ($(this).scrap()) {
      selection += first + $(this).scrap().selector()
      first = ','
    }
  })
  selection += '{box-shadow: 0 0 4px ' + Screen.get('color') + ';cursor: not-allowed;}'
  Screen.patch('selection ' + selection)
}

Pages.updateSelections = function () {
  $('#PagesRemoteSelections').html('')
  Room.each(function (key, value) {
    // check if its this screen. todo.
    // if this screen
    // return true
    if (value.get('page') !== Pages.stage.activePage)
      return true
    var style = value.get('selection')
    if (style)
      $('#PagesRemoteSelections').append(style)
  })
}




