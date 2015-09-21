var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		unique: true
	},
	username: {
		type: String,
		unique: true,
		lowercase: true
	},
	profilePic: String,
	passwordHash: String,
	salt: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Salts"
	},
	about: String,
	albums: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Album"
	}]
});

UserSchema.methods.setPassword = function(password, salt) {
	var passwordHash = crypto.pbkdf2Sync(password, salt, 1500, 64).toString('hex');
	this.passwordHash = passwordHash
};

UserSchema.methods.checkPassword = function(password, salt) {
	var checkPasswordHash = crypto.pbkdf2Sync(password, salt, 1500, 64).toString('hex');
	return this.passwordHash === checkPasswordHash
};

UserSchema.methods.generateJWT = function () {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 36500);
	return jwt.sign({
		username: this.username,
		id : this._id,
		email: this.email,
		exp: exp.getTime() / 1000
	}, "_secretdin");
};


mongoose.model('User', UserSchema)