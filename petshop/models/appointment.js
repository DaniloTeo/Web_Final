var mongoose = require('mongoose');


var appointmentSchema = new mongoose.Schema({
	userID: {type: mongoose.Schema.ObjectId, ref: 'User'},
	animalID: {type: mongoose.Schema.ObjectId, ref: 'Animal'},
	serviceID: {type: mongoose.Schema.ObjectId, ref: 'Service'},
	date: {type: Date},
});

appointmentSchema.virtual('url')
.get(function(){
	return '/appointment/' + this._id;
});




var Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;