/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var fs = require('fs');

var verify = require('../lib/verify');
var urls = require('../lib/urls');
var twilio = require('twilio');

module.exports = function (store, viewsPath, urlManager, remixMailer, makeAPIPublisher) {

  return {

    index: function(req, res) {
      res.render('index.ejs');
    },

    designer: function (req, res) {
      var publishUrl = urlManager.createURLPrefix('{remixName}');
      if (req.method === 'POST' && req.body && req.body.data) {
        verify.filter(req.body.data, function (htmlInjection) {
          res.render('designer', {
            htmlInjection: htmlInjection,
            publishUrl: publishUrl
          });
        });
      }
      else {
        res.render('designer', {
          htmlInjection: '',
          publishUrl: publishUrl
        });
      }
    },

    remix: function (req, res) {
      var email = req.query.email;
      var app = req.query.app;

      if (email) {
        var appURL = process.env.ASSET_HOST + '/designer?remix=' + app;
        remixMailer.send(email, appURL, function () {
          res.json({error: null}, 200);
        });
      }
      else {
        res.json({error: 'No valid email.'}, 500);
      }
    },

    testappdesigner: function(req, res) {
      res.render('testappdesigner');
    },

    testapp: function(req, res) {
      res.render('testapp');
    },

    twilio: function (req, res) {
       
      var client = new twilio.RestClient(req.param('TWILIO_ACCOUNT_SID'), req.param('TWILIO_AUTH_TOKEN'));
       
      client.sms.messages.create({
        to:'+'+req.param('to'),
        from:'+'+req.param('from'),
        body:req.param('body')
      }, function(error, message) 
      {
        if (!error) {
          res.json({status:true,sid:message.sid}, 200);
        } else {
          res.json({status:false,error: error}, 500);
        }
      });

    },

    publish: require('./publish')(store, viewsPath, urlManager, makeAPIPublisher)

  }
};
