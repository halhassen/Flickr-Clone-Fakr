var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
var Salts = mongoose.model('Salts');


passport.use(new LocalStrategy(function(username, password, done) {
	User.findOne({
		username: username
    }) //find the username in the model from where it's being called.
	.populate({
		path: "salt",
		model: 'Salts',
		select: 'salt'
	})
	.exec(function(err, user) {
		if (err) return done({
			err: "Server has issues."
		});
			if (!user) return done({
				err: "User does not exist"
			});
				if(!user.checkPassword(password, user.salt.salt)) return done({err: "Invalid username and password combination."});
				return done(null, user);
			});
}));
