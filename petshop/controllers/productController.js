var Product  = require('../models/product');
var async = require('async');

exports.product_list = function(req, res){
	Product.find()
		.exec(function(err, list_products) {
			res.render('store', { title: 'Product List', product_list: list_products });
		});
};

exports.product_list_adm = function(req, res) {
	if (req.session.user && req.session.user.auth === "adm") {
		Product.find()
			.exec(function(err, list_products) {
				res.render('manage-products', { title: 'Product List', product_list: list_products });
			});
	}
	else {
		res.redirect('/');
	}
}

exports.product_detail = function(req, res, next) {
	Product.findById(req.params.id)
		.exec(function(err, product) {
			res.render('product', { title: 'Product Detail', product: product });
		});
}

exports.product_create_get = function(req, res){
	res.render('adm-add-product');
};

exports.product_create_post = function(req, res){
	var newProduct = new Product();

	newProduct.name = req.body.name;
	newProduct.picture = req.body.picture;
	newProduct.description = req.body.description;
	newProduct.price = req.body.price;
	newProduct.amount = req.body.amount;
	newProduct.sold = 0;

	newProduct.save(function(err, savedProduct) {
		res.redirect('/manage-products');
	});
};



exports.product_delete_post = function(req, res){
	console.log("OIEEEEEEEEEEEEEEEEEE");
	Product.findByIdAndRemove(req.params.id, function() {
		res.redirect('/manage-products');
	});
}

exports.product_update_get = function(req, res){
	Product.findById(req.params.id)
		.exec(function(err, product) {
			res.render('adm-edit-product', { title: 'Product Detail', product: product });
		});
}

exports.product_update_post = function(req, res){
	Product.findById(req.params.id, function(err, product) {
		product.name = req.body.name;
		product.picture = req.body.picture;
		product.description = req.body.description;
		product.price = req.body.price;
		product.amount = req.body.amount;

		product.save(function(err, savedProduct) {
			res.redirect('/manage-products');
		});
	});
}