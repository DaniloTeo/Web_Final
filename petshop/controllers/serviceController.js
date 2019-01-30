var Service  = require('../models/service');
var async = require('async');

exports.service_list_adm = function(req, res){
	if (req.session.user && req.session.user.auth === "adm") {
		Service.find()
			.exec(function(err, list_services) {
				res.render('manage-services', { title: 'Service List', service_list: list_services });
			});
	}
	else {
		res.redirect('/');
	}
};

exports.service_create_get = function(req, res){
	res.render('adm-add-service');
};

exports.service_create_post = function(req, res){
	var newService = new Service();

	newService.name = req.body.name;
	newService.picture = req.body.picture;
	newService.description = req.body.description;
	newService.price = req.body.price;

	newService.save(function(err, savedService) {
		res.redirect('/manage-services');
	})
};
	

exports.service_delete_post = function(req, res){
	Service.findByIdAndRemove(req.params.id, function() {
		res.redirect('/manage-services');
	});
}

exports.service_update_get = function(req, res){
	Service.findById(req.params.id)
		.exec(function(err, service) {
			res.render('adm-edit-service', { title: 'Service Detail', service: service });
		});
}

exports.service_update_post = function(req, res){
	Service.findById(req.params.id, function(err, service) {
		service.name = req.body.name;
		service.picture = req.body.picture;
		service.description = req.body.description;
		service.price = req.body.price;

		service.save(function(err, savedService) {
			res.redirect('/manage-services');
		});
	});
}