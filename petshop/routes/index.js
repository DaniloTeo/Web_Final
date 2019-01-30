var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Appointment = require('../models/appointment');
var Animal = require('../models/animal');
var Service = require('../models/service');
var Cart = require('../models/cart');
var Product = require('../models/product');

var product_controller = require('../controllers/productController');
var animal_controller = require('../controllers/animalController');
var service_controller = require('../controllers/serviceController');
var user_controller = require('../controllers/userController');
var appointment_controller = require('../controllers/appointmentController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// rotas que nao precisam de sessao
router.get('/store', product_controller.product_list);

router.get('/info', function(req, res) {
	res.render('info');
});

router.get('/signup', function(req, res) {
	res.render('signup');
});

router.post('/user/create', user_controller.user_create_post);

router.post('/signin', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({ username: username, password: password }, function(err, user) {
		if (user) {
			req.session.user = user;
			if (req.session.user.auth === "adm") {
				res.redirect('/cpanel');
			}
			else if (req.session.user.auth === "usr") {
				console.log("eita");
				res.redirect('/profile');
			}
		}
		else {
			res.redirect('/');
		}
	});
});

router.get('/profile', function(req, res) {
	if (req.session.user && req.session.user.auth === "usr") {
		Animal.find({ userID: req.session.user._id }, function(err, animal_list) {
			Appointment.find({ userID: req.session.user._id })
				.populate('serviceID animalID')
				.exec(function(err, appointment_list) {
					res.render('profile-aux', { title: 'Animal List', animal_list: animal_list, appointment_list: appointment_list });
				});
		});
	}
	else {
		res.redirect('/');	
	}
});

router.get('/signout', function(req, res) {
	req.session.destroy();
	res.redirect('/');
})

router.get('/cpanel', function(req, res) {
	if (req.session.user && req.session.user.auth === "adm") {
		res.render('cpanel');
	}
	else {
		res.redirect('/');
	}
});

router.get('/panel', function(req, res) {
	if (req.session.user) {
		if (req.session.user.auth === "adm") {
			res.redirect('/cpanel');
		}
		else if (req.session.user.auth === "usr") {
			res.redirect('/profile');
		}
	}
	else {
		res.redirect('/');
	}
});

router.get('/manage-products', product_controller.product_list_adm);
router.get('/manage-services', service_controller.service_list_adm);
router.get('/manage-appointments', appointment_controller.appointment_list_adm);
router.get('/manage-users', user_controller.user_list_adm);

router.get('/product/:id', product_controller.product_detail);


router.get('/user/update', user_controller.user_update_get_gambi);
router.post('/user/update', user_controller.user_update_post_gambi);

router.post('/animal/:id/delete', animal_controller.animal_delete_post);

router.get('/animal/create', animal_controller.animal_create_get);
router.post('/animal/create', animal_controller.animal_create_post);

router.get('/appointment/create', appointment_controller.appointment_create_get_gambi);
router.post('/appointment/create', appointment_controller.appointment_create_post_gambi);

router.post('/addcart/product/:id', function(req, res) {
	Cart.findOne({ userID: req.session.user._id }, function(err, cart) {
		if (cart === null) {
			var newCart = new Cart();

			newCart.userID = req.session.user._id;
			newCart.productID = req.params.id;
			newCart.quantity = req.body.quantity;

			newCart.save(function(err, savedCart) {
				res.redirect('/store');
			});
		}
		else {
			console.log(cart);
			cart.productID.push(req.params.id);
			cart.quantity.push(req.body.quantity);

			cart.save(function(err, savedCart) {
				res.redirect('/store');
			});
		}
	});
});

router.get('/cart', function(req, res) {
	Cart.findOne({ userID: req.session.user._id })
		.populate('productID')
		.exec(function(err, cart) {
			if (cart === null) {
				res.render('cart', { product_list: [], quantities: [] });			
			}
			else {
				res.render('cart', { product_list: cart.productID, quantities: cart.quantity });			
			}
		});
});

router.get('/clear', function(req, res) {
	Cart.findOneAndRemove({ userID: req.session.user._id }, function() {
		res.redirect('/cart');
	});
});

router.get('/checkout', function(req, res) {
	Cart.findOne({ userID: req.session.user._id })
		.populate('productID')
		.exec(function(err, cart) {
			if (cart !== null) {
				cart.productID.forEach(function(product, index) {
					product.amount -= cart.quantity[index];
					product.sold += cart.quantity[index];

					product.save(function(err, savedProduct) {
						console.log(savedProduct);
						if (index === cart.productID.length - 1) {
							console.log('ACABOU');
							res.redirect('/clear');
						}
					});
				});
			}
		});
});

module.exports = router;
