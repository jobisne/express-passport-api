const passport = require('passport');
const jwt = require('jsonwebtoken');
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

		    let decodedToken = jwt.verify(token, req.app.get('config').JWT_SECRET, function (err, decoded) {
		        req.user = user;
		        return res.status(200).json({ user: decoded, token: token, expiry: decoded.exp, message: 'Login successful' });
		    });
		    //res.status(200).json({message: 'Login successful', user: user});
		})(req, res, next);
	}
}