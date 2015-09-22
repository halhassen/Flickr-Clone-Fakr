var mongoose = require('mongoose');

var PictureSchema = new mongoose.Schema({
	picture: String,
	pictureName: String,
	createdDate: Date,
	addedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	tags: [String] //check if this is correct?
	//add album ref?
});

mongoose.model('Picture', PictureSchema);