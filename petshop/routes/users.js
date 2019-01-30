var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var animal_Controller = require('../controllers/animalController');
var cart_Controller = require('../controllers/cartController');
var user_Controller = require('../controllers/userController');
var appointment_Controller = require('../controllers/appointmentController');

//animal CONTROLLER
router.get('/', animal_Controller.animal_list);

//GET para criar animal
router.get('/animal/create', animal_Controller.animal_create_get);

//POST para criar animal
router.post('/animal/create', animal_Controller.animal_create_post);

//GET para deletar animal
router.get('/animal/:id/delete', animal_Controller.animal_delete_get);

//GET para criar animal
router.get('/animal/:id/delete', animal_Controller.animal_delete_post);

//GET para deletar animal
router.get('/animal/:id/update', animal_Controller.animal_update_get);

//GET para criar animal
router.get('/animal/:id/update', animal_Controller.animal_update_post);

//cart CONTROLLER
router.get('/', cart_Controller.cart_list);

//GET para criar cart
router.get('/cart/create', cart_Controller.cart_create_get);

//POST para criar cart
router.post('/cart/create', cart_Controller.cart_create_post);

//GET para deletar cart
router.get('/cart/:id/delete', cart_Controller.cart_delete_get);

//GET para criar cart
router.get('/cart/:id/delete', cart_Controller.cart_delete_post);

//GET para deletar cart
router.get('/cart/:id/update', cart_Controller.cart_update_get);

//GET para criar cart
router.get('/cart/:id/update', cart_Controller.cart_update_post);

//user CONTROLLER
router.get('/', user_Controller.user_list);

//GET para criar user
router.get('/user/create', user_Controller.user_create_get);

//POST para criar user
router.post('/user/create', user_Controller.user_create_post);

//GET para deletar user
router.get('/user/:id/delete', user_Controller.user_delete_get);

//GET para criar user
router.get('/user/:id/delete', user_Controller.user_delete_post);

//GET para deletar user


//GET para criar user
router.get('/user/:id/update', user_Controller.user_update_post);

//appointment CONTROLLER
router.get('/', appointment_Controller.appointment_list);

//GET para criar appointment
router.get('/appointment/create', appointment_Controller.appointment_create_get);

//POST para criar appointment
router.post('/appointment/create', appointment_Controller.appointment_create_post);

//GET para deletar appointment
router.get('/appointment/:id/delete', appointment_Controller.appointment_delete_get);

//GET para criar appointment
router.get('/appointment/:id/delete', appointment_Controller.appointment_delete_post);

//GET para deletar appointment
router.get('/appointment/:id/update', appointment_Controller.appointment_update_get);

//GET para criar appointment
router.get('/appointment/:id/update', appointment_Controller.appointment_update_post);



module.exports = router;
