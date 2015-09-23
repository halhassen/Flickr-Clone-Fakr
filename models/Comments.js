var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
	created: Date,
	addedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	body: String,
	picture: {type: mongoose.Schema.Types.ObjectId, ref: 'Picture'}
})

mongoose.model('Comments', CommentsSchema)