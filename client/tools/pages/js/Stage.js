
/**
 * The Stage holds the current open page.
 * We do a frame so the ribbon doesnt overlap the work area.
 * Its not actually a frame though, just a div with scroll.
 */
Pages.stage.version = 0 // how many steps in we are
Pages.stage.percentElapsed = 100
Pages.stage.currentView = 'ipad'

/**
 * Open the previous page
 */
Pages.stage.back = function () {
  Pages.stage.open(Project.get('pages').prev(Pages.stage.activePage))
}

Pages.stage.close = function () {
  $('#PagesStageHead').html('')
  $('#PagesRemoteSelections').html('')
  $(".scrap,#body").remove()
}

/**
 * Generates a Space of the change and posts it to the server.
 *
 * @return {string} todo: why return a string?
 */
Pages.stage.commit = function () {
  
  var timestamp = new Date().getTime()
  
  // You are always committing against the edge.
  var diff = Pages.edge.diff(Pages.page)
  var diffOrder = Pages.edge.diffOrder(Pages.page)

  if (diff.isEmpty() && diffOrder.isEmpty()) {
    console.log('no change')
    return false
  }
  var commit = new Space()
  commit.set('author', Cookie.email)
  if (!diff.isEmpty())
    commit.set('values', new Space(diff.toString()))
  if (!diffOrder.isEmpty())
    commit.set('order', new Space(diffOrder.toString()))

  Pages.stage.timeline.set(timestamp, commit)
  Pages.edge = new Space(Pages.page.toString())
  
  // A commit always advances the position index to the edge.
  Pages.stage.version = Pages.stage.timeline.keys.length
  
  Pages.stage.updateTimeline()
  
  Pages.trigger('selection')
  Pages.trigger('commit')
  
  Project.set('pages ' + Pages.stage.activePage, new Space(Pages.page.toString()))
  Project.append('timelines ' + Pages.stage.activePage + ' ' + timestamp, 'timelines ' + Pages.stage.activePage, commit)
  return diff
}

Pages.stage.dragAndDrop = function (scrap) {
  
  if (typeof scrap === 'string')
    scrap = new Space(scrap)
  
  var halfWidth = 0
  var halfHeight = 0
  var height = scrap.get('head style html height')
  var width = scrap.get('head style html height')
  if (!height || !width) {
    var dimensions = Pages.getPageDimensions(scrap)
    // temp fix for sticky
    if (isNaN(dimensions.width)) {
      dimensions.width = 140
      dimensions.height = 100
    }
    width = dimensions.width
    height = dimensions.height
  }
  width = parseFloat(width)
  height = parseFloat(height)
  var halfWidth = Math.round(width/2)
  var halfHeight = Math.round(height/2)

  var pageLeft = $('#PagesStageBody').offset().left
  var bodyScroll = $('#PagesStage').scrollTop()
  
  var left = Pages.Mouse.move.pageX - pageLeft - halfWidth
  var y = Pages.Mouse.move.pageY - halfHeight + bodyScroll

  Pages.stage.insert(scrap, true, left, y)
}

/**
 * Advances position_index, advanced position.
 */
Pages.stage.editSource = function () {
  TextPrompt('Enter code...', Pages.page.toString(), function (val) {
    Pages.page = new Space(val)
    Pages.stage.commit()
    Pages.stage.open(Pages.stage.activePage)
  })
}

/**
 * Deletes all scraps from the page and DOM.
 */
Pages.stage.erase = function () {
  Pages.stage.selectAll()
  Pages.stage.selection.delete()
  Pages.stage.commit()
}

Pages.stage.expand = function () {
  // Absolute positioned elements won't expand the container(it seems
  // that way anyway, maybe theres a better way to do it via css), so we need
  // to do it manually.
  var max = 700
  $('.scrap').each(function () {
    var bottom = $(this).position().top + $(this).outerHeight()
    if (bottom > max)
      max = bottom
  })

  $('#PagesStageBody').css({
    'height' : max + 'px'
  })

}

/**
 * Open the next page
 */
Pages.stage.forward = function () {
  Pages.stage.open(Project.get('pages').next(Pages.stage.activePage))
}

Pages.stage.goto = function (version) {
  Pages.stage.selection.save()
  Pages.stage.selection.clear()
  if (version < 0)
    return false
  if (version > Pages.stage.timeline.keys.length)
    return false
  
  // If we are going back in time, start from 0
  if (Pages.stage.version > version) {
    Pages.page = new Page()
    Pages.stage.version = 0
  }
  for (var i = Pages.stage.version; i < version; i++) {
    var timestamp = Pages.stage.timeline.keys[i]
    var patch = Pages.stage.timeline.values[timestamp].values.values
    var orderPatch = Pages.stage.timeline.values[timestamp].values.order
    if (patch)
      Pages.page.patch(patch.toString())
    if (orderPatch)
      Pages.page.patchOrder(orderPatch.toString())
    Pages.stage.version++
  }
  // Todo: fire an event and have timeline subscribe to that event.
  Pages.stage.updateTimeline()
  Pages.stage.render()
  Pages.stage.selection.restore()
  Pages.trigger('stage')
}

