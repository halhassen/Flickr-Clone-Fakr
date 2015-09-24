var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Picture = mongoose.model('Picture');
var passport = require('passport');
var jwt = require('express-jwt');
var Comment = mongoose.model('Comments');

var auth = jwt({
	userProperty: 'payload',
	secret: '_secretdin'
});

router.post('/', auth, function(req, res) {
	var comment = new Comment(req.body);
	comment.created = new Date();
	comment.addedBy = req.payload.id;
	comment.save(function(err, result) {
		if(err) return res.status(500).send({err: "Server problem."});
		if(!result) return res.status(400).send({err: "Comment could not be created"});
		Picture.update({ _id: comment.picture}, {$push: {
			comments: {
				_id: result._id
			}
		}},function(err, picture) {
			if(err) return res.status(500).send({err: "there was an error"});
			if(!picture) return res.status(400).send({err: "this error should never happen"});
			Comment.findOne({ _id: result._id}).populate({
				path: "addedBy",
				model: "User",
				select: "username profilePic comments"
			})
			.exec(function(err, comment) {
				res.send(comment);
			})
		})
	})
});

module.exports = router;