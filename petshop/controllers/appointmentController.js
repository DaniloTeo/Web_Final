var Appointment  = require('../models/appointment');
var Animal = require('../models/animal');
var Service = require('../models/service');

exports.appointment_list = function(req, res){
	res.send('NOT IMPLEMENTED: Appointment list');
};

exports.appointment_list_adm = function(req, res) {
	if (req.session.user && req.session.user.auth === "adm") {
		Appointment.find()
			.exec(function(err, list_appointments) {
				console.log(list_appointments);
				res.render('manage-appointments', { title: 'Appointment List', appointment_list: list_appointments });
			});
	}
	else {
		res.redirect('/');
	}
}

exports.appointment_create_get = function(req, res){
	res.render('adm-add-appointment');
};

exports.appointment_create_post = function(req, res){
	var newAppointment = new Appointment();

	newAppointment.userID = req.body.userID;
	newAppointment.animalID = req.body.animalID;
	newAppointment.serviceID = req.body.serviceID;
	newAppointment.date = req.body.date;

	
	newAppointment.save(function(err, savedAppointment){
		
		res.redirect('/manage-appointments');
	});
};

exports.appointment_create_get_gambi = function(req, res){
	Animal.find({ userID: req.session.user._id }, function(err, animal_list) {
		Service.find()
			.exec(function(err, service_list) {
				res.render('add-appointment', { title: 'Animal List and Service List and User', animal_list: animal_list , service_list: service_list});
			});
	});
};

exports.appointment_create_post_gambi = function(req, res){
	var newAppointment = new Appointment();

	newAppointment.userID = req.session.user._id;
	newAppointment.animalID = req.body.animalID;
	newAppointment.serviceID = req.body.serviceID;
	newAppointment.date = req.body.date;

	
	newAppointment.save(function(err, savedAppointment){
		res.redirect('/profile');
	});


};

exports.appointment_delete_post = function(req, res){
	console.log("OIEEEEEEEEEEEEEEEEEE");
	Appointment.findByIdAndRemove(req.params.id, function() {
		res.redirect('/manage-appointments');
	});
}

exports.appointment_update_get = function(req, res){
	Appointment.findById(req.params.id)
		.exec(function(err, appointment){
			Animal.find({ userID: appointment.userID}, function(err, animal_list){
				res.render('adm-edit-appointment', { title: 'Appointment', appointment: appointment, animal_list: animal_list });	
			});



			
		});
}

exports.appointment_update_post = function(req, res){
	Appointment.findById(req.params.id)
		.exec(function(err, foundAppointment){
			foundAppointment.date = req.body.date;
			foundAppointment.animalID = req.body.animalID;

			foundAppointment.save(function(err, savedAppointment){
				res.redirect('/manage-appointments');
			});

		});
}