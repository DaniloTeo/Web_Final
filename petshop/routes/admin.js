var express = require('express');
var router = express.Router();

var Animal = require('../models/animal');
var User = require('../models/user');
var Service = require('../models/service');

//Require controlers
var product_Controller = require('../controllers/productController');
var user_Controller = require('../controllers/userController');
var appointment_Controller = require('../controllers/appointmentController');
var service_Controller = require('../controllers/serviceController');

//appointment CONTROLLER
router.get('/', appointment_Controller.appointment_list);

//GET para criar appointment
router.get('/appointment/create', appointment_Controller.appointment_create_get);

//POST para criar appointment
router.post('/appointment/create', appointment_Controller.appointment_create_post);

//POST para deletar appointment
router.post('/appointment/:id/delete', appointment_Controller.appointment_delete_post);

//GET para deletar appointment
router.get('/appointment/:id/update', appointment_Controller.appointment_update_get);

//POST para criar appointment
router.post('/appointment/:id/update', appointment_Controller.appointment_update_post);

//PRODUCT CONTROLLER
router.get('/', product_Controller.product_list);

//GET para criar product
router.get('/product/create', product_Controller.product_create_get);

//POST para criar product
router.post('/product/create', product_Controller.product_create_post);

//POST para deletar product
router.post('/product/:id/delete', product_Controller.product_delete_post);

//GET para update product
router.get('/product/:id/update', product_Controller.product_update_get);

//POST para update product
router.post('/product/:id/update', product_Controller.product_update_post);


//USER CONTROLLER
router.get('/', user_Controller.user_list);

//GET para criar user
router.get('/user/create', user_Controller.user_create_get);

//POST para criar user
router.post('/user/create', user_Controller.user_create_post);

//POST para deletar user
router.post('/user/:id/delete', user_Controller.user_delete_post);

//GET para deletar user
router.get('/user/:id/update', user_Controller.user_update_get);

//GET para criar user
router.post('/user/:id/update', user_Controller.user_update_post);

//service CONTROLLER
// router.get('/', service_Controller.service_list);

//GET para criar service
router.get('/service/create', service_Controller.service_create_get);

//POST para criar service
router.post('/service/create', service_Controller.service_create_post);

//POST para criar service
router.post('/service/:id/delete', service_Controller.service_delete_post);

//GET para deletar service
router.get('/service/:id/update', service_Controller.service_update_get);

//POST para criar service
router.post('/service/:id/update', service_Controller.service_update_post);

router.post('/user/find', function(req, res) {
	User.findOne({ username: req.body.username }, function(err, foundUser) {
		Animal.find({ userID: foundUser.id }, function(err, animal_list) {
			Service.find()
				.exec(function(err, service_list) {
					res.render('adm-add-appointment-cont', { title: 'Animal List and Service List and User', animal_list: animal_list , service_list: service_list, user: foundUser});
				});
		});
	});
});

module.exports = router;
