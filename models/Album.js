var mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
	addedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	createdDate: Date,
	picture: [{type: mongoose.Schema.Types.ObjectId, ref: "Picture"}],
	tags: [String] //check if this is correct?
	//other properties to add?
});

mongoose.model('Album', AlbumSchema);