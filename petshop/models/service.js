var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
	name: {type: String},
	picture: {type: String},
	description: {type: String},
	price: {type: Number, min: 0}
});

serviceSchema.virtual('url')
.get(function(){
	return '/service/' + this._id;
});

var Service = mongoose.model('Service', serviceSchema);
module.exports = Service;