/**
 * Middleware. Parse the posted space.
 *
 * @param {object}
 * @param {object}
 * @param {object}
 */
nudgepad.parseSpace = function(req, res, next) {
  // No space received
  if (typeof req.body.space != 'string')
    return res.send('No Space received')
  req.space = new Space(req.body.space)
  next()
}


nudgepad.patchFile = function (path, patch, email) {
  var filepath = nudgepad.paths.site + path.replace(/ /g, '/') + '.space'
  var file = nudgepad.site.get(path)
  var patchFile = patch.get(path)
  
   // Create File
   if (typeof file === 'undefined') {
     console.log('creating %s', path)
     file = new File(filepath, patchFile)
     file.create(function (error) {
       if (error)
         return nudgepad.error(error)
     })
     nudgepad.site.set(path, file)
   }

   // Delete File
   else if (typeof file !== 'undefined' && patchFile.toString() === '') {
     console.log('deleting %s', path)
     file.trash(function (error) {
       if (error)
         return nudgepad.error(error)
     })
     nudgepad.site.delete(path)
   }

   // Update File
   else {
     console.log('updating %s', path)
     file.patch(patchFile).save(function (error) {
       if (error)
         return nudgepad.error(error)
     })

   }
  
}


nudgepad.patchSite = function (patch, email) {
  
  console.log('receiving patch')
  
  // now, modify file system.
   for (var i in patch.keys) {
     var folder = patch.keys[i]
     // For every file in folder
     for (var j in patch.values[folder].keys) {
       var name =  patch.values[folder].keys[j]
       nudgepad.patchFile(folder + ' ' + name, patch, email)
     }
   }
}

// Patch
site.post(/^\/nudgepad\.site\.patch$/, nudgepad.checkId, nudgepad.parseSpace, function(req, res, next) {
  
  nudgepad.patchSite(req.space, req.email)
  nudgepad.emit('patch', req.space)
  
  if (req.body.redirect)
    return res.redirect(req.body.redirect)
    
  return res.send('')
})

