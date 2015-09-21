var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var Salts = mongoose.model("Salts");

//registration
router.post('/register', function(req, res) {
	var user = new User(req.body);
	//Saves user with passwordHash field blank
	user.save(function(err, user) {
		if(err) console.log(err);
		if(err) return res.status(500).send({
			err: "Issues with our server!"
		});
			if(!user) return res.status(400).send({
				err: "You messed up."
			});
		//creates salt with id from new user as reference
		var salt = new Salts({
			userId: user._id
		});
		//Sets salt string with SaltSchema method on Salt.js with crypto 64 bytes
		salt.setSalt();
		//Saves salt
		salt.save(function(err, salt) {
			if(err) return res.status(500).send({
				err: "Issues with our server"
			});
				if(err) return res.status(400).send({
					err: "You messed up, somehow"
				});
		//updates user with reference to salt with salt._id
		User.update({
			_id: salt.userId
		}, {
			salt: salt._id
		}, function(err, userWithSaltId) {
			if(err) return res.status(500).send({
				err: "Issues with our server"
			});
				if(!userWithSaltId) return res.status(400).send({
					err: "You messed up"
				});
		//Finds user to populate salt string to change reference id of
		//salt to actual salt object
		User.findOne({
			_id: salt.userId
		})
		.populate({
			path: "salt", model: "Salts", select: "salt"
		})
		.exec(function(err, userWithSaltString) {
			if(err) return res.status(500).send({
				err: "Issues with our server"
			});
				if(err) return res.status(400).send({
					err: "Unfortunately, you messed up."
				});
		//Hashes the passwrod with salt with User setPassword method defined in User.js
		//Second param needs to be .salt.salt because salt is object with salt property that contains salt string from crypto
		userWithSaltString.setPassword(userWithSaltString.passwordHash, userWithSaltString.salt.salt);
		User.update({
			_id: userWithSaltString._id
		}, userWithSaltString, function(err, result) {
			if(err) return res.status(500).send({
				err: "Issues with our server"
			});
				if(err) return res.status(400).send({
					err: "You somehow messed up"
				});
					res.send();
				})
	})
	});
});
});
});

//----------Logging in the User--------
router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if(!user) return res.status(400).send(info);
		res.send({
			token: user.generateJWT()
		});
	})(req, res, next);
});
//--------------------------------------

//get an individual user
router.param('id', function(req, res, next, id) {
	User.findOne({
		_id: id
	}, function(err, user) {
		if(err) return next({
			err: err,
			type: 'client'
		});
			req.user = user;
			next();
		});
});

//get users
router.get('/', function(req, res) {

	var users = res;
	User.find({})
	.exec(function(err, users) {
		if (err) return res.status(500).send({
			err: "Error inside the server."
		});
			if (!users) return res.status(400).send({
				err: "Users aren't here :("
			});
				res.send(users)
			});
});

//Get /user & update /{userId}
router.get('/:id', function(req, res) {
	res.send(req.user);
});
/*
do I need this?
router.post('/set-matches', function (req, res) {
  Couple.update({_id: req.body.coupleLoggedInId}, {$push: {matches: {_id: req.body.coupleLikedId}}})
  .exec(function (err, couple) {
    if(err) return res.status(500).send({err: "Error handling server request for swing matches"});
    if(!couple) return res.status(400).send({err: "No such couple!"});
    res.send(couple);
  })
});
*/

router.put('/:id', function(req, res) {
	var userProfile = req.body;
	User.update({_id: req.body._id}, userProfile)
	.exec(function(err, user){
		console.log(user + "userroutes")
		if(err) return res.status(500).send({err: "error getting user to edit"});
		if(!user) return res.status(400).send({err: "user profile isn't existing"});
		res.send(user);
		console.log("userroutes" + user)
	});
});

module.exports = router;