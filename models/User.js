var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	name: {type: String},
	email: {
		type: String,
		unique: true
	},
	username: {
		type: String,
		unique: true,
		lowercase: true
	},
	profilePic: {type: String},
	passwordHash: String,
	salt: String,
	about: {type: String},
	picture: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Picture"
	}]
});

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	/*var passwordHash = crypto.pbkdf2Sync(password, salt, 1500, 64).toString("hex");
	this.passwordHash = passwordHash;*/
}

UserSchema.methods.checkPassword = function(password) {
//this.salt needs to be set and retrieved in the create user route to create user password
var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
return hash === this.passwordHash;
}

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