var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

router.post('/register', function(req, res) {
	var user = new User(req.body);
	user.setPassword(req.body.password);
	user.save(function(err, result) {
		if(err) console.log(err);
		if(err) return res.status(500).send({err: "Issues with the server"});
		if(!result) return res.status(400).send({err: "You done messed up."});
		res.send();
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

router.delete('/:id', function(req, res) {
	User.remove({_id: req._id})
	.exec(function(err, user) {
		if(err) return res.status(500).send({err: "Error with deleting the posts"});
		if(!user) return res.status(400).send({err: "user does not exist!"});
		res.send(user);
	});
});

module.exports = router;