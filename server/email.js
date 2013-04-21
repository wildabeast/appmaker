nudgepad.sendEmail = function (username, to, subject, message, htmlMessage, callback) {
  
  var from = username + '@' + nudgepad.domain
  var nodemailer = require("nodemailer")
  
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
  //  html: "<b>Hello world ✔</b>" // html body
  }
  
  if (htmlMessage)
    mailOptions.htmlMessage = htmlMessage

  // send mail with defined transport object
  transport.sendMail(mailOptions, function(error, response){
    
    if (error)
      console.log('sendmail error: %s', error)
    
    // If not callback return true
    if (!callback)
      return true
    
    if (error)
      return callback(error)
    else
      return callback(null)
    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close() // shut down the connection pool, no more messages
  })
  
  
}

site.post('/nudgepad.email', nudgepad.checkId, function (req, res, next) {
  var username = 'nudgepad'
  var to = req.body.to
  var subject = req.body.subject
  var message = req.body.message
  
  nudgepad.sendEmail(username, to, subject, message, null, function (error) {
    if (error)
      res.send(error, 500)
    else
      res.send('Sent')
  })  

})

