var	client 	= require('phonegap-build-api'),
	fs 		= require('fs'),
    path 	= require('path'),
    shell   = require('shelljs'),
    phonegap_creds = { username: "", password: "" };

var PGB = {
    api: null,
    timer: null,
    output_path: null,
    oncomplete: null,

    log: function(s) {
        console.log('[PGB] ' + s);
    },

    auth: function(opts, cb) {
        if (opts.host) console.log('[PGB] Using host ' + opts.host);
        var authParams = {
            username: opts.username, 
            password: opts.password
        };
        if (opts.host) {
            authParams.host = opts.host
        }
        client.auth(authParams, function(e, api) {
            if (e) {
                PGB.log(e);
            } else {
                PGB.api = api;
                cb();
            }
        });
    },

    build: function(opts, oncomplete) {
        var params = {
            form: {
                data: {
                    title: 'cordovaExample',
                    create_method: 'file'
                },
                file: opts.zip_path
            }
        };

        PGB.api.post('/apps', params, function(e, data) {
            if (e) {
                oncomplete(e, null, opts.platform);
            } else {
                PGB.log('App ' + data.id + ' created.');
                PGB.log('Waiting for ' + opts.platform + ' build...');
                PGB.poll(data.id, opts.platform, opts.output_path, oncomplete);
            }
        });
    },

    poll: function(id, platform, output_path, oncomplete) {
        PGB.checkStatus(id, function(e, data) {
            if (e) {
                console.log(e);
                oncomplete(e, id, platform);
            } else if (data.status[platform] == 'pending') {
                setTimeout(function() {
                    PGB.poll(id, platform, output_path, oncomplete);
                }, 2000);
            } else if (data.status[platform] == 'complete' ) {
                PGB.log(platform + ' build complete.');
                if (output_path) 
                  PGB.download(id, platform, output_path, oncomplete);
                else
                  oncomplete(null, id, platform);
            } else if (data.error && data.error[platform]) {
                oncomplete(data.error[platform], id, platform);
            } else {
                oncomplete("unknown error", id, platform);
            }
        });
    },

    checkStatus: function(id, cb) {
        PGB.api.get('/apps/' + id, cb);
    },

    download: function(id, platform, output_path, oncomplete) {
        PGB.log('Downloading for ' + platform + '...');
        var binpath = path.join(output_path, 'app-' + id + '.' + PGB.extension(platform));

        var r = PGB.api.get('/apps/' + id + '/' + platform).pipe(fs.createWriteStream(binpath));
        r.on('close', function() {
            PGB.log('Download stream closed.');

            PGB.api.del('/apps/' + id, function(e, data) {
                if (e) {
                    PGB.log(e);
                } else {
                    PGB.log('App deleted from Build.');
                    oncomplete(null, id, platform, binpath);
                }
            });
        });
    },

    extension: function(platform) {
        if (platform == 'android') {
            return 'apk';
        } else if (platform == 'ios') {
            return 'ipa';
        } else if (platform == 'blackberry') {
            return 'jad';
        }
    },

    go: function(proj_dir, cb) {
        console.log('Building with PhoneGap...');

        var zip_path = path.join(proj_dir, '..', 'phonegap.zip');

        var cmd = 'cd ' + proj_dir + ' && zip -r ' + zip_path + ' ./*';

        var options = {
            output_path: path.join(proj_dir, '..'),
            platform: "android",
            zip_path: zip_path
        };

        shell.exec(cmd, {silent:true, async:true}, function(code, checkout_output) {

            PGB.auth(phonegap_creds, function() {
              PGB.build(options, function(error, id, pf, binpath) {
                if (error) {
                  console.log(error);
                } else {
                  fs.unlinkSync(zip_path);
                  cb(id, binpath);
                }
              });
            });

        });
    }
};

module.exports = PGB;