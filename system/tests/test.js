#!/usr/bin/env node
var assert = require('assert'),
    fs = require('fs'),
    modeToPermissions = require('mode-to-permissions');

function runTest(line) {
  // console.log(line)
  if (!line)
    return false
  var path = line.split(/ /)[0]
  if (line.match(/^(.*) exists$/))
    return assert(fs.existsSync(path), path + ' exists')

  var permissions = modeToPermissions(fs.statSync(path).mode)
  var who = line.match(/by (owner|others|group)$/)[1]
  var action = line.match(/be (read|written|traversed|examined|executed) by /)[1]
  if (action === 'written')
    action = 'write'
  if (!action.match(/(read|write)/))
    action = 'execute'
  
  if (line.match(/can be/)) {
    assert(permissions[action][who])
  }
  else {
    assert(!permissions[action][who])
  }

}

fs.readFileSync(__dirname + '/tests.txt', 'utf8').split(/\n/g).forEach(runTest)

