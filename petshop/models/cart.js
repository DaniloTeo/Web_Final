var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
	userID: {type: mongoose.Schema.ObjectId, ref: 'User'},
	productID: [{type: mongoose.Schema.ObjectId, ref: 'Product'}],
	quantity: [{type: Number, min: 1}]
});

cartSchema.virtual('url')
.get(function(){
	return '/users/cart/' + this.userID;
});

var Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;