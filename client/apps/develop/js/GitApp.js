nudgepad.apps.git = new App('git')

nudgepad.apps.git.commit = function () {
  var message = prompt('Enter your commit message')
  nudgepad.apps.git.send("git commit -am '" + message + "'")
}

nudgepad.apps.git.init = function () {
  nudgepad.apps.git.send('git init')
}

nudgepad.apps.git.pull = function () {
  nudgepad.apps.git.send('git pull')
}

nudgepad.apps.git.push = function () {
  nudgepad.apps.git.send('git push')
}

nudgepad.apps.git.send = function (command) {
  $.post('nudgepad.exec', {command : command}, function (result) {
    nudgepad.notify(result)
  }, null, function (error, message) {
    nudgepad.error(error.responseText)
  })
}

nudgepad.apps.git.status = function () {
  nudgepad.apps.git.send('git status')
}