Pages.stage.height = function () {
  return $(window).height() - $('#PagesBar').outerHeight()
}

Pages.stage.insertBody = function () {
  if (!Pages.page.get('body')) {
    Pages.page.set('body', new Scrap('body', 'tag body\nscraps\n'))
    Pages.page.get('body').render()
  }
  if (!Pages.page.get('body scraps'))
    Pages.page.set('body scraps', new Space())
//    Pages.page.set('body scraps', new Space())
//    level = Pages.page.get('body scraps')
}

/**
 * Creates new scraps, commits them and adds them to DOM.
 *
 * @param {Space}  An optional space to initialize the scrap with.
 * @return {string} IDs of the new scraps
 */
Pages.stage.insert = function (space, drag, xMove, yMove, center) {
  
  if (!space)
    space = 'scrap\n content Hello world\n style\n  position absolute\n  top 10px\n  left 10px'
    
  // temporary fix for the revised scraps
  var patch = new Space(space.toString())
  Pages.stage.selection.clear()
  
  Pages.stage.insertBody()
  var level = Pages.page.get('body scraps')
  
  
  // update the patch so there is no overwriting
  patch.each(function (key, value) {
    if (level.get(key)) {
      this.rename(key, Pages.autokey(level, key))
    }
  })
  // now merge stage
  level.patch(patch)
  var selectors = []
  patch.each(function (key, value) {
    level.values[key] = new Scrap('body ' + key, value)
    var element = level.values[key].render().element()
    // Some elemeents arenet seleectable (titles, for example)
    if (element.length) {
      element.selectMe()
      selectors.push(level.values[key].selector())
    }
  })
  
  if (center) {
    var selection_dimensions = $('.selection').dimensions()
    xMove = Math.round(($('#PagesStageBody').width() / 2) - selection_dimensions.width/2)
    yMove = Math.round(Pages.stage.scrollTop() + ($(window).height() / 2) - selection_dimensions.height/2)
  }
  
  if (xMove || yMove) {
    $('.selection').each(function () {
      $(this).scrap().move(xMove, yMove)
    })
  }
  
  $('.handle').trigger('update')
  
  if (drag) {
    var name = $('.selection').attr('id')
    // Pretend the mousedown was on the move handle
    Events.slide.target = $("#move_handle_" + name)
    $("#move_handle_" + name).triggerHandler("mousedown")
    $("#move_handle_" + name).triggerHandler("slidestart")
    
    
    $('.selection').each(function () {
      var subject = $(this)
      var ghost = subject.clone()
      var opacity = subject.css('opacity')
      var scrap = $(this).scrap()
      subject.css('opacity', '0.01')
      ghost.attr('id', 'nudgepad_move_ghost').removeClass('scrap selection')
      ghost.on('mousedown', function () {subject.remove()})
      // space.style
      ghost.css('font-family', $('#PagesStageBody').css('font-family'))
      if (scrap.values.style)
        ghost.css(scrap.values.style.values)
      ghost.css({
        'z-index' : '600',
        'position' : 'fixed',
        'top' : subject.offset().top,
        'left' : subject.offset().left
      })
      $("#move_handle_" + name).on("slide", function (event) {
        ghost.css({
          'top' : subject.offset().top,
          'left' : subject.offset().left
        })
      })
      $("#move_handle_" + name).on("slideend", function (event) {
        subject.css('opacity', opacity)
        ghost.remove()
      })
      $('body').append(ghost)
      
    })
    
    
  } else {
    Pages.stage.commit()  
  }
  
  return selectors
}

/**
 * Is the head behind edge?
 * @returns {bool}
 */
Pages.stage.isBehind = function () {
  return (Pages.stage.version < Pages.stage.timeline.keys.length)
}

/**
 * @param {string} Name of page
 */
Pages.stage.open = function (name) {
  
  var page = Project.get('pages ' + name)
  if (!page)
    return Flasher.error('Page ' + name + ' not found')

  Pages.stage.selection.clear()
  
  // Page change stuff
  Pages.stage.activePage = name
  store.set('activePage', Pages.stage.activePage)
  Screen.set('page', Pages.stage.activePage)
  
  Pages.stage.reload()
  Pages.stage.render()
  Pages.stage.updateTimeline()
  
  Pages.trigger('page')
  Pages.trigger('selection')
  Pages.trigger('ready')
  return ''
  
}

Pages.stage.redo = function () {
  Pages.stage.goto(Pages.stage.version + 1)
}

/**
 * Refresh the stage.
 */
Pages.stage.render = function () {
  Pages.stage.close()
  Pages.page.loadScraps()
  Pages.page.render()
  Pages.grid.create()
  Pages.updateSelections()
}

