#!/usr/bin/env node
var $ = require('jquery'),
    fs = require('fs'),
    _ = require('underscore'),
    Space = require('space'),
    Page = require('scraps'),
    request = require('request'),
    Url = require('url')

var makeAbsolute = function (link, url) {
  var parts = Url.parse(url)
  if (link.match(/^https?\:/i))
    return link
  var link = parts.protocol + '//' +
    parts.host +
    parts.pathname.replace(/\/[^\/]*$/,'') +
    '/' +
    link.replace(/^\//, '')
  return link
}

var htmlProperties = 'checked class disabled draggable dropzone end for height href max maxlength min name origin pattern placeholder readonly rel required selected spellcheck src tabindex target title width value'.split(/ /)

$.fn.toSpace = function (url) {
  var space = new Space()
  var el = $(this)
  _.each(htmlProperties, function (name) {
    if (el.attr(name))
      space.set(name, el.attr(name))    
  })
  // fix relative links
  if (space.values.href)
    space.values.href = makeAbsolute(space.values.href, url)
  if (space.values.src)
    space.values.src = makeAbsolute(space.values.src, url)
  
  space.set('tag', $(this).get(0).tagName.toLowerCase())
  // if leaf node
  if (!$(this).children().length)
    space.set('content', $(this).html())
  else {
    var scraps = new Space()
    $(this).children().each(function () {
      var id = $(this).attr('id') || $(this).get(0).tagName.toLowerCase()
      var num = 1
      var nextId = id
      while (scraps.values[nextId]) {
        num++
        nextId = id + num.toString()
      }
      scraps.set(nextId, $(this).toSpace(url))
    })
    space.set('scraps', scraps)
  }
  return space
}

var htmlToScraps = function (html, url) {
  var page = $(html)
  var space = new Space()
  $('head', page).children().each(function () {
    var id = $(this).attr('id') || $(this).get(0).tagName.toLowerCase()
    var num = 1
    var nextId = id
    while (space.values[nextId]) {
      num++
      nextId = id + num.toString()
    }
    var scrap = $(this).toSpace(url)
    space.set(nextId, scrap)
  })
  $('body', page).children().each(function () {
    var id = $(this).attr('id') || $(this).get(0).tagName.toLowerCase()
    var tag = $(this).get(0).tagName.toLowerCase()
    // Skip br tags
//    if (tag === 'br')
//      return true
    var num = 1
    var nextId = id
    while (space.values[nextId]) {
      num++
      nextId = id + num.toString()
    }
    var scrap = $(this).toSpace(url)
    space.set(nextId, scrap)
  })
  return space
}

var url = process.argv[2]
if (!url.match(/^https?\:/))
  url = 'http://' + url
var destination = process.argv[3]

request.get(url, function (error, response) {
  if (error)
    return process.exit(1)
  var html = htmlToScraps(response.body, url)
  fs.writeFile(destination, html.toString(), 'utf8')
})
