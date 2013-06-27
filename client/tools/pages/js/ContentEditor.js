Pages.contentEditor = {}

/**
 * Fires when a block being edited a blur occurs.
 */
Pages.contentEditor.onblur = function () {
  
  var scrap = $(this).scrap()
  scrap.set('content', $(this).html())

  // rebind the blocks
  $(this).off('tap mousedown slide slidestart hold slideend', Pages.contentEditor.killEvent)

  // remove the ability to edit & select text.
  $(this).removeAttr('contenteditable')

  // record the changes for undo/redo
  Pages.stage.commit()
  Pages.broadcastSelection()
}

/**
 * Focus and start editing the text of a block.
 *
 * @param {string} Scrap id
 * @param {bool} Whether to select all on focus
 */
Pages.contentEditor.focus = function (selector, selectAll) {
  
  
  // When focused, it's as if you have nothing selected. We're really going to do 
  // a patch instead
  Pages.stage.selection.clear()
  
  var element = $(selector)
  var scrap = element.scrap()  
  
  // If not suitable for contenteditable, pop prompt instead.
  if (!scrap.isContentEditable()) {
    
    var attr = 'content'
    var tag = scrap.values.tag
    
    if (tag && tag.match(/^(list)$/)) {
      Pages.stage.selection.clear()
      element.selectMe()
      Pages.stage.selection.editSource()
      return false
    }
    
    if (tag && tag.match(/^(textarea|input|password)$/))
      attr = 'placeholder'
    
    TextPrompt('Editing content for this block', scrap.values[attr], function (val) {
      scrap.values[attr] = val
      Pages.stage.commit()
      element.remove()
      $('#PagesStageBody').append(scrap.toHtml(null, true))
      element.selectMe()
    })
    return
  }
  
  Pages.broadcastSelection(scrap.selector())

  // set element to editable
  element.attr('contenteditable', 'true')
  
  // stop propagation (todo: perhaps we could use these to make some sweet events!)
  element.on('tap slide slidestart hold slideend', Pages.contentEditor.killEvent)
  
  // on blur, remove all this stuff.
  element.on('blur', Pages.contentEditor.onblur)
  
  // focus the element
  element.focus()
  
  // move the cursor to the end of the element
  MoveCursorToEnd(element[0])

  // Select all
  if (selectAll)
    document.execCommand('selectAll',false,null)
}

/**
 * Stop propagation and prevent default by returning false.
 *
 * we name this instead of using an anonymous function so we can then remove it from
 * the element its bound to.
 *
 * @param {object} event
 * @return false.
 */
Pages.contentEditor.killEvent = function (event) {
  // 
  Pages.Mouse.down.stopPropagation()
  return false
}


