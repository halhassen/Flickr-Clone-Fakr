var mongoose = require('mongoose');

var PictureSchema = new mongoose.Schema({
	picture: String,
	pictureName: String,
	createdDate: Date,
	addedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}],
	tags: [{type: String}] //check if this is correct?
});

mongoose.model('Picture', PictureSchema);