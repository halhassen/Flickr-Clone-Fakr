var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Album = mongoose.model('Album');
var passport = require('passport');
var jwt = require('express-jwt');

var auth = jwt({
	userProperty: 'payload',
	secret: '_secretdin'
});

//may not need this
router.param('id', function(req, res, next, id) {
	req.addedBy = id.split("|")[0];
	next();
});

//ref album routes
router.post('/', auth, function(req, res) {
	console.log(req.body);
	var album = new Album(req.body);
	album.save(function(err, result) {
		if(err) return res.status(500).send({
			err: "There is a problem!!"
		});
			if(!result) return res.status(400).send({
				err: "Could not make an album"
			});
		});
	res.send();
});

//get all albums
router.get('/', function(req, res) {
	Album.find({}).populate('user')
	.exec(function(err, albums) {
		if (err) return res.status(500).send({
			err: "Error getting all albums"
		});
			if(!albums) return res.status(400).send({ //possibly 500
				err: "Albums don't exist"
			})
		});
	res.send(albums);
});

//get a unique album


//maybe add logic to start an album if image does not exist? idk

//edit album
router.put('/:id', function(req, res) {
	Album.update({
		_id: req._id
	}, req.body).exec(function(err, result) {
		res.send();
	});
});

//delete album
router.delete('/:id', function(req, res) {
	Album.remove({
		_id: req._id
	})
	.exec(function(err, album) {
		if(err) return res.status(500).send({
			err: "Error removing an album"
		});
			if(!album) return res.status(400).send({ //possibly 500
				err: "Album does not exist"
			});
				res.send(album)
			});
});

module.exports = router;
