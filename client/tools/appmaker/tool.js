var AppMaker = new Tool('AppMaker')
AppMaker.set('color', 'rgba(71, 41, 54, 1)')
AppMaker.set('description', 'Turn your project into a FirefoxOS app.')

AppMaker.on('open', function () {
  $('#AppMakerManifestUrlLink').html('http://' + document.location.host + '/manifest.webapp')
})

// http://stackoverflow.com/questions/1173194/select-all-div-text-with-single-mouse-click
AppMaker.selectText = function (containerid) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
    }
}

