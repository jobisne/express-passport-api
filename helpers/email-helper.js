const nodemailer = require('nodemailer')
    transporter = nodemailer.createTransport({
        host: 'smtp.sparkpostmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'SMTP_Injection',
            pass: 'af67b4e86a2c009360ff64ed5b75a459da4b8cd5',
          },
      });

module.exports = {
	verifyEmail: function (user, subject, text) {
    var message = {
        from: 'no-reply@sauban.co',
        to: user.email,
        subject: subject,
        html: text,
       
      };

          transporter.sendMail(message, function (err, message) {
          	if ( err ) {
          		console.log(err);
          	}
            console.log('Server is ready to take our messages');
          });
        }
}

  



