var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	name: {type: String},
	picture: {type: String},
	description: {type: String},
	price: {type: Number, min: 0},
	amount: {type: Number, min: 0},
	sold: {type: Number, default: 0}
});

productSchema.virtual('url')
.get(function(){
	return '/product/' + this._id;
});

var Product = mongoose.model('Product', productSchema);
module.exports = Product;