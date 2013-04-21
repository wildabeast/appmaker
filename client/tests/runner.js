// Disable qunit autostart until Nudgepad is loaded
QUnit.config.autostart = false
var created_pages = []
$(document).ready(function() {
  
  nudgepad.isTesting = true
  nudgepad.main(function () {
    
    QUnit.begin(function () {
      
    })
    
    QUnit.moduleStart( function (name) {
      activePage = 'test_page_' + created_pages.length + '_' + new Date().getTime() + Math.random()
      nudgepad.pages.create(activePage)
      created_pages.push(activePage)
    })
    
    QUnit.moduleDone( function () {
      
    })
    
    // Now we can start Qunit
    QUnit.start()
    QUnit.done(function( details ) {
      
      for (var i in created_pages) {
        nudgepad.pages.trash(created_pages[i])
      }
      
      nudgepad.stage.open('home')
      
      console.log( "Total: ", details.total, " Failed: ", details.failed, " Passed: ", details.passed, " Runtime: ", details.runtime )
      // Quit the nudgepad to cleanup DOM.
      nudgepad.quit()
      $('#qunitFrame').attr('style', '')
      $('#qunitFrame').css('width', '95%')
      $('#qunitFrame').css('margin-bottom', '20px')
      $('body').css('overflow', 'auto')
      $('body').css('padding', '8px')
//      $('#qunitFrame').css('width', '80%')
//      $('body').css('padding', '30px')
    })
    
    
  })
  

})
