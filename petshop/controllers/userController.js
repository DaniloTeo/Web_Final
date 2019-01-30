var User  = require('../models/user');
var async = require('async');

exports.user_list = function(req, res){
	User.find()
		.exec(function(err, list_users) {
			res.render('user_list', { title: 'User List', user_list: list_users });
		});
};

exports.user_list_adm = function(req, res) {
	if (req.session.user && req.session.user.auth === "adm") {
		User.find()
			.exec(function(err, list_users) {
				res.render('manage-users', { title: 'User List', user_list: list_users });
			});
	}
	else {
		res.redirect('/');
	}
}

exports.user_create_get = function(req, res){
	if (req.session.user && req.session.user.auth === "adm") {
		res.render('adm-add-user');
	}
	else {
		res.render('signup');
	}
};

exports.user_create_post = function(req, res){
	var newUser = new User();
	
	newUser.name = req.body.name;
	newUser.address = req.body.address;
	newUser.picture = req.body.picture;
	newUser.phone = req.body.phone;
	newUser.email = req.body.email;
	newUser.username = req.body.username;
	newUser.password = req.body.password;
	
	if (req.session.user === undefined) {
		newUser.auth = "usr";
	}
	else {
		newUser.auth = req.body.auth;	
	}

	newUser.save(function(err, savedUser) {
		if (req.session.user && req.session.user.auth === "adm") {
			res.redirect('/manage-users');
		}
		else {
			res.redirect('/');	
		}
	});
};


exports.user_delete_post = function(req, res){
	User.findByIdAndRemove(req.params.id, function() {
		console.log("ALOOOOOO");
		res.redirect('/manage-users');
	});
}

exports.user_update_get = function(req, res){
	User.findById(req.params.id)
		.exec(function(err, user) {
			res.render('adm-edit-user', { title: 'User Detail', user: user });
		});
}

exports.user_update_get_gambi = function(req, res){
	res.render('edit-user');
}

exports.user_update_post_gambi = function(req, res){
	User.findById(req.session.user._id, function(err, user) {
		user.name = req.body.name;
		user.address = req.body.address;
		user.picture = req.body.picture;
		user.phone = req.body.phone;
		user.email = req.body.email;
		user.username = req.body.username;
		user.password = req.body.password;

		user.save(function(err, savedUser) {
			req.session.user = user;
			res.redirect('/profile');
		});
	});
}

exports.user_update_post = function(req, res){
	User.findById(req.params.id, function(err, user) {
		user.name = req.body.name;
		user.address = req.body.address;
		user.picture = req.body.picture;
		user.phone = req.body.phone;
		user.email = req.body.email;
		user.username = req.body.username;
		user.password = req.body.password;
		user.auth = req.body.auth;


		user.save(function(err, savedUser) {
			res.redirect('/manage-users');
		});
	});
}