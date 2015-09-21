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

router.param('id', function(req, res, next, id) {
	req._id = id;
	next();
});

//get all pictures
router.post('/', function(req, res) {
	User.findOne(req.body).populate('albums')
	.exec(function(err, result) {
		if(err) return res.status(500).send({
			err: "Error getting all pictures"
		});
			if(!result) return res.status(400).send({
				err: "Messages don't exist"
			});
				res.send(result.albums)
			})
});

router.post('/newPicture', auth, function(req, res) {
	var picture = new Picture(req.body.actualPicture);
	picture.save(function(err, pictureResult) {
		if(err) return res.status(500).send({
			err: "Issues with server"
		});
			if(!pictureResult) return res.status(400).send({
				err: "Could not post picture"
			});
				Album.update({_id: req.body.albumId}, {$push: {
					picture: {
						_id: pictureResult._id
					}
				}}, function(err, addedBy) {
					if(err) return res.status(500).send({err: "There was an error"});
					if(!addedBy) return res.status(400).send({err: "That shouldn't happen"});
					Picture.findOne({_id: pictureResult._id})
					.exec(function(err, picture) {
						picture.populate({
							path: 'addedBy',
							model: 'User',
							select: 'username'
						}, function(err, populatedPicture) {
							if(err) return res.status(500).send({err: "An error. Ah!"});
							if(!populatedPicture) return res.status(400).send({err: "Shouldn't happen!"});
							res.send(populatedPicture);
						});
					});
				});
			});
});

router.post('/album', function(req, res) {
	console.log(req.body);
	var album = new Album(req.body);
	album.createdDate = new Date();
	album.save(function(err, result) {
		if(err) return res.status(500).send({ err: 'Server error' });
		if(!result) return res.status(400).send({ err: 'Server error' });;
		res.send();
	});
});

//edit picture
router.put('/:id', function(req, res) {
	Picture.update({_id: req._id}, req.body)
	.exec(function(err, result) {
		res.send();
	});
});

//delete a picture
router.delete('/:id', function(req, res) {
	Picture.remove({_id: req._id})
	.exec(function(err, picture) {
		if(err) return res.status(500).send({err: "Error with deleting the posts"});
		if(!picture) return res.status(400).send({err: "Picture does not exist!"});
		res.send(picture);
	});
});

module.exports = router;