Pages.stage.reload = function () {
  var name = Pages.stage.activePage
  var page = Project.get('pages ' + name)
  Pages.edge = page
  Pages.page = new Page(page.toString())
  
  // if no timeline, create a blank one
  // todo: think harder about what the hell this will do
  // If no timeline, but yes edge, make the edge the first commit
  // i dont like this
  Pages.stage.setTimeline(name)
  Pages.stage.version = Pages.stage.timeline.keys.length
  
}

Pages.stage.reset = function () {
  $('#PagesStage').height($(window).height() - 40)
}

Pages.stage.ribbonClose = function () {
  $('#PagesStage').height($(window).height() - 40)
}

Pages.stage.ribbonOpen = function () {
  $('#PagesStage').height($(window).height() - 122)
}

/**
 * Returns scroll top of the frame.
 */
Pages.stage.scrollTop = function () {
  return $('#PagesStage').scrollTop()
}

/**
 * Selects all blocks
 */
Pages.stage.selectAll = function () {
  $('.scrap').each(function () {
    $(this).selectMe(true)
  })
  Pages.trigger('selection')
}

/**
 * @return {object} Pointer to timeline object
 */
Pages.stage.setTimeline = function (name) {
  
  if (Project.get('timelines ' + name)) {
    Pages.stage.timeline = Project.get('timelines ' + name)
    return true
  }
  
  // Do we need to do this?
  var request = $.ajax({
    type: "POST",
    url: '/nudgepad.explorer.get',
    data : {path : 'private timelines ' + name},
    async: false,
  })
  
  request.done(function (msg) {
    Project.create('timelines ' + name, new Space(msg))
  })
  
  request.fail(function () {
    
    var edge = Project.get('pages ' + name)
    var timeline = new Space()
    // If no timeline, but yes edge, make the edge the first commit
    if (edge && !edge.isEmpty()) {
      
      var commit = new Space()
      commit.set('author', Cookie.email)
      commit.set('values', new Space(edge.toString()))
    }
    

    Project.create('timelines ' + name, timeline  )
    Flasher.success('Timeline created')
    
    
  })
  
  Pages.stage.timeline = Project.get('timelines ' + name)
  
}

Pages.stage.views = new Space({
  'full' : function () {
    $('#PagesStage').css({
      width : '100%',
      padding : 0
    })
    $('#PagesStageBody').css({
      'min-height' : '1000px'
    })
  },
  'ipad' : function (){
    var padding = Math.round(($(window).width() - 1024)/2) + 'px'
    $('#PagesStage').css({
      width : '1024px',
      padding : '20px ' + padding + ' 1000px ' + padding,
    })
    $('#PagesStageBody').css({
      'min-height' : '768px'
    })
  },
  'ios' : function (){
    var padding = Math.round(($(window).width() - 320)/2) + 'px'
    $('#PagesStage').css({
      padding : '20px ' + padding + ' 20px ' + padding,
      width: '320px'
    })
    $('#PagesStageBody').css({
      'min-height' : '356px'
    })
  }
})

Pages.stage.toggleView = function () {
  
  Pages.stage.currentView = Pages.stage.views.next(Pages.stage.currentView)
  Pages.stage.views.get(Pages.stage.currentView)()
  $('#PagesStageBody').width()
  Flasher.success(Pages.stage.currentView + ' view')
}

Pages.stage.undo = function () {
  Pages.stage.goto(Pages.stage.version - 1)
}

Pages.stage.updateTimeline = function () {
  // Set the history slider to the wherever the maker last had it (usally 100 if no history or havent edited it yet)
  Pages.stage.percentElapsed = (Pages.stage.timeline.keys.length ? Math.round(100 * Pages.stage.version/Pages.stage.timeline.keys.length) : 100)
  $('#PagesTimeline').attr('max', Pages.stage.timeline.keys.length).val(Pages.stage.version)
  $('#PagesTimelinePosition').text(Pages.stage.version + '/' + Pages.stage.timeline.keys.length)
}

Pages.stage.clearOnTap = function (event) {
  Pages.stage.selection.clear()
  return true
}

Pages.stage.onresize = function (event) {
  Pages.stage.views.get(Pages.stage.currentView)()
  $('#PagesStageBody').width()
  if ($('#PagesRibbon:visible').length)
    $('#PagesStage').height($(window).height() - 122)
  else 
    $('#PagesStage').height($(window).height() - 40)
}

Pages.on('commit', Pages.stage.expand)

Pages.on('close', function () {
  $("#PagesStage").off("tap", Pages.stage.clearOnTap)
  $(window).off('resize', Pages.stage.onresize)
  
})

Pages.on('ready', function () {
  Pages.stage.expand()
  Pages.stage.views.get('ipad')()
  $('#PagesStageBody').width() // Force repaint
  $("#PagesStage").on("tap", Pages.stage.clearOnTap)
  $(window).on('resize', Pages.stage.onresize)
  Pages.stage.reset()

})

