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
	verifyEmail: function (user) {
    var message = {
        from: 'no-reply@sauban.co',
        to: user.email,
        subject: 'Invitation to Property aid Platform',
        html: '<p>We are kindly grateful to welcome you to Property aid Platform <br /> which help you to manage your Property(House) </p>',
      };

          transporter.sendMail(message, function (err, message) {
          	if ( err ) {
          		console.log(err);
          	}
            console.log('Server is ready to take our messages');
          });
        }
}

  



