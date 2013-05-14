// What spot the worker is on the timeline for the current page
nudgepad.pages.stage = new Page()
nudgepad.pages.edge = new Space()

nudgepad.pages.blank = function () {

  var page = new Space('title\n tag title\n content Untitled')
  var pageName = prompt('Name your page', nudgepad.pages.nextName())
  if (!pageName)
    return null
  nudgepad.pages.create(pageName, page)
  
}

/**
 *
 */
nudgepad.pages.clearTimeline = function () {
  
  if (!confirm("Are you sure you want to erase the history of this page?"))
    return false
  
  var timestamp = new Date().getTime()
  
  // Send Commit to Server
  var patch = new Space()
  patch.set('timelines ' + nudgepad.stage.activePage, new Space())
  for (var i in nudgepad.stage.timeline.keys) {
    var key = nudgepad.stage.timeline.keys[i]
    patch.set('timelines ' + nudgepad.stage.activePage + ' ' + key, '')
    nudgepad.stage.timeline.delete(key)
  }
  
  patch.set('timelines ' + nudgepad.stage.activePage + ' ' + timestamp, nudgepad.pages.edge)
  // collapse at edge
  nudgepad.stage.timeline.set(timestamp, nudgepad.pages.edge)

  nudgepad.stage.version = nudgepad.stage.timeline.keys.length
  nudgepad.emit('patch', patch.toString())
  nudgepad.trigger('selection')
  return true
}

/**
 * Creates a new page. todo: rename page param to edge
 *
 * @param {string} Name of the file
 * @param {Space} A first patch to initialize the page with.
 * @return {string} The name of the created page
 */
nudgepad.pages.create = function (name, template) {
  
  name = (name ? Permalink(name) : nudgepad.pages.nextName())
  
  // page already exists
  if (site.get('pages ' + name))
    return nudgepad.error('A page named ' + name + ' already exists.')
  
  var page = new Space()
  var timeline = new Space()
  if (template && template.toString().length > 2) {
    page = new Space(template.toString())
    var commit = new Space()
    commit.set('author', nudgepad.cookie.email)
    commit.set('values', new Space(template.toString()))
    timeline.set(new Date().getTime(), commit)
  }
  
  site.set('pages ' + name, page)
  site.set('timelines ' + name, timeline)
  
  var patch = new Space()
  patch.set('pages ' + name, page)
  patch.set('timelines ' + name, timeline)
  
  nudgepad.emit('patch', patch.toString())
  
  nudgepad.stage.open(name)
  mixpanel.track("I created a new webpage")
  return name
}

/**
 * Duplicates the current open page.
 *
 * @param {string} name of page to duplicate. Defaults to current page.
 * @param {string} name of new page. Defaults to source + 1
 * @param {bool} We need to skip prompting for unit testing.
 * @return {string} Name of new page
 */
nudgepad.pages.duplicate = function (source, destination, skipPrompt) {
  
  source = source || nudgepad.stage.activePage
  
  destination = nudgepad.pages.nextName(destination || source)
  
  if (!skipPrompt) {
    destination = prompt('Name your new page', destination)
    if (!destination)
      return false
  }
  
  if (!site.get('pages').get(source))
    return nudgepad.error('Page ' + source + ' not found')
  
  // If we are duplicating a page thats not open, easy peasy
  if (source !== nudgepad.stage.activePage)
    return nudgepad.pages.create(destination, site.get('pages').get(source))
  
  return nudgepad.pages.create(destination, nudgepad.pages.stage)
}

/**
 * Get the next available name. For example untitled_1 or untitled_2
 *
 * @param {string} Optional prefix to add to the name. Defaults to untitled_
 * @return {string} The new name
 */
nudgepad.pages.nextName = function (prefix) {
  var prefix = prefix || 'untitled'
  if (!(prefix in site.values.pages.values))
    return prefix
  for (var i = 1; i < 1000; i++) {
    if (!(prefix + i in site.values.pages.values))
      return prefix + i
  }
}

nudgepad.pages.open = function () {
  if (App.openApp)
    App.openApp.close()
}

/**
 * Renames the currently open page.
 *
 * @param {string} New name
 * @return {string} todo: why return a string?
 */
nudgepad.pages.rename = function (new_name) {
  
  mixpanel.track('I renamed a page')
  
  new_name = Permalink(new_name)
  var old_name = nudgepad.stage.activePage
  
  if (!new_name.length)
    return nudgepad.error('Name cannot be blank')
  
  if (old_name == 'home')
    return nudgepad.error('You cannot rename the home page.')
  
  // page already exists
  if (site.get('pages ' + new_name))
    return nudgepad.error('A page named ' + new_name + ' already exists.')  

  site.set('pages ' + new_name, site.get('pages ' + old_name))
  site.set('timelines ' + new_name, site.get('timelines ' + old_name))
  site.delete('pages ' + old_name)
  site.delete('timelines ' + old_name)
  
  nudgepad.pages.updateTabs()
  
  // Todo, push this to server side?
  var patch = new Space()
  patch.set('pages ' + old_name, '')
  patch.set('timeline ' + old_name, '')
  patch.set('pages ' + new_name, site.get('pages ' + new_name))
  patch.set('timelines ' + new_name, site.get('timelines ' + new_name))

  nudgepad.emit('patch', patch.toString())
  
  nudgepad.stage.open(new_name)
  
  return ''

}

nudgepad.pages.renamePrompt = function () {
  var name = prompt('Enter a new name', nudgepad.stage.activePage)
  if (name)
    nudgepad.pages.rename(name)
}

/**
 * Deletes a page.
 *
 * @param {string} Name of the file
 * @return {string} todo: why return a string?
 */
nudgepad.pages.trash = function (name) {
  name = name || nudgepad.stage.activePage
  if (name === 'home')
    return nudgepad.error('You cannot delete the home page')
  // If its the currently open page, open the previous page first
  if (nudgepad.stage.activePage === name)
    nudgepad.stage.back()
  
  var patch = new Space()
  patch.set('pages ' + name, '')
  patch.set('timelines ' + name, '')
  nudgepad.emit('patch', patch.toString())

  site.get('pages').delete(name)
  site.get('timelines').delete(name)
  
  // Delete page from open pages
  nudgepad.pages.updateTabs()
  nudgepad.notify('Deleted ' + name, 1000)
  return ''
}

