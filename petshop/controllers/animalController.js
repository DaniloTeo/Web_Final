var Animal  = require('../models/animal');

exports.animal_list = function(req, res){
	res.send('NOT IMPLEMENTED: Animal list');
};

exports.animal_create_get = function(req, res){
	res.render('add-animal');
};

exports.animal_create_post = function(req, res){
	var newAnimal = new Animal();

	newAnimal.name = req.body.name;
	newAnimal.picture = req.body.picture;
	newAnimal.race = req.body.race;
	newAnimal.age = req.body.age;
	newAnimal.userID = req.session.user._id;

	newAnimal.save(function(err, savedAnimal) {
		res.redirect('/profile');
	});
};

exports.animal_delete_get = function(req, res){
	res.send('NOT IMPLEMENTED: Animal delete GET');
}

exports.animal_delete_post = function(req, res){
	Animal.findByIdAndRemove(req.params.id, function() {
		res.redirect('/profile');
	});
}

exports.animal_update_get = function(req, res){
	res.send('NOT IMPLEMENTED: Animal update GET');
}

exports.animal_update_post = function(req, res){
	res.send('NOT IMPLEMENTED: Animal update POST');
}