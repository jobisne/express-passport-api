const passport = require('passport');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const emailHelper = require('../../helpers/email-helper');

module.exports  = {
	login: function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
		    if (err) { return next(err); }
		    if (!user) { return res.status(401).json({message: info}) }
		    	//to create webtoken for a user
		    let token = jwt.sign(
        		user.toJSON(), req.app.get('config').JWT_SECRET,
       			 { expiresIn: req.app.get('config').TOKEN_EXPIRY }
     		);
		    //console.log(token);
		    let decodedToken = jwt.verify(token, req.app.get('config').JWT_SECRET, function (err, decoded) {
		        req.user = user;
		        return res.status(200).json({ user: decoded, token: token, expiry: decoded.exp, message: 'Login successful' });
		    });
		    //res.status(200).json({message: 'Login successful', user: user});
		})(req, res, next);
	},
	forgot: function (req, res, next) {
const SECRET = req.app.get('config').JWT_SECRET;
	
			User.findOne({ email: req.body.email}).then( user => {
				if (!user) {
					return res.status(404).json({msg: 'No account with that email address exists.'});
				}
				const cipher = crypto.createCipher('aes192', SECRET);
					let token = cipher.update(user.email, 'utf8', 'hex');
					token += cipher.final('hex');
					//res.json(token);
				var sub = 'Forgot passsword';
				var text = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
         				 	'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          					'http://' + req.headers.host + '/auth/reset-password/' + token + '<br/ ><br/>' +
         					'If you did not request this, please ignore this email and your password will remain unchanged.\n';
          		emailHelper.verifyEmail(user,sub, text ); 
				return res.status(200).json({msg: "ok"});
			}).catch(err => {
				console.log(err);
      			return res.status(400).json(err);
			});
	},
	reset: function (req, res) {
const SECRET = req.app.get('config').JWT_SECRET;

		const cipher = crypto.createDecipher('aes192', SECRET);
			let email = cipher.update(req.params.token, 'hex', 'utf8');
				email += cipher.final('utf8'); 
				//res.send(email);
			User.findOne({ email: email}).then( user => {
				if (!user) {
					return res.status(404).json({msg: 'No account with that email address exists.'});
				}
			return res.status(200).json({msg :'welcome'});
		}).catch( err => {
			res.status(400).json(err);
		});
		
	}
}

