var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Album = mongoose.model('Album');
var Picture = mongoose.model('Picture');
var passport = require('passport');
var jwt = require('express-jwt');

var auth = jwt({
	userProperty: 'payload',
	secret: '_secretdin'
});

//---------------Finding a single image and populating comments--------

router.param('pictureId', function(req, res, next, id) {
	req._id = id;
	Picture.findOne({_id: id})
	.populate({ path: "comments"})
	.exec(function(err, comments) {
		Picture.populate(comments, {
			path: 'addedBy', 
			model: 'User',
			select: "username profilePic"
		}, function (err, picture) {
			if(err) return res.status(500).send({err: "Error inside the server."});
			if(!picture) return res.status(400).send({err: "That picture does not exist"});
			req.Picture = picture;
			next();
		});

	});
});

router.param('id', function(req, res, next, id) {
	req._id = id;
	Picture.findOne({_id: id})
	.exec(function(err, picture) {
		if(err) return res.status(500).send({err: "Error inside the server."});
		if(!picture) return res.status(400).send({err: "That picture does not exist"});
		req.picture = picture;
		next();
	});
});

//----------------Push User ID into Picture addedBy property-------
router.param('user', function(req, res, next, user) {
	req._id = user;
	next();
});

//-----------------Post Picture with addedBy UserID-----------------
router.post('/', auth, function(req, res) {
	var picture = new Picture(req.body);
	picture.save(function(err, pictureResult) {
		if(err) return res.status(500).send({err: "Issues with server"});
		if(!pictureResult) return res.status(400).send({err: "Could not post picture"});
		res.send();
	});
});

//---------------------Getting Picures------------------
router.get('/', function(req, res) {
	Picture.find({})
	.populate({
		path: "addedBy",
		model: "User",
		select: "username picture"
	})
	.exec(function(err, picture) {
		if(err) return res.status(500).send({err: "error getting all picture"});
		if(!picture) return res.status(400).send({err: "picture do not exist"});
		res.send(picture);
	});
});

router.get('/:id', function(req, res) {
	res.send(req.picture)
});

router.get('/picture/:pictureId', function(req, res) {
	res.send(req.Picture)
});

//edit picture
router.put('/:id', function(req, res) {
	Picture.update({_id: req._id}, req.body)
	.exec(function(err, picture) {
		if(err) return res.status(500).send({err: "error getting picture to edit"});
		if(!picture) return res.status(400).send({err: "Picture to edit aren't existing"});
		res.send(picture);
	});
});

//delete a picture
router.delete('/:id', function(req, res) {
	Picture.remove({_id: req._id})
	.exec(function(err, picture) {
		if(err) return res.status(500).send({err: "Error with deleting the posts"});
		if(!picture) return res.status(400).send({err: "Picture does not exist!"});
		res.send();
	});
});

module.exports = router;