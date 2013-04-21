nudgepad.pages.addGoogleAnalytics = function () {
  var id = prompt('Enter your Google Analytics ID', 'UA-')
  if (!id)
    return true
  var space = new Space()
  space.type = 'script'
  space.content =  "var _gaq = _gaq || [];" +
  "_gaq.push(['_setAccount', '" + id + "']);" +
  "_gaq.push(['_trackPageview']);" +
  "(function() {" +
    "var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;" +
    "ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';" +
    "var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);" +
  "})();"
  nudgepad.pages.stage.set('googleAnalytics', space)
  nudgepad.stage.commit()
}

