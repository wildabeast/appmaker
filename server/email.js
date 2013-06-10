var Email = {}

Email.send = function (to, from, subject, message, htmlMessage, callback) {
  
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

module.exports = Email


