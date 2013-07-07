Develop.drop = {}

// http://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree
// http://stackoverflow.com/questions/6756583/prevent-browser-from-loading-a-drag-and-dropped-file
Develop.drop.traverseFileTree = function (item, path) {
  path = path || ""
  if (item.isFile) {
    // Get file
    item.file(function(file) {
      console.log("File:", path + file.name)
      Develop.drop.sendFile(path, file)
    })
  } else if (item.isDirectory) {
    // Get folder contents
    var dirReader = item.createReader()
    dirReader.readEntries(function(entries) {
      for (var i=0; i<entries.length; i++) {
        Develop.drop.traverseFileTree(entries[i], path + item.name + "/")
      }
    })
  }
}

// https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
Develop.drop.sendFile = function (path, file) {
  
  var uri = "/nudgepad.explorer.upload"
  uri += '?path=' + Develop.get('path').replace(' ','/') + '/' + (path ? path : '')
  var xhr = new XMLHttpRequest()
  var fd = new FormData()
  
  xhr.open("POST", uri, true)
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          // Handle response.
          Flasher.success(xhr.responseText)
//          alert(xhr.responseText) // handle response.
          Develop.refreshFiles()
      }
      else if (xhr.status == 500) {
        Flasher.error(xhr.responseText)
      }
  }
  fd.append('filename', file.name)
  fd.append('myFile', file)
  // Initiate a multipart/form-data upload
  xhr.send(fd)
}

Develop.drop.ondrop = function(event) {
  console.log('yo')
  event.preventDefault()

  var items = event.dataTransfer.items
  for (var i=0; i<items.length; i++) {
    // webkitGetAsEntry is where the magic happens
    var item = items[i].webkitGetAsEntry()
    if (item) {
      Develop.drop.traverseFileTree(item)
    }
  }
}

Develop.drop.ondragover = function(event){
  event.preventDefault()
}

Develop.on('close', function () {
  window.removeEventListener("dragover", Develop.drop.ondragover)
  window.removeEventListener("drop" , Develop.drop.ondrop)
})

Develop.on('open', function () {
  
  window.addEventListener("dragover", Develop.drop.ondragover, false)
  window.addEventListener("drop" , Develop.drop.ondrop, false)
  
})

