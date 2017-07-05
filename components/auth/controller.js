const passport = require('passport');

module.exports  = {
	login: function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
		    if (err) { return next(err); }
		    if (!user) { return res.status(401).json({message: info}) }
		    res.status(200).json({message: 'Login successful', user: user});
		})(req, res, next);
	}
}