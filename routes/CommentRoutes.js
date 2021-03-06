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

//---------------Finding a single --------

router.param('commentsId', function(req, res, next, id) {
	req._id = id;
	Comment.findOne({_id: id})
	.populate({ path: "picture"})
	.exec(function(err, picture) {
		Comment.populate(picture, {
			path: 'picture', 
			model: 'Picture',
			select: "comments addedBy"
		}, function (err, comment) {
			if(err) return res.status(500).send({err: "Error inside the server."});
			if(!comment) return res.status(400).send({err: "That comment does not exist"});
			req.Comment = comment;
			next();
		});
	});
});

router.get('/comments/:commentsId', function(req, res) {
	res.send(req.Comment)
});	

router.param('id', function(req, res, next, id) {
	req._id = id;	
	next();
});

router.get('/:id', function(req, res) {
	res.send(req.comment) 
});
/*
router.param('user', function(req, res, next, user) {
	req._id = user;
	next();
});

router.param('picture', function(req, res, next, picture) {
	req._id = picture;
	next();
});
*/
//-----------Get Calls--------------

router.post('/', auth, function(req, res) {
	var comment = new Comment(req.body);
	comment.created = new Date();
	comment.save(function(err, commentResult) {
		if(err) return res.status(500).send({err: "Issues with server"});
		if(!commentResult) return res.status(400).send({err: "Could not post comment"});
		res.send();
	});
});

router.get('/', function(req, res) {
	Comment.find({})
	.populate({
		path: "addedBy",
		model: "User",
		select: "username profilePic"
	})
	.exec(function(err, comment) {
		if(err) return res.status(500).send({err: "error getting all comments"});
		if(!comment) return res.status(400).send({err: "comments do not exist"});
		res.send(comment);
	});
});




//---------------edit comment-----------
router.put('/:id', function(req, res) {
	console.log(req.body);
	Comment.update({_id: req.body.id}, req.body)
	.exec(function(err, comment) {
		if(err) return res.status(500).send({err: "error getting comment to edit"});
		if(!comment) return res.status(400).send({err: "Comment to edit doesn't exist"});
		res.send(comment);
	});
});

//delete a comment
router.delete("/:id", function(req, res) {
 	Comment.remove({_id: req._id}) 	//_id is the property, req._id is the value
 	.exec(function(err, comment) {
 		if(err) return res.status(500).send({err: "error with getting all comments"});
 		if(!comment) return res.status(400).send({err:"comments do not exist"});
 		res.send(comment);
 	});
 });

module.exports = router;