var Package = new App('Package')

Package.onopen = function () {
  $('#PackageManifestUrlLink').html('http://' + nudgepad.domain + '/manifest.webapp')
}

// http://stackoverflow.com/questions/1173194/select-all-div-text-with-single-mouse-click
Package.selectText = function (containerid) {
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

