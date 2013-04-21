#!/usr/bin/env node
var fs = require("fs"),
    nodemailer = require("nodemailer"),
    program = require('commander'),
    path = require('path'),
    os = require("os")

program
  .version('0.1.1')
  .option('-p, --path [string]', 'Path to file')
  .option('-t, --to [string]', 'Addresses')
  .parse(process.argv)

function emailFile (path, to) {

  var from = 'server@' + os.hostname()
  var subject = path
  var message = fs.readFileSync(path, 'utf8')
  
  // We use the sendmail binary to send mail.
  // In the future we can add the option to use a 3rd party service or smtp service.
  var transport = nodemailer.createTransport("sendmail")

  /*
  var smtpTransport = nodemailer.createTransport("SMTP", {
      host: "localhost", // hostname
      port: 25
  })
  */
  var mailOptions = {
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: message // plaintext body
//    html : message
  //  html: "<b>Hello world ✔</b>" // html body
  }

  // send mail with defined transport object
  transport.sendMail(mailOptions, function(error, response){
    
    if (error)
      console.log(error)
    if (response)
      console.log(response)
    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close() // shut down the connection pool, no more messages
  })
}

emailFile(path.resolve(program.path), program.to)
