var mongoose = require('mongoose');

var animalSchema = new mongoose.Schema({
	name: {type: String},
	picture: {type: String},
	race: {type: String},
	age: {type: Number, min: 0},
	userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

animalSchema.virtual('url')
.get(function(){
	return '/animal/' + this._id;
});

var Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;