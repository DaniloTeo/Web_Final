var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: {type: String},
	address: {type: String},
	picture: {type: String},
	phone: {type: String},
	email: {type: String},
	username: {type: String, unique: true},
	password: {type: String},
	auth: {type: String, enum: ['adm', 'usr']}
});

userSchema.virtual('url')
.get(function(){
	return '/user/' + this._id;
});

var User = mongoose.model('User', userSchema);
module.exports = User;